"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ServiceLedgerItem {
  id: string;
  title: string;
  category: string;
  tat: string;
  sebiRule: string;
  description: string;
  deliverables: string[];
  status: "ACTIVE" | "VERIFIED" | "COMPLIANT";
}

const ledgerData: ServiceLedgerItem[] = [
  {
    id: "RTA-SRV-01",
    title: "Securities & Registry Maintenance",
    category: "Core Registry",
    tat: "Real-time Sync",
    sebiRule: "SEBI RTA Reg 1993 / Circular 2023",
    description: "Maintaining official Securities Registry of Investors and providing electronic services for equity, debt, and hybrid instruments.",
    deliverables: ["Master Shareholder Register", "Beneficiary Position (BENPOS) Sync", "Debt & Bondholder Registry"],
    status: "VERIFIED",
  },
  {
    id: "RTA-SRV-02",
    title: "NSDL / CDSL Demat & Remat",
    category: "Depository Ops",
    tat: "15 Days TAT",
    sebiRule: "SEBI (D&P) Regulations 2018",
    description: "End-to-end Dematerialisation (DRF) and Rematerialisation (RRF) processing, ISIN Activation, and Depository Corporate Actions.",
    deliverables: ["DRF / RRF Electronic Verification", "ISIN Creation & Corporate Action", "Pledge & Freeze Processing"],
    status: "ACTIVE",
  },
  {
    id: "RTA-SRV-03",
    title: "Share Certificates & Transmission",
    category: "Physical Folios",
    tat: "21 Days TAT",
    sebiRule: "SEBI LODR Reg 39(3) / ISR Series",
    description: "Issuance of Duplicate Share Certificates (Form ISR-4), Name Transposition, Transmission upon death, and Certificate Split / Consolidation.",
    deliverables: ["Form ISR-4 Letter of Confirmation", "Legal Heir Transmission Audit", "Name Correction & Endorsement"],
    status: "COMPLIANT",
  },
  {
    id: "RTA-SRV-04",
    title: "Statutory Registers & MCA Audits",
    category: "Compliance",
    tat: "Quarterly / Annual",
    sebiRule: "Companies Act Sec 88 & SEBI Reg 7(3)",
    description: "Maintaining Register of Transfers, Debenture Holders, Shareholding Pattern Reports, Secretarial Audit Certificates, and Clause 47(c) filings.",
    deliverables: ["Reg 7(3) Compliance Certificate", "PAS-6 Demat Reconciliation", "MGT-7 Annual Return Data"],
    status: "VERIFIED",
  },
  {
    id: "RTA-SRV-05",
    title: "Issues of Shares (IPO / Bonus / Rights)",
    category: "Corporate Action",
    tat: "6 Days Allotment",
    sebiRule: "SEBI ICDR Regulations 2018",
    description: "Complete handling of IPOs, FPOs, Bonus Issues, Rights Issues, Warrant Conversions, and Share Split distribution.",
    deliverables: ["Allotment Basis Finalisation", "CAN & Refund Processing", "Credit to Depository Accounts"],
    status: "ACTIVE",
  },
  {
    id: "RTA-SRV-06",
    title: "AGM / EGM & e-Voting Management",
    category: "Investor Governance",
    tat: "Event-Based",
    sebiRule: "SEBI LODR Reg 44 & MCA Circulars",
    description: "Arrangements for AGM/EGM, Postal Ballot execution, Remote e-Voting integration, Attendance Slips, and Scrutinizer Reports.",
    deliverables: ["e-Voting Platform Integration", "Attendance & Proxy Register", "Scrutinizer Polling Summary"],
    status: "COMPLIANT",
  },
  {
    id: "RTA-SRV-07",
    title: "Buyback, Delisting & Mergers",
    category: "Corporate Action",
    tat: "Tender Window SLA",
    sebiRule: "SEBI Buy-Back / Delisting Reg",
    description: "Specialized processing for Share Buybacks, De-listing tender offers, Mergers, Amalgamations, and Scheme of Arrangements.",
    deliverables: ["Tender Offer Registry Verification", "Escrow & Payment Processing", "Extinguishment Certificates"],
    status: "VERIFIED",
  },
  {
    id: "RTA-SRV-08",
    title: "Rectification & Grievance Redressal",
    category: "Investor Servicing",
    tat: "7 Days TAT",
    sebiRule: "SEBI SCORES 2.0 & SMART ODR",
    description: "Structured Level-1 to Level-3 investor complaint handling, fraction elimination, and dispute escalation to SCORES / SMART ODR.",
    deliverables: ["Root-cause Grievance Reports", "SCORES 2.0 API Direct Sync", "SMART ODR Conciliation File"],
    status: "ACTIVE",
  },
  {
    id: "RTA-SRV-09",
    title: "Investor Communications & Dividends",
    category: "Payouts & Notice",
    tat: "15 Days TAT",
    sebiRule: "SEBI Circular on Unclaimed Dividend",
    description: "Dispatch of Dividend intimations, ECS/NACH credit processing, Statutory Notices, Call Notices, and IEPF Account Transfer coordination.",
    deliverables: ["Direct Bank Mandate Credit (NECS)", "Unclaimed Dividend Ledger", "IEPF-2 Transfer Statements"],
    status: "COMPLIANT",
  },
  {
    id: "RTA-SRV-10",
    title: "ESOP Corporate Actions & Lock-in",
    category: "Equity Plans",
    tat: "5 Days TAT",
    sebiRule: "SEBI (SBEB & SE) Reg 2021",
    description: "Servicing Employee Stock Option Plans (ESOPs), Lock-in release tracking, and partly paid-up share call servicing.",
    deliverables: ["ESOP Exercise Register", "Depository Lock-in Tagging", "Call Endorsement Ledger"],
    status: "VERIFIED",
  },
];

export default function OurServices() {
  const [activeId, setActiveId] = useState<string>("RTA-SRV-01");
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulsingId, setPulsingId] = useState<string | null>("RTA-SRV-01");

  const activeItem = ledgerData.find((item) => item.id === activeId) || ledgerData[0];

  // Auto rotate ledger entries with pulse effect
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = ledgerData.findIndex((item) => item.id === currentId);
        const nextIndex = (currentIndex + 1) % ledgerData.length;
        const nextId = ledgerData[nextIndex].id;
        setPulsingId(nextId);
        setTimeout(() => setPulsingId(null), 600);
        return nextId;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    setAutoRotate(false);
    setPulsingId(id);
    setTimeout(() => setPulsingId(null), 600);
  };

  return (
    <section id="services" className="relative bg-white text-slate-900 py-20 border-t border-slate-200">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Official RTA{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Services Register
            </span>
          </h2>
        </div>

        {/* Ledger Console Interface Container */}
        <div className="max-w-6xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="bg-slate-900 px-6 py-3.5 border-b border-slate-800 text-white flex items-center justify-between gap-4">
            
            {/* Window Controls & Title */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>
              <span className="text-xs font-mono font-bold text-white pl-2 border-l border-slate-700 tracking-wider">
                TRUSTLINK_RTA_REGISTER_V4.2
              </span>
            </div>

            {/* Mode Tag */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-200 font-bold">
              <span>AUTO-CYCLE:</span>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-3 py-1 rounded text-[11px] font-extrabold tracking-wider transition-colors ${
                  autoRotate
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {autoRotate ? "ON" : "OFF"}
              </button>
            </div>
          </div>

          {/* Main Ledger Split View */}
          <div className="grid lg:grid-cols-12 min-h-[560px]">
            
            {/* Left Ledger Navigation Table (7 cols) - No Entry Codes */}
            <div className="lg:col-span-7 border-r border-slate-200 p-4 sm:p-6 overflow-y-auto max-h-[580px] space-y-2 font-mono scrollbar-thin bg-slate-50/50">
              <div className="grid grid-cols-12 text-[10px] uppercase font-extrabold text-slate-500 pb-3 border-b border-slate-200 px-3 tracking-wider">
                <span className="col-span-8">SERVICE TITLE &amp; CATEGORY</span>
                <span className="col-span-4 text-right">SEBI SLA</span>
              </div>

              {ledgerData.map((item) => {
                const isSelected = item.id === activeId;
                const isPulsing = item.id === pulsingId;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full text-left grid grid-cols-12 items-center p-3.5 rounded-xl transition-all duration-300 group text-xs border ${
                      isSelected
                        ? `bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/25 ${
                            isPulsing ? "ring-4 ring-indigo-400/50 scale-[1.02]" : "scale-100"
                          }`
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {/* Title & Category with Indicator Bullet */}
                    <div className="col-span-8 pr-2 flex items-start gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full mt-1 shrink-0 transition-transform duration-300 ${
                          isSelected
                            ? "bg-white shadow-[0_0_8px_#ffffff] scale-125"
                            : "bg-slate-300 group-hover:bg-slate-400"
                        }`}
                      />
                      <div className="truncate">
                        <span className={`font-sans font-bold block text-[13.5px] truncate ${isSelected ? "text-white" : "text-slate-900"}`}>
                          {item.title}
                        </span>
                        <span className={`text-[10.5px] font-mono ${isSelected ? "text-indigo-200" : "text-slate-400"}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* SLA Badge */}
                    <div className="col-span-4 text-right">
                      <span
                        className={`inline-block text-[10.5px] font-bold px-2.5 py-1 rounded-md border transition-colors ${
                          isSelected
                            ? "bg-white text-indigo-900 border-white font-black"
                            : "bg-slate-100 border-slate-200 text-slate-600"
                        }`}
                      >
                        {item.tat}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Active Inspection Card (5 cols) */}
            <div className="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 flex flex-col justify-between relative">
              <div key={activeItem.id} className="animate-[fadeIn_0.3s_ease-in-out]">
                {/* Header Metadata */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] font-mono text-indigo-600 font-extrabold uppercase tracking-widest block mb-0.5">
                      RTA REGISTER INSPECTION
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">
                      REF ID: {activeItem.id}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
                    {activeItem.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">
                  {activeItem.title}
                </h3>

                {/* Regulation Badge with SVG Icon */}
                <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-mono font-bold">
                  <svg className="w-4 h-4 text-indigo-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-4 9 4M4 10h16v11H4V10zM12 2v20" />
                  </svg>
                  <span>{activeItem.sebiRule}</span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                  {activeItem.description}
                </p>

                {/* Scope & Deliverables */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-mono font-extrabold uppercase text-slate-500 tracking-wider block">
                    Statutory Deliverables:
                  </span>
                  {activeItem.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-semibold">
                      <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                <Link
                  href="/services"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  Explore Service Scope &rarr;
                </Link>
                <Link
                  href="/track-request"
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs uppercase tracking-wider border border-slate-200 transition-colors"
                >
                  Track SRN
                </Link>
              </div>

            </div>

          </div>

          {/* Footer Ledger Bar */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-600 gap-2 font-bold">
            <div>STATUTORY CATEGORY I RTA • REGISTERED WITH SEBI (REG. INR000004510)</div>
            <div className="text-indigo-700 font-extrabold">100% SEBI AUDIT READY</div>
          </div>

        </div>

      </div>
    </section>
  );
}
