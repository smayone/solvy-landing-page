import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { techCompanies, privacyCases, taxDonations } from "@db/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";
import Stripe from "stripe";

// Initialize stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export function registerRoutes(app: Express): Server {
  // Basic health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Tech Companies endpoints
  app.get("/api/tech-companies", async (_req, res) => {
    try {
      const companies = await db.select().from(techCompanies);
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tech companies" });
    }
  });

  app.get("/api/tech-companies/:id", async (req, res) => {
    try {
      const [company] = await db
        .select()
        .from(techCompanies)
        .where(eq(techCompanies.id, parseInt(req.params.id)));

      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }

      // Get related privacy cases
      const cases = await db
        .select()
        .from(privacyCases)
        .where(eq(privacyCases.companyId, company.id));

      // Get related tax donations
      const donations = await db
        .select()
        .from(taxDonations)
        .where(eq(taxDonations.companyId, company.id));

      res.json({
        ...company,
        privacyCases: cases,
        taxDonations: donations,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch company details" });
    }
  });

  // Privacy Cases endpoints
  app.get("/api/privacy-cases", async (req, res) => {
    try {
      const { status, companyId } = req.query;
      const query = db.select().from(privacyCases);

      if (status) {
        query.where(eq(privacyCases.status, status as string));
      }

      if (companyId) {
        query.where(eq(privacyCases.companyId, parseInt(companyId as string)));
      }

      const cases = await query.orderBy(desc(privacyCases.filingDate));
      res.json(cases);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch privacy cases" });
    }
  });

  // Tax Donations endpoints
  app.get("/api/tax-donations", async (req, res) => {
    try {
      const { companyId, startDate, endDate } = req.query;
      const query = db.select().from(taxDonations);

      if (companyId) {
        query.where(eq(taxDonations.companyId, parseInt(companyId as string)));
      }

      if (startDate && endDate) {
        query.where(
          and(
            gte(taxDonations.donationDate, startDate as string),
            lte(taxDonations.donationDate, endDate as string)
          )
        );
      }

      const donations = await query.orderBy(desc(taxDonations.donationDate));
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tax donations" });
    }
  });

  // Payment endpoints
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  });

  // Crypto Onramp endpoint
  app.post("/api/crypto/create-onramp-session", async (_req, res) => {
    try {
      const session = await stripe.crypto.onramp.sessions.create({
        wallet_addresses: {
          polygon: "0x...", // This should be dynamically set based on user's wallet
        },
        transaction_details: {
          supported_destination_networks: ["polygon"],
          supported_destination_currencies: ["usdc"],
        }
      });

      res.json({ clientSecret: session.client_secret });
    } catch (error) {
      res.status(500).json({ error: "Failed to create crypto onramp session" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}