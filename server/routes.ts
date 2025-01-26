import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { techCompanies, privacyCases, taxDonations, cryptoTransactions, educationalContent, learningProgress, taxRepatriations, companyAccess } from "@db/schema";
import { eq, desc, and } from "drizzle-orm";
import Stripe from "stripe";
import * as os from 'os';

// Initialize stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

// Type definitions for health check responses
interface HealthStatus {
  status: "ok" | "error" | "unknown";
  message?: string;
}

interface SystemHealth {
  status: "healthy" | "degraded" | "error";
  checks: {
    api: HealthStatus;
    database: HealthStatus;
    stripe: HealthStatus;
    timestamp: string;
  };
  metrics?: {
    memory: NodeJS.MemoryUsage;
    uptime: number;
    lastRestart?: string;
  };
  environment: string;
  version: string;
}

interface DetailedSystemMetrics {
  cpu: {
    usage: number;
    load: number[];
  };
  memory: NodeJS.MemoryUsage;
  disk: {
    total: number;
    free: number;
  };
}

// Extend Request type to include user property
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role?: string;
  };
}

export function registerRoutes(app: Express): Server {
  // Basic health check endpoint
  app.get("/api/health", async (_req, res) => {
    const status = {
      status: "ok" as const,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development'
    };

    res.json(status);
  });

  // Add monitoring access check endpoint
  app.get("/api/access/monitoring", async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user?.id) {
        return res.json({ hasAccess: false });
      }

      const access = await db
        .select()
        .from(companyAccess)
        .where(and(
          eq(companyAccess.userId, req.user.id),
          eq(companyAccess.isActive, true)
        ))
        .limit(1);

      const hasAccess = access.length > 0 && access[0].role === 'owner';
      res.json({ hasAccess, role: access[0]?.role });
    } catch (error) {
      res.status(500).json({ error: "Failed to check access permissions" });
    }
  });

  // Detailed system health check with owner-only access
  app.get("/api/health/detailed", async (req: AuthenticatedRequest, res) => {
    try {
      // Check if user has owner access
      if (req.user?.role !== 'owner') {
        return res.status(403).json({
          status: "error" as const,
          message: "Owner access required for detailed health check"
        });
      }

      const checks: SystemHealth['checks'] = {
        api: { status: "ok" },
        database: { status: "unknown" },
        stripe: { status: "unknown" },
        timestamp: new Date().toISOString()
      };

      // Check database
      try {
        await db.select().from(techCompanies).limit(1);
        checks.database = { status: "ok" };
      } catch (error: any) {
        checks.database = { 
          status: "error",
          message: error?.message || "Database connection failed"
        };
      }

      // Check Stripe
      try {
        await stripe.paymentMethods.list({ limit: 1 });
        checks.stripe = { status: "ok" };
      } catch (error: any) {
        checks.stripe = { 
          status: "error",
          message: error?.message || "Stripe connection failed"
        };
      }

      const overall = Object.values(checks).every(
        (check: any) => check.status === "ok" || check === checks.timestamp
      ) ? "healthy" : "degraded";

      const systemHealth: SystemHealth = {
        status: overall as SystemHealth['status'],
        checks,
        metrics: {
          memory: process.memoryUsage(),
          uptime: process.uptime(),
          lastRestart: process.env.LAST_RESTART || new Date().toISOString(),
        },
        environment: process.env.NODE_ENV || 'development',
        version: process.env.APP_VERSION || '1.0.0'
      };

      res.json(systemHealth);
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        error: error?.message || "Health check failed",
        timestamp: new Date().toISOString()
      });
    }
  });

  // Check access permissions for tax repatriation
  app.get("/api/access/tax-repatriation", async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user?.id) {
        return res.json({ hasAccess: false });
      }

      const access = await db
        .select()
        .from(companyAccess)
        .where(and(
          eq(companyAccess.userId, req.user.id),
          eq(companyAccess.isActive, true)
        ))
        .limit(1);

      const hasAccess = access.length > 0;
      const role = hasAccess ? access[0].role : null;

      res.json({ hasAccess, role });
    } catch (error) {
      res.status(500).json({ error: "Failed to check access permissions" });
    }
  });

  // Get tax repatriation data
  app.get("/api/tax-repatriation", async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Get user's access level
      const access = await db
        .select()
        .from(companyAccess)
        .where(and(
          eq(companyAccess.userId, req.user.id),
          eq(companyAccess.isActive, true)
        ));

      if (!access.length) {
        return res.status(403).json({ error: "Access denied" });
      }

      // Fetch repatriation cases
      const cases = await db
        .select({
          id: taxRepatriations.id,
          amount: taxRepatriations.amount,
          status: taxRepatriations.status,
          filingDate: taxRepatriations.filingDate,
          companyName: techCompanies.name,
          privacyCaseNumber: privacyCases.caseNumber,
          destinationCountry: taxRepatriations.destinationCountry
        })
        .from(taxRepatriations)
        .innerJoin(techCompanies, eq(taxRepatriations.companyId, techCompanies.id))
        .innerJoin(privacyCases, eq(taxRepatriations.privacyCaseId, privacyCases.id))
        .orderBy(desc(taxRepatriations.filingDate));

      // Calculate summary statistics
      const summary = {
        totalAmount: cases.reduce((sum, c) => sum + Number(c.amount), 0),
        activeCases: cases.filter(c => c.status === "pending").length,
        completedCases: cases.filter(c => c.status === "completed").length
      };

      // Generate timeline data
      const timeline = cases.map(c => ({
        date: c.filingDate,
        amount: c.amount
      }));

      res.json({ cases, summary, timeline });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch repatriation data" });
    }
  });

  // Educational content endpoints
  app.get("/api/educational-content", async (_req, res) => {
    try {
      const content = await db.select().from(educationalContent);
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch educational content" });
    }
  });

  // Personalized learning path recommendations
  app.get("/api/learning-path", async (req: AuthenticatedRequest, res) => {
    try {
      // Get user's progress and interests
      const userProgress = await db
        .select()
        .from(learningProgress)
        .where(eq(learningProgress.userId, req.user?.id))
        .orderBy(desc(learningProgress.updatedAt));

      // Generate personalized recommendations
      const recommendations = [
        {
          title: "Introduction to Blockchain",
          description: "Start with the fundamentals of blockchain technology",
          moduleId: "blockchain",
          topicId: "intro"
        },
        {
          title: "DECIDEY Foundation",
          description: "Learn about community empowerment through blockchain",
          moduleId: "decidey",
          topicId: "foundation"
        },
        {
          title: "Digital Identity",
          description: "Understanding self-sovereign identity principles",
          moduleId: "solvy",
          topicId: "identity"
        }
      ];

      res.json({ recommendations });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate learning recommendations" });
    }
  });

  // Track learning progress
  app.post("/api/learning-progress", async (req: AuthenticatedRequest, res) => {
    try {
      const { moduleId, topicId, progress } = req.body;

      await db.insert(learningProgress).values({
        userId: req.user?.id,
        moduleId,
        topicId,
        progress,
        updatedAt: new Date()
      });

      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update learning progress" });
    }
  });

  // Existing tech companies endpoints
  app.get("/api/tech-companies", async (_req, res) => {
    try {
      const companies = await db.select().from(techCompanies);
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tech companies" });
    }
  });

  // Existing crypto endpoints
  app.get("/api/crypto/transactions", async (req: AuthenticatedRequest, res) => {
    try {
      const transactions = await db
        .select()
        .from(cryptoTransactions)
        .orderBy(desc(cryptoTransactions.createdAt));

      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({
        error: "Failed to fetch transaction history",
        details: error?.message || "Unknown error occurred"
      });
    }
  });

  // Crypto Onramp endpoint with enhanced mobile support
  app.post("/api/crypto/create-onramp-session", async (req: AuthenticatedRequest, res) => {
    try {
      const { platform = 'web', firstName, lastName, email } = req.body;

      // Configure and create the onramp session
      const session = await stripe.onrampSessions.create({
        wallet_addresses: {
          polygon: "0x...", // This should be dynamically set based on user's wallet
        },
        transaction_details: {
          supported_destination_networks: ["polygon"],
          supported_destination_currencies: ["usdc"],
        },
        customer_information: firstName && lastName && email ? {
          first_name: firstName,
          last_name: lastName,
          email: email,
        } : undefined
      });

      // Store initial transaction record
      const [transaction] = await db
        .insert(cryptoTransactions)
        .values({
          sessionId: session.id,
          status: "pending",
          customerEmail: email,
          customerName: firstName && lastName ? `${firstName} ${lastName}` : undefined,
          network: "polygon",
          destinationCurrency: "usdc",
          metadata: { platform }
        })
        .returning();

      // Return appropriate response based on platform
      if (platform === 'ios' || platform === 'android') {
        res.json({
          clientSecret: session.client_secret,
          publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
          merchantIdentifier: "merchant.com.solvy.app", // For Apple Pay
          stripeAccountId: process.env.STRIPE_ACCOUNT_ID
        });
      } else {
        res.json({ clientSecret: session.client_secret });
      }
    } catch (error: any) {
      console.error('Crypto onramp session creation failed:', error);
      res.status(500).json({
        error: "Failed to create crypto onramp session",
        details: error?.message || "Unknown error occurred"
      });
    }
  });

  // Update transaction status (webhook endpoint)
  app.post("/api/crypto/webhook", async (req: Request, res) => {
    try {
      const event = req.body;

      if (event.type === 'onramp.session.completed') {
        const session = event.data.object;

        await db
          .update(cryptoTransactions)
          .set({
            status: "completed",
            sourceAmount: session.source_amount,
            sourceCurrency: session.source_currency,
            destinationAmount: session.destination_amount,
            walletAddress: session.wallet_address,
            updatedAt: new Date()
          })
          .where(eq(cryptoTransactions.sessionId, session.id));
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error('Webhook processing failed:', error);
      res.status(500).json({
        error: "Failed to process webhook",
        details: error?.message || "Unknown error occurred"
      });
    }
  });

  // System metrics endpoint (owner-only)
  app.get("/api/health/metrics", async (req: AuthenticatedRequest, res) => {
    try {
      if (req.user?.role !== 'owner') {
        return res.status(403).json({
          status: "error",
          message: "Owner access required for system metrics"
        });
      }

      const metrics: DetailedSystemMetrics = {
        cpu: {
          usage: process.cpuUsage().user / 1000000, // Convert to milliseconds
          load: os.loadavg(),
        },
        memory: process.memoryUsage(),
        disk: {
          total: os.totalmem(),
          free: os.freemem(),
        }
      };

      res.json(metrics);
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error?.message || "Failed to gather system metrics"
      });
    }
  });


  const httpServer = createServer(app);
  return httpServer;
}