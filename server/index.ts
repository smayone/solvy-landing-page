declare global {
  namespace Express {
    interface Request {
      resolvedDomain?: string;
    }
  }
}

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { resolveDomain, domains } from "./domains";
import { db } from "@db";
import { sql } from "drizzle-orm";
import path from "path";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files middleware
app.use('/attached_assets', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(process.cwd(), 'attached_assets')));

// Domain resolution middleware - only enforce in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    const hostname = req.hostname;
    const resolvedDomain = resolveDomain(hostname);

    if (!resolvedDomain) {
      return res.status(404).send('Domain not found');
    }

    req.resolvedDomain = resolvedDomain;
  } else {
    req.resolvedDomain = domains.root;
  }
  next();
});

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// Database health check
async function isDatabaseHealthy(): Promise<boolean> {
  try {
    await db.execute(sql`SELECT 1`);
    return true;
  } catch (err) {
    log('Database error:', err instanceof Error ? err.message : 'Unknown error');
    return false;
  }
}

// Initialize server
async function initialize() {
  try {
    // Verify database connection
    const isDbHealthy = await isDatabaseHealthy();
    if (!isDbHealthy) {
      throw new Error('Database connection failed');
    }
    log('Database connection successful');

    // Setup routes
    const server = registerRoutes(app);

    // Error handling
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log('Error:', message);
      res.status(status).json({ message });
    });

    // Setup frontend - Important: we use development mode for Vite HMR
    if (process.env.NODE_ENV === "development") {
      log('Setting up Vite development server');
      await setupVite(app, server);
    } else {
      log('Serving static files from dist/public');
      app.use(express.static(path.resolve(__dirname, '../dist/public')));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, '../dist/public/index.html'));
      });
    }

    // Start server
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    const HOST = '0.0.0.0';

    server.listen(PORT, HOST, () => {
      log(`Server running on http://${HOST}:${PORT}`);
    });

  } catch (err) {
    log('Initialization error:', err instanceof Error ? err.message : 'Unknown error');
    process.exit(1);
  }
}

// Start server
initialize();