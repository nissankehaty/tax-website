import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

/** Layout & core pages */
import AppLayout from "./layouts/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

/** Wizard step pages */
import ProfileStep from "./pages/steps/ProfileStep.jsx";
import W2Step from "./pages/steps/W2Step.jsx";
import RentalStep from "./pages/steps/RentalStep.jsx";
import InvestmentsStep from "./pages/steps/InvestmentsStep.jsx";
import DeductionsStep from "./pages/steps/DeductionsStep.jsx";
import CreditsStep from "./pages/steps/CreditsStep.jsx";
import ReviewStep from "./pages/steps/ReviewStep.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/step/profile", element: <ProfileStep /> },
      { path: "/step/w2", element: <W2Step /> },
      { path: "/step/rental", element: <RentalStep /> },
      { path: "/step/investments", element: <InvestmentsStep /> },
      { path: "/step/deductions", element: <DeductionsStep /> },
      { path: "/step/credits", element: <CreditsStep /> },
      { path: "/step/review", element: <ReviewStep /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);