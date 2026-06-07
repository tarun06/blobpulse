import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatBytes } from "../lib/format";


export default function DuplicateExpandedCard({
  group,
  isActive,
  onClick,
}: any) {


  const [open, setOpen] = useState(false);


  if (!group) return null;


  const hasMoreThan3 =
    (group.redundantInstances?.length ?? 0) > 2;


  return (
      <div
        onClick={onClick}
        className={`cursor-pointer transition-all duration-300 rounded-[28px] p-3 border
          ${
            isActive
              ? "col-span-12 bg-black/30 border-cyan-400/30"
              : "bg-black/20 border-white/10 hover:border-white/20"
          }
        `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/50 text-xs">
            {group.structuralId}
          </p>


          <h3 className="text-sm font-semibold mt-1">
            {group.primaryInstance?.name}
          </h3>
        </div>


        <div className="text-rose-300 font-sm">
          {group.wastedBytes} bytes wasted
        </div>
      </div>


      {/* BODY */}
      {isActive  && (
        <div className="grid grid-cols-2 gap-3 mt-3 animate-in fade-in duration-200">


          {/* PRIMARY */}
          <div className="bg-[#091423] rounded-2xl p-3 border border-white/5">
            <img
              src={
                group.primaryInstance?.blobUrl?.trim()
                  ? group.primaryInstance.blobUrl
                  : "https://via.placeholder.com/400x200?text=No+Preview"
              }
              alt="blob preview"
              className="w-full h-36 rounded-2xl object-cover object-center"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://via.placeholder.com/400x200?text=No+Preview";
              }}
            />


            <div className="space-y-3 mt-3">
              <div className="flex justify-between">
                <span className="text-white/50">Name</span>
                <span>{group.primaryInstance?.name}</span>
              </div>


              <div className="flex justify-between">
                <span className="text-white/50">Size</span>
                <span>{formatBytes(group.primaryInstance?.sizeBytes)}</span>
              </div>


              <div className="flex justify-between">
                <span className="text-white/50">Tier</span>
                <span>{group.primaryInstance?.accessTier}</span>
              </div>
            </div>
          </div>


          {/* DUPLICATES */}
          <div className="bg-[#091423] rounded-3xl p-3 border border-white/5">
            <h3 className="text-m font-semibold mb-2">
              Redundant Instances
            </h3>
             <div
                className={`space-y-4 pr-2 ${
                 hasMoreThan3 ? "max-h-52 overflow-y-auto" : ""
                }`}
            >
              {group.redundantInstances?.map((file: any, index: number) => (
                <div
                  key={index}
                  className="bg-black/20 border border-white/10 rounded-2xl p-2"
                >
                  <h4 className="text-m">{file.name}</h4>
                  <div className="flex gap-2 mt-1 text-sm text-white/50">
                    <span>{formatBytes(file.sizeBytes)}</span>
                    <span>{file.accessTier}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}