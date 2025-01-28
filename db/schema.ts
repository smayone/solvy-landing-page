import { 
  pgTable, 
  serial, 
  text, 
  timestamp, 
  boolean,
  integer,
  jsonb,
  decimal,
  date,
  foreignKey
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
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

export const taxRepatriations = pgTable("tax_repatriations", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => techCompanies.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  filingDate: date("filing_date").notNull(),
  processingDate: date("processing_date"),
  privacyCaseId: integer("privacy_case_id").references(() => privacyCases.id),
  destinationCountry: text("destination_country").notNull(),
  purposeDescription: text("purpose_description"),
  verificationStatus: text("verification_status").notNull().default("pending"),
  verificationDetails: jsonb("verification_details"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const companyAccess = pgTable("company_access", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  companyId: integer("company_id").references(() => techCompanies.id),
  role: text("role").notNull(),
  accessLevel: text("access_level").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const manAuditLogs = pgTable("man_audit_logs", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull(), 
  entityId: text("entity_id").notNull(),
  action: text("action").notNull(),
  userId: integer("user_id").references(() => users.id),
  details: jsonb("details"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: jsonb("metadata"),
});

export const manTaxCalculations = pgTable("man_tax_calculations", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").notNull(),
  userId: integer("user_id").references(() => users.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  taxableAmount: decimal("taxable_amount", { precision: 15, scale: 2 }).notNull(),
  taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 15, scale: 2 }).notNull(),
  jurisdiction: text("jurisdiction").notNull(),
  taxType: text("tax_type").notNull(), 
  status: text("status").notNull().default("pending"),
  calculatedAt: timestamp("calculated_at").defaultNow(),
  validUntil: timestamp("valid_until"),
  stripeCalculationId: text("stripe_calculation_id"),
  metadata: jsonb("metadata"),
});

export const manFinancialReports = pgTable("man_financial_reports", {
  id: serial("id").primaryKey(),
  reportType: text("report_type").notNull(), 
  reportPeriod: text("report_period").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  status: text("status").notNull().default("pending"),
  totalTransactions: integer("total_transactions"),
  totalAmount: decimal("total_amount", { precision: 15, scale: 2 }),
  taxableAmount: decimal("taxable_amount", { precision: 15, scale: 2 }),
  totalTax: decimal("total_tax", { precision: 15, scale: 2 }),
  reportData: jsonb("report_data"),
  generatedBy: integer("generated_by").references(() => users.id),
  generatedAt: timestamp("generated_at").defaultNow(),
  metadata: jsonb("metadata"),
});

export const manAnalytics = pgTable("man_analytics", {
  id: serial("id").primaryKey(),
  metricName: text("metric_name").notNull(),
  metricValue: decimal("metric_value", { precision: 15, scale: 2 }),
  dimension: text("dimension"), 
  timeframe: text("timeframe").notNull(),
  category: text("category").notNull(), 
  source: text("source").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: jsonb("metadata"),
});

export const accountTypes = pgTable("account_types", {
  id: serial("id").primaryKey(),
  code: text("code").unique().notNull(),
  name: text("name").notNull(),
  description: text("description"),
});

export const chartOfAccounts = pgTable("chart_of_accounts", {
  id: serial("id").primaryKey(),
  accountNumber: text("account_number").unique().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  accountTypeId: integer("account_type_id").references(() => accountTypes.id),
  isActive: boolean("is_active").default(true),
  parentAccountId: integer("parent_account_id"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chartOfAccountsRelations = relations(chartOfAccounts, ({ one }) => ({
  parentAccount: one(chartOfAccounts, {
    fields: [chartOfAccounts.parentAccountId],
    references: [chartOfAccounts.id],
  }),
  accountType: one(accountTypes, {
    fields: [chartOfAccounts.accountTypeId],
    references: [accountTypes.id],
  }),
}));

export const businessUnits = pgTable("business_units", {
  id: serial("id").primaryKey(),
  code: text("code").unique().notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'retail', 'ngo', 'product', 'service'
  registrationNumber: text("registration_number"),
  taxId: text("tax_id"),
  isActive: boolean("is_active").default(true),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const accountingTransactions = pgTable("accounting_transactions", {
  id: serial("id").primaryKey(),
  transactionDate: timestamp("transaction_date").notNull(),
  postingDate: timestamp("posting_date").notNull(),
  businessUnitId: integer("business_unit_id").references(() => businessUnits.id),
  type: text("type").notNull(), // 'sale', 'purchase', 'transfer', 'adjustment'
  status: text("status").notNull().default("pending"),
  reference: text("reference"),
  description: text("description"),
  metadata: jsonb("metadata"),
  createdBy: integer("created_by").references(() => users.id),
  approvedBy: integer("approved_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const accountingEntries = pgTable("accounting_entries", {
  id: serial("id").primaryKey(),
  transactionId: integer("transaction_id").references(() => accountingTransactions.id),
  accountId: integer("account_id").references(() => chartOfAccounts.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  isDebit: boolean("is_debit").notNull(),
  description: text("description"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const taxFilings = pgTable("tax_filings", {
  id: serial("id").primaryKey(),
  businessUnitId: integer("business_unit_id").references(() => businessUnits.id),
  period: text("period").notNull(), // e.g., '2024-Q1'
  type: text("type").notNull(), // 'income', 'sales', 'payroll'
  status: text("status").notNull().default("draft"),
  filingDate: timestamp("filing_date"),
  dueDate: timestamp("due_date").notNull(),
  taxableAmount: decimal("taxable_amount", { precision: 15, scale: 2 }),
  taxAmount: decimal("tax_amount", { precision: 15, scale: 2 }),
  jurisdiction: text("jurisdiction").notNull(),
  taxuallyReference: text("taxually_reference"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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
export const insertTaxRepatriationSchema = createInsertSchema(taxRepatriations);
export const selectTaxRepatriationSchema = createSelectSchema(taxRepatriations);
export const insertCompanyAccessSchema = createInsertSchema(companyAccess);
export const selectCompanyAccessSchema = createSelectSchema(companyAccess);
export const insertManAuditLogSchema = createInsertSchema(manAuditLogs);
export const selectManAuditLogSchema = createSelectSchema(manAuditLogs);
export const insertManTaxCalculationSchema = createInsertSchema(manTaxCalculations);
export const selectManTaxCalculationSchema = createSelectSchema(manTaxCalculations);
export const insertManFinancialReportSchema = createInsertSchema(manFinancialReports);
export const selectManFinancialReportSchema = createSelectSchema(manFinancialReports);
export const insertManAnalyticsSchema = createInsertSchema(manAnalytics);
export const selectManAnalyticsSchema = createSelectSchema(manAnalytics);

export const insertAccountTypeSchema = createInsertSchema(accountTypes);
export const selectAccountTypeSchema = createSelectSchema(accountTypes);
export const insertChartOfAccountSchema = createInsertSchema(chartOfAccounts);
export const selectChartOfAccountSchema = createSelectSchema(chartOfAccounts);
export const insertBusinessUnitSchema = createInsertSchema(businessUnits);
export const selectBusinessUnitSchema = createSelectSchema(businessUnits);
export const insertAccountingTransactionSchema = createInsertSchema(accountingTransactions);
export const selectAccountingTransactionSchema = createSelectSchema(accountingTransactions);
export const insertAccountingEntrySchema = createInsertSchema(accountingEntries);
export const selectAccountingEntrySchema = createSelectSchema(accountingEntries);
export const insertTaxFilingSchema = createInsertSchema(taxFilings);
export const selectTaxFilingSchema = createSelectSchema(taxFilings);

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
export type InsertTaxRepatriation = typeof taxRepatriations.$inferInsert;
export type SelectTaxRepatriation = typeof taxRepatriations.$inferSelect;
export type InsertCompanyAccess = typeof companyAccess.$inferInsert;
export type SelectCompanyAccess = typeof companyAccess.$inferSelect;
export type InsertManAuditLog = typeof manAuditLogs.$inferInsert;
export type SelectManAuditLog = typeof manAuditLogs.$inferSelect;
export type InsertManTaxCalculation = typeof manTaxCalculations.$inferInsert;
export type SelectManTaxCalculation = typeof manTaxCalculations.$inferSelect;
export type InsertManFinancialReport = typeof manFinancialReports.$inferInsert;
export type SelectManFinancialReport = typeof manFinancialReports.$inferSelect;
export type InsertManAnalytics = typeof manAnalytics.$inferInsert;
export type SelectManAnalytics = typeof manAnalytics.$inferSelect;

export type InsertAccountType = typeof accountTypes.$inferInsert;
export type SelectAccountType = typeof accountTypes.$inferSelect;
export type InsertChartOfAccount = typeof chartOfAccounts.$inferInsert;
export type SelectChartOfAccount = typeof chartOfAccounts.$inferSelect;
export type InsertBusinessUnit = typeof businessUnits.$inferInsert;
export type SelectBusinessUnit = typeof businessUnits.$inferSelect;
export type InsertAccountingTransaction = typeof accountingTransactions.$inferInsert;
export type SelectAccountingTransaction = typeof accountingTransactions.$inferSelect;
export type InsertAccountingEntry = typeof accountingEntries.$inferInsert;
export type SelectAccountingEntry = typeof accountingEntries.$inferSelect;
export type InsertTaxFiling = typeof taxFilings.$inferInsert;
export type SelectTaxFiling = typeof taxFilings.$inferSelect;


// Add new NGO-related tables
export const ngoFinancialReports = pgTable("ngo_financial_reports", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").references(() => businessUnits.id),
  reportingPeriod: text("reporting_period").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalDonations: decimal("total_donations", { precision: 15, scale: 2 }),
  totalExpenses: decimal("total_expenses", { precision: 15, scale: 2 }),
  programExpenses: decimal("program_expenses", { precision: 15, scale: 2 }),
  administrativeExpenses: decimal("administrative_expenses", { precision: 15, scale: 2 }),
  grantAllocations: decimal("grant_allocations", { precision: 15, scale: 2 }),
  impactMetrics: jsonb("impact_metrics"),
  verificationStatus: text("verification_status").notNull().default("pending"),
  verificationDetails: jsonb("verification_details"),
  blockchainHash: text("blockchain_hash"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  createdBy: integer("created_by").references(() => users.id),
});

export const ngoDonations = pgTable("ngo_donations", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").references(() => businessUnits.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  donationType: text("donation_type").notNull(), // one-time, recurring, grant
  donorName: text("donor_name"),
  donorEmail: text("donor_email"),
  donorWalletAddress: text("donor_wallet_address"),
  purpose: text("purpose"),
  isAnonymous: boolean("is_anonymous").default(false),
  transactionHash: text("transaction_hash"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ngoExpenses = pgTable("ngo_expenses", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").references(() => businessUnits.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  category: text("category").notNull(), // program, administrative, fundraising
  description: text("description").notNull(),
  beneficiary: text("beneficiary"),
  receiptUrl: text("receipt_url"),
  approvedBy: integer("approved_by").references(() => users.id),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const ngoGrants = pgTable("ngo_grants", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").references(() => businessUnits.id),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  grantName: text("grant_name").notNull(),
  description: text("description"),
  beneficiary: text("beneficiary").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  status: text("status").notNull().default("pending"),
  impactMetrics: jsonb("impact_metrics"),
  verificationStatus: text("verification_status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

// Add relations
export const ngoFinancialReportsRelations = relations(ngoFinancialReports, ({ one }) => ({
  organization: one(businessUnits, {
    fields: [ngoFinancialReports.organizationId],
    references: [businessUnits.id],
  }),
  creator: one(users, {
    fields: [ngoFinancialReports.createdBy],
    references: [users.id],
  }),
}));

export const ngoDonationsRelations = relations(ngoDonations, ({ one }) => ({
  organization: one(businessUnits, {
    fields: [ngoDonations.organizationId],
    references: [businessUnits.id],
  }),
}));

export const ngoExpensesRelations = relations(ngoExpenses, ({ one }) => ({
  organization: one(businessUnits, {
    fields: [ngoExpenses.organizationId],
    references: [businessUnits.id],
  }),
  approver: one(users, {
    fields: [ngoExpenses.approvedBy],
    references: [users.id],
  }),
}));

export const ngoGrantsRelations = relations(ngoGrants, ({ one }) => ({
  organization: one(businessUnits, {
    fields: [ngoGrants.organizationId],
    references: [businessUnits.id],
  }),
}));

// Add schemas for the new tables
export const insertNgoFinancialReportSchema = createInsertSchema(ngoFinancialReports);
export const selectNgoFinancialReportSchema = createSelectSchema(ngoFinancialReports);
export const insertNgoDonationSchema = createInsertSchema(ngoDonations);
export const selectNgoDonationSchema = createSelectSchema(ngoDonations);
export const insertNgoExpenseSchema = createInsertSchema(ngoExpenses);
export const selectNgoExpenseSchema = createSelectSchema(ngoExpenses);
export const insertNgoGrantSchema = createInsertSchema(ngoGrants);
export const selectNgoGrantSchema = createSelectSchema(ngoGrants);

// Add types for the new tables
export type InsertNgoFinancialReport = typeof ngoFinancialReports.$inferInsert;
export type SelectNgoFinancialReport = typeof ngoFinancialReports.$inferSelect;
export type InsertNgoDonation = typeof ngoDonations.$inferInsert;
export type SelectNgoDonation = typeof ngoDonations.$inferSelect;
export type InsertNgoExpense = typeof ngoExpenses.$inferInsert;
export type SelectNgoExpense = typeof ngoExpenses.$inferSelect;
export type InsertNgoGrant = typeof ngoGrants.$inferInsert;
export type SelectNgoGrant = typeof ngoGrants.$inferSelect;