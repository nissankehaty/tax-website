import { z } from "zod";

export const scenarioSchema = z.object({
  metadata: z.object({
    filingStatus: z.string().min(1, "Filing status is required"),
    taxYear: z.number().int().min(2000),
    name: z.string().optional(),
  }),
  income: z.object({
    w2: z.array(z.any()),
    selfEmployment: z.array(z.any()),
    investments: z.array(z.any()),
    rentals: z.array(z.object({
      location: z.string().min(1, "Location is required"),
      income: z.number(),
      expenses: z.number(),
    }).optional()),
  }),
  deductions: z.object({
    education: z.array(z.any()),
    retirement: z.array(z.any()),
    health: z.array(z.any()),
    other: z.array(z.any()),
  }),
  credits: z.object({
    childTaxCredit: z.number(),
    earnedIncomeCredit: z.number(),
    otherCredits: z.array(z.any()),
  }),
  results: z.object({
    estimatedTaxDue: z.number(),
    refund: z.number(),
    effectiveTaxRate: z.number(),
  }),
});