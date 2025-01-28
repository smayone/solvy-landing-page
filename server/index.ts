import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

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
  let isShuttingDown = false;

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000 as required by the environment
  const PORT = 5000;

  // Add proper error handling for port binding
  const startServer = () => {
    if (isShuttingDown) return;

    server.listen(PORT, "0.0.0.0", () => {
      log(`Server started on port ${PORT}`);
    }).on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        log(`Port ${PORT} is already in use. Retrying in 1 second...`);
        setTimeout(() => {
          server.close();
          startServer();
        }, 1000);
      } else {
        log(`Failed to start server: ${err.message}`);
        process.exit(1);
      }
    });
  };

  // Graceful shutdown handling
  const cleanup = () => {
    if (isShuttingDown) return;

    isShuttingDown = true;
    log('Shutting down gracefully...');

    server.close(() => {
      log('Server closed');
      process.exit(0);
    });

    // Force close after 10s
    setTimeout(() => {
      log('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  // Handle various shutdown signals
  process.on('SIGTERM', cleanup);
  process.on('SIGINT', cleanup);
  process.on('SIGHUP', cleanup);
  process.on('uncaughtException', (err) => {
    log(`Uncaught Exception: ${err.message}`);
    cleanup();
  });

  startServer();
})();