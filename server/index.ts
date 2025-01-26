import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db } from "@db";
import { sql } from "drizzle-orm";
import { createServer as createNetServer } from "net";

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

// Function to check if a port is in use
async function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = createNetServer()
      .once('error', () => resolve(true))
      .once('listening', () => {
        server.close();
        resolve(false);
      })
      .listen(port, '0.0.0.0');
  });
}

// Function to find an available port starting from a higher range
async function findAvailablePort(startPort: number, maxRetries: number = 10): Promise<number> {
  const basePort = startPort + 3000; // Start from a higher range (8000+)
  for (let port = basePort; port < basePort + maxRetries; port++) {
    const inUse = await isPortInUse(port);
    if (!inUse) {
      return port;
    }
    log(`Port ${port} is in use, trying next port...`);
  }
  throw new Error(`Could not find an available port after ${maxRetries} attempts`);
}

(async () => {
  try {
    const server = registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      log(`Error: ${message}`);
      res.status(status).json({ message });
      throw err;
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    const PORT = await findAvailablePort(5000);
    server.listen(PORT, "0.0.0.0", () => {
      log(`serving on port ${PORT}`);
    });

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