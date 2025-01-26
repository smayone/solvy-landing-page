import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db } from "@db";
import { sql } from "drizzle-orm";
import path from "path";

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
    if (path.startsWith("/api") || path === '/health') {
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

// Function to try starting server on different ports
async function startServer(server: any, initialPort: number, maxRetries: number = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const currentPort = initialPort + attempt;
    try {
      await new Promise((resolve, reject) => {
        server.listen(currentPort, '0.0.0.0')
          .once('listening', () => {
            log(`Server started successfully on port ${currentPort}`);
            resolve(true);
          })
          .once('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
              log(`Port ${currentPort} is in use, trying next port...`);
              server.close();
              resolve(false);
            } else {
              reject(err);
            }
          });
      });
      return true;
    } catch (error: any) {
      log(`Error starting server on port ${currentPort}:`, error.message);
      if (attempt === maxRetries) {
        throw error;
      }
    }
  }
  return false;
}

(async () => {
  try {
    const server = registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log('Error:', message);
      res.status(status).json({ message });
      throw err;
    });

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Try to start on port 5000, with fallback ports if needed
    const success = await startServer(server, 5000);
    if (!success) {
      log('Failed to start server after multiple attempts');
      process.exit(1);
    }

  } catch (error: any) {
    log('Fatal startup error:', error.message);
    process.exit(1);
  }
})();