import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is MCA Rule 9B and why is dematerialisation mandatory for unlisted public companies?",
      answer:
        "Under Rule 9B of the Companies (Prospectus and Allotment of Securities) Rules, 2014 (amended Oct 2023), every unlisted public company must issue securities only in dematerialised form and facilitate dematerialisation of all existing securities through a SEBI-registered Category I RTA like Trustlink.",
    },
    {
      question: "What mandatory forms are required for investor KYC and service requests?",
      answer:
        "Investors must submit SEBI prescribed ISR Series forms: Form ISR-1 (Registering/Updating KYC & Bank details), Form ISR-2 (Signature Attestation by Bank Manager), Form ISR-3 (Declaration for Opting-Out of Nomination), Form ISR-4 (Duplicate Share Certificates / Transmission / Remat), Form SH-13 (Nomination Form), and Form SH-14 (Cancellation of Nomination). All forms are downloadable from our Resources section.",
    },
    {
      question: "What is the turnaround time (TAT) for resolving investor grievances?",
      answer:
        "Standard grievances filed at Level 1 are resolved within 7 business days. If unresolved or requiring complex regulatory clearance (e.g. duplicate share certificates), Level 2 escalation to the Compliance Officer provides resolution within 15 business days. As per SEBI rules, maximum statutory turnaround time is 30 days.",
    },
    {
      question: "How do I lodge a complaint on SEBI SCORES 2.0 or SMART ODR portal?",
      answer:
        "If your grievance remains unresolved after contacting our Grievance Officer and Nodal Officer, you can file an online complaint on SEBI SCORES 2.0 (scores.sebi.gov.in) or initiate online dispute resolution on the SMART ODR portal (smartodr.in). You will require your RTA Grievance Ticket Number (GRV-2026-XXXX).",
    },
    {
      question: "What is the procedure for obtaining duplicate share certificates in case of loss?",
      answer:
        "Submit Form ISR-4 along with Form ISR-1 (KYC), Form ISR-2 (Signature Verification), a copy of FIR / Police Complaint for lost certificates, an Indemnity Bond, and an Affidavit on non-judicial stamp paper. Upon verification, the RTA issues a Letter of Confirmation as per SEBI circular guidelines.",
    },
    {
      question: "How can corporate issuer companies appoint Trustlink as their Category I RTA?",
      answer:
        "Corporate issuers can initiate onboarding directly through our Client Portal, execute the Tripartite Agreement (between Issuer, RTA, and Depository NSDL/CDSL), pass a Board Resolution, and obtain ISIN activation for their equity or debt securities.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider rounded-full mb-3 border border-indigo-500/30">
            SEBI Regulatory &amp; Service Knowledgebase
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-slate-300 text-base max-w-3xl mx-auto leading-relaxed">
            Essential guidelines for investors and corporate issuers on dematerialisation, ISR forms, grievance escalations, and SEBI compliance.
          </p>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-4xl space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  Q{index + 1}
                </span>
                {faq.question}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed pl-9">
                {faq.answer}
              </p>
            </div>
          ))}

          {/* Action Callout */}
          <div className="bg-gradient-to-r from-indigo-900 to-[#0B1528] rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-xl font-bold mb-1">Still Have Questions or Specific Folio Queries?</h3>
              <p className="text-xs text-slate-300">Our investor servicing desk is available Monday through Friday (9:30 AM to 6:00 PM).</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/investor/grievance-redressal"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                Lodge Grievance
              </Link>
              <Link
                href="/resources"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/10"
              >
                Download Forms
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
