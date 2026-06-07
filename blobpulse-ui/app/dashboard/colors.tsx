export type colorType = {
  color?: "cyan" | "violet" | "rose" | "amber" | "emerald" | "red"| "green"| "slate";
};


export const colorTheme = {
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-400/40",
    bg: "bg-cyan-950/40",
  },
  violet: {
    text: "text-violet-400",
    border: "border-violet-400/40",
    bg: "bg-violet-950/40",
  },
  rose: {
    text: "text-rose-400",
    border: "border-rose-400/40",
    bg: "bg-rose-950/40",
  },
  amber: {
    text: "text-amber-400",
    border: "border-amber-400/40",
    bg: "bg-amber-950/40",
  },
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-400/40",
    bg: "bg-emerald-950/40",
  },
  red: {
    text: "text-red-400",
    border: "border-red-400/40",
    bg: "bg-red-950/40",
  },
  green: {
    text: "text-green-400",
    border: "border-green-400/40",
    bg: "bg-green-950/40",
  },
  slate: {
    text: "text-slate-400",
    border: "border-slate-400/40",
    bg: "bg-slate-950/40",
  },
} as const;


export type ColorKey = keyof typeof colorTheme;