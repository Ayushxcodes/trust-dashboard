"use client";

import { useState } from "react";

export default function CommercialTab({ companyName }: { companyName: string }) {
  // Initialize values dynamically based on selected company
  const getInitialValues = (name: string) => {
    if (name.toLowerCase().includes("stark")) {
      return { cap: 400000000, fol: 15000 };
    }
    if (name.toLowerCase().includes("lex")) {
      return { cap: 7500000, fol: 2000 };
    }
    return { cap: 80000000, fol: 5000 }; // Acme Corporation / default
  };

  const init = getInitialValues(companyName);
  const [capital, setCapital] = useState(init.cap);
  const [folios, setFolios] = useState(init.fol);
  const [isSettling, setIsSettling] = useState(false);

  // Format currency in Indian numbering system
  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Pricing comparison ledger parameters
  const legacyAdmissions = 2500000; // ₹25,00,000
  const trustlinkAdmissions = 0; // Waived

  const legacyAMC = 4500000; // ₹45,00,000
  const trustlinkAMC = 17500; // ₹17,500

  const legacyCustody = folios * 12; // ₹12 per folio
  const trustlinkCustody = folios * 8; // ₹8 per folio

  const legacyTotal = legacyAdmissions + legacyAMC + legacyCustody;
  const trustlinkTotal = trustlinkAdmissions + trustlinkAMC + trustlinkCustody;
  const estimatedSavings = legacyTotal - trustlinkTotal;

  // Commercial summary items
  const subscriptionFee = 1500000; // ₹15,00,000
  const upfrontLockup = 2500; // ₹2,500.00
  const securityDeposit = 5000000; // ₹50,00,000
  
  // Bold text calculates total payment required: ₹67,500.00
  const totalPayable = 67500.0;

  const handleInitializeFlow = () => {
    setIsSettling(true);
    setTimeout(() => {
      alert("Commercial settlement flow initialized successfully. Bank escrow gateway credit lock active.");
      setIsSettling(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2 Columns: Share Capital Slider & Fee Comparison */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded uppercase tracking-wider">
                Live Benchmark
              </span>
              
              {/* Active Client Identifier */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-zinc-450 uppercase tracking-widest block">
                  Active Client:
                </span>
                <span className="text-xs font-bold text-[#0B1528] bg-zinc-100 px-2.5 py-1 rounded">
                  {companyName}
                </span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 mt-3">Commercial Architecture</h3>
              <p className="text-zinc-550 text-xs">
                Configure share capital parameters to calculate institutional settlement fees.
              </p>
            </div>
          </div>

          {/* Paid Up Share Capital Slider */}
          <div className="space-y-4 p-5 rounded-xl bg-zinc-50 border border-zinc-150">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Paid-Up Share Capital (INR)
              </span>
              <span className="text-lg font-extrabold text-zinc-900">
                {formatINR(capital)}
              </span>
            </div>
            <input
              type="range"
              min={1000000} // 10 Lakhs (1M)
              max={500000000} // 50 Crores (500M)
              step={1000000}
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#0B1528]"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>₹ 1M</span>
              <span>₹ 500M</span>
            </div>
          </div>

          {/* Folios slider for dynamic custody fee */}
          <div className="space-y-4 p-5 rounded-xl bg-zinc-50 border border-zinc-150 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Estimated Corporate Folios
              </span>
              <span className="text-base font-bold text-zinc-900">
                {folios.toLocaleString()} Active Folios
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={20000}
              step={500}
              value={folios}
              onChange={(e) => setFolios(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#0B1528]"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>500</span>
              <span>20,000</span>
            </div>
          </div>
        </div>

        {/* Pricing Comparison Ledger */}
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
            Pricing Comparison Ledger
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-450 uppercase tracking-wider font-semibold">
                  <th className="pb-3">Fee Component</th>
                  <th className="pb-3 text-right">Legacy Providers</th>
                  <th className="pb-3 text-right text-teal-600">TRUSTLINK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                <tr>
                  <td className="py-3 font-medium">Admissions & Processing</td>
                  <td className="py-3 text-right text-zinc-550">{formatINR(legacyAdmissions)}</td>
                  <td className="py-3 text-right text-emerald-600 font-extrabold">₹ 0 (Waived)</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Annual Maintenance (AMC)</td>
                  <td className="py-3 text-right text-zinc-550">{formatINR(legacyAMC)}</td>
                  <td className="py-3 text-right text-zinc-900 font-extrabold">{formatINR(trustlinkAMC)}</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Custody Fee (Per Folio)</td>
                  <td className="py-3 text-right text-zinc-550">{formatINR(legacyCustody)} <span className="text-[10px] text-zinc-400">(@ ₹12)</span></td>
                  <td className="py-3 text-right text-zinc-900 font-extrabold">{formatINR(trustlinkCustody)} <span className="text-[10px] text-zinc-400">(@ ₹8)</span></td>
                </tr>
                <tr className="bg-emerald-50/50 font-bold text-zinc-900">
                  <td className="py-3.5 px-2 rounded-l-lg text-emerald-800">Estimated Annual Saving</td>
                  <td className="py-3.5 text-right text-rose-600">Standard Rate</td>
                  <td className="py-3.5 px-2 text-right text-emerald-600 rounded-r-lg">
                    {formatINR(estimatedSavings)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Secure Banking Gateway Selector */}
        <div className="p-5 rounded-xl border border-zinc-200 bg-white space-y-4 shadow-sm">
          <div>
            <span className="block text-xs font-bold text-zinc-800">Secure Banking Gateway</span>
            <span className="block text-[10px] text-zinc-450">Exposes direct institutional settlement options for active transfers.</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <button className="py-3 rounded border border-zinc-200 hover:border-indigo-500 hover:bg-indigo-50/20 text-center font-extrabold text-[10px] uppercase text-zinc-700 cursor-pointer">
              NetBanking / API
            </button>
            <button className="py-3 rounded border border-zinc-200 hover:border-indigo-500 hover:bg-indigo-50/20 text-center font-extrabold text-[10px] uppercase text-zinc-700 cursor-pointer">
              Escrow Route (RTGS)
            </button>
            <button className="py-3 rounded border border-zinc-200 hover:border-indigo-500 hover:bg-indigo-50/20 text-center font-extrabold text-[10px] uppercase text-zinc-700 cursor-pointer">
              Corporate Cards
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Commercial Summary */}
      <div className="space-y-6">
        <div className="bg-[#121B2A] text-zinc-100 rounded-xl p-6 shadow-lg space-y-6">
          <div>
            <span className="text-[9px] font-bold text-teal-400 tracking-wider uppercase block">
              Global Settlement
            </span>
            <h4 className="text-sm font-bold text-white mt-1">Commercial Summary</h4>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Registry Subscription</span>
              <span className="font-semibold">{formatINR(subscriptionFee)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Mandatory Upfront Lockup</span>
              <span className="font-semibold">{formatINR(upfrontLockup)}</span>
            </div>
            
            {/* Security Deposit with Tooltip */}
            <div className="flex justify-between items-start flex-col gap-1 p-3 rounded bg-zinc-900 border border-zinc-800">
              <div className="flex justify-between items-center w-full">
                <span className="text-zinc-400">Depository Security Deposit</span>
                <span className="font-semibold">{formatINR(securityDeposit)}</span>
              </div>
              <span className="text-[8px] font-extrabold text-teal-400 uppercase tracking-wider font-mono">
                2-Year Mandatory Lock-In Rule
              </span>
            </div>
            
            <div className="border-t border-zinc-800 pt-4 flex justify-between items-end">
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase tracking-wider">Total Payment Required</span>
                <span className="text-[9px] text-zinc-500 font-mono">Exclusive of 18% GST</span>
              </div>
              <span className="text-xl font-black text-teal-400">
                {formatINR(totalPayable)}
              </span>
            </div>
          </div>

          {/* Technical sub-warning */}
          <div className="p-3.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 flex gap-2">
            <svg className="w-4.5 h-4.5 text-teal-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Mandatory Depository lockup and registry security credits are automatically verified upon settlement. Refundable upon dissolution.
            </span>
          </div>

          <button
            onClick={handleInitializeFlow}
            disabled={isSettling}
            className="w-full py-3 rounded bg-[#4ef3b2] hover:bg-[#3ce2a1] text-[#0B1528] font-black text-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer uppercase shadow"
          >
            {isSettling ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-zinc-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing Escrow...
              </>
            ) : (
              "Initialize Settlement Flow"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
