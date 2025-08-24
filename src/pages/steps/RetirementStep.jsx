import React from "react";
import { useNavigate } from "react-router-dom";
import { StepWrapper, DollarInput } from "@/components";
import { useScenarioStore } from "@/store/scenarioStore";
import { z } from "zod";

const schema = z.object({
  iraContributions: z.number().nonnegative("IRA must be zero or more"),
  employer401k: z.number().nonnegative("401(k) must be zero or more"),
});

const RetirementStep = () => {
  const navigate = useNavigate();
  const { scenario, setScenario } = useScenarioStore();

  const [iraContributions, setIra] = React.useState(0);
  const [employer401k, set401k] = React.useState(0);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    const existing = scenario?.deductions?.retirement?.[0];
    if (existing) {
      setIra(existing.iraContributions || 0);
      set401k(existing.employer401k || 0);
    }
  }, [scenario]);

  const onSubmit = () => {
    const parsed = schema.safeParse({ iraContributions, employer401k });

    if (!parsed.success) {
      const formatted = parsed.error.format();
      setErrors({
        iraContributions: formatted.iraContributions?._errors?.[0],
        employer401k: formatted.employer401k?._errors?.[0],
      });
      return;
    }

    const updatedScenario = {
      ...scenario,
      deductions: {
        ...scenario.deductions,
        retirement: [
          {
            iraContributions,
            employer401k,
          },
        ],
      },
    };

    setScenario(updatedScenario);
    navigate("/steps/credits");
  };

  return (
    <StepWrapper title="Retirement Contributions">
      <DollarInput
        label="IRA Contributions"
        value={iraContributions}
        onChange={setIra}
        error={errors.iraContributions}
      />
      <DollarInput
        label="401(k) Contributions"
        value={employer401k}
        onChange={set401k}
        error={errors.employer401k}
      />

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/steps/education")}
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

export default RetirementStep;