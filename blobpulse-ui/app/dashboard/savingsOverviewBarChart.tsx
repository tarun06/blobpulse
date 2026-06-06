"use client";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";


type BarItem = {
  name: string;
  value: number;
  color: string;
};


type Props = {
  data: BarItem[] | null | undefined;
};


export default function SavingsOverviewBarChart({ data }: Props) {
  if (!data?.length) {
    return (
      <div className="bg-[#111C2D] border border-slate-800/80 rounded-xl p-3 min-h-[240px] flex items-center justify-center">
        <span className="text-white/40 text-sm">No data available</span>
      </div>
    );
  }


  return (
    <div className="bg-[#111C2D] border border-slate-800/80 rounded-xl p-3 min-h-[240px] flex flex-col">
     
      <h3 className="text-sm font-semibold text-white text-center mb-2">
        Savings Overview (per month)
      </h3>


      <div className="w-full h-[180px] flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
           
            {/* ❌ removes white grid completely */}
            <CartesianGrid stroke="none" />


            <XAxis
              dataKey="name"
              stroke="#64748B"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />


            <YAxis
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />


            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}   // ✅ fixes black value
            />


            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>


          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
