import React from "react";
import WizardNav from "../../components/WizardNav";

export default function DeductionsStep() {
  return (
    <div className="rounded-2xl bg-white shadow-soft p-4">
      <h1 className="text-xl font-semibold">Deductions (Coming Next)</h1>
      <p className="text-slate-600 mt-2">
        This section will handle standard vs itemized, SALT, mortgage interest, etc.
      </p>
      <WizardNav />
    </div>
  );
}