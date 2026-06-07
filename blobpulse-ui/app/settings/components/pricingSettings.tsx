"use client";


import API_URL from "@/lib/api";
import { useEffect, useState } from "react";


type StorageTier = {
  pricePerGb: number;
  readPer10k: number;
  writePer10k: number;
  listPer10k: number;
  retrievalPerGb: number;
};


type PricingModel = {
  region: string;
  currency: string;
  storage: Record<string, StorageTier>;
};

export default function PricingSettings() {
  const API = `${API_URL}/api/blob/ApproxPricing`;
  const [data, setData] = useState<PricingModel>({
    region: "",
    currency: "",
    storage: {},
  });

  console.log("API:", API);

  const [selectedTier, setSelectedTier] = useState("");

  // ================= LOAD =================
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch(API);

        if (!res.ok) {
          console.error("Failed to load pricing");
          return;
        }

        const result: PricingModel = await res.json();
        setData(result);
        const firstTier = Object.keys(result.storage)[0];
        if (firstTier) {
          setSelectedTier(firstTier);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPricing();
  }, []);


  // ================= SAVE =================
  const handleSave = async () => {
    try {
      const res = await fetch(`${API}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(data),
      });


      if (!res.ok) {
        alert("Failed to save pricing");
        return;
      }


      alert("Pricing saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save pricing");
    }
  };


  // ================= UPDATE FIELD =================
  const updateStorage = (
    tier: string,
    field: keyof StorageTier,
    value: number
  ) => {
    setData((prev) => ({
      ...prev,
      storage: {
        ...prev.storage,
        [tier]: {
          ...prev.storage[tier],
          [field]: value,
        },
      },
    }));
  };


  const selectedTierData = selectedTier
    ? data.storage[selectedTier]
    : undefined;

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6">


      <h2 className="text-xl font-semibold mb-6">
        Azure Blob Pricing Settings
      </h2>


      {/* REGION */}
      <div className="mb-4">
        <label className="block text-sm text-white/60 mb-1">
          Region
        </label>


        <input
          className="w-full rounded border border-white/10 bg-black p-2"
          value={data.region}
          onChange={(e) =>
            setData({
              ...data,
              region: e.target.value,
            })
          }
        />
      </div>


      {/* CURRENCY */}
      <div className="mb-6">
        <label className="block text-sm text-white/60 mb-1">
          Currency
        </label>


        <input
          className="w-full rounded border border-white/10 bg-black p-2"
          value={data.currency}
          onChange={(e) =>
            setData({
              ...data,
              currency: e.target.value,
            })
          }
        />
      </div>


      {/* TIER DROPDOWN */}
      <div className="mb-6">
        <label className="block text-sm text-white/60 mb-1">
          Storage Tier
        </label>


        <select
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value)}
          className="w-full rounded border border-white/10 bg-black p-2"
        >
          {Object.keys(data.storage).map((tier) => (
            <option key={tier} value={tier}>
              {tier.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      

      {/* SELECTED TIER */}
      {selectedTierData && (
        <div className="rounded-xl border border-white/10 p-5 bg-black/20">


          <h3 className="text-cyan-400 font-semibold text-lg mb-4">
            {selectedTier.toUpperCase()} Pricing
          </h3>


          {Object.entries(selectedTierData).map(([field, value]) => (
            <div key={field} className="mb-4">


              <label className="block text-sm text-white/60 mb-1">
                {field}
              </label>


              <input
                type="number"
                step="0.0001"
                value={value}
                onChange={(e) =>
                  updateStorage(
                    selectedTier,
                    field as keyof StorageTier,
                    Number(e.target.value)
                  )
                }
                className="w-full rounded border border-white/10 bg-black p-2"
              />
            </div>
          ))}
        </div>
      )}


      {/* SUMMARY */}
      <div className="mt-6 text-sm text-white/50">
        Available Tiers: {Object.keys(data.storage).length}
      </div>


      {/* SAVE */}
      <button
        onClick={handleSave}
        className="mt-6 px-5 py-3 rounded-lg bg-cyan-500 text-black font-medium"
      >
        Save Pricing
      </button>


    </div>
  );
}
