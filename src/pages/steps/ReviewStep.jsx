import React from "react";
import WizardNav from "../../components/WizardNav";

export default function ReviewStep() {
  return (
    <div className="rounded-2xl bg-white shadow-soft p-4">
      <h1 className="text-xl font-semibold">Review & Summary (Coming Next)</h1>
      <p className="text-slate-600 mt-2">
        This will show your computed AGI, taxable income, estimated tax, and refund/owed summary.
      </p>
      <WizardNav />
    </div>
  );
}