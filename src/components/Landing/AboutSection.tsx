export default function AboutSection() {
  return (
    <section id="about" className="bg-slate-50 py-20 text-black border-t border-b border-gray-200">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-indigo-500">
            Why Choose Us
          </span>

          <h2 className="mb-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl text-slate-900">
            Trusted, Compliant &amp; Technology-Driven RTA Services
          </h2>

          <p className="text-lg text-gray-600 sm:text-xl leading-relaxed">
            We combine regulatory expertise, operational accuracy, and secure
            technology to deliver reliable Registrar &amp; Transfer Agent services
            that meet the highest standards of compliance and investor trust.
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              Regulatory Compliance
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              All activities are carried out strictly in compliance with SEBI
              regulations, circulars, and statutory obligations applicable to
              Registrar &amp; Transfer Agents.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              Accurate Record Maintenance
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              We ensure precise maintenance of investor records, holdings, and
              statutory registers as prescribed under applicable laws.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              Timely Investor Servicing
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Investor requests and queries are processed within prescribed
              timelines through structured and transparent servicing mechanisms.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              SEBI Registered – Category I RTA
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Trustlink Investor Services is registered with SEBI as a Registrar
              and Share Transfer Agent (Category I) and operates in full
              accordance with regulatory requirements.
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              Data Security &amp; Confidentiality
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Robust systems and internal controls are maintained to safeguard
              investor data, documents, and sensitive records.
            </p>
          </div>

          {/* Card 6 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 transition hover:shadow-lg hover:-translate-y-1">
            <h3 className="mb-3 text-xl font-semibold text-slate-900">
              End-to-End RTA Operations
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Comprehensive RTA services covering physical and electronic
              securities, corporate actions, and investor reporting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
