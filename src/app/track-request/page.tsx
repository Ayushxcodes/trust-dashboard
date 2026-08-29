"use client";

import { useState } from "react";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import Link from "next/link";

interface TicketDetails {
  ticketId: string;
  category: string;
  investorName: string;
  companyName: string;
  status: "RECEIVED" | "IN_PROCESSING" | "ESCALATED_LEVEL2" | "RESOLVED";
  submittedOn: string;
  expectedResolution: string;
  remarks: string;
}

const MOCK_TICKETS: Record<string, TicketDetails> = {
  "GRV-2026-104921": {
    ticketId: "GRV-2026-104921",
    category: "Physical Share Transfer / Demat",
    investorName: "Rajesh Kumar",
    companyName: "Alpha Corp Limited",
    status: "IN_PROCESSING",
    submittedOn: "24 Aug 2026",
    expectedResolution: "31 Aug 2026 (7 Days TAT)",
    remarks: "Documents under verification with NSDL/CDSL tripartite validator.",
  },
  "GRV-2026-582910": {
    ticketId: "GRV-2026-582910",
    category: "Non-receipt of Dividend",
    investorName: "Sunita Sharma",
    companyName: "Beta Tech Systems Limited",
    status: "RESOLVED",
    submittedOn: "12 Aug 2026",
    expectedResolution: "19 Aug 2026",
    remarks: "Dividend revalidation warrant dispatched via Registered AD on 18 Aug 2026.",
  },
  "SRN-2026-881920": {
    ticketId: "SRN-2026-881920",
    category: "Duplicate Share Certificate (Form ISR-4)",
    investorName: "Vikram Malhotra",
    companyName: "Apex Financial Services Limited",
    status: "ESCALATED_LEVEL2",
    submittedOn: "01 Aug 2026",
    expectedResolution: "30 Aug 2026 (Level 2 Escalation)",
    remarks: "Escalated to Compliance Officer Mr. Nishant Khemani for final newspaper notice publication.",
  },
};

import { fetchGrievanceByTicketAction } from "@/app/actions";

export default function TrackRequestPage() {
  const [ticketIdInput, setTicketIdInput] = useState("");
  const [searchedTicket, setSearchedTicket] = useState<TicketDetails | null | "NOT_FOUND">(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = ticketIdInput.trim().toUpperCase();
    if (!cleanId) return;

    setIsSearching(true);
    try {
      const res = await fetchGrievanceByTicketAction(cleanId);
      if (res.success && res.ticket) {
        const formattedDate = new Date(res.ticket.submittedOn).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        setSearchedTicket({
          ticketId: res.ticket.ticketId,
          category: res.ticket.category,
          investorName: res.ticket.investorName,
          companyName: res.ticket.companyName,
          status: res.ticket.status,
          submittedOn: formattedDate,
          expectedResolution: res.ticket.expectedResolution,
          remarks: res.ticket.remarks,
        });
      } else {
        setSearchedTicket("NOT_FOUND");
      }
    } catch (err) {
      console.error(err);
      setSearchedTicket("NOT_FOUND");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 animate-fade-in-up">
            Track{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent animate-text-shimmer">
              Grievance &amp; SRN Status
            </span>
          </h1>
          <p className="text-slate-300 text-base max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay-1">
            Enter your Service Request Number (SRN) or Grievance Ticket ID to view real-time processing milestones and expected resolution timelines.
          </p>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-3xl space-y-8">
          
          {/* Tracking Search Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
            <form onSubmit={handleTrack} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Enter Ticket ID or SRN Number *
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    value={ticketIdInput}
                    onChange={(e) => setTicketIdInput(e.target.value)}
                    placeholder="Enter your Ticket ID or SRN Number"
                    className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 font-mono text-base focus:ring-2 focus:ring-slate-400 outline-none uppercase font-bold text-slate-900"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-[#0B1528] hover:bg-[#1E293B] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Track Status
                  </button>
                </div>
              </div>
            </form>

            {/* Results Display */}
            {searchedTicket === "NOT_FOUND" && (
              <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-sm space-y-2">
                <div className="font-extrabold text-base flex items-center gap-2">
                  <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Ticket ID Not Found
                </div>
                <p className="text-xs leading-relaxed text-rose-800">
                  We could not find a statutory record for ticket reference &quot;{ticketIdInput}&quot;. Please double check the ID format or file a new grievance request.
                </p>
                <div className="pt-2">
                  <Link
                    href="/investor/grievance-redressal"
                    className="inline-block px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-lg uppercase tracking-wider"
                  >
                    File New Grievance
                  </Link>
                </div>
              </div>
            )}

            {searchedTicket && searchedTicket !== "NOT_FOUND" && (
              <div className="border-t border-slate-100 pt-6 space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Statutory Reference</span>
                    <h3 className="text-2xl font-black font-mono text-indigo-700">{searchedTicket.ticketId}</h3>
                  </div>
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border ${
                      searchedTicket.status === "RESOLVED"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : searchedTicket.status === "ESCALATED_LEVEL2"
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-blue-50 text-blue-800 border-blue-200"
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                      {searchedTicket.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-sans mb-0.5">Category:</span>
                    <strong className="text-slate-800 font-sans text-sm block">{searchedTicket.category}</strong>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-sans mb-0.5">Issuer Company:</span>
                    <strong className="text-slate-800 font-sans text-sm block">{searchedTicket.companyName}</strong>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-sans mb-0.5">Submission Date:</span>
                    <span className="text-slate-800 font-bold">{searchedTicket.submittedOn}</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-sans mb-0.5">Target Resolution (TAT):</span>
                    <span className="text-emerald-700 font-bold">{searchedTicket.expectedResolution}</span>
                  </div>
                </div>

                <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                    Official Processing Remark:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {searchedTicket.remarks}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
