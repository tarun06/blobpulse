import { ScanReportResponse } from "../types/scanReportResponse";


export default function SavingsCard({
  report,
}: { report: ScanReportResponse }) {


  const yearlyWaste = (report.estimatedMonthlyStorageWasteUsd ?? 0) * 12;
  const yearlyPotentialSavings = (report.potentialMonthlySavingsUsd ?? 0) * 12;
  const yearlyOpsCost = (report.estimatedMonthlyOperationCostUsd ?? 0) * 12;


  return (
    <div className="p-6 relative overflow-hidden space-y-10">


      <div className="absolute w-[250px] h-[250px] rounded-full bg-cyan-400/20 blur-[100px] -top-20 -right-20" />


      {/* STORAGE WASTE */}
      <div>
        <p className="text-white/60 uppercase text-sm">
          Yearly Storage Waste Cost
        </p>


        <h2 className="text-6xl font-bold mt-3">
          ${yearlyWaste.toFixed(2)}
        </h2>
      </div>


      {/* POTENTIAL SAVINGS */}
      <div>
        <p className="text-white/60 uppercase text-sm">
          Yearly Potential Savings
        </p>


        <h2 className="text-6xl font-bold mt-3">
          ${yearlyPotentialSavings.toFixed(2)}
        </h2>
      </div>


      {/* OPERATIONS COST */}
      <div>
        <p className="text-white/60 uppercase text-sm">
          Yearly Operation Cost
        </p>


        <h2 className="text-6xl font-bold mt-3">
          ${yearlyOpsCost.toFixed(2)}
        </h2>
      </div>


    </div>
  );
}
