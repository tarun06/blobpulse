import type { LucideIcon } from "lucide-react";
import { Cloud } from "lucide-react";
import { colorTheme, type ColorKey } from "./colors";


type Props = {
  item: {
    title: string;
    value: string | number;
    color: ColorKey;
    icon: any;
  };
};


export default function StatCard({ item }: Props) {
  const theme = colorTheme[item.color];
  const Icon = item.icon;

  return (
    <div className={`flex items-start gap-4 p-2 rounded-2xl border ${theme.border} ${theme.bg}`}>
      {/* Icon */}
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${theme.bg}`}>
        <item.icon className={`w-6 h-6 ${theme.text}`} />
      </div>
      {/* Text */}
      <div>
        <p className={`text-sm ${theme.text}`}>{item.title}</p>
        <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
      </div>
    </div>
  );
}
