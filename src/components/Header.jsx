import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-brand-600" />
          <span className="text-lg font-semibold text-slate-800">
            Tax App — GPT-5 Edition
          </span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            to="/step/profile"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium bg-brand-600 text-white hover:opacity-95 transition"
          >
            New Scenario
          </Link>
          <Link
            to="/step/review"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium bg-transparent text-brand-700 hover:bg-brand-50 transition"
          >
            Review
          </Link>
        </nav>
      </div>
    </header>
  );
}