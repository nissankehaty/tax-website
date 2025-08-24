import React from "react";
import { useNavigate } from "react-router-dom";
import { StepWrapper, DollarInput } from "@/components";
import { useScenarioStore } from "@/store/scenarioStore";
import { z } from "zod";

const schema = z.object({
  childTaxCredit: z.number().nonnegative("Must be zero or more"),
  earnedIncomeCredit: z.number().nonnegative("Must be zero or more"),
});

const CreditsStep = () => {
  const navigate = useNavigate();
  const { scenario, setScenario } = useScenarioStore();

  const [childTaxCredit, setCTC] = React.useState(0);
  const [earnedIncomeCredit, setEIC] = React.useState(0);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    const existing = scenario?.credits;
    if (existing) {
      setCTC(existing.childTaxCredit || 0);
      setEIC(existing.earnedIncomeCredit || 0);
    }
  }, [scenario]);

  const onSubmit = () => {
    const parsed = schema.safeParse({ childTaxCredit, earnedIncomeCredit });

    if (!parsed.success) {
      const formatted = parsed.error.format();
      setErrors({
        childTaxCredit: formatted.childTaxCredit?._errors?.[0],
        earnedIncomeCredit: formatted.earnedIncomeCredit?._errors?.[0],
      });
      return;
    }

    const updatedScenario = {
      ...scenario,
      credits: {
        childTaxCredit,
        earnedIncomeCredit,
        otherCredits: [],
      },
    };

    setScenario(updatedScenario);
    navigate("/steps/summary");
  };

  return (
    <StepWrapper title="Credits">
      <DollarInput
        label="Child Tax Credit"
        value={childTaxCredit}
        onChange={setCTC}
        error={errors.childTaxCredit}
      />
      <DollarInput
        label="Earned Income Credit"
        value={earnedIncomeCredit}
        onChange={setEIC}
        error={errors.earnedIncomeCredit}
      />

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/steps/retirement")}
          className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded-xl bg-brand-600 text-white hover:opacity-90 transition"
        >
          Continue
        </button>
      </div>
    </StepWrapper>
  );
};

export default CreditsStep;