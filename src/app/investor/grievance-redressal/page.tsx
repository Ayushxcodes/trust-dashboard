"use client";

import { useState } from "react";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import Link from "next/link";

import { submitGrievanceAction } from "@/app/actions";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await submitGrievanceAction(formData);
      if (res.success && res.ticket) {
        const currentDate = new Date(res.ticket.submittedOn).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setTicket({
          id: res.ticket.ticketId,
          date: currentDate,
          tat: res.ticket.expectedResolution,
        });
      } else {
        alert(res.error || "Failed to submit grievance.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the statutory grievance.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Navbar />
      
      {/* Tamed Header Banner */}
      <section className="bg-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Statutory Investor Grievance Mechanism
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Guaranteed transparent grievance tracking with strict turnaround times (TAT) across a 3-level escalation hierarchy.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Main Layout Grid */}
          <div className="grid gap-10 lg:grid-cols-12 mb-12">
            
            {/* Left 7 cols: Interactive Grievance Filing Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="mb-6 border-b border-slate-200 pb-5">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center text-xs font-extrabold">
                      1
                    </span>
                    File Official Grievance (Level 1)
                  </h2>
                  <span className="text-xs font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-md font-bold">
                    TAT: 7 Days
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submitting this form generates an official Service Request Ticket Number for regulatory tracking.
                </p>
              </div>

              {ticket ? (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-6 text-emerald-900 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-base">Grievance Ticket Registered</h3>
                      <p className="text-xs text-emerald-700">Official receipt recorded in statutory register</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-emerald-200 font-mono text-xs space-y-2 text-slate-800 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-sans font-medium">Statutory Ticket ID:</span>
                      <strong className="text-slate-900 text-base font-extrabold bg-slate-100 px-3 py-1 rounded border border-slate-300">{ticket.id}</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-sans">Submission Date:</span>
                      <span className="font-semibold">{ticket.date}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-sans">Target Turnaround Time:</span>
                      <span className="text-emerald-700 font-bold">{ticket.tat}</span>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-800 leading-relaxed">
                    You can track this ticket on our <Link href="/track-request" className="underline font-bold">Public Request Tracker</Link> using reference ID <strong>{ticket.id}</strong>.
                  </p>

                  <button
                    onClick={() => setTicket(null)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-colors shadow-xs"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="e.g. Acme Corporate Limited"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Grievance Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      placeholder="Provide specific details, folio number, dates, and previous correspondence..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
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

            {/* Right 5 cols: 3-Tier Escalation Hierarchy */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Level 1 Contact */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
                    Level 1: RTA Grievance Cell
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded">TAT: 7 Days</span>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  First point of escalation for all investor service requests and queries.
                </p>
                <div className="space-y-2 text-xs font-medium">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Email:</span>
                    <a href="mailto:info@trustlinkinvestor.com" className="font-bold text-indigo-700 hover:underline font-mono">info@trustlinkinvestor.com</a>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Direct Helpline:</span>
                    <a href="tel:+919910118347" className="font-bold text-slate-800 font-mono">+91 99101 18347</a>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Office Hours:</span>
                    <span className="text-slate-700">Mon–Fri: 9:30 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Level 2 Contact */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">2</span>
                    Level 2: Compliance / Nodal Officer
                  </h3>
                  <span className="text-[11px] font-mono font-bold text-indigo-700 bg-white border border-indigo-200 px-2 py-0.5 rounded">TAT: 15 Days</span>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  If unresolved within 7 days at Level 1, escalate directly to the Nodal Compliance Officer:
                </p>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <div className="font-bold text-slate-900 text-sm">Mr. Nishant Khemani</div>
                  <div className="text-slate-500 font-medium">Director &amp; Compliance / Nodal Officer</div>
                  <div className="pt-1 flex justify-between">
                    <span className="text-slate-500">Direct Email:</span>
                    <a href="mailto:info@trustlinkinvestor.com" className="font-bold text-indigo-700 hover:underline font-mono">info@trustlinkinvestor.com</a>
                  </div>
                </div>
              </div>

              {/* Level 3 SCORES & SMART ODR */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm flex items-center gap-2 text-emerald-400">
                    <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/30">3</span>
                    Level 3: Regulatory / External Portals
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  If not resolved to your satisfaction within 30 days, you may escalate to regulatory dispute portals:
                </p>

                <div className="space-y-2.5">
                  <a
                    href="https://scores.sebi.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-xs font-bold flex items-center justify-between"
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
                    className="block p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-xs font-bold text-emerald-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>SMART ODR Dispute Portal</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">smartodr.in</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Statutory Registration Details Footer Banner */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 grid md:grid-cols-3 gap-5">
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Corporate Registration (CIN):</span>
              <span className="font-mono text-slate-700">U74999DL2018PTC335492</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">SEBI Category I RTA Registration:</span>
              <span className="font-mono text-indigo-700 font-bold bg-white border border-slate-200 px-2 py-0.5 rounded inline-block">INR000004510 (Permanent)</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">SEBI Regional Office:</span>
              <span>SEBI Northern Regional Office, Bank of Baroda Building, 16 Sansad Marg, New Delhi 110001</span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
