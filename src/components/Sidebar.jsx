import React from "react";
import { NavLink } from "react-router-dom";

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

export default function Sidebar() {
  return (
    <aside className="space-y-2">
      {steps.map((step) => (
        <NavLink
          key={step.path}
          to={step.path}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-xl text-sm font-medium transition ${
              isActive
                ? "bg-brand-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`
          }
        >
          {step.label}
        </NavLink>
      ))}
    </aside>
  );
}