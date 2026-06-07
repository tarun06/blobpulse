"use client";

import { ScanReportResponse } from "../types/scanReportResponse";

type Props = {
  report: ScanReportResponse | null;
};


export default function Footer({ report }: Props) {
  if (!report) return null;


  return (
    <div className="border-t border-white/10 pt-4 text-xs text-white/60">


      <p className="leading-relaxed">
         <span className="font-semibold text-white">
            Impact Summary:
        </span>{" "}
        {report.operationalImpactSummary || "No summary available."}


        {/* AI BADGE WITH DISCLAIMER */}
        <span
            className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/40 text-[10px] cursor-help"
            title="Projected values are derived from Azure Blob metadata and heuristic cost modeling. Verify with actual Azure billing before decisions."
            >
            Notice
            </span>
      </p>


    </div>
  );
}
