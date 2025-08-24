import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";

import { useAutosaveScenario } from "../lib/persist/useAutosave";

export default function AppLayout() {

  useAutosaveScenario();

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="grid grid-cols-[260px_1fr] gap-6 px-6 py-6">
        <Sidebar />
        <main className="max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}