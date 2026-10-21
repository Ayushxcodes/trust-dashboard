"use client";

import { useState } from "react";
import Link from "next/link";

interface ServiceTimelineItem {
  category: "A. Investor Service Request" | "B. Grievance Redressal" | "C. Other Operational activities";
  srNo: string;
  service: string;
  timelineDays: number | string;
  notes?: string;
}

const STATUTORY_TIMELINES: ServiceTimelineItem[] = [
  // A. Investor Service Request
  {
    category: "A. Investor Service Request",
    srNo: "1",
    service: "Processing of transmission request",
    timelineDays: "21 Days",
    notes: "Transmission of securities to legal heirs / nominees upon receipt of complete documents",
  },
  {
    category: "A. Investor Service Request",
    srNo: "2",
    service: "Processing of issue of duplicate security certificate request",
    timelineDays: "30 Days",
    notes: "Under Form ISR-4 following statutory verification and advertisement procedure",
  },
  {
    category: "A. Investor Service Request",
    srNo: "3",
    service: "Processing of dematerialization request (DRF)",
    timelineDays: "15 Days",
    notes: "Physical security certificate verification and electronic confirmation to Depository",
  },
  {
    category: "A. Investor Service Request",
    srNo: "4",
    service: "Processing of remat request (RRF)",
    timelineDays: "30 Days",
    notes: "Printing and dispatch of physical security certificates against remat requests",
  },
  {
    category: "A. Investor Service Request",
    srNo: "5",
    service: "Processing of Transposition request",
    timelineDays: "15 Days",
    notes: "Change in the order of joint holders names in security certificate",
  },
  {
    category: "A. Investor Service Request",
    srNo: "6.I.a",
    service: "Processing of request for change in / updation of Name",
    timelineDays: "30 Days",
    notes: "Updation upon marriage / court order / gazette notification",
  },
  {
    category: "A. Investor Service Request",
    srNo: "6.I.b",
    service: "Processing of request for change in / updation of Signature",
    timelineDays: "30 Days",
    notes: "Banker attestation under Form ISR-2 procedure",
  },
  {
    category: "A. Investor Service Request",
    srNo: "6.I.c",
    service: "Processing of request for change in / updation of Nomination",
    timelineDays: "30 Days",
    notes: "Registration of Form SH-13 or cancellation/variation under Form SH-14",
  },
  {
    category: "A. Investor Service Request",
    srNo: "6.I.d",
    service: "Processing of request for change in / updation of Contact details (Address, E-mail address and Mobile number)",
    timelineDays: "15 Days",
    notes: "Updation of postal address with PIN, e-mail and verified mobile via Form ISR-1",
  },
  {
    category: "A. Investor Service Request",
    srNo: "6.I.e",
    service: "Processing of request for change in / updation of Bank account details",
    timelineDays: "15 Days",
    notes: "Direct mandate registration / core banking account update with cancelled cheque leaf",
  },
  {
    category: "A. Investor Service Request",
    srNo: "6.II",
    service: "Processing of request for Updation of PAN",
    timelineDays: "15 Days",
    notes: "Mandatory linking of validated PAN for all physical and electronic folios",
  },
  {
    category: "A. Investor Service Request",
    srNo: "7",
    service: "Processing of Re-validation of dividend / interest / redemption instruments and sending the remittance request files to the bank / Company",
    timelineDays: "15 Days",
    notes: "Reissuance of stale dividend warrants / direct bank remittance files",
  },

  // B. Grievance Redressal
  {
    category: "B. Grievance Redressal",
    srNo: "1",
    service: "Providing response to the inquiries of the investors and Redressal of Grievance",
    timelineDays: "21 Days",
    notes: "Resolution of queries/grievances received directly, via SCORES 2.0 or regulatory letters",
  },

  // C. Other Operational activities
  {
    category: "C. Other Operational activities",
    srNo: "1",
    service: "Allotment of securities (IPO)",
    timelineDays: "6 Days",
    notes: "Basis of allotment, depository crediting and unblocking of funds under UPI/ASBA",
  },
  {
    category: "C. Other Operational activities",
    srNo: "2.a",
    service: "Intimation regarding distribution of corporate benefits (dividend, bonus, stock split) via E-mail communication",
    timelineDays: "15 Days",
    notes: "Electronic dispatch of dividend payment advice, bonus allotment, and split notices",
  },
  {
    category: "C. Other Operational activities",
    srNo: "2.b",
    service: "Intimation regarding distribution of corporate benefits (dividend, bonus, stock split) via Physical communication",
    timelineDays: "30 Days",
    notes: "Postal dispatch of physical corporate benefit advices and warrants",
  },
];

const INVESTOR_RIGHTS = [
  {
    id: 1,
    title: "Corporate Benefits & Material Info",
    desc: "Right to receive all the benefits/ material information declared by the Company (Dividends, Bonus, Stock Split, Rights Entitlements).",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: 2,
    title: "Fair & Equitable Treatment",
    desc: "Right to fair and equitable treatment across all categories of security holders.",
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  },
  {
    id: 3,
    title: "Participation in AGM/EGM & E-Voting",
    desc: "Right to actively participate in the AGM / EGM of the company & E-voting events so as to be a part of the decision making of the Company’s business resolutions.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    id: 4,
    title: "Statutory Grievance Redressal",
    desc: "Right to approach RTA, Depository, Company, Stock Exchange or SEBI for resolution within prescribed timelines in case of any grievances.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    id: 5,
    title: "Statutory Disclosures Access",
    desc: "Right to ask for and receive information about all the statutory and regulatory disclosures published by the RTA and Issuer.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: 6,
    title: "Minimal Documentation Transfer",
    desc: "Right to sell/transfer securities with minimal documentation in compliance with standard SEBI Form ISR guidelines.",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    id: 7,
    title: "Accessibility for Differently Abled",
    desc: "Right to get access to RTA services in a suitable and barrier-free manner even if differently abled.",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: 8,
    title: "Educational Materials Access",
    desc: "Right to get access to educational materials, FAQs, procedural manuals, and awareness bulletins of RTAs.",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    id: 9,
    title: "Fair Pricing on Customised Services",
    desc: "Right to get customised investor services as per requirement at fair and regulated price.",
    icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
  },
  {
    id: 10,
    title: "Access to Escalation Matrix",
    desc: "Right to have transparent access to the complete escalation matrix with designated officers for communication with the RTA.",
    icon: "M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  },
  {
    id: 11,
    title: "Protection Against Ultra Vires Clauses",
    desc: "Right to not be bound by any clause prescribed by the Issuer Company/RTA which are contravening to the Regulatory provisions of SEBI.",
    icon: "M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    id: 12,
    title: "Real-Time Service Request Updates",
    desc: "Right to get timely status updates and tracking with respect to various service requests filed with the RTA.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
];

const DOS_LIST = [
  {
    no: 1,
    title: "Encash Dividends Regularly",
    text: "Encash dividend/Interest regularly to avoid transfer of unclaimed amount/underlying securities to IEPF.",
  },
  {
    no: 2,
    title: "Diligent Follow-Up",
    text: "Follow up diligently and promptly if you have not received allotment intimation/ certificate / dividend / interest etc.",
  },
  {
    no: 3,
    title: "Register PAN in All Folios",
    text: "Ensure that your PAN is registered with the RTA for all your physical and demat folios.",
  },
  {
    no: 4,
    title: "Register Nomination",
    text: "Ensure nomination is registered for all your securities to smoothen transmission in favor of your legal heirs.",
  },
  {
    no: 5,
    title: "Keep KYC Details Updated",
    text: "Ensure that all KYC details viz., full postal address with PIN, mobile number, e-mail address etc. are updated to facilitate the RTA for sending communication.",
  },
  {
    no: 6,
    title: "Record Correct Core Bank Details",
    text: "Ensure that correct and complete Bank details are recorded with RTA to facilitate prompt electronic credit of dividend / interest / redemption amounts and eliminate possibility of unclaimed amounts / underlying securities being transferred to IEPF.",
  },
  {
    no: 7,
    title: "Promptly Report Loss of Securities",
    text: "Promptly inform the RTA in writing and complete required statutory formalities in case of loss of securities.",
  },
  {
    no: 8,
    title: "Provide Complete Documentation",
    text: "Ensure that the documents provided for availing any investor service request are complete in all respects and keep copies of documents sent to the RTA.",
  },
  {
    no: 9,
    title: "Monitor Corporate Announcements",
    text: "Monitor all corporate announcements and shareholder notices pertaining to investments made.",
  },
];

const DONTS_LIST = [
  {
    no: 1,
    title: "No Folios Without PAN",
    text: "Do not keep your folios without PAN registered and validated.",
  },
  {
    no: 2,
    title: "No Folios Without Nomination",
    text: "Do not keep your folios without nomination.",
  },
  {
    no: 3,
    title: "No Dealing with Unauthorized Persons",
    text: "Do not deal with unauthorized persons for any investor service requests such as change in / updation of address, e-mail address, mobile number and bank details.",
  },
  {
    no: 4,
    title: "Never Share Sensitive Security Details",
    text: "Do not share security details, viz., folio number, certificate number, distinctive number(s), bank details, specimen signature, KYC documents, etc. with unknown person(s).",
  },
];

const RTA_SERVICES = [
  {
    id: 1,
    title: "Allotment Details & Clarifications",
    desc: "Providing details of allotment and clarification on allotment in public offerings (IPO) and rights issues.",
  },
  {
    id: 2,
    title: "KYC & Master Data Updation",
    desc: "Processing change in / updation of the KYC details of investors for physical holdings like change of address / bank account details / e-mail address / telephone / mobile / nomination and PAN.",
  },
  {
    id: 3,
    title: "Security Holding Title Changes",
    desc: "Processing and updating investor holding/title change requests viz., name deletion, transmission, transposition, issue of duplicate shares, dematerialization and rematerialisation of securities.",
  },
  {
    id: 4,
    title: "Dividend Reissue & TDS Declarations",
    desc: "Processing of other requests, viz., recording of declaration with regard to exemption / lower tax rates for TDS on dividend/interest, revalidation and reissue of dividend and interest instruments.",
  },
  {
    id: 5,
    title: "Single-Window Discrepancy Intimation",
    desc: "Processing investor service requests in a timely manner and providing details of discrepancies observed in the documents to the investors in one go.",
  },
  {
    id: 6,
    title: "Corporate Action Execution",
    desc: "Execution and intimation of other corporate actions viz., ESOPs, Dividend payment, Stock split, Bonus issue and Merger/Demerger activities.",
  },
  {
    id: 7,
    title: "Rights Issue Entitlements",
    desc: "Communication of Rights issue entitlements and credit of demat rights entitlements.",
  },
  {
    id: 8,
    title: "Buyback, Exit Offers & Takeovers",
    desc: "Communication of Buyback, exit offer, takeover made by the company/ acquirer, and the procedure to be followed by investor in respect of these issues.",
  },
  {
    id: 9,
    title: "IEPF & Suspense Transfers / Grievance Redressal",
    desc: "Mandatory execution of transfer of shares and dividends to IEPF and transfer of undelivered share certificates to Suspense account. Processing grievances received through e-mails, Letters and SCORES.",
  },
];

const ODR_STEPS = [
  {
    step: 1,
    title: "Approach Market Participant (RTA / Issuer)",
    desc: "Investor approaches the Listed Company / RTA at the designated Investor Grievance e-mail ID. Strive to resolve immediately, not later than 21 days.",
    days: "21 Days",
  },
  {
    step: 2,
    title: "Escalation to SCORES or SMARTODR",
    desc: "If investor is not satisfied with the response, they may escalate either to SEBI SCORES 2.0 (with 2-level review: Designated Body & SEBI) or file on SMARTODR portal.",
    days: "Level 1 / 2",
  },
  {
    step: 3,
    title: "MII Initial Review on SMARTODR",
    desc: "Upon receipt of complaint on SMARTODR, the relevant Market Infrastructure Institution (MII) reviews and endeavors to resolve amicably within 21 days.",
    days: "21 Days",
  },
  {
    step: 4,
    title: "Referral to Online Conciliation",
    desc: "If the grievance cannot be amicably resolved, the dispute is formally referred to an independent conciliator.",
    days: "Stage Referral",
  },
  {
    step: 5,
    title: "Conciliation Process Settlement",
    desc: "Conciliator endeavors for amicable settlement within 21 days (extendable by 10 days with mutual consent of parties).",
    days: "21 + 10 Days",
  },
  {
    step: 6,
    title: "Referral to Arbitration",
    desc: "If conciliation is unsuccessful, the investor may request to refer the matter for independent online arbitration.",
    days: "Formal Arbitration",
  },
  {
    step: 7,
    title: "Arbitration Conclusion & Final Award",
    desc: "Arbitration process concluded by arbitrator(s) within 30 days (extendable by 30 days with mutual consent).",
    days: "30 + 30 Days",
  },
];

export default function Annexure25View() {
  const [activeTab, setActiveTab] = useState<
    "all" | "timelines" | "dos-donts" | "rights" | "services" | "odr"
  >("all");
  const [timelineCategory, setTimelineCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTimelines = STATUTORY_TIMELINES.filter((item) => {
    const matchesCat = timelineCategory === "ALL" || item.category.startsWith(timelineCategory);
    const matchesSearch =
      searchQuery === "" ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner & Statutory Badges */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-mono font-extrabold uppercase tracking-wider rounded-lg shadow-sm">
                Annexure-25
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                SEBI Master Circular Mandate
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Category-I RTA Charter
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Investor Charter – Registrars to an Issue &amp; Share Transfer Agents (RTAs)
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Official SEBI charter outlining vision, mission, service catalogue, statutory processing timelines, investor rights, mandatory DOs &amp; DON’Ts, and multi-tier dispute escalation mechanisms.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
            <Link
              href="/investor/investor-grievances-reports"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition-colors shadow-sm"
            >
              <span>View Annexure-26 Monthly Data</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Vision & Mission Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-50/70 to-blue-50/40 p-6 rounded-2xl border border-indigo-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h3 className="text-base font-extrabold text-indigo-950 uppercase tracking-wide">
                  Vision of RTA
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mt-2">
                &ldquo;To be a trusted, transparent and prompt service provider to the investors, conforming to the highest standards of compliance, confidentiality and professionalism in conduct, to meet the obligation towards investors in Indian capital markets.&rdquo;
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-100/60 text-[11px] font-mono font-bold text-indigo-700 uppercase">
              SEBI Statutory Statement
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/40 p-6 rounded-2xl border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h3 className="text-base font-extrabold text-emerald-950 uppercase tracking-wide">
                  Mission of RTA
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed font-medium mt-2">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">•</span>
                  <span>Maintain high standard of integrity, ethics, transparency and professionalism in business conduct.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">•</span>
                  <span>Comply with all regulatory requirements in a strict time-bound manner.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">•</span>
                  <span>Facilitate prompt service by streamlining processes and harnessing technology.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">•</span>
                  <span>Ensure easy communication and resolution of queries / grievances.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold shrink-0">•</span>
                  <span>Strict confidentiality of investor information unless legally mandated or consented.</span>
                </li>
              </ul>
            </div>
            <div className="mt-3 pt-3 border-t border-emerald-100/60 text-[11px] font-mono font-bold text-emerald-700 uppercase">
              5 Core Commitments
            </div>
          </div>
        </div>

        {/* Interactive Navigation Tabs */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 print:hidden">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "all"
                ? "bg-[#0B1528] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Sections
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("timelines")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "timelines"
                ? "bg-[#0B1528] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>Prescribed Timelines</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-500/20 text-indigo-700 font-extrabold">
              {STATUTORY_TIMELINES.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dos-donts")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "dos-donts"
                ? "bg-[#0B1528] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>DOs &amp; DON’Ts</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-700 font-extrabold">
              9 DOs / 4 DON’Ts
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("rights")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "rights"
                ? "bg-[#0B1528] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>Rights of Investors</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500/20 text-blue-700 font-extrabold">
              12 Rights
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "services"
                ? "bg-[#0B1528] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            RTA Services Catalogue
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("odr")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "odr"
                ? "bg-[#0B1528] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>Grievance &amp; SMARTODR</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-800 font-extrabold">
              7 Steps
            </span>
          </button>
        </div>
      </div>

      {/* SECTION 1: PRESCRIBED TIMELINES */}
      {(activeTab === "all" || activeTab === "timelines") && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Section 3
                </span>
                <span className="text-xs text-slate-500 font-mono">SEBI Prescribed TAT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Timelines Pertaining to Various Services Provided by RTA
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
                Statutory maximum expected timelines (number of days) mandated under the SEBI Master Circular for Registrars to an Issue and Share Transfer Agents.
              </p>
            </div>

            {/* Category Filter & Search */}
            <div className="flex flex-wrap items-center gap-2 shrink-0 print:hidden">
              <select
                value={timelineCategory}
                onChange={(e) => setTimelineCategory(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
              >
                <option value="ALL">All Categories ({STATUTORY_TIMELINES.length})</option>
                <option value="A">A. Investor Service Requests (12)</option>
                <option value="B">B. Grievance Redressal (1)</option>
                <option value="C">C. Operational &amp; IPO (3)</option>
              </select>

              <input
                type="text"
                placeholder="Search services / keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none w-48"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-800 text-white uppercase text-[10px] font-extrabold tracking-wider">
                  <th className="p-3.5 text-center w-16 border-r border-slate-700">Sr. No</th>
                  <th className="p-3.5 border-r border-slate-700">Nature of Service</th>
                  <th className="p-3.5 border-r border-slate-700 text-center w-40">Expected Timeline (Days)</th>
                  <th className="p-3.5">Statutory Regulatory Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredTimelines.map((item, idx) => {
                  const isLonger = item.timelineDays.toString().includes("30");
                  const isFast = item.timelineDays.toString().includes("6") || item.timelineDays.toString().includes("15");

                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 text-center font-mono font-bold text-slate-500 border-r border-slate-100">
                        {item.srNo}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 border-r border-slate-100">
                        <div>
                          <span>{item.service}</span>
                          <span className="block text-[10px] font-mono font-bold text-indigo-600 mt-0.5">
                            {item.category}
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5 text-center border-r border-slate-100">
                        <span
                          className={`inline-block px-3 py-1 rounded-lg text-xs font-black font-mono shadow-xs border ${
                            isFast
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : isLonger
                              ? "bg-amber-50 text-amber-900 border-amber-200"
                              : "bg-indigo-50 text-indigo-800 border-indigo-200"
                          }`}
                        >
                          {item.timelineDays}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 text-[11px] leading-relaxed">
                        {item.notes}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECTION 2: DOs AND DON'Ts */}
      {(activeTab === "all" || activeTab === "dos-donts") && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                Section 5
              </span>
              <span className="text-xs text-slate-500 font-mono">Mandatory Guidance</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              DOs and DON’Ts for Investors
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
              Crucial safeguards prescribed by SEBI to protect investor folios, prevent loss of dividends, avoid transfer to IEPF, and eliminate unauthorized fraud.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* DOs CARD */}
            <div className="bg-gradient-to-b from-emerald-50/60 to-emerald-50/20 rounded-2xl p-6 border-2 border-emerald-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-emerald-950 uppercase tracking-wide">
                      DOs for Investors
                    </h4>
                    <span className="text-[11px] font-mono text-emerald-700 font-bold">
                      9 Mandatory Recommended Practices
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  SEBI Do’s
                </span>
              </div>

              <div className="space-y-3">
                {DOS_LIST.map((d) => (
                  <div
                    key={d.no}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/80 border border-emerald-100 hover:border-emerald-300 transition-colors shadow-2xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {d.no}
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900">{d.title}</h5>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{d.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DON'Ts CARD */}
            <div className="bg-gradient-to-b from-rose-50/60 to-rose-50/20 rounded-2xl p-6 border-2 border-rose-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rose-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black">
                    ✕
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-rose-950 uppercase tracking-wide">
                      DON’Ts for Investors
                    </h4>
                    <span className="text-[11px] font-mono text-rose-700 font-bold">
                      4 Critical Risk Prohibitions
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                  SEBI Don’ts
                </span>
              </div>

              <div className="space-y-3">
                {DONTS_LIST.map((d) => (
                  <div
                    key={d.no}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/80 border border-rose-100 hover:border-rose-300 transition-colors shadow-2xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {d.no}
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-rose-950">{d.title}</h5>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{d.text}</p>
                    </div>
                  </div>
                ))}

                {/* Important Advisory Callout */}
                <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                  <div className="font-extrabold flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                    <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Critical Cyber &amp; Physical Folio Alert</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-rose-800">
                    Trustlink Investor Services never asks for OTPs, bank login credentials, or original documents through unverified agents. Always submit service requests directly via our registered office or official portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: RIGHTS OF INVESTORS */}
      {(activeTab === "all" || activeTab === "rights") && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                Section 4
              </span>
              <span className="text-xs text-slate-500 font-mono">Statutory Protections</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Rights of Investors
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
              12 statutory rights granted to capital market investors under SEBI Master Circular for Registrars to an Issue and Share Transfer Agents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INVESTOR_RIGHTS.map((r) => (
              <div
                key={r.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-indigo-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-mono font-black text-xs border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      #{r.id}
                    </span>
                    <svg
                      className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={r.icon} />
                    </svg>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-900 transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                    {r.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/60 text-[10px] font-mono text-slate-400 group-hover:text-indigo-600">
                  Enforceable Right • SEBI Mandate
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: RTA SERVICES CATALOGUE */}
      {(activeTab === "all" || activeTab === "services") && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                Section 2
              </span>
              <span className="text-xs text-slate-500 font-mono">Operations Catalogue</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Services Provided by RTA to Investors
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
              Comprehensive operational services rendered by Category-I RTA to physical security holders, depository participants, and corporate issuers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RTA_SERVICES.map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {s.id}
                    </span>
                    <h4 className="text-sm font-black text-slate-900">{s.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{s.desc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-indigo-600 font-bold">Standard SEBI Form ISR</span>
                  <Link
                    href="/resources"
                    className="text-slate-500 hover:text-indigo-600 font-bold hover:underline"
                  >
                    Download Forms →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 5: GRIEVANCE REDRESSAL & SMARTODR MECHANISM */}
      {(activeTab === "all" || activeTab === "odr") && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                Section 6
              </span>
              <span className="text-xs text-slate-500 font-mono">Dispute Resolution Ladder</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Grievance Redressal – Modes and Escalation Mechanism
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
              Multi-tiered process for resolving investor grievances from internal RTA review to SEBI SCORES 2.0 two-level review, online conciliation, and binding SMARTODR arbitration.
            </p>
          </div>

          {/* Grievance Modes Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-3">
              <div className="flex items-center gap-2 text-indigo-950 font-black text-base">
                <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs">
                  1
                </span>
                <span>Mode of Filing with Listed Company / RTA</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Investor can approach the Listed Company / RTA directly at the designated Investor Grievance e-mail ID. The Listed Company / RTA will strive to redress the grievance immediately, but <strong>not later than 21 days</strong> of the receipt of the grievance.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-white text-indigo-900 font-mono font-bold border border-indigo-100">
                  Direct Email: grievance@trustlinkinvestor.com
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white text-indigo-900 font-mono font-bold border border-indigo-100">
                  TAT: ≤ 21 Days
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
              <div className="flex items-center gap-2 text-blue-950 font-black text-base">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">
                  2
                </span>
                <span>SEBI SCORES 2.0 Centralized Portal</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Two-level structured review for complaint/grievance against RTA on SEBI SCORES 2.0 centralized system:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-blue-100">
                  <span className="font-extrabold text-blue-900 block text-[11px] uppercase">First Review</span>
                  <span className="text-[11px] text-slate-600">Done by Designated Body / Stock Exchange</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-blue-100">
                  <span className="font-extrabold text-blue-900 block text-[11px] uppercase">Second Review</span>
                  <span className="text-[11px] text-slate-600">Conducted directly by SEBI officials</span>
                </div>
              </div>
              <a
                href="https://scores.sebi.gov.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
              >
                <span>Visit SEBI SCORES 2.0 Portal</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* SMARTODR 7 Steps Flow */}
          <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-black text-slate-900">
                  Steps to be Followed in Online Dispute Resolution (SMARTODR)
                </h4>
                <p className="text-xs text-slate-500">
                  If unsatisfied with Market Participant resolution, investor may refer dispute for online conciliation or arbitration on SMARTODR.
                </p>
              </div>
              <a
                href="https://smartodr.in"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#0B1528] text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
              >
                SMARTODR Portal →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ODR_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-black uppercase text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                        Step {step.step}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {step.days}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-900">{step.title}</h5>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer Callout to Annexure-26 */}
      <div className="bg-gradient-to-r from-[#0B1528] to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 block">
            Statutory Cross-Reference • SEBI Master Circular
          </span>
          <h3 className="text-xl font-bold">Annexure-26: Monthly Complaints Disclosures</h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Every month, data on complaints received directly from investors, SEBI SCORES 2.0, stock exchanges, and other sources is published live under Annexure-26 along with average resolution turnaround time.
          </p>
        </div>
        <Link
          href="/investor/investor-grievances-reports"
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-md flex items-center gap-2"
        >
          <span>View Annexure-26 Live Data</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
