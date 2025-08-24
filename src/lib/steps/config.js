// src/lib/steps/config.js
export const STEP_KEYS = {
  PROFILE: "profile",
  W2: "w2",
  RENTAL: "rental",
  INVESTMENTS: "investments",
  DEDUCTIONS: "deductions",
  CREDITS: "credits",
  REVIEW: "review",
};

export const stepsConfig = [
  { key: STEP_KEYS.PROFILE,     title: "Personal Profile",    path: "/step/profile" },
  { key: STEP_KEYS.W2,          title: "Income: W-2",         path: "/step/w2" },
  { key: STEP_KEYS.RENTAL,      title: "Income: Rental",      path: "/step/rental" },
  { key: STEP_KEYS.INVESTMENTS, title: "Income: Investments", path: "/step/investments" },
  { key: STEP_KEYS.DEDUCTIONS,  title: "Deductions",          path: "/step/deductions" },
  { key: STEP_KEYS.CREDITS,     title: "Credits",             path: "/step/credits" },
  { key: STEP_KEYS.REVIEW,      title: "Review & Summary",    path: "/step/review" },
];

// Normalize path: trim, decode, remove trailing slashes
const norm = (p) => {
  if (!p) return "/";
  const decoded = decodeURI(String(p)).trim();
  const trimmed = decoded.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

export const stepIndexByPath = (path) =>
  stepsConfig.findIndex((s) => norm(s.path) === norm(path));

export const nextStepPath = (path) => {
  const i = stepIndexByPath(path);
  return i >= 0 && i < stepsConfig.length - 1 ? stepsConfig[i + 1].path : null;
};

export const prevStepPath = (path) => {
  const i = stepIndexByPath(path);
  return i > 0 ? stepsConfig[i - 1].path : null;
};