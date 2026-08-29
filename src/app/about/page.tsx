"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import Link from "next/link";

function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export default function AboutUsPage() {
  const coreStats = [
    {
      label: "SEBI REGISTRATION",
      value: "INR000004510",
      detail: "Category I Permanent Registration",
      icon: (
        <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: "CORPORATE CLIENTS",
      value: "100+",
      numericEnd: 100,
      suffix: "+",
      detail: "Equity, Debt & Hybrid Issuers",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-1-4h.01M9 16h.01M9 12h.01M9 8h.01M15 16h.01M15 12h.01M15 8h.01" />
        </svg>
      ),
    },
    {
      label: "INVESTOR FOLIOS",
      value: "500,000+",
      numericEnd: 500000,
      suffix: "+",
      detail: "Active Shareholder Records",
      icon: (
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: "DATA SECURITY",
      value: "ISO-Grade",
      detail: "Encrypted PII & MFA Vaults",
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  const pillars = [
    {
      title: "Category I RTA Licensing",
      desc: "Operating under permanent registration with strict adherence to SEBI Master Circulars for RTAs, Companies Act Section 88, and MCA filing protocols.",
      badge: "VERIFIED",
    },
    {
      title: "Dual Depository Integration",
      desc: "Full electronic integration with NSDL and CDSL for seamless Dematerialisation (DRF), Rematerialisation (RRF), corporate actions, and daily BENPOS reconciliation.",
      badge: "ACTIVE",
    },
    {
      title: "Transparent Escalations",
      desc: "Headed by Compliance & Nodal Officer Mr. Nishant Khemani, enforcing a 3-level grievance mechanism integrated directly with SEBI SCORES 2.0 & SMART ODR.",
      badge: "COMPLIANT",
    },
    {
      title: "Encrypted Document Vault",
      desc: "Bank-grade PII protection, multi-factor authentication, immutable audit trails, and strict privacy protocols for all investor shareholding records.",
      badge: "SECURE",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Navbar />
      
      <main className="flex-1">
        
        {/* Tamed & Clean Hero Header */}
        <section className="bg-slate-50 border-b border-slate-200 py-12 sm:py-16">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            {/* Main Title - Tamed & Professional */}
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              About Trustlink Investor Services
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              Providing verifiable, compliant, and technology-driven RTA services to corporate issuers and retail investors across India.
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/investor/investor-charter"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>SEBI Investor Charter</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/grievance"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors shadow-xs"
              >
                <span>Grievance Desk</span>
              </Link>
            </div>

          </div>
        </section>

        {/* Executive Stats Strip */}
        <section className="bg-white py-10 border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {coreStats.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/70 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-indigo-200 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10.5px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 tracking-tight mb-0.5 font-mono">
                      {item.numericEnd ? (
                        <CountUp end={item.numericEnd} suffix={item.suffix || ""} duration={2000} />
                      ) : (
                        item.value
                      )}
                    </div>
                    <div className="text-xs font-medium text-slate-600">
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Profile Breakdown */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column Text */}
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 block">
                  CORPORATE PROFILE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                  Built on Transparency, Precision &amp; Speed
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Trustlink Investor Services acts as a seamless corporate interface managing equity, debt, dividend disbursements, and depository sync for over 100 corporate issuers.
                </p>
                <div className="pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">SEBI Reg No:</span>
                      <span className="font-bold text-indigo-700">INR000004510</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Entity Type:</span>
                      <span className="font-bold text-slate-800">Category I Permanent RTA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nodal Officer:</span>
                      <span className="font-bold text-slate-800">Mr. Nishant Khemani</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Pillar Cards */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {pillars.map((p, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50/80 rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-indigo-200 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xs font-mono font-bold text-indigo-600">0{idx + 1}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {p.badge}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* SEBI Compliance Verification Desk Card */}
        <section className="py-14 bg-slate-50 border-t border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 block mb-1">
                    VERIFICATION DESK
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    SEBI Category I Governance Standard
                  </h2>
                </div>
                <div className="px-3 py-1 rounded bg-indigo-50 border border-indigo-200 text-indigo-900 font-mono text-xs font-bold">
                  SEBI Reg No: INR000004510
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Master Circular Compliance</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Full adherence to SEBI Master Circulars for RTAs, ensuring standardized investor service TATs across all processes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">SCORES 2.0 &amp; SMART ODR</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    API integration with SEBI SCORES 2.0 portal for real-time grievance escalation and transparent dispute resolution.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center mb-2.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Audit-Ready Registers</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Maintaining Section 88 MCA statutory registers, PAS-6 reconciliation, and Clause 47(c) secretarial audit filings.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Vision & Mission Cards */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 block mb-1">
                FOUNDATIONAL PILLARS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Our Vision &amp; Mission
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Vision Card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-200 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-5 shadow-xs">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                    To be India&apos;s most trusted and technologically advanced SEBI-registered Registrar and Share Transfer Agent, recognized for absolute regulatory compliance, operational precision, and investor satisfaction.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-indigo-700 uppercase tracking-wider">
                    TRUST • COMPLIANCE • SPEED
                  </span>
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-200 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-5 shadow-xs">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
                  <ul className="space-y-3 text-slate-700 text-xs font-medium">
                    <li className="flex items-start gap-2.5">
                      <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Deliver RTA services conforming strictly to SEBI Master Circulars</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Maintain zero-error shareholder registries and depository records</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Provide transparent, fast turnaround time (TAT) grievance resolution</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Uphold robust cyber resilience, encrypted vaults, and data privacy</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200">
                  <Link
                    href="/investor/investor-charter"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider"
                  >
                    <span>Read SEBI Investor Charter</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
