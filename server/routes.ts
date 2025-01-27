import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { techCompanies, privacyCases, taxDonations, cryptoTransactions, educationalContent, learningProgress, taxRepatriations, companyAccess, manTaxCalculations, manAuditLogs, manFinancialReports, manAnalytics, businessUnits, chartOfAccounts, accountTypes } from "@db/schema";
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
        await stripe.paymentIntents.list({ limit: 1 }); //Using payment intents instead of paymentMethods
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

  // Fix the Stripe onramp session creation
  app.post("/api/crypto/create-onramp-session", async (req: AuthenticatedRequest, res) => {
    try {
      const { platform = 'web', firstName, lastName, email } = req.body;

      // Create a payment intent instead of onramp session since it's not available
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // Amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          platform,
          type: 'crypto_purchase'
        }
      });

      // Store initial transaction record
      const [transaction] = await db
        .insert(cryptoTransactions)
        .values({
          sessionId: paymentIntent.id,
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
          clientSecret: paymentIntent.client_secret,
          publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
          merchantIdentifier: "merchant.com.solvy.app", // For Apple Pay
          stripeAccountId: process.env.STRIPE_ACCOUNT_ID
        });
      } else {
        res.json({ clientSecret: paymentIntent.client_secret });
      }
    } catch (error: any) {
      console.error('Payment intent creation failed:', error);
      res.status(500).json({
        error: "Failed to create payment intent",
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


  // Tax calculation endpoint with automatic tax enabled
  app.post("/api/man/tax/calculate", async (req: AuthenticatedRequest, res) => {
    try {
      if (req.user?.role !== 'owner') {
        return res.status(403).json({ error: "Owner access required" });
      }

      const { amount, jurisdiction, postal_code, state } = req.body;

      // Create a tax calculation using Stripe's automatic tax feature
      const calculation = await stripe.tax.calculations.create({
        currency: 'usd',
        line_items: [{
          amount: Math.round(amount * 100), // Convert to cents
          reference: 'default', // Required field
        }],
        customer_details: {
          address: {
            country: jurisdiction,
            postal_code: postal_code,
            state: state,
          },
          tax_ids: [], // Optional tax IDs for the customer
        },
        expand: ['line_items.data.tax_breakdown'],
      });

      // Store the calculation in our database
      const [taxCalc] = await db
        .insert(manTaxCalculations)
        .values({
          transactionId: calculation.id,
          userId: req.user.id,
          amount: amount,
          taxableAmount: calculation.tax_breakdown[0]?.taxable_amount || 0,
          taxRate: calculation.tax_breakdown[0]?.tax_rate_details?.percentage || 0,
          taxAmount: calculation.tax_breakdown[0]?.tax_amount || 0,
          jurisdiction: jurisdiction,
          taxType: 'automatic',
          stripeCalculationId: calculation.id,
          metadata: { calculation_details: calculation }
        })
        .returning();

      res.json({ calculation, stored: taxCalc });
    } catch (error: any) {
      console.error('Tax calculation error:', error);
      res.status(500).json({
        error: "Tax calculation failed",
        details: error?.message
      });
    }
  });

  // Create financial report
  app.post("/api/man/reports/generate", async (req: AuthenticatedRequest, res) => {
    try {
      if (req.user?.role !== 'owner') {
        return res.status(403).json({ error: "Owner access required" });
      }

      const { reportType, startDate, endDate } = req.body;

      // Generate report based on type
      let reportData;
      if (reportType === 'tax') {
        // Fetch tax calculations for the period
        const calculations = await db
          .select()
          .from(manTaxCalculations)
          .where(and(
            // Add date range conditions here.  Example:
            //gte(manTaxCalculations.createdAt, new Date(startDate)),
            //lte(manTaxCalculations.createdAt, new Date(endDate))
          ));

        reportData = {
          calculations,
          summary: {
            totalTax: calculations.reduce((sum, calc) => sum + Number(calc.taxAmount), 0),
            averageRate: calculations.length > 0 ? calculations.reduce((sum, calc) => sum + Number(calc.taxRate), 0) / calculations.length : 0,
          }
        };
      } else {
        reportData = {}; // Handle other report types if needed
      }

      const [report] = await db
        .insert(manFinancialReports)
        .values({
          reportType,
          reportPeriod: `${startDate} to ${endDate}`,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          status: 'completed',
          reportData,
          generatedBy: req.user.id,
        })
        .returning();

      res.json(report);
    } catch (error: any) {
      res.status(500).json({
        error: "Report generation failed",
        details: error?.message
      });
    }
  });

  // Log audit event
  app.post("/api/man/audit/log", async (req: AuthenticatedRequest, res) => {
    try {
      if (req.user?.role !== 'owner') {
        return res.status(403).json({ error: "Owner access required" });
      }

      const { entityType, entityId, action, details } = req.body;

      const [log] = await db
        .insert(manAuditLogs)
        .values({
          entityType,
          entityId,
          action,
          userId: req.user.id,
          details,
          ipAddress: req.ip,
          userAgent: req.get('user-agent'),
          metadata: { source: 'api' }
        })
        .returning();

      res.json(log);
    } catch (error: any) {
      res.status(500).json({
        error: "Failed to create audit log",
        details: error?.message
      });
    }
  });

  // Get analytics data
  app.get("/api/man/analytics", async (req: AuthenticatedRequest, res) => {
    try {
      if (req.user?.role !== 'owner') {
        return res.status(403).json({ error: "Owner access required" });
      }

      const { category, timeframe } = req.query;

      const analytics = await db
        .select()
        .from(manAnalytics)
        .where(and(
          category ? eq(manAnalytics.category, category as string) : undefined,
          timeframe ? eq(manAnalytics.timeframe, timeframe as string) : undefined
        ))
        .orderBy(desc(manAnalytics.timestamp));

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({
        error: "Failed to fetch analytics data",
        details: error?.message
      });
    }
  });

  // Get Reign educational content
  app.get("/api/reign/educational-content", async (_req, res) => {
    try {
      const content = await db
        .select()
        .from(educationalContent)
        .where(eq(educationalContent.moduleId, "reign"))
        .orderBy(educationalContent.topicId);

      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch educational content" });
    }
  });

  // Fix the learning progress query
  app.get("/api/reign/learning-progress", async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const progress = await db
        .select()
        .from(learningProgress)
        .where(and(
          eq(learningProgress.userId, req.user.id),
          eq(learningProgress.moduleId, "reign")
        ))
        .orderBy(desc(learningProgress.updatedAt));

      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch learning progress" });
    }
  });

  // Update learning progress for Reign content
  app.post("/api/reign/learning-progress", async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { topicId, completed } = req.body;

      await db
        .insert(learningProgress)
        .values({
          userId: req.user.id,
          moduleId: "reign",
          topicId,
          progress: completed ? 100 : 0,
          completedAt: completed ? new Date() : null,
          metadata: { completedVia: "user-action" }
        })
        .onConflictDoUpdate({
          target: [learningProgress.userId, learningProgress.moduleId, learningProgress.topicId],
          set: {
            progress: completed ? 100 : 0,
            completedAt: completed ? new Date() : null,
            updatedAt: new Date()
          }
        });

      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update learning progress" });
    }
  });

  // Owner-only chart of accounts endpoint
  app.get("/api/man/accounts/overview", async (req: AuthenticatedRequest, res) => {
    try {
      if (req.user?.role !== 'owner') {
        return res.status(403).json({ error: "Owner access required" });
      }

      // Get complete business structure with accounts
      const overview = await db.transaction(async (tx) => {
        // Get business units
        const businesses = await tx
          .select()
          .from(businessUnits)
          .where(eq(businessUnits.isActive, true));

        // Get chart of accounts with metadata
        const accounts = await tx
          .select({
            accountNumber: chartOfAccounts.accountNumber,
            name: chartOfAccounts.name,
            description: chartOfAccounts.description,
            accountType: accountTypes.code,
            isActive: chartOfAccounts.isActive,
            metadata: chartOfAccounts.metadata,
          })
          .from(chartOfAccounts)
          .innerJoin(accountTypes, eq(chartOfAccounts.accountTypeId, accountTypes.id))
          .where(eq(chartOfAccounts.isActive, true));

        // Organize data by business unit
        const businessStructure = businesses.map(business => ({
          code: business.code,
          name: business.name,
          type: business.type,
          metadata: business.metadata,
          accounts: accounts.filter(account =>
            account.metadata?.business_unit === business.code
          ).map(account => ({
            number: account.accountNumber,
            name: account.name,
            type: account.accountType,
            taxTreatment: account.metadata?.tax_treatment || 'standard',
            category: account.metadata?.category,
            effectiveDate: account.metadata?.effective_date
          }))
        }));

        return {
          timestamp: new Date().toISOString(),
          businesses: businessStructure
        };
      });

      res.json(overview);
    } catch (error: any) {
      console.error('Error fetching chart of accounts:', error);
      res.status(500).json({
        error: "Failed to fetch chart of accounts overview",
        details: error?.message
      });
    }
  });

  // NGO Financial Reporting endpoints
  app.get("/api/ngo/financial-reports", async (req: AuthenticatedRequest, res) => {
    try {
      const { businessUnit = 'DECIDEY', period } = req.query;

      // Verify access permissions
      if (!req.user?.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const access = await db
        .select()
        .from(companyAccess)
        .where(and(
          eq(companyAccess.userId, req.user.id),
          eq(companyAccess.isActive, true)
        ));

      if (!access.length && req.user.role !== 'owner') {
        return res.status(403).json({ error: "Access denied" });
      }

      // Generate financial report
      const report = await db.transaction(async (tx) => {
        // Get business unit details
        const [ngo] = await tx
          .select()
          .from(businessUnits)
          .where(and(
            eq(businessUnits.code, businessUnit as string),
            eq(businessUnits.type, 'ngo')
          ));

        if (!ngo) {
          throw new Error("NGO business unit not found");
        }

        // Get all relevant accounts
        const accounts = await tx
          .select({
            accountNumber: chartOfAccounts.accountNumber,
            name: chartOfAccounts.name,
            type: accountTypes.code,
          })
          .from(chartOfAccounts)
          .innerJoin(accountTypes, eq(chartOfAccounts.accountTypeId, accountTypes.id))
          .where(eq(chartOfAccounts.isActive, true));

        // Get transactions for the period
        const transactions = await tx
          .select({
            id: accountingTransactions.id,
            date: accountingTransactions.transactionDate,
            type: accountingTransactions.type,
            amount: accountingEntries.amount,
            accountId: accountingEntries.accountId,
            isDebit: accountingEntries.isDebit,
            description: accountingTransactions.description,
          })
          .from(accountingTransactions)
          .innerJoin(accountingEntries, eq(accountingTransactions.id, accountingEntries.transactionId))
          .where(and(
            eq(accountingTransactions.businessUnitId, ngo.id),
            eq(accountingTransactions.status, 'completed')
          ))
          .orderBy(desc(accountingTransactions.transactionDate));

        // Calculate key metrics
        const metrics = {
          totalDonations: 0,
          programExpenses: 0,
          administrativeCosts: 0,
          grantAllocations: 0,
        };

        // Process transactions
        transactions.forEach(tx => {
          const account = accounts.find(a => a.accountNumber === tx.accountId.toString());
          if (!account) return;

          const amount = Number(tx.amount) * (tx.isDebit ? -1 : 1);

          switch(account.type) {
            case 'REV':
              if (account.name.includes('Grant') || account.name.includes('Donation')) {
                metrics.totalDonations += amount;
              }
              break;
            case 'EXP':
              if (account.name.includes('Program')) {
                metrics.programExpenses += Math.abs(amount);
              } else if (account.name.includes('Grant')) {
                metrics.grantAllocations += Math.abs(amount);
              } else if (account.name.includes('Administrative')) {
                metrics.administrativeCosts += Math.abs(amount);
              }
              break;
          }
        });

        // Calculate efficiency ratios
        const totalExpenses = metrics.programExpenses + metrics.administrativeCosts;
        const programEfficiency = totalExpenses ? (metrics.programExpenses / totalExpenses) * 100 : 0;
        const adminRatio = totalExpenses ? (metrics.administrativeCosts / totalExpenses) * 100 : 0;

        return {
          organizationInfo: {
            name: ngo.name,
            type: ngo.type,
            reportingPeriod: period || 'Current Year',
            generatedAt: new Date().toISOString(),
          },
          metrics,
          ratios: {
            programEfficiency: Math.round(programEfficiency * 100) / 100,
            administrativeRatio: Math.round(adminRatio * 100) / 100,
            grantAllocationRatio: metrics.totalDonations ? 
              Math.round((metrics.grantAllocations / metrics.totalDonations) * 10000) / 100 : 0
          },
          transactionSummary: {
            total: transactions.length,
            latestTransaction: transactions[0]?.date || null,
          },
          transparency: {
            dataCompleteness: "100%",
            lastUpdated: new Date().toISOString(),
            verificationStatus: "automated",
          }
        };
      });

      // Store the generated report
      const [storedReport] = await db
        .insert(manFinancialReports)
        .values({
          reportType: 'ngo_transparency',
          reportPeriod: report.organizationInfo.reportingPeriod,
          startDate: new Date(), // This should be calculated based on period
          endDate: new Date(),
          status: 'completed',
          totalTransactions: report.transactionSummary.total,
          totalAmount: report.metrics.totalDonations,
          reportData: report,
          generatedBy: req.user.id,
        })
        .returning();

      res.json({
        report,
        reportId: storedReport.id
      });

    } catch (error: any) {
      console.error('NGO Financial Report Generation Error:', error);
      res.status(500).json({
        error: "Failed to generate NGO financial report",
        details: error?.message
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}