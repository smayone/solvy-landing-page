import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db } from "@db";
import { sql } from "drizzle-orm";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from attached_assets with proper CORS headers
app.use('/attached_assets', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(process.cwd(), 'attached_assets')));

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

// Database connection check
async function checkDatabase(): Promise<boolean> {
  try {
    await db.execute(sql`SELECT 1`);
    log('Database connection successful');
    return true;
  } catch (error: any) {
    log('Database connection failed:', error.message);
    return false;
  }
}

// Graceful shutdown handler with proper cleanup
function setupGracefulShutdown(server: any) {
  let shuttingDown = false;

  async function shutdown() {
    if (shuttingDown) return;
    shuttingDown = true;
    log('Received shutdown signal, closing server...');

    // Close the server first
    server.close(() => {
      log('Server closed');
      process.exit(0);
    });

    // Force exit after timeout
    setTimeout(() => {
      log('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  }

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

// Main application startup
(async () => {
  try {
    // Check database connection
    const dbConnected = await checkDatabase();
    if (!dbConnected) {
      throw new Error('Could not connect to database');
    }

    const server = registerRoutes(app);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log('Error:', message);
      res.status(status).json({ message });
    });

    // Setup vite or serve static files
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Set up graceful shutdown
    setupGracefulShutdown(server);

    // Start server with proper error handling
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
    server.listen(port, '0.0.0.0', () => {
      log(`Server started on port ${port}`);
    }).on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        log(`Port ${port} is already in use. Please try again in a few moments...`);
        process.exit(1);
      } else {
        log('Server failed to start:', error.message);
        process.exit(1);
      }
    });
  } catch (error: any) {
    log('Fatal error:', error.message);
    process.exit(1);
  }
})();