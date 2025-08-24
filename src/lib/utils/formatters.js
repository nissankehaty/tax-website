// src/lib/utils/formatters.js

/** Trim and ensure a string, fallback to "" */
export const clean = (s) => (s ?? "").toString().trim();

/** Parse to a non-negative integer (fallback to 0) */
export const toInt = (n) => {
  const x = Number(n ?? 0);
  return Number.isFinite(x) ? Math.max(0, Math.trunc(x)) : 0;
};

/** Parse to a number (allow decimals, fallback to 0) */
export const toNum = (n) => {
  const x = Number(n ?? 0);
  return Number.isFinite(x) ? x : 0;
};