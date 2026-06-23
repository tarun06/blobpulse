"use client";

import { CloudCogIcon, Settings, X, Download, ChevronDown } from "lucide-react";
import { colorTheme } from "./colors";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    onScan?: () => void;
    onForceScan?: () => void;
    onSettings?: () => void;
    onClose?: () => void;
    onDownloadReport?: () => void;
    color?: keyof typeof colorTheme;
    mode?: "dashboard" | "settings";
};

export default function Header({
    onScan,
    onForceScan,
    onSettings,
    onClose,
    onDownloadReport,
    color = "cyan",
    mode = "dashboard",
}: Props) {
    const router = useRouter();
    const [scanMenuOpen, setScanMenuOpen] = useState(false);

    return (
        <div className="flex items-center justify-between">

            {/* LEFT */}
            <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-cyan-500/10">
                    <CloudCogIcon className="w-8 h-8 text-cyan-400" />
                </div>

                <div>
                    <h1 className={`text-3xl font-bold ${colorTheme[color].text}`}>
                        Azure Blob Storage Optimizer
                    </h1>

                    <p className="text-white/50 mt-1">
                        AI-Powered duplicate blob detection and potential savings
                    </p>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 items-center">

                {mode === "dashboard" && (
                    <>
                        <div className="relative">
                            <div className="flex">

                                <button
                                    onClick={onScan}
                                    className="px-4 py-2 rounded-l-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition"
                                >
                                    Run Scan
                                </button>

                                <button
                                    onClick={() => setScanMenuOpen(!scanMenuOpen)}
                                    className="px-2 py-2 rounded-r-lg bg-cyan-500 text-black hover:bg-cyan-400 border-l border-cyan-600 transition"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                            </div>

                            {scanMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-slate-900 border border-white/10 shadow-xl z-50">

                                    <button
                                        onClick={() => {
                                            setScanMenuOpen(false);
                                            onScan?.();
                                        }}
                                        className="w-full px-4 py-3 text-left hover:bg-white/10"
                                    >
                                        Scan
                                    </button>

                                    <button
                                        onClick={() => {
                                            setScanMenuOpen(false);
                                            onForceScan?.();
                                        }}
                                        className="w-full px-4 py-3 text-left hover:bg-white/10"
                                    >
                                        Force Rescan
                                    </button>

                                </div>
                            )}
                        </div>

                        <div className="relative group">
                            <button
                                onClick={onDownloadReport}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                                aria-label="Download Report"
                            >
                                <Download className="w-5 h-5" />
                            </button>

                            <div className="absolute right-0 top-full mt-2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                Download Report
                            </div>
                        </div>

                        <button
                            onClick={onSettings || (() => router.push("/settings"))}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </>
                )}

                {mode === "settings" && (
                    <button
                        onClick={onClose || (() => router.push("/dashboard"))}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

            </div>
        </div>
    );
}