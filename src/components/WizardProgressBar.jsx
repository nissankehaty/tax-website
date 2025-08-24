// 📄 src/components/WizardProgressBar.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const steps = [
  { path: "/steps/profile", label: "Profile" },
  { path: "/steps/w2", label: "W-2" },
  { path: "/steps/self-employment", label: "Self-Employment" },
  { path: "/steps/rentals", label: "Rentals" },
  { path: "/steps/investments", label: "Investments" },
  { path: "/steps/education", label: "Education" },
  { path: "/steps/retirement", label: "Retirement" },
  { path: "/steps/credits", label: "Credits" },
  { path: "/steps/summary", label: "Summary" },
];

export default function WizardProgressBar() {
  const location = useLocation();
  const currentIndex = steps.findIndex((step) =>
    location.pathname.includes(step.path)
  );

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
        {steps.map((step, index) => (
          <div key={step.path} className="flex-1 text-center">
            <span
              className={`${
                index <= currentIndex
                  ? "text-brand-600 font-semibold"
                  : "text-slate-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full">
        <div
          className="h-full bg-brand-600 rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / steps.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}