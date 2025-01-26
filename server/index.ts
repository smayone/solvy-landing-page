import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve static files from attached_assets with proper CORS headers
app.use('/attached_assets', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static('attached_assets'));

// Logging middleware
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
  try {
    process.on('uncaughtException', (err) => {
      log('Uncaught Exception:', err);
    });

    process.on('unhandledRejection', (reason, promise) => {
      log('Unhandled Rejection at:', promise, 'reason:', reason);
    });

    const server = registerRoutes(app);

    // Error handling middleware
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

    // Try alternative ports if 5000 is busy
    const tryPort = (port: number): Promise<void> => {
      return new Promise((resolve, reject) => {
        server.once('error', (err: any) => {
          if (err.code === 'EADDRINUSE') {
            log(`Port ${port} is busy, trying ${port + 1}...`);
            server.close();
            tryPort(port + 1).then(resolve).catch(reject);
          } else {
            reject(err);
          }
        });

        server.listen(port, "0.0.0.0", () => {
          log(`Server started on port ${port}`);
          resolve();
        });
      });
    };

    await tryPort(5000);

    // Handle graceful shutdown
    const shutdown = async () => {
      log('Shutting down gracefully...');
      server.close(() => {
        log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error: any) {
    log('Fatal startup error:', error.message);
    process.exit(1);
  }
})();