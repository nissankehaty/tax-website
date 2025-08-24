import React from "react";
import { Link } from "react-router-dom";
import { useScenarioStore } from "../store/scenarioStore";

export default function Home() {
  const { scenario, setScenario, resetScenario } = useScenarioStore(); // 🔁 added resetScenario

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white shadow-soft p-4">
        <h1 className="text-2xl font-bold text-slate-800">Welcome</h1>
        <p className="text-slate-600 mt-2">
          This is your personal tax preparation assistant. Start a new scenario
          to capture your 2025 taxes, or load an existing draft from your disk.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            to="/scenario/new"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium bg-brand-600 text-white hover:opacity-95 transition"
          >
            Create New Scenario
          </Link>
          <Link
            to="/scenario/load"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium bg-transparent text-brand-700 hover:bg-brand-50 transition"
          >
            Load Scenario
          </Link>
        </div>
      </section>

      {/* === Optional Test Section === */}
      <section className="rounded-2xl bg-white shadow-soft p-4">
        <h2 className="text-xl font-semibold text-slate-800">Schema / Store Test</h2>
        <p className="text-slate-600 mt-2">
          Filing status in store:&nbsp;
          <b>{scenario?.metadata?.filingStatus ?? "Not set"}</b>
        </p>

        <button
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium bg-brand-600 text-white hover:opacity-95 transition mt-3"
          onClick={() =>
            setScenario({ metadata: { filingStatus: "married_filing_separately" } })
          }
        >
          Toggle to MFS
        </button>

        <button
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium bg-red-600 text-white hover:bg-red-700 transition mt-3 ml-3"
          onClick={resetScenario}
        >
          Reset Scenario
        </button>
      </section>
    </div>
  );
}