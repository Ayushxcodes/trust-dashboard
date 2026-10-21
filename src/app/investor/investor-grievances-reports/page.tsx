import type { Metadata } from "next";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import { checkAndAutoArchiveEndedMonth } from "@/lib/db";
import Annexure26View from "@/components/Investor/Annexure26View";

export const metadata: Metadata = {
  title: "Annexure-26: Complaints Data Disclosure | Trustlink Investor Services RTA",
  description:
    "Statutory disclosure of complaints against Registrars to an Issue and Share Transfer Agents (RTAs) under SEBI Master Circular - Annexure-26.",
};

export const revalidate = 0; // Dynamic rendering for real-time compliance reporting

export default async function InvestorGrievancesReportsPage() {
  const data = await checkAndAutoArchiveEndedMonth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Header Banner */}
      <header className="bg-gradient-to-br from-[#0B1528] via-[#0F1D38] to-slate-900 text-white py-14 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider rounded-full mb-3 border border-indigo-500/30">
            <span>SEBI Master Circular for RTAs</span>
            <span>•</span>
            <span className="text-white">Annexure-26</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Data of Complaints Against RTA
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Format for disclosing data of complaints on their website by Registrars to an Issue and Share Transfer Agents (RTAs) in compliance with SEBI regulatory guidelines. Data is updated by the 7th of every calendar month.
          </p>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Annexure26View initialData={data} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
