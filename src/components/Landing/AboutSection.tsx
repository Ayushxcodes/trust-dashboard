export default function AboutSection() {
  return (
    <section id="about" className="bg-slate-50 py-20 text-black border-t border-b border-gray-200">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-indigo-600">
            SEBI Category I RTA Credentials
          </span>

          <h2 className="mb-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-slate-900">
            Trusted, Compliant &amp; Technology-Driven RTA Services
          </h2>

          <p className="text-lg text-gray-600 sm:text-xl leading-relaxed">
            Incorporated with a commitment to governance and speed, Trustlink Investor Services Private Limited provides verifiable RTA expertise to issuer companies and investors across India.
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              SEBI Reg. No. INR000004510
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              SEBI Registered Category I RTA operating under permanent registration with strict adherence to SEBI Master Circulars for RTAs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l2-2 4 4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              100+ Corporate Issuer Clients
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Servicing over 100 corporate issuers across equity, debt, and dematerialized securities with seamless NSDL/CDSL depository sync.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              500,000+ Investor Folios
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Managing 500,000+ shareholder folios, dividend disbursements, IEPF transfers, and physical share conversions with precision.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              Designated Compliance Leadership
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Headed by Compliance &amp; Nodal Officer Mr. Nishant Khemani, ensuring transparent escalation paths and quick TAT resolutions.
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              Encrypted Vault &amp; Audit Logs
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Strict PII &amp; PAN data protection, MFA, audit trails, and document vault security adhering to SEBI cyber resilience standards.
            </p>
          </div>

          {/* Card 6 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              Statutory Grievance &amp; SCORES 2.0
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              3-level grievance escalation mechanism connected with SEBI SCORES 2.0 and SMART ODR (`smartodr.in`) for swift dispute resolution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
