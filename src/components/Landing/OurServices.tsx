import Card from "../base/Card";

export default function OurServices() {
  return (
    <section id="services" className="bg-white py-20 text-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-indigo-500">
            Our Services
          </span>
          <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl md:text-5xl text-slate-900">
            Comprehensive RTA Solutions
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
            We offer a wide range of Registrar &amp; Transfer Agent services to ensure seamless management of securities and investor relations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Maintenance / Securities */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <h3 className="mb-4 text-xl font-bold text-slate-900">📋 Maintenance / Securities</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Maintaining Securities Registry of Investors. Providing electronic services to corporate for securities and debt instruments.
            </p>
          </Card>

          {/* Consolidation / Splits */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <h3 className="mb-4 text-xl font-bold text-slate-900">🔄 Consolidation / Splits</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sub-division, split and consolidation of securities.
            </p>
          </Card>

          {/* NSDL / CDSL */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <h3 className="mb-4 text-xl font-bold text-slate-900">🏦 NSDL / CDSL</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Dematerialisation and Rematerialisation of securities via both Depository i.e. NSDL and CDSL, ISIN Activation.
            </p>
          </Card>

          {/* Back Security & Unit Security */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <h3 className="mb-4 text-xl font-bold text-slate-900">🔙 Buyback &amp; De-listing</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Buy back of Securities and De-listing of securities. Merger, De-merger and acquisition of Securities.
            </p>
          </Card>

          {/* Benefits */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <h3 className="mb-4 text-xl font-bold text-slate-900">📢 Investor Communications</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Call notice to shareholders and beneficiaries.
            </p>
          </Card>

          {/* Arrangement */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <h3 className="mb-4 text-xl font-bold text-slate-900">📅 AGM / EGM Arrangement</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Arrangement for holding AGM / EGM, Postal Ballot and Attendance Slips for AGM / EGM.
            </p>
          </Card>

          {/* Issues of shares / Securities */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <h3 className="mb-4 text-xl font-bold text-slate-900">📈 Issues of Shares</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              IPO, FPO, Bonus, Rights Issue and processing warrants.
            </p>
          </Card>

          {/* Rectification */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <h3 className="mb-4 text-xl font-bold text-slate-900">🔧 Rectification &amp; Complaints</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Rectification of errors, fraction elimination and Investor Complaints resolution.
            </p>
          </Card>

          {/* ESOP */}
          <Card hover={true} background="gray" border={true} className="h-full">
            <h3 className="mb-4 text-xl font-bold text-slate-900">💼 ESOP &amp; Lock-in</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              ESOP and Lock-in and partly paid up securities management.
            </p>
          </Card>

          {/* Certificates */}
          <Card hover={true} background="gray" border={true} className="h-full lg:col-span-3">
            <h3 className="mb-4 text-xl font-bold text-slate-900">📜 Share Certificates</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Share Certificate related services viz; Issue of Duplicate share certificates, call endorsement of share certificate and exchange of share certificate, etc.
            </p>
          </Card>

          {/* Other Security */}
          <Card hover={true} background="gray" border={true} className="h-full lg:col-span-3">
            <h3 className="mb-4 text-xl font-bold text-slate-900">🔐 Statutory Registers &amp; Compliance</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Maintaining and providing Register of Transfer of Shares, Register of Transmission of Shares, Register of Transfer of Debentures, Shareholding Report, Register of Members, Secretarial Audit Services, Certificate under clause 47(c), List of Shareholders, Split Register, Duplicate Register, Consolidation Report, Complaint Status, Index Register, and Allotment Register.
            </p>
          </Card>

        </div>
      </div>
    </section>
  );
}
