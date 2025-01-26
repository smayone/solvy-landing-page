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

// Database connection check with timeout
async function checkDatabase(timeout = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      log('Database connection timeout');
      resolve(false);
    }, timeout);

    db.execute(sql`SELECT 1`)
      .then(() => {
        clearTimeout(timer);
        log('Database connection successful');
        resolve(true);
      })
      .catch((error: any) => {
        clearTimeout(timer);
        log('Database connection failed:', error.message);
        resolve(false);
      });
  });
}

// Server state tracking
let isShuttingDown = false;
const activeConnections = new Map<string, any>();

// Track connections for cleanup
function trackConnection(connection: any) {
  const id = Math.random().toString(36).substring(7);
  activeConnections.set(id, connection);
  connection.on('close', () => {
    activeConnections.delete(id);
  });
}

// Graceful shutdown handler
async function shutdownServer(server: any, force = false) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  log('Initiating server shutdown...');

  // Stop accepting new connections
  server.close(() => {
    log('Server stopped accepting new connections');
  });

  if (force) {
    log('Force shutdown initiated');
    process.exit(1);
  }

  // Close existing connections
  activeConnections.forEach((connection) => {
    try {
      connection.end();
    } catch (error) {
      log('Error closing connection:', error?.toString() || 'Unknown error');
    }
  });
  activeConnections.clear();

  // Final cleanup
  setTimeout(() => {
    log('Clean shutdown completed');
    process.exit(0);
  }, 1000);
}

// Handle port in use error
function handlePortError(port: number, server: any, error: any) {
  if (error.code === 'EADDRINUSE') {
    log(`Port ${port} is already in use. Please check for other running processes.`);
    shutdownServer(server, true);
  } else {
    log('Server error:', error.message);
    throw error;
  }
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

    // Track connections for cleanup
    server.on('connection', trackConnection);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log('Error:', message);
      res.status(status).json({ message });
      throw err;
    });

    // Setup vite or serve static files
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Signal handlers
    process.on('SIGTERM', () => shutdownServer(server));
    process.on('SIGINT', () => shutdownServer(server));
    process.on('uncaughtException', (error) => {
      log('Uncaught Exception:', error.message);
      shutdownServer(server, true);
    });

    // Start server on port 5000 with error handling
    const PORT = 5000;
    server.listen(PORT, '0.0.0.0')
      .on('error', (error) => handlePortError(PORT, server, error))
      .on('listening', () => {
        log(`Server started successfully on port ${PORT}`);
      });

  } catch (error: any) {
    log('Fatal startup error:', error.message);
    process.exit(1);
  }
})();