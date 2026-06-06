export default function OperationalImpact({ report }: any) {
  if (!report) return null;


  const summary = report.operationalImpactSummary ?? "";
  const bloat = report.containerBloatIndexPercentage ?? 0;


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">
        Operational Impact
      </h2>


      <p className="text-white/70 mt-5 leading-8">
        {summary}
      </p>


      <div className="mt-6">
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
            style={{
              width: `${Math.min(Math.max(bloat, 0), 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
