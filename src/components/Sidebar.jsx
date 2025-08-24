// 📄 src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const steps = [
  { name: "Profile", to: "/steps/profile" },
  { name: "W-2 Income", to: "/steps/w2" },
  { name: "Rentals", to: "/steps/rentals" },
  { name: "Self-Employment", to: "/steps/self-employment" },
  { name: "Investments", to: "/steps/investments" },
  { name: "Education", to: "/steps/education" },
  { name: "Retirement", to: "/steps/retirement" },
  { name: "Credits", to: "/steps/credits" },
  { name: "Summary", to: "/steps/summary" },
];

export default function Sidebar() {
  return (
    <aside className="space-y-3">
      <h2 className="text-lg font-bold text-slate-700">Steps</h2>
      <nav className="flex flex-col gap-2">
        {steps.map((step) => (
          <NavLink
            key={step.to}
            to={step.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md ${
                isActive
                  ? "bg-brand-600 text-white"
                  : "text-slate-700 hover:bg-brand-50"
              }`
            }
          >
            {step.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}