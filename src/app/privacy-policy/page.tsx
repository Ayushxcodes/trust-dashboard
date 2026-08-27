import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <span className="inline-block px-3.5 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider rounded-full mb-3 border border-indigo-500/30">
            Statutory Legal Disclosure
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            Privacy Policy &amp; Data Protection
          </h1>
          <p className="text-slate-300 text-sm font-mono">
            Effective Date: 27 August 2026 | SEBI Category I RTA Registration No: INR000004351
          </p>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-4xl space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm text-sm leading-relaxed text-slate-700">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Regulatory Scope &amp; Commitment</h2>
            <p>
              Trustlink Investor Services Private Limited (&quot;Trustlink&quot;, &quot;we&quot;, &quot;us&quot;) operates as a SEBI Category I Registrar and Share Transfer Agent (RTA). We are committed to safeguarding the personally identifiable information (PII), financial records, and demat folio disclosures of investors, security holders, and corporate issuers in accordance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and <strong>SEBI Cybersecurity &amp; Cyber Resilience Frameworks</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Collection of Personal &amp; Securities Data</h2>
            <p>
              In performing statutory RTA functions, we collect and process data provided directly by investors or received from depositories (NSDL and CDSL) and corporate issuers, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 font-medium text-slate-800">
              <li>Permanent Account Number (PAN), Aadhaar masking, and CKYC identifiers.</li>
              <li>Bank account details, IFSC code, and NECS mandate authorizations.</li>
              <li>DP ID, Client ID, folio numbers, and shareholding balances.</li>
              <li>Signatures, specimen cards, indemnity bonds, and Form ISR submission documents.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Purpose of Processing &amp; Use of Data</h2>
            <p>
              Collected information is processed strictly for regulatory and statutory purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Processing physical share dematerialization, rematerialization, and transfer requests.</li>
              <li>Executing dividend payouts, corporate action distributions, and tax withholding (TDS).</li>
              <li>Maintaining statutory registers of members under Section 88 of the Companies Act, 2013.</li>
              <li>Fulfilling SEBI audit logging, SCORES 2.0 grievance resolution, and statutory reporting.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Data Storage, Encryption &amp; AWS Presigned Vault</h2>
            <p>
              All client documents and KYC records uploaded through our web application are encrypted in transit using TLS 1.3 (HSTS enforced) and at rest via AES-256 bit encryption in secure AWS S3 vault buckets. Presigned temporary storage tokens ensure unauthorized access is strictly prevented.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Grievance &amp; Data Protection Officer Contact</h2>
            <p>
              For data protection inquiries or to request verification of registered KYC records, contact our designated Compliance Officer:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-1">
              <p><strong>Nodal Officer:</strong> Mr. Nishant Khemani (Compliance Officer)</p>
              <p><strong>Email:</strong> info@trustlinkinvestor.com</p>
              <p><strong>Official Address:</strong> Trustlink Investor Services Private Limited, SEBI Reg No: INR000004351</p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
