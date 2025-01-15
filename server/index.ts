import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { AddressInfo } from "net";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    log(`Error: ${message}`);
    res.status(status).json({ message });
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Try to start the server with retries for different ports
  const startServer = (port: number, maxRetries: number = 3): Promise<void> => {
    return new Promise((resolve, reject) => {
      const tryStart = (retryCount: number) => {
        server.listen(port, "0.0.0.0")
          .on("error", (err: NodeJS.ErrnoException) => {
            if (err.code === "EADDRINUSE" && retryCount < maxRetries) {
              log(`Port ${port} in use, trying ${port + 1}...`);
              server.close();
              tryStart(retryCount + 1);
            } else {
              reject(err);
            }
          })
          .on("listening", () => {
            const addr = server.address() as AddressInfo;
            log(`Server running on port ${addr.port}`);
            resolve();
          });
      };
      tryStart(0);
    });
  };

  try {
    await startServer(5000);
  } catch (error) {
    log(`Failed to start server: ${error}`);
    process.exit(1);
  }
})();