"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: "COMPLIANCE" | "NAVIGATION" | "COMMERCIAL";
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: "COMPLIANCE",
    question: "What is Rule 9B of the Companies Act, 2013?",
    answer:
      "Rule 9B mandates that every unlisted public company must issue securities only in dematerialized form and facilitate the dematerialization of all its promoter, director, and key managerial personnel (KMP) securities before key corporate actions or transfers.",
  },
  {
    category: "COMPLIANCE",
    question: "What is the official deadline for compliance execution?",
    answer:
      "The official regulatory target deadline is September 30, 2026. Non-compliant entities will face restrictions on security transfers, buybacks, rights issues, and bonus issues.",
  },
  {
    category: "COMPLIANCE",
    question: "What documents must be uploaded into the Vault screen?",
    answer:
      "You are required to submit the Certificate of Incorporation (COI), Board Resolution authorizing depository admissions, PAS-3 allocation filings, and recent Audited Financial Statements.",
  },
  {
    category: "NAVIGATION",
    question: "How do I sync our records with NSDL/CDSL depositories?",
    answer:
      "Click the 'Verify Status' button located in the top navigation header. This triggers a real-time validation sequence syncing local files with depository ledgers.",
  },
  {
    category: "NAVIGATION",
    question: "How do I retrieve official legal templates for uploads?",
    answer:
      "Navigate to the 'Vault' tab and locate the specific item. Click the 'Download Template' link to obtain standard draft PDFs approved by our compliance legal team.",
  },
  {
    category: "COMMERCIAL",
    question: "How are AMC and Custody fee projections calculated?",
    answer:
      "Calculations are dynamically simulated under the 'Commercial' tab. Projections adjust automatically based on your paid-up share capital bracket, folios count, and selected industry sector parameters.",
  },
];

export default function SupportTab() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredFaqs = FAQ_ITEMS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert(
        `Support ticket received!\n\nSubject: ${ticketSubject}\nTicket Reference: TL-TK-${Math.floor(
          100000 + Math.random() * 900000
        )}\n\nOur compliance audit helpdesk will review this request and contact you shortly.`
      );
      setTicketSubject("");
      setTicketBody("");
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto max-w-4xl mx-auto w-full space-y-8 bg-white">
      {/* Tab Header */}
      <div>
        <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-mono">
          Helpdesk &gt; Support &amp; Knowledge Base
        </span>
        <h2 className="text-xl font-bold text-zinc-900 mt-1.5 font-sans">
          Support &amp; FAQ Center
        </h2>
        <p className="text-zinc-550 text-xs">
          Access standardized regulatory briefs, navigate interface tools, or open a direct ticket.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FAQs Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* FAQ Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search compliance guidelines, navigation instructions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-semibold"
            />
            <span className="absolute right-4 top-3 text-zinc-400">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>

          {/* Accordion List */}
          <div className="border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-200 shadow-sm bg-white">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                let catLabel = "Rule 9B Legal";
                let catStyle = "bg-amber-50 text-amber-700";
                if (faq.category === "NAVIGATION") {
                  catLabel = "Portal Guide";
                  catStyle = "bg-teal-50 text-teal-700";
                } else if (faq.category === "COMMERCIAL") {
                  catLabel = "Pricing Desk";
                  catStyle = "bg-blue-50 text-blue-700";
                }

                return (
                  <div key={idx} className="transition-all">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-xs text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${catStyle}`}>
                          {catLabel}
                        </span>
                        <span>{faq.question}</span>
                      </div>
                      <span className="text-zinc-400 text-sm">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-zinc-650 leading-relaxed font-normal bg-zinc-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-zinc-450 text-xs font-semibold">
                No matching compliance guidelines or navigation topics found.
              </div>
            )}
          </div>
        </div>

        {/* Support Ticket Right Column */}
        <div className="bg-zinc-50 border border-zinc-250 p-6 rounded-2xl shadow-sm space-y-4 h-fit">
          <div>
            <h3 className="text-xs font-extrabold text-[#0B1528] uppercase tracking-wider">
              Submit Support Ticket
            </h3>
            <p className="text-zinc-500 text-[10px] mt-1 leading-normal">
              Direct access to our regulatory verification and administrative audit desk.
            </p>
          </div>

          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <label className="block text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1.5">
                Ticket Subject
              </label>
              <input
                type="text"
                placeholder="E.g., PAS-3 upload error"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-250 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1.5">
                Detailed Inquiry Description
              </label>
              <textarea
                placeholder="Please describe your compliance issue or interface inquiry..."
                value={ticketBody}
                onChange={(e) => setTicketBody(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-250 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-xl bg-[#0B1528] hover:bg-[#1E293B] text-white font-bold text-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer shadow"
            >
              {isSubmitting ? "Generating Ticket..." : "Dispatch Ticket"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
