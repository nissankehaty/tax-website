import React from "react";
import WizardNav from "../../components/WizardNav";

export default function CreditsStep() {
  return (
    <div className="rounded-2xl bg-white shadow-soft p-4">
      <h1 className="text-xl font-semibold">Credits (Coming Next)</h1>
      <p className="text-slate-600 mt-2">
        This section will handle credits like CTC, AOTC, Saver’s Credit, etc.
      </p>
      <WizardNav />
    </div>
  );
}