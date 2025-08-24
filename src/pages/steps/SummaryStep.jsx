import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StepWrapper } from "@/components";
import { useScenarioStore } from "@/store/scenarioStore";
import { saveScenarioToFile, loadScenarioFromFile } from "../../lib/utils/fileHelpers";

const SummaryStep = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { scenario, setScenario } = useScenarioStore();

  const handleSave = () => {
    saveScenarioToFile(scenario);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const loaded = await loadScenarioFromFile(file);
      setScenario(loaded);
      alert("Scenario loaded successfully.");
    } catch (err) {
      alert("Failed to load scenario. Invalid file.");
    }
  };

  return (
    <StepWrapper title="Summary & Review">
      {/* ...existing summary content... */}

      <div className="flex flex-wrap gap-4 mt-8">
        <button
          className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition"
          onClick={() => navigate("/steps/credits")}
        >
          Back
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-green-600 text-white hover:opacity-90 transition"
          onClick={handleSave}
        >
          Save to File
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:opacity-90 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          Load from File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept=".json"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </StepWrapper>
  );
};

export default SummaryStep;