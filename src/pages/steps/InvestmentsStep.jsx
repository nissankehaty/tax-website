// 📄 src/pages/steps/InvestmentsStep.jsx
import React from "react";
import { StepWrapper, DollarInput } from "@/components";
import { useScenarioStore } from "@/store/scenarioStore";

export default function InvestmentsStep() {
  const { scenario, setScenario } = useScenarioStore();

  const capitalGains = scenario?.income?.investments?.capitalGains ?? 0;
  const dividends = scenario?.income?.investments?.dividends ?? 0;

  const updateInvestments = (field, value) => {
    setScenario({
      ...scenario,
      income: {
        ...scenario.income,
        investments: {
          ...scenario.income?.investments,
          [field]: value,
        },
      },
    });
  };

  return (
    <StepWrapper title="Investment Income">
      <DollarInput
        label="Capital Gains"
        value={capitalGains}
        onChange={(val) => updateInvestments("capitalGains", val)}
      />
      <DollarInput
        label="Dividends"
        value={dividends}
        onChange={(val) => updateInvestments("dividends", val)}
      />
    </StepWrapper>
  );
}