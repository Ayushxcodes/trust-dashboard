import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

export default function InvestorCharterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <span className="inline-block px-3.5 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider rounded-full mb-3 border border-indigo-500/30">
            SEBI Statutory Disclosure
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            Investor Charter for RTAs
          </h1>
          <p className="text-slate-300 text-base max-w-3xl mx-auto leading-relaxed">
            Prescribed duties, timelines, service commitments, and rights of investors dealing with Trustlink Investor Services Private Limited under SEBI regulations.
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href="/resources"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Full Investor Charter &amp; Form ISR Series
            </a>
          </div>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-5xl space-y-12">
          
          {/* Vision & Mission Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Vision</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To be a trusted, transparent, and prompt service provider to investors, conforming to the highest standards of compliance, confidentiality, and professionalism in conduct to fulfill obligations towards capital market investors.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Mission</h2>
                <ul className="space-y-2 text-slate-600 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span> Maintain high standards of integrity and confidentiality in business conduct.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span> Comply with all regulatory requirements in a strict time-bound manner.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span> Facilitate prompt investor services via digital integration.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Timelines Table */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                Prescribed Regulatory Timelines for RTA Services
              </h2>
              <p className="text-xs text-slate-500">
                Mandated maximum processing turnaround times under SEBI Master Circular for Category I RTAs.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-extrabold uppercase text-xs">
                    <th className="p-4 rounded-l-xl">Nature of Investor Service</th>
                    <th className="p-4 text-center rounded-r-xl">Expected SEBI Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {[
                    ["Transmission of physical / demat securities", "21 Days"],
                    ["Issue of Duplicate Share Certificate (Form ISR-4)", "30 Days"],
                    ["Dematerialisation of physical shares (DRF)", "15 Days"],
                    ["Rematerialisation of depository securities", "30 Days"],
                    ["Transposition of security holders", "15 Days"],
                    ["Change of address / bank details / contact info", "15 Days"],
                    ["Registration / Updation of PAN & KYC (Form ISR-1)", "15 Days"],
                    ["Nomination registration / cancellation (Form SH-13 / SH-14)", "15 Days"],
                    ["Revalidation of Dividend / Interest Warrants", "15 Days"],
                    ["Investor Grievance Redressal (Level 1)", "7 to 15 Days"],
                    ["IPO / Rights Issue Allotment & Refund processing", "6 Days"],
                  ].map(([service, time], i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-semibold text-slate-900">{service}</td>
                      <td className="p-4 text-center">
                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold font-mono border border-indigo-100">
                          {time}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Do's & Don'ts */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-emerald-500 text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Do’s for Investors</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Encash dividend warrants regularly before expiration.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Ensure valid PAN, Aadhaar, and nomination details are registered for all folios.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Promptly update changes in bank account and communication address via Form ISR-1.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Convert physical shares into demat mode to eliminate loss/damage risks.
                </li>
              </ul>
            </div>

            <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-rose-500 text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Don’ts for Investors</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span> Do not hold physical share folios without registering mandatory PAN and nomination.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span> Do not send original share certificates without registered post / tracking.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span> Do not deal with unauthorized agents or intermediaries for RTA services.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span> Do not share unverified OTPs or login credentials.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
