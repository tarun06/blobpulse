"use client";


import { PieChart, Pie, Cell } from "recharts";


type GaugeProps = {
  value: number;
};


export default function BloatGauge({ value }: GaugeProps) {
  const gaugeData = [
    { name: "used", value },
    { name: "remaining", value: 100 - value },
  ];


  const getStatus = (v: number) => {
    if (v <= 15) return { label: "Low", color: "text-emerald-500" };
    if (v <= 40) return { label: "Medium", color: "text-amber-500" };
    return { label: "High", color: "text-rose-500" };
  };
  const status = getStatus(value);
  return (
    <div className="bg-[#111C2D] border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between">
      <h3 className="text-s font-semibold text-white text-center">
        Container Bloat Index
      </h3>


      <div className="flex flex-col sm:flex-row items-center gap-12 justify-center">
       
        {/* GAUGE */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <PieChart width={160} height={160}>
            <Pie
              data={gaugeData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={70}
              startAngle={220}
              endAngle={-40}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill="#EAB308" />
              <Cell fill="#1E293B" />
            </Pie>
          </PieChart>


          <div className="absolute text-center">
            <div className="text-2xl font-bold text-white">
              {value.toFixed(2)}%
            </div>
            <div className={`text-xs font-medium mt-1 ${status.color}`}>
              {status.label}
            </div>
          </div>
        </div>


        {/* LEGEND */}
        <div className="text-xs space-y-3 max-w-xs">
          <p className="text-slate-400 leading-normal">
            This indicates the percentage of storage space wasted by redundant and duplicate files.
          </p>


          <div className="space-y-2 pt-2 border-t border-slate-800/60">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                Low
              </span>
              <span className="text-slate-400">0% – 15%</span>
            </div>


            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                Medium
              </span>
              <span className="text-slate-400">15% – 40%</span>
            </div>


            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span>
                High
              </span>
              <span className="text-slate-400">&gt; 40%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
