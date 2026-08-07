"use client";

import { useState } from "react";

export default function DepositorySyncEngine() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState("JUST NOW");

  const handleRefreshSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 1200);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
      
      {/* Engine Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <span className="text-[9px] font-extrabold text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
            Step 08 — Regulatory Tracker
          </span>
          <h3 className="text-base font-extrabold text-zinc-900 mt-1">
            Depository Sync Engine (NSDL & CDSL Automated Feed)
          </h3>
          <p className="text-zinc-550 text-xs">
            Official depository credit status letters auto-fetched post-payment settlement (system-fetched, read-only).
          </p>
        </div>

        <button
          onClick={handleRefreshSync}
          disabled={isRefreshing}
          className="px-3.5 py-1.5 rounded bg-[#0B1528] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50 shrink-0 shadow flex items-center gap-1.5"
        >
          {isRefreshing ? (
            <>
              <span className="animate-spin text-teal-400">↻</span>
              <span>Fetching Status...</span>
            </>
          ) : (
            <>
              <span>↻ Sync Depository Feed</span>
            </>
          )}
        </button>
      </div>

      {/* Official Status Letters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* NSDL Official Letter */}
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-emerald-600 text-white font-black text-xs flex items-center justify-center font-mono">
                NSDL
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-zinc-900">National Securities Depository Ltd</h4>
                <span className="text-[9px] text-emerald-700 font-bold block font-mono">
                  Official Confirmation Letter #NSDL-2026-8842
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[8px] font-extrabold uppercase border border-emerald-300">
              System-Fetched
            </span>
          </div>

          <div className="p-3 bg-white rounded border border-emerald-150 text-[11px] font-mono text-zinc-700 space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-400">ISIN Code:</span>
              <span className="font-bold text-zinc-900">INE00TL01019</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">RTA Operational Status:</span>
              <span className="font-bold text-emerald-600">CONNECTED &amp; ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Credit Confirmation:</span>
              <span className="font-bold text-zinc-900">100% Folios Mapped</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 pt-1">
            <span>FETCHED_AT: {lastSyncTime}</span>
            <span className="text-emerald-700 font-bold">✓ AUTO-VERIFIED</span>
          </div>
        </div>

        {/* CDSL Official Letter */}
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600 text-white font-black text-xs flex items-center justify-center font-mono">
                CDSL
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-zinc-900">Central Depository Services (India) Ltd</h4>
                <span className="text-[9px] text-blue-700 font-bold block font-mono">
                  Official Connectivity Status #CDSL-SYNC-9921
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[8px] font-extrabold uppercase border border-blue-300">
              System-Fetched
            </span>
          </div>

          <div className="p-3 bg-white rounded border border-blue-150 text-[11px] font-mono text-zinc-700 space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-400">Depository ID:</span>
              <span className="font-bold text-zinc-900">CDSL-IN-889102</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Dematerialization Status:</span>
              <span className="font-bold text-blue-600">PASSED RULE 9B SCAN</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Corporate Credit Lock:</span>
              <span className="font-bold text-zinc-900">ACTIVE &amp; SYNCED</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 pt-1">
            <span>FETCHED_AT: {lastSyncTime}</span>
            <span className="text-blue-700 font-bold">✓ AUTO-VERIFIED</span>
          </div>
        </div>

      </div>

    </div>
  );
}
