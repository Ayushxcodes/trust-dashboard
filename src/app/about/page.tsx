import Card from "@/components/base/Card";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white text-black">
          {/* Hero / Page Header */}
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 py-16 border-b border-gray-200">
            <div className="container mx-auto px-6 text-center">
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider rounded-full">
                  About Trustlink
                </span>
              </div>
              <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl text-gray-900">
                About Us
              </h1>
              <p className="mx-auto max-w-3xl text-xl text-gray-600 leading-relaxed">
                Trustlink Investor Services Private Limited - Your Trusted SEBI Registered Registrar &amp; Transfer Agent
              </p>
            </div>
          </div>

          {/* Company Overview */}
          <div className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto">
              <Card background="gray" shadow="lg" border={true} className="mb-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Who We Are</h2>
                  <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
                </div>
                <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
                  <p>
                    <strong className="text-indigo-700">Trustlink Investor Services Private Limited</strong> is a
                    SEBI-registered Registrar and Share Transfer Agent (Category I)
                    bearing Registration No.{" "}
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded font-mono">
                      INR000004510
                    </span>.
                  </p>

                  <p>
                    We provide end-to-end Registrar and Transfer Agent services to issuer
                    companies and investors, strictly in accordance with the Securities
                    and Exchange Board of India (SEBI) regulations, circulars, and
                    applicable statutory requirements.
                  </p>

                  <p>
                    Our role is to act as a reliable interface between issuer companies
                    and investors by ensuring accurate maintenance of records, timely
                    processing of investor requests, and efficient handling of
                    corporate actions, while maintaining high standards of governance,
                    compliance, and operational integrity.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Regulatory Status */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 py-16 border-t border-b border-gray-200">
            <div className="container mx-auto px-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Regulatory Status
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                  Licensed and regulated by SEBI to ensure the highest standards of compliance and investor protection
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card shadow="xl" border={true} className="bg-white">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="font-semibold text-gray-800">SEBI Registration:</span>
                      </div>
                      <p className="text-gray-700 ml-6 text-sm">Registrar and Share Transfer Agent – Category I</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-semibold text-gray-800">Registration Number:</span>
                      </div>
                      <p className="text-gray-700 ml-6 font-mono bg-gray-50 px-3 py-1 rounded text-sm inline-block">
                        INR000004351
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-gray-700 text-center text-sm leading-relaxed">
                      <span className="font-semibold">Trustlink Investor Services</span> operates under the regulatory
                      framework prescribed by SEBI and complies with all applicable
                      laws, guidelines, and reporting obligations relevant to
                      Registrar and Transfer Agents.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Our Vision &amp; Mission
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Driving excellence in investor services through innovation, compliance, and trust
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
              {/* Vision */}
              <Card hover={true} shadow="lg" background="white" border={true} className="h-full">
                <div className="text-center">
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    To be a trusted and reliable Registrar and Share Transfer Agent,
                    recognized for regulatory compliance, operational accuracy, and
                    investor-centric service delivery.
                  </p>
                </div>
              </Card>

              {/* Mission */}
              <Card hover={true} shadow="lg" background="white" border={true} className="h-full">
                <div className="text-center">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    Our Mission
                  </h3>
                  <ul className="space-y-3 text-gray-700 text-left">
                    <li className="flex items-start space-x-3">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span className="text-sm">Deliver Registrar and Transfer Agent services in strict adherence to SEBI regulations</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span className="text-sm">Ensure accurate maintenance of investor records and timely processing</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span className="text-sm">Provide transparent, efficient, and responsive investor servicing</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span className="text-sm">Uphold highest standards of data security and corporate governance</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
