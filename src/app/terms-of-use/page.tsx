import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Terms of Use
          </h1>
          <p className="text-slate-300 text-sm font-mono">
            Trustlink Investor Services Private Limited | SEBI Category I RTA
          </p>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-4xl space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm text-sm leading-relaxed text-slate-700">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the digital portal, document vault, or investor servicing tools provided by Trustlink Investor Services Private Limited (&quot;Trustlink&quot;), corporate issuers and individual security holders agree to abide by these Terms of Use and applicable SEBI regulations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Authorised Portal Usage &amp; Credentials</h2>
            <p>
              Access to corporate dashboard controls, dematerialisation submission pipelines, and compliance verification modules is restricted to authorized corporate officers and verified security holders. Users are responsible for maintaining the confidentiality of session credentials and account passwords.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Verification of Submitted Documents</h2>
            <p>
              All documents uploaded to the platform (including Certificates of Incorporation, PAS-3/SH-7 filings, Board Resolutions, and Form ISR applications) are subject to regulatory scrutiny. Providing fraudulent or forged documents constitutes a violation of the Companies Act, 2013 and SEBI regulations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Limitation of Liability</h2>
            <p>
              Trustlink provides RTA services in accordance with SEBI Master Circulars. While we maintain 99.9% system uptime and automated depository credit syncs, Trustlink shall not be liable for delays caused by third-party depository network outages (NSDL/CDSL) or invalid investor data submissions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Statutory Jurisdiction</h2>
            <p>
              These Terms of Use are governed by the laws of India. Any legal disputes arising out of RTA servicing shall fall under the exclusive jurisdiction of the competent courts in New Delhi, India.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
