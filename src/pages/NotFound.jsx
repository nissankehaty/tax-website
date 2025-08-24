import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="rounded-2xl bg-white shadow-soft p-4">
      <h1 className="text-xl font-semibold">404 — Page Not Found</h1>
      <p className="text-slate-600 mt-2">The page you requested does not exist.</p>
      <Link to="/" className="inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium bg-brand-600 text-white hover:opacity-95 transition mt-4">Go Home</Link>
    </div>
  );
}
