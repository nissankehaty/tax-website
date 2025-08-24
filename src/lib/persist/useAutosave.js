import React from "react";
import { useScenarioStore } from "../../store/scenarioStore";

const KEY = "tax_scenario_autosave_v1";

export function useAutosaveScenario() {
  const { scenario, setScenario } = useScenarioStore();

  // load once on mount
  React.useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setScenario(parsed);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save on change (debounced)
  React.useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(KEY, JSON.stringify(scenario));
    }, 300);
    return () => clearTimeout(id);
  }, [scenario]);
}