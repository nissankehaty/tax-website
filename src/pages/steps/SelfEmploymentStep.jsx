// 📄 src/pages/steps/SelfEmploymentStep.jsx
import React from "react";
import { StepWrapper, DollarInput, TextInput } from "@/components";
import { useScenarioStore } from "@/store/scenarioStore";

export default function SelfEmploymentStep() {
  const { scenario, setScenario } = useScenarioStore();

  const business = scenario?.income?.selfEmployment?.[0] ?? {
    description: "",
    netIncome: 0,
  };

  const updateBusiness = (field, value) => {
    const updated = [{ ...business, [field]: value }];
    setScenario({
      ...scenario,
      income: {
        ...scenario.income,
        selfEmployment: updated,
      },
    });
  };

  return (
    <StepWrapper title="Self-Employment">
      <TextInput
        label="Business Description"
        value={business.description}
        onChange={(val) => updateBusiness("description", val)}
      />
      <DollarInput
        label="Net Income"
        value={business.netIncome}
        onChange={(val) => updateBusiness("netIncome", val)}
      />
    </StepWrapper>
  );
}