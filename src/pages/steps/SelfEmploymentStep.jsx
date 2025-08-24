import React from "react";
import { useNavigate } from "react-router-dom";
import { StepWrapper, TextInput, DollarInput } from "@/components";
import { useScenarioStore } from "@/store/scenarioStore";
import { z } from "zod";

const schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  grossIncome: z.number().nonnegative("Income must be zero or more"),
  expenses: z.number().min(0, "Expenses cannot be negative"),
});

const SelfEmploymentStep = () => {
  const navigate = useNavigate();
  const { scenario, setScenario } = useScenarioStore();

  const [businessName, setBusinessName] = React.useState("");
  const [grossIncome, setGrossIncome] = React.useState(0);
  const [expenses, setExpenses] = React.useState(0);
  const [errors, setErrors] = React.useState({});

  // Load existing values if present
  React.useEffect(() => {
    const existing = scenario?.income?.selfEmployment?.[0];
    if (existing) {
      setBusinessName(existing.businessName || "");
      setGrossIncome(existing.grossIncome || 0);
      setExpenses(existing.expenses || 0);
    }
  }, [scenario]);

  const onSubmit = () => {
    const parsed = schema.safeParse({ businessName, grossIncome, expenses });

    if (!parsed.success) {
      const formatted = parsed.error.format();
      setErrors({
        businessName: formatted.businessName?._errors?.[0],
        grossIncome: formatted.grossIncome?._errors?.[0],
        expenses: formatted.expenses?._errors?.[0],
      });
      return;
    }

    const updatedScenario = {
      ...scenario,
      income: {
        ...scenario.income,
        selfEmployment: [
          {
            businessName,
            grossIncome,
            expenses,
          },
        ],
      },
    };

    setScenario(updatedScenario);
    navigate("/steps/investments"); // 👈 next step in flow
  };

  return (
    <StepWrapper title="Self-Employment Income">
      <TextInput
        label="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        error={errors.businessName}
      />
      <DollarInput
        label="Gross Income"
        value={grossIncome}
        onChange={(val) => setGrossIncome(val)}
        error={errors.grossIncome}
      />
      <DollarInput
        label="Expenses"
        value={expenses}
        onChange={(val) => setExpenses(val)}
        error={errors.expenses}
      />

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition font-medium"
          onClick={() => navigate("/steps/w2")}
        >
          Back
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-brand-600 text-white hover:opacity-90 transition font-medium"
          onClick={onSubmit}
        >
          Continue
        </button>
      </div>
    </StepWrapper>
  );
};

export default SelfEmploymentStep;