import Card from "../base/Card";

export default function OurServicesPage() {
  const services = [
    {
      title: "Security Dematerialization (NSDL & CDSL)",
      desc: "Transform physical certificates into electronic format via dematerialization with NSDL and CDSL depositories for secure ownership.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: "Payout of Dividend / Interest via ECS",
      desc: "Receive dividends and interest seamlessly through ECS transfers, minimizing risks and ensuring SEBI-compliant payouts.",
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 8v2m0-6c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Investor Record Keeping & Securities Transfer",
      desc: "Efficient management of investor records, transfers, purchases, sales, and personal detail updates.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      ),
    },
    {
      title: "Revalidation of Dividend",
      desc: "Streamline dividend revalidation through dematerialization and secure demat account ownership.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "Inquiry Handling",
      desc: "Prompt inquiry resolution through phone, mail, online portals, fax, and helpline services.",
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: "Investor Regulatory Reporting",
      desc: "Comprehensive investor data management ensuring accurate regulatory reporting and compliance.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Reporting, Mailing & Investor Meetings",
      desc: "End-to-end reporting, mailing services, and coordination of investor meetings.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Share Transfer Certificate",
      desc: "Facilitate physical share transfer through SH-4 form submission and official register updates.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
    },
    {
      title: "Duplicate Share Certificate",
      desc: "Seamless assistance for obtaining duplicate share certificates with required documentation.",
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "Reconciliation of Share Capital (PAS-6)",
      desc: "Half-yearly reconciliation and PAS-6 compliance for unlisted public companies under Rule 9B.",
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      title: "IEPF Claim Settlement",
      desc: "Assistance in reclaiming unclaimed dividends and shares using Form IEPF-5.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0l-3 3m3-3l3 3" />
        </svg>
      ),
    },
    {
      title: "Name / Signature / Address Changes",
      desc: "Support for name change, transmission, transposition, and signature/address updates.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 text-black py-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-sky-100 to-blue-100 py-16 mb-12 border-b border-blue-200">
        <div className="container mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider rounded-full mb-4">
            Category I RTA Services
          </span>
          <h1 className="mb-6 text-4xl font-extrabold sm:text-5xl bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent">
            Our Services &amp; Solutions
          </h1>
          <p className="mx-auto max-w-4xl text-lg text-gray-700 leading-relaxed">
            TrustLink RTA is your one-stop solution for a spectrum of services,
            encompassing seamless company formation, meticulous regulatory
            compliance, and strategic advisory. Elevate your business with our
            comprehensive RTA services.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="mailto:info@trustlinkinvestor.com"
              className="rounded-full bg-gradient-to-r from-blue-900 to-indigo-900 px-8 py-3 text-white font-semibold hover:from-blue-800 hover:to-indigo-800 transition-all duration-300 shadow-lg text-sm"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="container mx-auto px-6 mb-16">
        <h2 className="mb-6 text-3xl font-bold text-center text-slate-800">
          Highly Dedicated RTA Services Providing Company in India
        </h2>
        <p className="mx-auto max-w-5xl text-center text-gray-700 leading-relaxed text-lg">
          TrustLink RTA has expanded traditional securities through innovation in
          response to customer needs. We provide highly relevant compliance
          solutions by understanding the unique situations and targets of our
          clients.
        </p>
      </div>

      {/* RTA Services List */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="mb-12 text-3xl font-bold text-center text-slate-900">
          RTA Services for Unlisted Companies, Listed Entities and Professionals
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              hover={true}
              border={true}
              shadow="md"
              background="white"
              className="h-full flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-800">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
