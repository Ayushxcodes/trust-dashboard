"use client";

import { useState } from "react";

export default function EquityCalculator() {
  const [paidUpEquity, setPaidUpEquity] = useState(50000000); // ₹5 Cr
  const [reserves, setReserves] = useState(25000000); // ₹2.5 Cr
  const [intangibles, setIntangibles] = useState(5000000); // ₹50 Lakhs

  const calculatedNetWorth = paidUpEquity + reserves - intangibles;
  const isEquityStable = calculatedNetWorth >= 10000000; // >= 1 Cr

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-250 space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest block font-mono">
            Step 05 — Financial Attestation Calculator
          </span>
          <h5 className="text-xs font-bold text-slate-900">Cross-Checked Equity Stability Calculator</h5>
        </div>
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
          isEquityStable ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : "bg-rose-100 text-rose-700"
        }`}>
          {isEquityStable ? "● Equity Stable (Rule 9B Compliant)" : "● Inadequate Capital"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block text-[9px] font-bold text-slate-500 uppercase">Paid-Up Equity Capital</label>
          <input
            type="number"
            value={paidUpEquity}
            onChange={(e) => setPaidUpEquity(Number(e.target.value))}
            className="w-full mt-1 px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono font-bold text-xs"
          />
        </div>
        <div>
          <label className="block text-[9px] font-bold text-slate-500 uppercase">Free Reserves & Surplus</label>
          <input
            type="number"
            value={reserves}
            onChange={(e) => setReserves(Number(e.target.value))}
            className="w-full mt-1 px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono font-bold text-xs"
          />
        </div>
        <div>
          <label className="block text-[9px] font-bold text-slate-500 uppercase font-mono">Deduct Intangible Assets</label>
          <input
            type="number"
            value={intangibles}
            onChange={(e) => setIntangibles(Number(e.target.value))}
            className="w-full mt-1 px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono font-bold text-xs text-rose-600"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
        <span className="text-[10px] text-slate-500 font-semibold">
          Attested Calculated Net Worth:
        </span>
        <span className="font-extrabold text-slate-900 font-mono text-sm">
          {formatINR(calculatedNetWorth)}
        </span>
      </div>
    </div>
  );
}
