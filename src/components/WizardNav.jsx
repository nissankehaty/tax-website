import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { nextStepPath, prevStepPath, stepsConfig, stepIndexByPath } from "../lib/steps/config";


export default function WizardNav({ onNext }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const prev = prevStepPath(pathname);
  const next = nextStepPath(pathname);

  const index = stepIndexByPath(pathname);
  const displayIndex = index >= 0 ? index + 1 : 1;

  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        type="button"
        className="inline-flex items-center rounded-xl px-4 py-2 bg-transparent text-slate-700 hover:bg-brand-50 disabled:opacity-40"
        disabled={!prev}
        onClick={() => prev && navigate(prev)}
      >
        ← Back
      </button>

      <div className="text-sm text-slate-500">
        {displayIndex} / {stepsConfig.length}
      </div>

      <button
        type="button"
        className="inline-flex items-center rounded-xl px-4 py-2 bg-brand-600 text-white hover:opacity-95"
        onClick={async () => {
          if (onNext) {
            const ok = await onNext();
            if (ok === false) return; // allow page to block navigation on validation
          }
          console.debug("WizardNav next:", { pathname, next });
          if (next) navigate(next);
        }}
      >
        Next →
      </button>
    </div>
  );
}