import { 
  pgTable, 
  serial, 
  text, 
  timestamp, 
  boolean,
  integer,
  jsonb,
  decimal,
  date 
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  walletAddress: text("wallet_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(),
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at"),
  metadata: jsonb("metadata"),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description"),
  features: jsonb("features"),
  price: integer("price"),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  serviceId: integer("service_id").references(() => services.id),
  scheduledFor: timestamp("scheduled_for").notNull(),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const giftCards = pgTable("gift_cards", {
  id: serial("id").primaryKey(),
  code: text("code").unique().notNull(),
  amount: integer("amount").notNull(),
  balance: integer("balance").notNull(),
  purchasedBy: integer("purchased_by").references(() => users.id),
  redeemedBy: integer("redeemed_by").references(() => users.id),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const techCompanies = pgTable("tech_companies", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description"),
  website: text("website"),
  transparencyScore: decimal("transparency_score", { precision: 4, scale: 2 }),
  privacyScore: decimal("privacy_score", { precision: 4, scale: 2 }),
  lastUpdated: timestamp("last_updated").defaultNow(),
  metadata: jsonb("metadata"),
});

export const privacyCases = pgTable("privacy_cases", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => techCompanies.id),
  caseNumber: text("case_number").unique().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull(),
  filingDate: date("filing_date"),
  settlementAmount: decimal("settlement_amount", { precision: 15, scale: 2 }),
  courtDetails: jsonb("court_details"),
  documents: jsonb("documents"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const taxDonations = pgTable("tax_donations", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => techCompanies.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  donationDate: date("donation_date").notNull(),
  purpose: text("purpose"),
  beneficiary: text("beneficiary"),
  verificationStatus: text("verification_status").notNull(),
  verificationDetails: jsonb("verification_details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cryptoTransactions = pgTable("crypto_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id").notNull(),
  status: text("status").notNull().default("pending"),
  sourceAmount: decimal("source_amount", { precision: 15, scale: 2 }),
  sourceCurrency: text("source_currency"),
  destinationAmount: decimal("destination_amount", { precision: 15, scale: 8 }),
  destinationCurrency: text("destination_currency"),
  network: text("network"),
  walletAddress: text("wallet_address"),
  customerEmail: text("customer_email"),
  customerName: text("customer_name"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const educationalContent = pgTable("educational_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  moduleId: text("module_id").notNull(),
  topicId: text("topic_id").notNull(),
  content: jsonb("content").notNull(),
  type: text("type").notNull(), 
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  metadata: jsonb("metadata"),
});

export const learningProgress = pgTable("learning_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  moduleId: text("module_id").notNull(),
  topicId: text("topic_id").notNull(),
  progress: integer("progress").notNull(), 
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
  metadata: jsonb("metadata"),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertMembershipSchema = createInsertSchema(memberships);
export const selectMembershipSchema = createSelectSchema(memberships);
export const insertAppointmentSchema = createInsertSchema(appointments);
export const selectAppointmentSchema = createSelectSchema(appointments);
export const insertGiftCardSchema = createInsertSchema(giftCards);
export const selectGiftCardSchema = createSelectSchema(giftCards);
export const insertTechCompanySchema = createInsertSchema(techCompanies);
export const selectTechCompanySchema = createSelectSchema(techCompanies);
export const insertPrivacyCaseSchema = createInsertSchema(privacyCases);
export const selectPrivacyCaseSchema = createSelectSchema(privacyCases);
export const insertTaxDonationSchema = createInsertSchema(taxDonations);
export const selectTaxDonationSchema = createSelectSchema(taxDonations);
export const insertCryptoTransactionSchema = createInsertSchema(cryptoTransactions);
export const selectCryptoTransactionSchema = createSelectSchema(cryptoTransactions);
export const insertEducationalContentSchema = createInsertSchema(educationalContent);
export const selectEducationalContentSchema = createSelectSchema(educationalContent);
export const insertLearningProgressSchema = createInsertSchema(learningProgress);
export const selectLearningProgressSchema = createSelectSchema(learningProgress);

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertMembership = typeof memberships.$inferInsert;
export type SelectMembership = typeof memberships.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;
export type SelectAppointment = typeof appointments.$inferSelect;
export type InsertGiftCard = typeof giftCards.$inferInsert;
export type SelectGiftCard = typeof giftCards.$inferSelect;
export type InsertTechCompany = typeof techCompanies.$inferInsert;
export type SelectTechCompany = typeof techCompanies.$inferSelect;
export type InsertPrivacyCase = typeof privacyCases.$inferInsert;
export type SelectPrivacyCase = typeof privacyCases.$inferSelect;
export type InsertTaxDonation = typeof taxDonations.$inferInsert;
export type SelectTaxDonation = typeof taxDonations.$inferSelect;
export type InsertCryptoTransaction = typeof cryptoTransactions.$inferInsert;
export type SelectCryptoTransaction = typeof cryptoTransactions.$inferSelect;
export type InsertEducationalContent = typeof educationalContent.$inferInsert;
export type SelectEducationalContent = typeof educationalContent.$inferSelect;
export type InsertLearningProgress = typeof learningProgress.$inferInsert;
export type SelectLearningProgress = typeof learningProgress.$inferSelect;