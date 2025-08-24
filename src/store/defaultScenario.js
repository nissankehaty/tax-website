export const defaultScenario = {
  metadata: {
    filingStatus: "",
    taxYear: 2025,
    name: "",
  },
  income: {
    w2: [],
    selfEmployment: [],
    investments: [],
    rentals: [],
  },
  deductions: {
    education: [],
    retirement: [],
    health: [],
    other: [],
  },
  credits: {
    childTaxCredit: 0,
    earnedIncomeCredit: 0,
    otherCredits: [],
  },
  results: {
    estimatedTaxDue: 0,
    refund: 0,
    effectiveTaxRate: 0,
  },
};