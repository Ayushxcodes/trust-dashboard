import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import { getMonthlyGrievanceReport } from "@/lib/db";
import Link from "next/link";

export const revalidate = 0; // Ensure dynamic rendering for real-time compliance reporting

export default async function InvestorGrievancesReportsPage() {
  const report = await getMonthlyGrievanceReport();

  const formattedDate = new Date(report.updatedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white py-14 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <span className="inline-block px-3.5 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider rounded-full mb-3 border border-indigo-500/30">
            SEBI Master Circular Disclosure
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Monthly Investor Complaints Data
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            In compliance with SEBI Circulars for Registrars &amp; Transfer Agents (RTAs), Trustlink Investor Services Private Limited publishes monthly investor grievance data by the 7th of every month.
          </p>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">
          
          {/* Current Month Active Summary Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold">Reporting Period</span>
                <h2 className="text-2xl font-black text-slate-900">{report.month}</h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 block font-mono">Last Verified &amp; Updated</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {formattedDate}
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                  Carried Forward
                </span>
                <span className="text-3xl font-black text-slate-800">{report.carriedForward}</span>
                <span className="text-[10px] text-slate-400 block mt-1">From Previous Month</span>
              </div>

              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 block mb-1">
                  Received
                </span>
                <span className="text-3xl font-black text-blue-900">{report.received}</span>
                <span className="text-[10px] text-blue-500 block mt-1">During Current Month</span>
              </div>

              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-1">
                  Resolved
                </span>
                <span className="text-3xl font-black text-emerald-900">{report.resolved}</span>
                <span className="text-[10px] text-emerald-500 block mt-1">Satisfactorily Closed</span>
              </div>

              <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 block mb-1">
                  Pending
                </span>
                <span className="text-3xl font-black text-rose-900">{report.pending}</span>
                <span className="text-[10px] text-rose-500 block mt-1">Under Processing</span>
              </div>
            </div>

            {/* Statutory Compliance Note */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="leading-relaxed">
                <strong>SEBI Master Circular Guidelines:</strong> Standard turnaround time (TAT) for resolving complaints is 7 to 15 business days depending on nature of grievance. Any complaints remaining pending beyond 30 days are automatically flagged to the Compliance Officer and SEBI Nodal Officer.
              </div>
            </div>
          </div>

          {/* Historical Trend Table */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Historical Monthly Trend (FY 2026-27)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-extrabold uppercase text-xs">
                    <th className="p-4 rounded-l-xl">Month</th>
                    <th className="p-4 text-center">Carried Forward</th>
                    <th className="p-4 text-center">Received</th>
                    <th className="p-4 text-center">Resolved</th>
                    <th className="p-4 text-center rounded-r-xl">Pending &gt; 30 Days</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  <tr className="bg-indigo-50/30">
                    <td className="p-4 font-bold text-slate-900">{report.month} (Current)</td>
                    <td className="p-4 text-center font-bold">{report.carriedForward}</td>
                    <td className="p-4 text-center font-bold text-blue-700">{report.received}</td>
                    <td className="p-4 text-center font-bold text-emerald-700">{report.resolved}</td>
                    <td className="p-4 text-center font-bold text-slate-500">0</td>
                  </tr>
                  <tr>
                    <td className="p-4">July 2026</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center text-emerald-600">0</td>
                    <td className="p-4 text-center text-slate-500">0</td>
                  </tr>
                  <tr>
                    <td className="p-4">June 2026</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center text-emerald-600">0</td>
                    <td className="p-4 text-center text-slate-500">0</td>
                  </tr>
                  <tr>
                    <td className="p-4">May 2026</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center text-emerald-600">0</td>
                    <td className="p-4 text-center text-slate-500">0</td>
                  </tr>
                  <tr>
                    <td className="p-4">April 2026</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center">0</td>
                    <td className="p-4 text-center text-emerald-600">0</td>
                    <td className="p-4 text-center text-slate-500">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gradient-to-r from-[#0B1528] to-indigo-950 p-6 rounded-2xl text-white">
            <div>
              <h4 className="font-bold text-lg mb-1">Need to File a Grievance or Track Status?</h4>
              <p className="text-xs text-slate-300">Submit your request online or view your existing ticket status.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/investor/grievance-redressal"
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl uppercase tracking-wider transition-colors"
              >
                File Grievance
              </Link>
              <Link
                href="/track-request"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors border border-white/10"
              >
                Track Status
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
