import Card from "../base/Card";

export default function OurServices() {
  return (
    <section id="services" className="bg-white py-20 text-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-indigo-600">
            SEBI Category I RTA
          </span>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl md:text-5xl text-slate-900">
            Comprehensive RTA Solutions
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
            End-to-end Registrar &amp; Share Transfer Agent services conforming to SEBI regulations, ensuring security, speed, and accuracy.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Maintenance / Securities */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-indigo-100 text-indigo-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Maintenance / Securities</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Maintaining Securities Registry of Investors. Providing electronic services to corporate for securities and debt instruments.
            </p>
          </Card>

          {/* Consolidation / Splits */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-blue-100 text-blue-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Consolidation / Splits</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sub-division, split and consolidation of securities.
            </p>
          </Card>

          {/* NSDL / CDSL */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">NSDL / CDSL Demat</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Dematerialisation and Rematerialisation of securities via NSDL and CDSL, ISIN Activation &amp; Corporate Action processing.
            </p>
          </Card>

          {/* Buyback & Delisting */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-purple-100 text-purple-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Buyback &amp; De-listing</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Buy back of Securities and De-listing of securities. Merger, De-merger and acquisition of Securities.
            </p>
          </Card>

          {/* Investor Communications */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Investor Communications</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Call notice to shareholders, statutory notices, dividend intimations, and beneficiary notifications.
            </p>
          </Card>

          {/* AGM / EGM Arrangement */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-sky-100 text-sky-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">AGM / EGM Arrangement</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Arrangement for holding AGM / EGM, Postal Ballot, e-Voting management, and Attendance Slips.
            </p>
          </Card>

          {/* Issues of Shares */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-teal-100 text-teal-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Issues of Shares</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              IPO, FPO, Bonus, Rights Issue, share split processing, and warrant conversions.
            </p>
          </Card>

          {/* Rectification & Complaints */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-rose-100 text-rose-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Rectification &amp; Complaints</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Rectification of errors, fraction elimination, and structured Investor Complaints resolution with defined TAT.
            </p>
          </Card>

          {/* ESOP */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-orange-100 text-orange-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">ESOP &amp; Lock-in</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              ESOP corporate actions, lock-in management, and partly paid-up securities servicing.
            </p>
          </Card>

          {/* Certificates */}
          <Card hover={true} background="gray" border={true} className="h-full lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-indigo-100 text-indigo-700 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Share Certificates &amp; Transmission</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Issue of Duplicate share certificates, call endorsement, share certificate exchange, transmission upon death, transposition, and name corrections.
            </p>
          </Card>

          {/* Other Security */}
          <Card hover={true} background="gray" border={true} className="h-full lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-[#0B1528] text-emerald-400 shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Statutory Registers &amp; Compliance</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Maintaining and providing Register of Transfer of Shares, Register of Transmission, Register of Debenture Holders, Shareholding Reports, Secretarial Audit Services, Clause 47(c) certification, Split/Duplicate Registers, Index Registers, and MCA reporting compliance.
            </p>
          </Card>

        </div>
      </div>
    </section>
  );
}
