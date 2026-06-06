import OperationalImpact from "./operational-impact";
import SavingsCard from "./savings-card";


export default function RightSidebar({ report }: any) {
  if (!report) return null;


  return (
    <div className="space-y-6">
      <OperationalImpact report={report} />
      <SavingsCard report={report} />
    </div>
  );
}
