import Card from "../base/Card";

export default function OurServicesPage() {
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
          {[
            {
              title: "Security Dematerialization (NSDL & CDSL)",
              desc: "Transform physical certificates into electronic format via dematerialization with NSDL and CDSL depositories for secure ownership.",
              icon: "🔒"
            },
            {
              title: "Payout of Dividend / Interest via ECS",
              desc: "Receive dividends and interest seamlessly through ECS transfers, minimizing risks and ensuring SEBI-compliant payouts.",
              icon: "💰"
            },
            {
              title: "Investor Record Keeping & Securities Transfer",
              desc: "Efficient management of investor records, transfers, purchases, sales, and personal detail updates.",
              icon: "📊"
            },
            {
              title: "Revalidation of Dividend",
              desc: "Streamline dividend revalidation through dematerialization and secure demat account ownership.",
              icon: "🔄"
            },
            {
              title: "Inquiry Handling",
              desc: "Prompt inquiry resolution through phone, mail, online portals, fax, and helpline services.",
              icon: "📞"
            },
            {
              title: "Investor Regulatory Reporting",
              desc: "Comprehensive investor data management ensuring accurate regulatory reporting and compliance.",
              icon: "📋"
            },
            {
              title: "Reporting, Mailing & Investor Meetings",
              desc: "End-to-end reporting, mailing services, and coordination of investor meetings.",
              icon: "📧"
            },
            {
              title: "Share Transfer Certificate",
              desc: "Facilitate physical share transfer through SH-4 form submission and official register updates.",
              icon: "📄"
            },
            {
              title: "Duplicate Share Certificate",
              desc: "Seamless assistance for obtaining duplicate share certificates with required documentation.",
              icon: "📑"
            },
            {
              title: "Reconciliation of Share Capital (PAS-6)",
              desc: "Half-yearly reconciliation and PAS-6 compliance for unlisted public companies under Rule 9B.",
              icon: "⚖️"
            },
            {
              title: "IEPF Claim Settlement",
              desc: "Assistance in reclaiming unclaimed dividends and shares using Form IEPF-5.",
              icon: "🏛️"
            },
            {
              title: "Name / Signature / Address Changes",
              desc: "Support for name change, transmission, transposition, and signature/address updates.",
              icon: "✏️"
            }
          ].map((service, index) => (
            <Card
              key={index}
              hover={true}
              border={true}
              shadow="md"
              background="white"
              className="h-full"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
