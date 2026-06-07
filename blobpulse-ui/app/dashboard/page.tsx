"use client";

import { useEffect, useState } from "react";
import { useStorageScanner } from "@/app/hooks/useStorageScanner";
import DuplicateGroups from "./duplicate-groups";
import Header from "./header";
import { ColorKey } from "./colors";
import { useRouter } from "next/navigation";
import BloatGauge from "./bloatGauge";
import Footer from "./footer";
import SavingsOverviewBarChart from "./savingsOverviewBarChart";
import StatsGrid from "./stats-grid";

export default function DashboardPage({ color = "cyan" }: { color?: ColorKey }) {
  const router = useRouter();

  const {
    executeScan,
    report,
    loading,
    error
  } = useStorageScanner();

  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [connectionString, setConnectionString] = useState("");
  const [containerName, setContainerName] = useState("");

  // =========================
  // INIT + SCAN
  // =========================
  useEffect(() => {
    const conn = localStorage.getItem("connectionString") || "";
    const cont = localStorage.getItem("containerName") || "";

    setConnectionString(conn);
    setContainerName(cont);

    if (conn && cont) {
      executeScan(conn, cont);
    }
  }, []);

  // =========================
  // DEFAULT GROUP SELECTION
  // =========================
  useEffect(() => {
    if (!report?.duplicateGroups?.length) return;

    if (!activeGroupId) {
      setActiveGroupId(report.duplicateGroups[0].structuralId);
    }
  }, [report, activeGroupId]);

  // =========================
  // YEARLY BAR DATA
  // =========================
  const toYearly = (v?: number) => Number(((v ?? 0) * 12).toFixed(2));

  const barData = report
    ? [
        {
          name: "Storage Waste Cost",
          value: toYearly(report.estimatedMonthlyStorageWasteUsd),
          color: "#EF4444",
        },
        {
          name: "Recoverable Savings",
          value: toYearly(report.potentialMonthlySavingsUsd),
          color: "#22C55E",
        },
        {
          name: "Operation Cost",
          value: toYearly(report.estimatedMonthlyOperationCostUsd),
          color: "#F59E0B",
        },
      ]
    : [];

  // =========================
  // ❌ ERROR STATE (NEW FIX)
  // =========================
  if (error) {
  return (
    <div className="relative h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">

      {/* DIM BACKGROUND (same as empty state) */}
      <div className="opacity-30 pointer-events-none">
        <Header
          onScan={() => executeScan(connectionString, containerName)}
          onSettings={() => router.push("/settings")}
        />

        <StatsGrid report={report} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BloatGauge value={report?.containerBloatIndexPercentage ?? 0} />
          <SavingsOverviewBarChart data={barData} />
        </div>

        <DuplicateGroups
          report={report}
          activeGroupId={activeGroupId}
          setActiveGroupId={setActiveGroupId}
        />
      </div>

      {/* OVERLAY (same style as "No duplicates found") */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-[#111C2D] border border-white/10 rounded-3xl p-10 max-w-xl w-full text-center">

          <div className="text-5xl mb-4">❌</div>

          <h1 className="text-2xl font-bold">
            Scan Failed
          </h1>

          <p className="text-white/60 mt-3">
            {error}
          </p>

          <div className="flex gap-3 justify-center mt-6">

            <button
              onClick={() => executeScan(connectionString, containerName)}
              className="px-5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30"
            >
              Retry Scan
            </button>

            <button
              onClick={() => router.push("/settings")}
              className="px-5 py-2 rounded-xl bg-white/10 border border-white/20"
            >
              Settings
            </button>

          </div>
        </div>
      </div>

    </div>
  );
}

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="animate-spin h-10 w-10 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto" />
          <p className="text-white/60 text-sm">
            Scanning Azure Blob Storage...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // NO CONNECTION STATE
  // =========================
  if (!connectionString || !containerName) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center text-white p-6">
        <div className="text-center bg-[#111C2D] border border-white/10 rounded-3xl p-10 max-w-xl w-full">
          <div className="text-5xl mb-4">🔌</div>

          <h1 className="text-2xl font-bold">
            Connection Not Found
          </h1>

          <p className="text-white/60 mt-3">
            Please configure your Azure Blob Storage connection string
            and container name before scanning.
          </p>

          <div className="flex gap-3 justify-center mt-6">
            <button
              onClick={() => router.push("/settings")}
              className="px-5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30"
            >
              Go to Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // EMPTY RESULT STATE (SAFE NOW)
  // =========================
  if (report && report.totalBlobsScanned === 0) {
    return (
      <div className="relative h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">
        <div className="opacity-30 pointer-events-none">
          <Header
            onScan={() => executeScan(connectionString, containerName)}
            onSettings={() => router.push("/settings")}
          />

          <StatsGrid report={report} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BloatGauge value={report?.containerBloatIndexPercentage ?? 0} />
            <SavingsOverviewBarChart data={barData} />
          </div>

          <DuplicateGroups
            report={report}
            activeGroupId={activeGroupId}
            setActiveGroupId={setActiveGroupId}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#111C2D] border border-white/10 rounded-3xl p-10 max-w-xl w-full text-center">
            <div className="text-5xl mb-4">🎉</div>

            <h1 className="text-2xl font-bold">
              No Duplicates Found
            </h1>

            <p className="text-white/60 mt-3">
              Your Azure Blob Storage is clean. No redundant files detected.
            </p>

            <div className="flex gap-3 justify-center mt-6">
            <button
                onClick={async () => {
                    await executeScan(connectionString, containerName);
                }}
                className="px-5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/30"
              >
                Re-scan
              </button>

              <button
                onClick={() => router.push("/settings")}
                className="px-5 py-2 rounded-xl bg-white/10 border border-white/20"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <div className="h-screen bg-slate-950 text-white p-6 flex flex-col">
      <Header
        onScan={() => executeScan(connectionString, containerName)}
        onSettings={() => router.push("/settings")}
      />

      <div className="shrink-0 mt-3">
        <StatsGrid report={report} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <BloatGauge value={report?.containerBloatIndexPercentage ?? 0} />
        <SavingsOverviewBarChart data={barData} />
      </div>

      <div className="h-full overflow-hidden mt-6">
        <DuplicateGroups
          report={report}
          activeGroupId={activeGroupId}
          setActiveGroupId={setActiveGroupId}
        />
      </div>

      <div className="mt-1">
        <Footer report={report} />
      </div>
    </div>
  );
}