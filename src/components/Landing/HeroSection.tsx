"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const interactiveServices = [
  {
    id: 1,
    title: "Depository Dematerialisation (DRF)",
    category: "DEPOSITORY",
    tat: "TAT: 7 Days",
    rule: "SEBI Master Circular / NSDL-CDSL",
    status: "SEBI AUDIT READY",
    docs: ["Form DRF (Demat Request)", "Form ISR-1 (KYC Updation)", "Original Share Certificates"],
  },
  {
    id: 2,
    title: "Dividend & NACH Electronic Payout",
    category: "PAYOUTS",
    tat: "TAT: 2 Days",
    rule: "LODR Reg 43A / Banking Gateway",
    status: "AUTO DISPATCHED",
    docs: ["Form ISR-2 (Bank Mandate Attestation)", "Cancelled Cheque Leaf", "CML Depository Proof"],
  },
  {
    id: 3,
    title: "Secretarial Audit Certificate",
    category: "GOVERNANCE",
    tat: "TAT: 1 Day",
    rule: "SEBI LODR Clause 47(c)",
    status: "PCS CERTIFIED",
    docs: ["Quarterly Share Transfer Statement", "PCS Certification Copy", "NSDL-CDSL BENPOS Register"],
  },
  {
    id: 4,
    title: "Investor KYC & Bank Updation",
    category: "PHYSICAL",
    tat: "TAT: 3 Days",
    rule: "SEBI ISR-1 / ISR-2 / ISR-3",
    status: "RTA VERIFIED",
    docs: ["Form ISR-1 (Investor Details)", "Form ISR-3 (Opt-out Nomination)", "Self-Attested PAN & Aadhaar"],
  },
  {
    id: 5,
    title: "IEPF Claim & Duplicate Share Recovery",
    category: "RECOVERY",
    tat: "TAT: 15 Days",
    rule: "IEPF Rules 2016 / MCA",
    status: "GOVT CLEARANCE",
    docs: ["Form IEPF-5 Verification Report", "Indemnity Bond & Affidavit", "FIR Copy / Newspaper Publication"],
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewPhase, setViewPhase] = useState<"list" | "documents" | "login">("list");
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Phase 1: List selection -> Phase 2: Documents view -> Phase 3: Login view -> Reset
    const cycle = async () => {
      // Step 1: Click on active item
      setIsClicking(true);
      await new Promise((r) => setTimeout(r, 400));
      setIsClicking(false);

      // Expand to documents view
      setViewPhase("documents");
      await new Promise((r) => setTimeout(r, 2200));

      // Click on Login button
      setIsClicking(true);
      await new Promise((r) => setTimeout(r, 400));
      setIsClicking(false);

      // Show Login success modal
      setViewPhase("login");
      await new Promise((r) => setTimeout(r, 2000));

      // Reset to list view and advance to next service
      setViewPhase("list");
      setActiveIndex((prev) => (prev + 1) % interactiveServices.length);
    };

    const interval = setInterval(cycle, 5200);
    return () => clearInterval(interval);
  }, []);

  const activeService = interactiveServices[activeIndex];

  return (
    <section id="home" className="relative bg-white text-slate-900 py-10 md:py-20 font-sans">
      <div className="container mx-auto flex flex-col md:flex-row px-6 items-center">
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-left mb-8 md:mb-0 pr-0 md:pr-8">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-slate-900 animate-fade-in-up">
            Seamless{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent animate-text-shimmer">
              Registrar &amp; Transfer Agent
            </span>{" "}
            Solutions
          </h1>

          <p className="mb-8 text-lg text-slate-600 sm:text-xl leading-relaxed animate-fade-in-up-delay-1">
            We offer comprehensive Registrar &amp; Transfer Agent (RTA) services
            anchored in strong regulatory expertise, secure technology, and
            transparent investor servicing—ensuring accuracy, compliance, and
            long-term confidence.
          </p>

          {/* CTA buttons in 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 max-w-lg">
            <Link
              href="/companies"
              className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700 shadow-xs text-xs uppercase tracking-wider gap-2 text-center"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Companies</span>
            </Link>

            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center rounded-lg bg-[#0B1528] px-4 py-3 font-bold text-white transition hover:bg-[#1A2B4C] shadow-xs uppercase tracking-wider text-xs gap-2 text-center"
            >
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Client Portal</span>
            </Link>

            <Link
              href="/investor/grievance-redressal"
              className="w-full inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-rose-700 px-4 py-3 font-bold transition hover:bg-red-100 text-xs uppercase tracking-wider gap-2 text-center"
            >
              <svg className="w-4 h-4 text-rose-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Grievance Desk</span>
            </Link>

            <Link
              href="/track-request"
              className="w-full inline-flex items-center justify-center rounded-lg border border-slate-300 bg-slate-50 text-slate-700 px-4 py-3 font-bold transition hover:bg-slate-100 text-xs uppercase tracking-wider gap-2 text-center"
            >
              <svg className="w-4 h-4 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Track Request</span>
            </Link>
          </div>
        </div>

        {/* Interactive Dynamic Component Frame with Zoom & Expansion */}
        <div className="flex w-full md:w-1/2 items-center justify-center">
          <div className={`w-full max-w-md p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs transition-all duration-500 ${
            viewPhase !== "list" ? "scale-102 shadow-md border-indigo-300" : ""
          }`}>
            <div className="bg-white rounded-xl p-5 border border-slate-100 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-700 tracking-wider uppercase ml-1">
                    SEBI RTA Service Portal
                  </span>
                </div>
                <span className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
                  viewPhase === "login" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300" 
                    : "bg-indigo-50 text-indigo-700 border-indigo-200"
                }`}>
                  {viewPhase === "list" ? "STEP 1: SELECT" : viewPhase === "documents" ? "STEP 2: DOCUMENTS" : "STEP 3: AUTHENTICATE"}
                </span>
              </div>

              {/* VIEW PHASE 1: List View */}
              {viewPhase === "list" && (
                <div className="space-y-2 relative flex-1">
                  {/* Simulated Mouse Cursor for Item Selection */}
                  <div
                    className="absolute left-5 z-20 pointer-events-none transition-all duration-700 ease-in-out"
                    style={{
                      top: `${activeIndex * 56 + 14}px`,
                      transform: isClicking ? "scale(0.8)" : "scale(1)",
                    }}
                  >
                    <div className="relative">
                      <svg className="w-4.5 h-4.5 text-indigo-600 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3l7 18 3-7 7-3L3 3z" />
                      </svg>
                      {isClicking && (
                        <span className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-indigo-400/30 animate-ping" />
                      )}
                    </div>
                  </div>

                  {interactiveServices.map((service, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setActiveIndex(index)}
                        className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between text-xs ${
                          isActive
                            ? "bg-indigo-50/90 border-indigo-300 text-indigo-950 shadow-2xs pl-8 font-bold"
                            : "bg-slate-50/50 border-slate-150 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                            isActive ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"
                          }`}>
                            {service.id}
                          </span>
                          <span className="truncate">{service.title}</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isActive ? "bg-white text-indigo-700 border border-indigo-200" : "bg-slate-100 text-slate-500"
                        }`}>
                          {service.tat}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* VIEW PHASE 2: Expanded Documents View */}
              {viewPhase === "documents" && (
                <div className="flex-1 space-y-3 animate-fade-in-up relative">
                  <div className="bg-indigo-50/80 border border-indigo-200 p-3 rounded-xl">
                    <div className="text-[10px] font-mono font-bold text-indigo-700 uppercase tracking-wider">
                      Selected RTA Module:
                    </div>
                    <div className="text-sm font-extrabold text-slate-900">
                      {activeService.title}
                    </div>
                    <div className="text-xs text-indigo-800 font-mono mt-0.5">
                      {activeService.rule} • {activeService.tat}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10.5px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Statutory Deliverables / Forms Checklist:</span>
                      <span className="text-emerald-700 font-bold">3 Files Verified</span>
                    </div>
                    <div className="space-y-1.5">
                      {activeService.docs.map((doc, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                          <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="truncate">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Mouse Cursor hovering over Login button */}
                  <div
                    className="absolute right-12 bottom-1 z-20 pointer-events-none transition-all duration-500 ease-in-out"
                    style={{
                      transform: isClicking ? "scale(0.8)" : "scale(1)",
                    }}
                  >
                    <div className="relative">
                      <svg className="w-5 h-5 text-indigo-600 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3l7 18 3-7 7-3L3 3z" />
                      </svg>
                      {isClicking && (
                        <span className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-indigo-400/30 animate-ping" />
                      )}
                    </div>
                  </div>

                  <Link
                    href="/login"
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Click to Login &amp; Dispatch Request</span>
                  </Link>
                </div>
              )}

              {/* VIEW PHASE 3: Simulated Login Success State */}
              {viewPhase === "login" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in-up py-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300 shadow-xs">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">SEBI Client Portal Verified</h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-xs">
                      Accessing encrypted statutory vault for <strong>{activeService.category}</strong> processing.
                    </p>
                  </div>
                  <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 w-full">
                    <span className="text-slate-500">Service Ticket ID:</span> <strong>SRN-2026-TLI-8491</strong>
                  </div>
                </div>
              )}

              {/* Active Service Footer Ribbon */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10.5px] font-mono text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active Category: <strong className="text-slate-900 font-bold">{activeService.category}</strong>
                </span>
                <Link href="/services" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline">
                  Full RTA Suite &rarr;
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
