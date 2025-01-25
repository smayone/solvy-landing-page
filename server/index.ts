import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { resolveDomain, domains } from "./domains";
import { db } from "@db";
import { sql } from "drizzle-orm";
import path from "path";

declare global {
  namespace Express {
    interface Request {
      resolvedDomain?: string;
    }
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from attached_assets with proper CORS headers
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

// Database connection check with retries
async function checkDatabase(retries = 3, delay = 1000): Promise<boolean> {
  while (retries > 0) {
    try {
      await db.execute(sql`SELECT 1`);
      log('Database connection successful');
      return true;
    } catch (error: any) {
      retries--;
      if (retries > 0) {
        log(`Database connection failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        log('Database connection failed:', error.message);
        return false;
      }
    }
  }
  return false;
}

// Start server with proper error handling and port retry logic
async function startServer(initialPort: number, host: string, maxRetries = 3): Promise<void> {
  let currentPort = initialPort;
  let retries = maxRetries;

  while (retries > 0) {
    try {
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

      await new Promise<void>((resolve, reject) => {
        server.listen(currentPort, host)
          .once('error', (err: Error & { code?: string }) => {
            if (err.code === 'EADDRINUSE') {
              log(`Port ${currentPort} is in use, trying next port...`);
              currentPort++;
              retries--;
              if (retries === 0) {
                reject(new Error(`Could not find an available port after ${maxRetries} attempts`));
              } else {
                server.close();
                reject(err);
              }
            } else {
              reject(err);
            }
          })
          .once('listening', () => {
            log(`Server started successfully on port ${currentPort}`);
            resolve();
          });
      });
      return;
    } catch (error: any) {
      if (retries === 1) throw error;
    }
  }
  throw new Error('Failed to start server after multiple attempts');
}

// Main application startup
(async () => {
  try {
    // Check database connection before starting the server
    const dbConnected = await checkDatabase();
    if (!dbConnected) {
      throw new Error('Could not connect to database after multiple attempts');
    }

    const PORT = 5000;
    const HOST = '0.0.0.0';
    await startServer(PORT, HOST);
  } catch (error: any) {
    log('Fatal error:', error.message);
    process.exit(1);
  }
})();