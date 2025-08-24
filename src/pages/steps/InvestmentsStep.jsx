import React from "react";
import { useNavigate } from "react-router-dom";
import { StepWrapper, TextInput, DollarInput } from "@/components";
import { useScenarioStore } from "@/store/scenarioStore";
import { z } from "zod";

const schema = z.object({
  investmentType: z.string().min(1, "Investment type is required"),
  capitalGains: z.number(),
  dividends: z.number().nonnegative("Dividends must be zero or more"),
});

const InvestmentStep = () => {
  const navigate = useNavigate();
  const { scenario, setScenario } = useScenarioStore();

  const [investmentType, setInvestmentType] = React.useState("");
  const [capitalGains, setCapitalGains] = React.useState(0);
  const [dividends, setDividends] = React.useState(0);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    const existing = scenario?.income?.investments?.[0];
    if (existing) {
      setInvestmentType(existing.investmentType || "");
      setCapitalGains(existing.capitalGains || 0);
      setDividends(existing.dividends || 0);
    }
  }, [scenario]);

  const onSubmit = () => {
    const parsed = schema.safeParse({ investmentType, capitalGains, dividends });

    if (!parsed.success) {
      const formatted = parsed.error.format();
      setErrors({
        investmentType: formatted.investmentType?._errors?.[0],
        capitalGains: formatted.capitalGains?._errors?.[0],
        dividends: formatted.dividends?._errors?.[0],
      });
      return;
    }

    const updatedScenario = {
      ...scenario,
      income: {
        ...scenario.income,
        investments: [
          {
            investmentType,
            capitalGains,
            dividends,
          },
        ],
      },
    };

    setScenario(updatedScenario);
    navigate("/steps/rentals"); // 🔜 Next step (or summary)
  };

  return (
    <StepWrapper title="Investment Income">
      <TextInput
        label="Investment Type"
        value={investmentType}
        onChange={(e) => setInvestmentType(e.target.value)}
        error={errors.investmentType}
      />
      <DollarInput
        label="Capital Gains (can be negative)"
        value={capitalGains}
        onChange={(val) => setCapitalGains(val)}
        error={errors.capitalGains}
        allowNegative={true}
      />
      <DollarInput
        label="Dividends"
        value={dividends}
        onChange={(val) => setDividends(val)}
        error={errors.dividends}
      />

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition font-medium"
          onClick={() => navigate("/steps/self-employment")}
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

export default InvestmentStep;