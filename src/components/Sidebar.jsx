import React from "react";
import { NavLink } from "react-router-dom";

const steps = [
  { id: 1, name: "Home", to: "/" },
  { id: 5, name: "Personal Profile", to: "/step/profile" },
  { id: 11, name: "Income: W-2", to: "/step/w2" },
  { id: 13, name: "Income: Rental", to: "/step/rental" },
  { id: 14, name: "Income: Investments", to: "/step/investments" },
  { id: 15, name: "Deductions", to: "/step/deductions" },
  { id: 17, name: "Credits", to: "/step/credits" },
  { id: 26, name: "Review & Summary", to: "/step/review" },
];

export default function Sidebar() {
  return (
    <aside className="rounded-2xl bg-white shadow-soft p-4 h-fit">
      <h2 className="text-slate-700 font-semibold mb-3">Project Steps</h2>
      <ul className="space-y-1">
        {steps.map((s) => (
          <li key={s.id}>
            <NavLink
              to={s.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl text-sm ${
                  isActive
                    ? "bg-brand-600 text-white"
                    : "hover:bg-brand-50 text-slate-700"
                }`
              }
            >
              <span className="font-medium">#{s.id}</span> — {s.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}