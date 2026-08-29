import Link from "next/link";

interface ServiceItem {
  title: string;
  category: string;
  tat: string;
  rule: string;
  desc: string;
  deliverables: string[];
  icon: React.ReactNode;
}

export default function OurServicesPage() {
  const serviceCategories: { name: string; items: ServiceItem[] }[] = [
    {
      name: "Depository & Demat Operations",
      items: [
        {
          title: "Security Dematerialisation (NSDL & CDSL)",
          category: "Depository Sync",
          tat: "15 Days TAT",
          rule: "SEBI (D&P) Reg 2018",
          desc: "End-to-end Dematerialisation (DRF) and Rematerialisation (RRF) processing, electronic verification, and daily BENPOS sync with NSDL & CDSL.",
          deliverables: ["DRF Verification & Credit", "BENPOS File Reconciliation", "ISIN Setup & Activation"],
          icon: (
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
        },
        {
          title: "Corporate Actions & Lock-in Tagging",
          category: "Depository Sync",
          tat: "5 Days TAT",
          rule: "SEBI Circular 2023",
          desc: "Setup and execution of IPO, Rights, Bonus, ESOP lock-in release, and depository corporate action credits.",
          deliverables: ["Lock-in Tagging & Release", "CA Allotment Execution", "Depository Certificate Filing"],
          icon: (
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
        },
      ],
    },
    {
      name: "Physical Folios & Share Transfer",
      items: [
        {
          title: "Duplicate Certificate & Letter of Confirmation",
          category: "Physical Folio",
          tat: "30 Days TAT",
          rule: "SEBI ISR Series Circulars",
          desc: "Issuance of Form ISR-4 Letters of Confirmation in lieu of duplicate share certificates, loss of certificate verification, and public notice audits.",
          deliverables: ["Form ISR-4 Letter Issue", "Loss Clearance Verification", "Shareholder Folio Endorsement"],
          icon: (
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
        },
        {
          title: "Transmission, Transposition & Name Correction",
          category: "Physical Folio",
          tat: "21 Days TAT",
          rule: "SEBI LODR Reg 39(3)",
          desc: "Legal heir transmission upon death, name correction, signature update (Form ISR-2), address updates, and consolidation/split of physical certificates.",
          deliverables: ["Legal Heir Transmission", "Form ISR-2 Signature Audit", "Cert Split & Consolidation"],
          icon: (
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002-2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          ),
        },
      ],
    },
    {
      name: "Corporate Governance & Compliance",
      items: [
        {
          title: "PAS-6 Share Capital Reconciliation",
          category: "Compliance",
          tat: "Half-Yearly",
          rule: "Companies Act Sec 88 & Rule 9B",
          desc: "Audit and half-yearly PAS-6 reconciliation filings for unlisted public companies, verifying physical and electronic capital balance.",
          deliverables: ["PAS-6 Audit Filing Data", "Statutory Register Maintenance", "Clause 47(c) Secretarial Certificate"],
          icon: (
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
            </svg>
          ),
        },
        {
          title: "AGM / EGM e-Voting & Postal Ballot",
          category: "Governance",
          tat: "Event-Based",
          rule: "SEBI LODR Reg 44 & MCA",
          desc: "Arrangement for AGM/EGM, remote e-Voting management, postal ballot execution, scrutinizer report compilation, and attendance slips.",
          deliverables: ["e-Voting Platform Integration", "Attendance & Proxy Register", "Scrutinizer Polling Summary"],
          icon: (
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      name: "Dividend Disbursal & IEPF Settlements",
      items: [
        {
          title: "Dividend / Interest Payout via NECS & NACH",
          category: "Payouts",
          tat: "15 Days TAT",
          rule: "SEBI Unclaimed Payout Circulars",
          desc: "Direct electronic credit of dividends and debenture interest to bank accounts via NECS/NACH, warrant printing, and bank mandate updates.",
          deliverables: ["NECS Direct Bank Transfer", "Unclaimed Dividend Ledger", "Warrant Revalidation"],
          icon: (
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 8v2m0-6c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
        {
          title: "IEPF Claim Settlement (Form IEPF-5)",
          category: "IEPF Claims",
          tat: "30 Days TAT",
          rule: "IEPF Authority Rules 2016",
          desc: "Assisting investors in filing Form IEPF-5, verifying entitlement, and coordinating with the Investor Education and Protection Fund Authority.",
          deliverables: ["Form IEPF-5 Entitlement Audit", "IEPF-2 Annual Statement", "Shares & Dividend Refund"],
          icon: (
            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0l-3 3m3-3l3 3" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans">
      
      {/* Tamed Hero Header */}
      <section className="bg-slate-50 border-b border-slate-200 py-12 sm:py-16">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          
          

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            RTA Services &amp; Regulatory Solutions
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            End-to-end Registrar &amp; Share Transfer Agent operations strictly conforming to SEBI regulations, Companies Act, and depository requirements.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/track-request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>Track Service Request (SRN)</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <a
              href="mailto:info@trustlinkinvestor.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors shadow-xs"
            >
              <span>Contact Compliance Desk</span>
            </a>
          </div>

        </div>
      </section>

      {/* Categorized Services Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-6 max-w-6xl space-y-16">
          {serviceCategories.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              
              {/* Category Header */}
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest">
                  MODULE 0{idx + 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {cat.name}
                </h2>
              </div>

              {/* Items Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-200 hover:bg-slate-50 transition-all shadow-xs"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                            {item.icon}
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-500">
                            {item.category}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded text-[10.5px] font-mono font-bold bg-white border border-slate-200 text-slate-700 shadow-xs">
                          {item.tat}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>

                      {/* Regulation */}
                      <div className="mb-3 inline-block px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-indigo-800 text-[11px] font-mono font-bold">
                        {item.rule}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {item.desc}
                      </p>
                    </div>

                    {/* Deliverables List */}
                    <div className="pt-4 border-t border-slate-200 space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        STATUTORY DELIVERABLES:
                      </span>
                      {item.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Compliance Guarantee Banner */}
      <section className="bg-slate-50 border-t border-slate-200 py-14">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 block mb-2">
            SEBI REGULATORY ASSURANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Permanent SEBI Category I RTA Compliance
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto mb-6">
            All services are executed with strict adherence to SEBI Master Circulars, MCA Secretarial standards, and NSDL/CDSL depository guidelines.
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 font-bold shadow-xs">
            <span>SEBI REG NO: INR000004510</span>
            <span className="text-slate-300">•</span>
            <span className="text-indigo-700">100% AUDIT READY</span>
          </div>
        </div>
      </section>

    </div>
  );
}
