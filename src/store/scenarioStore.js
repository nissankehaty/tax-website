import { create } from "zustand";
import { defaultScenario } from "./defaultScenario"; // ✅ updated path
import { scenarioSchema } from "../lib/schemas/scenarioSchema";

export const useScenarioStore = create((set) => ({
  scenario: defaultScenario,
  setScenario: (newScenario) => {
    const result = scenarioSchema.safeParse(newScenario);
    if (result.success) {
      set({ scenario: newScenario });
    } else {
      console.error("Invalid scenario object", result.error.format());
    }
  },
  resetScenario: () => set({ scenario: defaultScenario }),
}));