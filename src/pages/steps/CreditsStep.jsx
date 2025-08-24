// 📄 src/pages/steps/CreditsStep.jsx
import React from "react";
import { StepWrapper } from "@/components";
import { useScenarioStore } from "@/store/scenarioStore";

export default function CreditsStep() {
  const { scenario, setScenario } = useScenarioStore();

  const educationCredits = scenario?.credits?.education ?? false;

  const toggleCredit = () => {
    setScenario({
      ...scenario,
      credits: {
        ...scenario.credits,
        education: !educationCredits,
      },
    });
  };

  return (
    <StepWrapper title="Tax Credits">
      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={educationCredits}
          onChange={toggleCredit}
        />
        Claim education credit
      </label>
    </StepWrapper>
  );
}