import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { techCompanies, privacyCases, taxDonations } from "@db/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";
import Stripe from "stripe";
import { nanoid } from "nanoid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export function registerRoutes(app: Express): Server {
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

  app.get("/api/privacy-cases", async (req, res) => {
    try {
      const { status, companyId } = req.query;

      let query = db.select().from(privacyCases);

      if (status) {
        query = query.where(eq(privacyCases.status, status as string));
      }

      if (companyId) {
        query = query.where(eq(privacyCases.companyId, parseInt(companyId as string)));
      }

      const cases = await query.orderBy(desc(privacyCases.filingDate));
      res.json(cases);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch privacy cases" });
    }
  });

  app.get("/api/tax-donations", async (req, res) => {
    try {
      const { companyId, startDate, endDate } = req.query;

      let query = db.select().from(taxDonations);

      if (companyId) {
        query = query.where(eq(taxDonations.companyId, parseInt(companyId as string)));
      }

      if (startDate && endDate) {
        query = query.where(
          and(
            gte(taxDonations.donationDate, new Date(startDate as string)),
            lte(taxDonations.donationDate, new Date(endDate as string))
          )
        );
      }

      const donations = await query.orderBy(desc(taxDonations.donationDate));
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tax donations" });
    }
  });

  // Services endpoints
  app.get("/api/services", async (_req, res) => {
    try {
      const allServices = await db.select().from(services);
      res.json(allServices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Appointment endpoints
  app.post("/api/appointments", async (req, res) => {
    try {
      const { userId, serviceId, scheduledFor, notes } = req.body;
      const [appointment] = await db
        .insert(appointments)
        .values({
          userId,
          serviceId,
          scheduledFor: new Date(scheduledFor),
          notes,
        })
        .returning();
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create appointment" });
    }
  });

  app.get("/api/appointments/:userId", async (req, res) => {
    try {
      const userAppointments = await db
        .select()
        .from(appointments)
        .where(eq(appointments.userId, parseInt(req.params.userId)));
      res.json(userAppointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });

  // Gift card endpoints
  app.post("/api/gift-cards", async (req, res) => {
    try {
      const { amount, purchasedBy } = req.body;
      const [giftCard] = await db
        .insert(giftCards)
        .values({
          code: nanoid(10),
          amount,
          balance: amount,
          purchasedBy,
          isActive: true,
        })
        .returning();
      res.json(giftCard);
    } catch (error) {
      res.status(500).json({ error: "Failed to create gift card" });
    }
  });

  app.post("/api/gift-cards/redeem", async (req, res) => {
    try {
      const { code, userId } = req.body;
      const [giftCard] = await db
        .select()
        .from(giftCards)
        .where(
          and(
            eq(giftCards.code, code),
            eq(giftCards.isActive, true),
            gte(giftCards.balance, 0)
          )
        );

      if (!giftCard) {
        return res.status(404).json({ error: "Invalid or expired gift card" });
      }

      const [updatedGiftCard] = await db
        .update(giftCards)
        .set({
          redeemedBy: userId,
          isActive: false,
        })
        .where(eq(giftCards.id, giftCard.id))
        .returning();

      res.json(updatedGiftCard);
    } catch (error) {
      res.status(500).json({ error: "Failed to redeem gift card" });
    }
  });

  // Membership endpoints
  app.get("/api/memberships/:userId", async (req, res) => {
    try {
      const userMemberships = await db
        .select()
        .from(memberships)
        .where(eq(memberships.userId, parseInt(req.params.userId)));
      res.json(userMemberships);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch memberships" });
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

  const httpServer = createServer(app);
  return httpServer;
}