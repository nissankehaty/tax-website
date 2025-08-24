import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/utils/cn"; // optional: your classNames helper if used

const steps = [
  { path: "/steps/profile", label: "Profile" },
  { path: "/steps/w2", label: "W-2 Income" },
  { path: "/steps/rentals", label: "Rentals" },
  { path: "/steps/self-employment", label: "Self-Employment" },
  { path: "/steps/investments", label: "Investments" },
  { path: "/steps/education", label: "Education" },
  { path: "/steps/retirement", label: "Retirement" },
  { path: "/steps/credits", label: "Credits" },
  { path: "/steps/summary", label: "Summary" },
];

const ProgressSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-56 bg-white border-r border-slate-200 p-4 hidden md:block">
      <h2 className="text-lg font-semibold text-slate-700 mb-4">Tax Steps</h2>
      <ol className="space-y-2">
        {steps.map((step, index) => {
          const isActive = location.pathname === step.path;
          return (
            <li key={step.path}>
              <Link
                to={step.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium",
                  isActive
                    ? "bg-brand-100 text-brand-700 font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {index + 1}. {step.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
};

export default ProgressSidebar;