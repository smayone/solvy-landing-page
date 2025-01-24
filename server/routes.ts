import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { techCompanies, privacyCases, taxDonations, cryptoTransactions, educationalContent, learningProgress } from "@db/schema";
import { eq, desc } from "drizzle-orm";
import Stripe from "stripe";

// Initialize stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export function registerRoutes(app: Express): Server {
  // Basic health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
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
  app.get("/api/learning-path", async (req, res) => {
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
  app.post("/api/learning-progress", async (req, res) => {
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
  app.get("/api/crypto/transactions", async (req, res) => {
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
  app.post("/api/crypto/create-onramp-session", async (req, res) => {
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
  app.post("/api/crypto/webhook", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}