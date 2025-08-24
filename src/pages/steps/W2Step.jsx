import React from "react";
import { StepWrapper, TextInput, DollarInput } from "@/components";
import { useScenarioStore } from "@/store/scenarioStore"; // update this if your store path differs
import { useNavigate } from "react-router-dom";

const W2Step = () => {
  const navigate = useNavigate();
  const { scenario, setScenario } = useScenarioStore();

  const w2 = scenario.income?.w2 || {
    employerName: "",
    wages: "",
    fedWithheld: "",
    ssWages: "",
    ssTax: "",
  };

  const update = (field, value) => {
    const updated = { ...w2, [field]: value };
    setScenario({
      ...scenario,
      income: { ...scenario.income, w2: updated },
    });
  };

  return (
    <StepWrapper
      title="W-2 Income"
      description="Enter your wage and tax info from your W‑2 form."
    >
      <TextInput
        label="Employer Name"
        name="employerName"
        value={w2.employerName}
        onChange={(val) => update("employerName", val)}
      />
      <DollarInput
        label="Wages, Tips, Compensation (Box 1)"
        name="wages"
        value={w2.wages}
        onChange={(val) => update("wages", val)}
      />
      <DollarInput
        label="Federal Income Tax Withheld (Box 2)"
        name="fedWithheld"
        value={w2.fedWithheld}
        onChange={(val) => update("fedWithheld", val)}
      />
      <DollarInput
        label="Social Security Wages (Box 3)"
        name="ssWages"
        value={w2.ssWages}
        onChange={(val) => update("ssWages", val)}
      />
      <DollarInput
        label="Social Security Tax Withheld (Box 4)"
        name="ssTax"
        value={w2.ssTax}
        onChange={(val) => update("ssTax", val)}
      />

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/income-overview")}
          className="px-4 py-2 rounded bg-gray-200 text-gray-800"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/self-employment")}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Next
        </button>
      </div>
    </StepWrapper>
  );
};

export default W2Step;