import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

export default function InvestorCharterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white text-black">
          {/* Page Header */}
          <div className="bg-sky-50 py-16 border-b border-gray-200">
            <div className="container mx-auto px-6 text-center">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-extrabold uppercase tracking-wider rounded-full mb-3">
                SEBI Mandatory Disclosure
              </span>
              <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl text-gray-900">
                Investor Charter
              </h1>
              <p className="mx-auto max-w-4xl text-lg text-gray-700 leading-relaxed">
                Trustlink Investor Services Private Limited – Registrar and Share Transfer Agent
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="container mx-auto px-6 py-16">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm max-w-4xl mx-auto">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Vision</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To be a trusted, transparent and prompt service provider to the investors,
                conforming to the highest standards of compliance, confidentiality and
                professionalism in conduct, to meet the obligation towards investors in
                Indian capital markets.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-slate-50 py-16 border-t border-b border-gray-200">
            <div className="container mx-auto px-6 max-w-4xl">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Mission</h2>
              <ul className="space-y-3 list-disc list-inside text-gray-700 text-base leading-relaxed">
                <li>Maintain high standards of integrity in business conduct</li>
                <li>Comply with all regulatory requirements in a time-bound manner</li>
                <li>Facilitate prompt investor services through process streamlining and technology</li>
                <li>Enable easy communication and interface for grievance resolution</li>
                <li>Ensure confidentiality of investor information unless legally required</li>
              </ul>
            </div>
          </div>

          {/* Timelines Table */}
          <div className="container mx-auto px-6 py-16 max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold text-gray-800 text-center">
              Timelines for Investor Services
            </h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-800 font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="px-6 py-4">Nature of Service</th>
                    <th className="px-6 py-4">Expected Timelines (Days)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-100">
                  {[
                    ["Transmission request", "21"],
                    ["Duplicate certificate", "30"],
                    ["Dematerialisation", "15"],
                    ["Rematerialisation", "30"],
                    ["Transposition", "15"],
                    ["Change of address / contact details", "15"],
                    ["Change of name / signature / nomination", "30"],
                    ["Updation of PAN", "15"],
                    ["Dividend / interest revalidation", "15"],
                    ["Investor grievance redressal", "21"],
                    ["IPO allotment", "6"],
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3.5 font-medium">{row[0]}</td>
                      <td className="px-6 py-3.5 font-bold text-blue-600">{row[1]} Days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Do’s & Don’ts */}
          <div className="bg-slate-50 py-16 border-t border-gray-200">
            <div className="container mx-auto px-6 max-w-4xl grid md:grid-cols-2 gap-10">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="mb-4 text-xl font-bold text-emerald-700 flex items-center gap-2">
                  <span>✅</span> Do’s for Investors
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm leading-relaxed">
                  <li>Encash dividends regularly</li>
                  <li>Ensure PAN and nomination are registered</li>
                  <li>Update KYC and bank details promptly</li>
                  <li>Monitor corporate announcements</li>
                  <li>Keep copies of documents submitted</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="mb-4 text-xl font-bold text-rose-700 flex items-center gap-2">
                  <span>❌</span> Don’ts for Investors
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm leading-relaxed">
                  <li>Do not keep folios without PAN or nomination</li>
                  <li>Do not deal with unauthorized persons</li>
                  <li>Do not share confidential security details</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
