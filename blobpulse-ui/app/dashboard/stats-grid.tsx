import StatCard from "./stat-card";
import type { ColorKey } from "./colors";


import {
  Cloud,
  Copy,
  Database,
  HardDrive,
  DollarSign,
  AlertTriangle,
  File,
  CloudCogIcon,
  CloudDrizzle,
  LucideCloudCheck,
} from "lucide-react";
import { ScanReportResponse } from "../types/scanReportResponse";


export default function StatsGrid({ report }: {report: ScanReportResponse | null}) {
  if (!report) return null;


  const items: {
    title: string;
    value: string | number;
    color: ColorKey;
    icon: any;
  }[] = [
    {
      title: "Blobs Scanned",
      value: report?.totalBlobsScanned?.toLocaleString() ?? "0",
      color: "cyan",
      icon: LucideCloudCheck,
    },
    {
      title: "Duplicate Groups",
      value: report?.totalDuplicateGroups ?? 0,
      color: "violet",
      icon: Copy,
    },
    {
      title: "Redundant Files",
      value: report?.totalRedundantFilesCount ?? 0,
      color: "rose",
      icon: File,
    },
    {
      title: "Wasted Space",
      value: `${report?.totalWastedSpaceGb ?? 0} GB`,
      color: "amber",
      icon: HardDrive,
    },
    {
      title: "Yearly Storage Waste Cost",
      value: `$${((report?.estimatedMonthlyStorageWasteUsd ?? 0) * 12).toFixed(2)}`,
      color: "emerald",
      icon: DollarSign,
    },
    // {
    //   title: "Bloat Index",
    //   value: `${report.containerBloatIndexPercentage ?? 0}%`,
    //   color: "red",
    //   icon: AlertTriangle,
    // },
  ];


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {items.map((item, index) => (
        <StatCard key={index} item={item} />
      ))}
    </div>
  );
}
