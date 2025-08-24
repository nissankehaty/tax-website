// src/lib/schemas/taxScenario.js
import { z } from "zod";

/** Basic shared types */
export const FilingStatus = z.enum(["single","married_filing_jointly","married_filing_separately","head_of_household","qualifying_widow"]);
export const Currency = z.number().nonnegative().finite().default(0);

/** W-2 wages (supports multiple jobs/spouses) */
export const W2Schema = z.object({
  employerName: z.string().min(1),
  wages: Currency,                 // Box 1
  federalWithholding: Currency,    // Box 2
  socialSecurityWages: Currency.optional(),
  socialSecurityTaxWithheld: Currency.optional(),
  medicareWages: Currency.optional(),
  medicareTaxWithheld: Currency.optional(),
  preTax401k: Currency.default(0), // employee contributions (traditional)
  roth401k: Currency.default(0),
  hsaContribViaPayroll: Currency.default(0),
  box12: z.record(z.string(), Currency).default({}), // optional other codes
});

/** Self-employment (Schedule C-lite; you can expand later) */
export const SelfEmploymentSchema = z.object({
  description: z.string().min(1),
  grossIncome: Currency,
  expenses: Currency.default(0),
  homeOfficeDeduction: Currency.default(0),
  seHealthInsurance: Currency.default(0),
});

/** Rental (Schedule E) */
export const RentalSchema = z.object({
  propertyName: z.string().min(1),
  location: z.string().min(1),
  daysRented: z.number().int().min(0),
  personalUseDays: z.number().int().min(0).default(0),
  grossRent: Currency,
  expenses: z.object({
    mortgageInterest: Currency.default(0),
    propertyTax: Currency.default(0),
    insurance: Currency.default(0),
    repairs: Currency.default(0),
    hoa: Currency.default(0),
    managementFees: Currency.default(0),
    utilities: Currency.default(0),
    depreciation: Currency.default(0), // can compute later
    other: Currency.default(0),
  }).default({}),
  activeParticipation: z.boolean().default(true),
});

/** Investments (Schedule D / B) */
export const InvestmentIncomeSchema = z.object({
  qualifiedDividends: Currency.default(0),
  ordinaryDividends: Currency.default(0),
  shortTermGains: Currency.default(0),
  longTermGains: Currency.default(0),
  capitalLossCarryover: Currency.default(0),
  interestIncome: Currency.default(0),
  cryptoGains: Currency.default(0),
});

/** Above-the-line & deductions */
export const AdjustmentsSchema = z.object({
  iraTraditionalContrib: Currency.default(0),
  hsaContribDirect: Currency.default(0), // outside payroll
  studentLoanInterest: Currency.default(0),
  educatorExpenses: Currency.default(0),
});

export const ItemizedDeductionsSchema = z.object({
  mortgageInterest: Currency.default(0),
  stateLocalTax: Currency.default(0), // SALT (cap applied later)
  charitableCash: Currency.default(0),
  charitableNonCash: Currency.default(0),
  medicalExpenses: Currency.default(0), // AGI threshold applied later
  other: Currency.default(0),
  useItemized: z.boolean().default(false), // if false -> standard deduction
});

/** Credits */
export const CreditsSchema = z.object({
  childTaxCreditDependents: z.number().int().min(0).default(0),
  educationCreditEligible: z.boolean().default(false),
  premiumTaxCreditEligible: z.boolean().default(false),
  otherNonrefundable: Currency.default(0),
  otherRefundable: Currency.default(0),
});

/** Insurance / retirement meta (for guidance) */
export const InsuranceRetirementSchema = z.object({
  healthInsuranceAnnualPremiums: Currency.default(0),
  dentalVisionPremiums: Currency.default(0),
  longTermDisabilityPremiums: Currency.default(0),
  _notes: z.string().optional(), // free-form notes
});

/** Taxpayer profile */
export const TaxpayerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  ssnLast4: z.string().regex(/^[0-9]{4}$/).optional(),
  birthYear: z.number().int().min(1900).max(2100).optional(),
});

/** Top-level Scenario */
export const TaxScenarioSchema = z.object({
  metadata: z.object({
    scenarioName: z.string().min(1),
    taxYear: z.number().int().min(2020).max(2100),
    createdAt: z.string().default(() => new Date().toISOString()),
    updatedAt: z.string().default(() => new Date().toISOString()),
    filingStatus: FilingStatus,
    dependents: z.number().int().min(0).default(0),
  }),
  taxpayers: z.object({
    primary: TaxpayerSchema,
    spouse: TaxpayerSchema.optional(), // present if MFJ/MFS
  }),
  income: z.object({
    w2s: z.array(W2Schema).default([]),
    selfEmployment: z.array(SelfEmploymentSchema).default([]),
    rentals: z.array(RentalSchema).default([]),
    investments: InvestmentIncomeSchema.default({}),
    otherIncome: Currency.default(0),
  }),
  deductions: z.object({
    adjustments: AdjustmentsSchema.default({}),
    itemized: ItemizedDeductionsSchema.default({}),
    retirementEmployerMatch: Currency.default(0), // informational for guidance
  }),
  credits: CreditsSchema.default({}),
  insuranceRetirement: InsuranceRetirementSchema.default({}),
  notes: z.string().optional(),
});

/** A convenient JS object you can use to start a fresh scenario */
export const initialScenario = {
  metadata: {
    scenarioName: "My 2025 Draft",
    taxYear: 2025,
    filingStatus: "married_filing_jointly",
    dependents: 0,
  },
  taxpayers: {
    primary: { firstName: "Nissan", lastName: "Kehaty" },
    spouse: { firstName: "Angela", lastName: "Kehaty" },
  },
  income: {
    w2s: [],
    selfEmployment: [],
    rentals: [],
    investments: {},
    otherIncome: 0,
  },
  deductions: {
    adjustments: {},
    itemized: { useItemized: false },
    retirementEmployerMatch: 0,
  },
  credits: {},
  insuranceRetirement: {},
  notes: "",
};