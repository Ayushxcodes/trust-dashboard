import type { Metadata } from "next";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import Annexure25View from "@/components/Investor/Annexure25View";

export const metadata: Metadata = {
  title: "Annexure-25: Investor Charter for RTAs | Trustlink Investor Services RTA",
  description:
    "Official Investor Charter for Registrars to an Issue and Share Transfer Agents (RTAs) under SEBI Master Circular - Annexure-25, featuring statutory service timelines, rights, DOs and DON'Ts, and SMARTODR escalation mechanism.",
};

export default function InvestorCharterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Header Banner */}
      <header className="bg-gradient-to-br from-[#0B1528] via-[#0F1D38] to-slate-900 text-white py-14 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider rounded-full mb-3 border border-indigo-500/30">
            <span>SEBI Master Circular for RTAs</span>
            <span>•</span>
            <span className="text-white">Annexure-25</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 text-white">
            Investor Charter for RTAs
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Statutory framework detailing vision, mission, service commitments, prescribed timelines, investor rights, mandatory DOs &amp; DON’Ts, and multi-tier grievance redressal mechanisms for Category-I RTAs.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/resources"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Form ISR Series</span>
            </a>
            <a
              href="/investor/investor-grievances-reports"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/20"
            >
              <span>Annexure-26 Complaints Data →</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <Annexure25View />
        </div>
      </main>

      <Footer />
    </div>
  );
}
