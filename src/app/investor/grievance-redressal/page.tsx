"use client";

import { useState } from "react";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import Link from "next/link";

export default function GrievanceRedressalPage() {
  const [formData, setFormData] = useState({
    investorName: "",
    email: "",
    phone: "",
    folioOrPan: "",
    companyName: "",
    category: "Physical Share Transfer",
    description: "",
  });

  const [ticket, setTicket] = useState<{ id: string; date: string; tat: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `GRV-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const currentDate = new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setTicket({
        id: generatedId,
        date: currentDate,
        tat: "7 Business Days (Level 1 Resolution)",
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider rounded-full mb-4 border border-emerald-500/30">
            SEBI Master Circular Compliant
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Statutory Investor Grievance Mechanism
          </h1>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Trustlink Investor Services Private Limited guarantees transparent, audit-defensible grievance tracking with strict turnaround times (TAT) across a 3-level escalation hierarchy.
          </p>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          
          {/* Main Layout Grid */}
          <div className="grid gap-12 lg:grid-cols-12 mb-16">
            
            {/* Left 7 cols: Interactive Grievance Filing Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
              <div className="mb-6 border-b border-slate-100 pb-5">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-black">
                      1
                    </span>
                    File Official Grievance (Level 1)
                  </h2>
                  <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold">
                    TAT: 7 Days
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  Submitting this form generates an official Service Request Ticket Number for regulatory tracking.
                </p>
              </div>

              {ticket ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-emerald-900 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg">Grievance Ticket Registered Successfully</h3>
                      <p className="text-xs text-emerald-700">Official receipt recorded in statutory register</p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-emerald-200 font-mono text-sm space-y-2 text-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-sans">Ticket Number:</span>
                      <strong className="text-indigo-600 text-base">{ticket.id}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-sans">Submission Date:</span>
                      <span>{ticket.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-sans">Target Turnaround Time:</span>
                      <span className="text-emerald-700 font-semibold">{ticket.tat}</span>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-800 leading-relaxed">
                    A confirmation has been logged. You can track this ticket on our <Link href="/track-request" className="underline font-bold">Public Request Tracker</Link> using reference ID <strong>{ticket.id}</strong>.
                  </p>

                  <button
                    onClick={() => setTicket(null)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-colors"
                  >
                    File Another Grievance
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Investor Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.investorName}
                        onChange={(e) => setFormData({ ...formData, investorName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        placeholder="e.g. Rajesh Kumar"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        placeholder="investor@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Contact Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Folio No. / DP ID - Client ID / PAN *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.folioOrPan}
                        onChange={(e) => setFormData({ ...formData, folioOrPan: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                        placeholder="e.g. TLI/004921 / ABCDE1234F"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Company / Issuer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      placeholder="e.g. Acme FinCorp Limited"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Grievance Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
                    >
                      <option value="Physical Share Transfer">Physical Share Transfer / Dematerialisation Delay</option>
                      <option value="Non-receipt of Dividend">Non-receipt of Dividend / IEPF Query</option>
                      <option value="Duplicate Share Certificate">Duplicate Share Certificate Delay</option>
                      <option value="Transmission / Name Deletion">Transmission / Name Correction / Nomination</option>
                      <option value="KYC Updation">KYC Updation (ISR-1 / ISR-2)</option>
                      <option value="Other Statutory Grievance">Other Statutory Grievance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Grievance Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      placeholder="Provide specific details, folio number, dates, and previous correspondence if any..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Generating Ticket ID...</span>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Submit Statutory Grievance &amp; Get Ticket
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right 5 cols: 3-Tier Escalation Hierarchy & Statutory Contacts */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Level 1 Contact */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
                    Level 1: RTA Grievance Cell
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">TAT: 7 Days</span>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  First point of escalation for all investor service requests and queries.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Email:</span>
                    <a href="mailto:info@trustlinkinvestor.com" className="font-bold text-indigo-600 hover:underline">info@trustlinkinvestor.com</a>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Direct Helpline:</span>
                    <a href="tel:+919910118347" className="font-bold text-slate-800">+91 99101 18347</a>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Office Hours:</span>
                    <span className="font-medium text-slate-700">Mon–Fri: 9:30 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Level 2 Contact */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">2</span>
                    Level 2: Compliance / Nodal Officer
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">TAT: 15 Days</span>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  If unresolved within 7 days at Level 1, escalate directly to the Nodal Compliance Officer:
                </p>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="font-bold text-slate-900 text-sm">Mr. Nishant Khemani</div>
                  <div className="text-slate-500 font-medium">Director &amp; Compliance / Nodal Officer</div>
                  <div className="pt-1 flex justify-between">
                    <span className="text-slate-500">Direct Email:</span>
                    <a href="mailto:info@trustlinkinvestor.com" className="font-bold text-indigo-600 hover:underline">info@trustlinkinvestor.com</a>
                  </div>
                </div>
              </div>

              {/* Level 3 SCORES & SMART ODR */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-lg border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-base flex items-center gap-2 text-emerald-400">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/30">3</span>
                    Level 3: Regulatory / External Portals
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  If not resolved to your satisfaction within 30 days, you may escalate to regulatory dispute portals:
                </p>

                <div className="space-y-3">
                  <a
                    href="https://scores.sebi.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors text-xs font-bold flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>SEBI SCORES 2.0 Portal</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">scores.sebi.gov.in</span>
                  </a>

                  <a
                    href="https://smartodr.in/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors text-xs font-bold text-emerald-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>SMART ODR Online Dispute Resolution</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">smartodr.in</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Statutory Registration Details Footer Banner */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-xs text-slate-600 grid md:grid-cols-3 gap-6">
            <div>
              <span className="font-bold text-slate-900 block mb-1">Corporate Registration (CIN):</span>
              <span className="font-mono text-slate-700">U74999DL2018PTC335492</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-1">SEBI Category I RTA Registration:</span>
              <span className="font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">INR000004510 (Permanent)</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-1">SEBI Regional Office:</span>
              <span>SEBI Northern Regional Office, Bank of Baroda Building, 16 Sansad Marg, New Delhi 110001</span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
