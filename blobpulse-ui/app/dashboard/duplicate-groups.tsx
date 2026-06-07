"use client";


import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import DuplicateExpandedCard from "./duplicate-expanded-card";


const PAGE_SIZE = 10;


export default function DuplicateGroups({
  report,
  activeGroupId,
  setActiveGroupId,
}: any) {
  if (!report) return null;


  const groups = report.duplicateGroups ?? [];


  const [page, setPage] = useState(0);


  // ✅ total pages
  const totalPages = Math.ceil(groups.length / PAGE_SIZE);


  // ✅ current page data
  const pagedGroups = useMemo(() => {
    const start = page * PAGE_SIZE;
    return groups.slice(start, start + PAGE_SIZE);
  }, [groups, page]);


  return (
    <div className="flex flex-col h-full min-h-0">


      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <h2 className="text-xl font-semibold text-white">
          Duplicate Groups
        </h2>
        {/* <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            placeholder="Search..."
            className="w-full h-10 rounded-xl bg-black/20 border border-white/10 pl-10 text-white text-sm outline-none"
          />
        </div> */}
      </div>


      {/* LIST */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2">
        {pagedGroups.map((group: any) => (
          <DuplicateExpandedCard
            key={group.structuralId}
            group={group}
            isActive={activeGroupId === group.structuralId}
            onClick={() => setActiveGroupId(group.structuralId)}
          />
        ))}


      </div>


      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-1 text-sm text-white/60">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="px-3 py-0.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/70"
        >
          Prev
        </button>


        <span className="px-3 py-0.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/70">
          Page {page + 1} of {totalPages}
        </span>


        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          className="px-3 py-0.5 text-xs rounded-full bg-white/5 border border-white/10 text-white/70"
        >
          Next
        </button>


      </div>
    </div>
  );
}
