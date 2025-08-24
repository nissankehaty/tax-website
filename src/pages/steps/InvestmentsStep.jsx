import React from "react";
import WizardNav from "../../components/WizardNav";

export default function InvestmentsStep() {
  return (
    <div className="rounded-2xl bg-white shadow-soft p-4">
      <h1 className="text-xl font-semibold">Investments (Coming Next)</h1>
      <p className="text-slate-600 mt-2">
        This section will handle dividends, capital gains, crypto, etc.
      </p>

      {/* ✅ Wizard navigation at the bottom */}
      <WizardNav />
    </div>
  );
}