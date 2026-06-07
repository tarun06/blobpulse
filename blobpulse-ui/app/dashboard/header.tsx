"use client";


import { CloudCogIcon, Settings, X } from "lucide-react";
import { colorTheme } from "./colors";
import { useRouter } from "next/navigation";


type Props = {
  onScan?: () => void;
  onSettings?: () => void;
  onClose?: () => void;
  color?: keyof typeof colorTheme;
  mode?: "dashboard" | "settings";
};


export default function Header({
  onScan,
  onSettings,
  onClose,
  color = "cyan",
  mode = "dashboard",
}: Props) {
  const router = useRouter();


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
            <button
              onClick={onScan}
              className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition"
            >
              Run New Scan
            </button>


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
