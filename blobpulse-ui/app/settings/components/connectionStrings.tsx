"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function ConnectionSettings() {
  const router = useRouter();


  const [connectionString, setConnectionString] = useState("");
  const [containerName, setContainerName] = useState("");


  useEffect(() => {
    setConnectionString(localStorage.getItem("connectionString") || "");
    setContainerName(localStorage.getItem("containerName") || "");
  }, []);


  const handleSave = () => {
    localStorage.setItem("connectionString", connectionString);
    localStorage.setItem("containerName", containerName);
    router.push("/dashboard");
  };


  return (
    <div className="bg-[#111] p-5 rounded-xl border border-white/10">


      <h2 className="text-lg font-semibold mb-4">Connection Settings</h2>


      <label>Connection String</label>
      <input
        className="w-full p-2 mt-1 mb-4 bg-black border border-white/10"
        value={connectionString}
        onChange={(e) => setConnectionString(e.target.value)}
      />


      <label>Container Name</label>
      <input
        className="w-full p-2 mt-1 mb-4 bg-black border border-white/10"
        value={containerName}
        onChange={(e) => setContainerName(e.target.value)}
      />


      <button
        onClick={handleSave}
        className="px-4 py-2 bg-cyan-500 text-black rounded"
      >
        Save
      </button>


    </div>
  );
}
