"use client";


type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};


export default function Sidebar({ activeTab, setActiveTab }: Props) {
  return (
    <div className="w-64 bg-[#111C2D] border-r border-white/10 p-4">
      <h2 className="font-bold mb-6">Settings</h2>
      <div className="space-y-2 text-sm">
        <button
          onClick={() => setActiveTab("connection")}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-white/10 ${
            activeTab === "connection" ? "bg-white/10" : ""
          }`}
        >
          Connection
        </button>
        <button
          onClick={() => setActiveTab("pricing")}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-white/10 ${
            activeTab === "pricing" ? "bg-white/10" : ""
          }`}
        >
          Pricing
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`block w-full text-left px-3 py-2 rounded hover:bg-white/10 ${
            activeTab === "about" ? "bg-white/10" : ""
          }`}
        >
          About
        </button>
      </div>
    </div>
  );
}
