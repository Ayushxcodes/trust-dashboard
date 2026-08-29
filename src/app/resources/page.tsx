import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

type DownloadLinkProps = {
  href: string;
  label: string;
  badge?: string;
};

function DownloadLink({ href, label, badge = "PDF" }: DownloadLinkProps) {
  return (
    <a
      href={href}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-between gap-2.5 p-3 rounded-xl bg-indigo-50/70 hover:bg-indigo-100/90 border border-indigo-200 text-indigo-950 text-xs font-bold transition-all group shadow-2xs"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <svg className="h-4 w-4 text-indigo-700 shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="truncate">{label}</span>
      </div>
      <span className="text-[9px] font-mono px-2 py-0.5 rounded shrink-0 uppercase font-bold bg-indigo-600 text-white">
        {badge}
      </span>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            Download Statutory Forms &amp; Templates
          </h1>
          <p className="text-slate-300 text-base max-w-3xl mx-auto leading-relaxed">
            Official SEBI Form ISR Series (ISR-1, ISR-2, ISR-3, ISR-4), Companies Act Forms (SH-13, SH-14, SH-4), KYC formats, indemnity bonds, and tax exemption declarations.
          </p>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-5xl space-y-12">

          {/* HIGHLIGHTED SECTION: OFFICIAL SEBI ISR & SH MANDATORY FORMS */}
          <div className="bg-white rounded-3xl p-8 border border-indigo-100 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold">SEBI Master Circular Requirement</span>
                <h2 className="text-2xl font-black text-slate-900">Mandatory SEBI ISR &amp; Companies Act Forms</h2>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
                Official PDF Documents
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              {/* Form ISR-1 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm text-slate-900">Form ISR-1</h3>
                    <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">PAN / KYC / Bank</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Request for registering PAN, KYC details, bank account, email address, and mobile number.
                  </p>
                </div>
                <DownloadLink href="/Form_ISR-1.pdf" label="Download Form ISR-1 Official Form" badge="PDF" />
              </div>

              {/* Form ISR-2 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm text-slate-900">Form ISR-2</h3>
                    <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Bank Verification</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Confirmation of Signature of Securities Holder by the Bank Manager with seal.
                  </p>
                </div>
                <DownloadLink href="/Form_ISR-2.pdf" label="Download Form ISR-2 Official Form" badge="PDF" />
              </div>

              {/* Form ISR-3 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm text-slate-900">Form ISR-3</h3>
                    <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Opt-Out Nomination</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Declaration form for opting out of nomination by individual security holders.
                  </p>
                </div>
                <DownloadLink href="/Form_ISR-3.pdf" label="Download Form ISR-3 Official Declaration" badge="PDF" />
              </div>

              {/* Form ISR-4 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm text-slate-900">Form ISR-4</h3>
                    <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">Duplicates &amp; Remat</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Request for issue of Duplicate Share Certificate, Transmission, Transposition, or Rematerialisation.
                  </p>
                </div>
                <DownloadLink href="/Form-ISR-4.pdf" label="Download Form ISR-4 Official Form" badge="PDF" />
              </div>

              {/* Form SH-13 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm text-slate-900">Form SH-13</h3>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Nomination Registration</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Nomination form pursuant to Section 72 of the Companies Act, 2013 and Rule 19(1).
                  </p>
                </div>
                <DownloadLink href="/Form_SH13_NOMINATION_FORM.pdf" label="Download Form SH-13 Official Form" badge="PDF" />
              </div>

              {/* Form SH-14 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-sm text-slate-900">Form SH-14</h3>
                    <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">Nomination Cancellation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cancellation or variation of nomination pursuant to Section 72(3) of Companies Act, 2013.
                  </p>
                </div>
                <DownloadLink href="/Form-SH14-Cancellation-Variation-Nomination-Form.pdf" label="Download Form SH-14 Official Form" badge="PDF" />
              </div>

            </div>
          </div>

          {/* Categorized Additional Statutory Templates */}
          <div className="grid gap-8 md:grid-cols-2">

            {/* Dividend & Tax Exemption */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 8v2m0-6c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Dividend &amp; Tax Exemption Forms
              </h2>
              <div className="flex flex-col gap-2.5">
                <DownloadLink href="/FORM_15G.pdf" label="Form 15G Declaration (Individual Tax Exemption)" badge="PDF" />
                <DownloadLink href="/FORM_NO_15H.pdf" label="Form 15H Declaration (Senior Citizens)" badge="PDF" />
                <DownloadLink href="/Form_10F.pdf" label="Form 10F (Non-Resident TRC Tax Exemption)" badge="PDF" />
                <DownloadLink href="/beneficial-owndership-declaration.docx" label="Beneficial Ownership Declaration" badge="Docx" />
                <DownloadLink href="/NECS-Form.docx" label="National Electronic Clearing Mandate (NECS)" badge="Docx" />
              </div>
            </section>

            {/* Duplicate Share Certificate & Indemnity */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </span>
                Duplicate Share Certificates &amp; Indemnity
              </h2>
              <div className="flex flex-col gap-2.5">
                <DownloadLink href="/AFFIDAVIT-for-Issue-of-Duplicate-Share-Certificate-D.docx" label="Affidavit for Issue of Duplicate Share Certificate" badge="Docx" />
                <DownloadLink href="/INDEMNITY-BOND-for-Issue-of-Duplicate-Share-Certificate.docx" label="Indemnity Bond for Issue of Duplicate Certificate" badge="Docx" />
                <DownloadLink href="/Affidavit-for-Duplicate-cum-transmission.doc" label="Affidavit for Duplicate cum Transmission" badge="Doc" />
                <DownloadLink href="/Indemnity-Bond-for-Duplicate-cum-transmission.doc" label="Indemnity Bond for Duplicate cum Transmission" badge="Doc" />
                <DownloadLink href="/Website-Duplicate-Procedure.docx" label="Duplicate Share Certificate Standard Operating Procedure" badge="SOP" />
              </div>
            </section>

            {/* Transmission & Name Corrections */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
                Transmission &amp; Deletion of Name
              </h2>
              <div className="flex flex-col gap-2.5">
                <DownloadLink href="/NOC-for-Transmission.doc" label="No Objection Certificate (NOC) for Transmission" badge="Doc" />
                <DownloadLink href="/Transmission-Affidavit.docx" label="Transmission Affidavit Format" badge="Docx" />
                <DownloadLink href="/Transmission-Application.docx" label="Transmission Application Form" badge="Docx" />
                <DownloadLink href="/Affidavit-for-Name-deletion-cum-duplicate.docx" label="Affidavit for Deletion of Name" badge="Docx" />
                <DownloadLink href="/Indemnity-Bond-For-Name-Deletion-Cum-Duplicate.docx" label="Indemnity Bond for Name Deletion" badge="Docx" />
              </div>
            </section>

            {/* Securities Transfer (Form SH-4) */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                Securities Transfer (Form SH-4)
              </h2>
              <div className="flex flex-col gap-2.5">
                <DownloadLink href="/Securities-Transfer-Form-SH4-Cos-Act-2013-Finalised.pdf" label="Securities Transfer Form SH-4 (Companies Act 2013)" badge="PDF" />
                <DownloadLink href="/Self-Declaration-Form.docx" label="Self Declaration Form for Securities Holder" badge="Docx" />
                <DownloadLink href="/KYC_Affidavit-for-change-of-signature.docx" label="Affidavit for Change / Variation of Signature" badge="Docx" />
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
