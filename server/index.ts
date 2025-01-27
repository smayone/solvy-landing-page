import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import process from "process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Force production mode for deployment
process.env.NODE_ENV = 'production';

// Configure security for production
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    mode: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Request logging middleware
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
    log(`Starting server in ${process.env.NODE_ENV} mode...`);
    const server = registerRoutes(app);

    // Production error handler - no stack traces leaked to user
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      log(`Error [${status}]: ${err.message}`);
      res.status(status).json({ 
        message: 'Internal Server Error',
        status: status 
      });
    });

    // Set up static file serving
    const distPath = path.resolve(__dirname, '../dist/public');
    log(`Serving static files from: ${distPath}`);

    app.use(express.static(distPath));

    // Serve index.html for all routes (SPA support)
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      log(`Serving index.html for route: ${req.path}`);
      res.sendFile(indexPath);
    });

    // Port configuration
    const PORT = process.env.PORT || 5000;

    server.listen(PORT, "0.0.0.0", () => {
      log(`Server started successfully on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = () => {
      log('Shutting down gracefully...');
      server.close(() => {
        log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error: any) {
    log(`Fatal startup error: ${error.message}`);
    process.exit(1);
  }
})();