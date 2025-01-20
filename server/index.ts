import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { resolveDomain } from "./domains";
import { db } from "@db";
import { sql } from "drizzle-orm";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from attached_assets with proper CORS headers
app.use('/attached_assets', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(process.cwd(), 'attached_assets')));

// Domain resolution middleware
app.use((req, res, next) => {
  const hostname = req.hostname;
  const resolvedDomain = resolveDomain(hostname);

  if (!resolvedDomain) {
    return res.status(404).send('Domain not found');
  }

  // Add resolved domain to request for use in routes
  req.resolvedDomain = resolvedDomain;
  next();
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

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
async function checkDatabase() {
  try {
    // Simple query to test the connection
    await db.execute(sql`SELECT 1`);
    log('Database connection successful');
    return true;
  } catch (error: any) {
    log('Database connection failed:', error.message);
    return false;
  }
}

(async () => {
  try {
    // Check database connection before starting the server
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

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    const port = parseInt(process.env.PORT || '3000', 10);
    server.listen(port, "0.0.0.0", () => {
      log(`Server running on port ${port}`);
    });
  } catch (error: any) {
    log('Failed to start server:', error.message);
    process.exit(1);
  }
})();

// Add type definition for the resolvedDomain property
declare global {
  namespace Express {
    interface Request {
      resolvedDomain?: string;
    }
  }
}