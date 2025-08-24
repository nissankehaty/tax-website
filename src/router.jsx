// 📄 src/router.jsx
import React from "react";
import { createHashRouter } from "react-router-dom";

// Layout
import AppLayout from "@/layouts/AppLayout";

// Core Pages
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

// Wizard Steps
import ProfileStep from "@/pages/steps/ProfileStep";
import W2Step from "@/pages/steps/W2Step";
import RentalStep from "@/pages/steps/RentalStep";
import SelfEmploymentStep from "@/pages/steps/SelfEmploymentStep";
import InvestmentStep from "@/pages/steps/InvestmentsStep"; // ✅ plural name
import EducationStep from "@/pages/steps/EducationStep";
import RetirementStep from "@/pages/steps/RetirementStep";
import CreditsStep from "@/pages/steps/CreditsStep";
import SummaryStep from "@/pages/steps/SummaryStep";

const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />, // ✅ correct layout name
    errorElement: <NotFound />, // optional
    children: [
      { path: "/", element: <Home /> },
      { path: "/steps/profile", element: <ProfileStep /> },
      { path: "/steps/w2", element: <W2Step /> },
      { path: "/steps/rentals", element: <RentalStep /> },
      { path: "/steps/self-employment", element: <SelfEmploymentStep /> },
      { path: "/steps/investments", element: <InvestmentStep /> },
      { path: "/steps/education", element: <EducationStep /> },
      { path: "/steps/retirement", element: <RetirementStep /> },
      { path: "/steps/credits", element: <CreditsStep /> },
      { path: "/steps/summary", element: <SummaryStep /> },
    ],
  },
]);

export default router;