import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <span className="inline-block px-3.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider rounded-full mb-3 border border-emerald-500/30">
            SEBI Cybersecurity Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            Institutional Security &amp; Infrastructure
          </h1>
          <p className="text-slate-300 text-base max-w-3xl mx-auto leading-relaxed">
            Trustlink Investor Services enforces bank-grade encryption, presigned S3 document isolation, Multi-Factor Authentication (MFA), and strict SEBI Cyber Resilience Framework protocols.
          </p>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">

          {/* Security Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">AWS S3 Presigned Vault</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All investor identity documents (COI, PAS-3, PAN, Form ISR) are stored in encrypted AWS S3 buckets using short-lived presigned URLs to prevent unauthorized direct URL guessing.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">TLS 1.3 &amp; HSTS Enforced</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-site SSL encryption with HTTP Strict Transport Security (HSTS) prevents man-in-the-middle attacks and enforces secure HTTPS connections across all endpoints.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">VAPT &amp; Audit Logging</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regular Vulnerability Assessment and Penetration Testing (VAPT) conducted by CERT-In empaneled auditors. Every administrative action is logged to an immutable audit ledger.
              </p>
            </div>

          </div>

          {/* Compliance Matrix */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-black text-slate-900">SEBI Cyber Resilience Framework Compliance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-extrabold uppercase text-xs">
                    <th className="p-4 rounded-l-xl">Security Standard</th>
                    <th className="p-4">Implementation Control</th>
                    <th className="p-4 rounded-r-xl text-center">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Multi-Factor Authentication (MFA)</td>
                    <td className="p-4">Enforced TOTP / SMS OTP authentication for administrative logins</td>
                    <td className="p-4 text-center"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">COMPLIANT</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Data At Rest Encryption</td>
                    <td className="p-4">AES-256 server-side encryption for PostgreSQL &amp; AWS S3 object store</td>
                    <td className="p-4 text-center"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">COMPLIANT</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Role-Based Access Control (RBAC)</td>
                    <td className="p-4">Strict separation between public investor view, client entity desk, and registry admin</td>
                    <td className="p-4 text-center"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">COMPLIANT</span></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Annual VAPT Certification</td>
                    <td className="p-4">CERT-In certified third-party vulnerability audit executed annually</td>
                    <td className="p-4 text-center"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">VERIFIED</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:underline"
            >
              Read our Data Privacy Policy &rarr;
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
