"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/sidebar";
import PricingSettings from "./components/pricingSettings";
import AboutUs from "./components/aboutUs";
import Header from "../dashboard/header";
import ConnectionSettings from "./components/connectionStrings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("connection");
  const router = useRouter();
  return (
    <div className="h-screen bg-slate-950 text-white p-6 flex flex-col">
      {/* ================= HEADER ================= */}
      <Header
        mode="settings"
        onClose={() => router.push("/dashboard")}
      />

      {/* ================= BODY ================= */}
      <div className="flex flex-1 min-h-0 mt-6">
        {/* SIDEBAR */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "connection" && <ConnectionSettings />}
          {activeTab === "pricing" && <PricingSettings />}
          {activeTab === "about" && <AboutUs />}
        </div>
      </div>
    </div>
  );
}
