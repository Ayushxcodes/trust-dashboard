import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

type DownloadLinkProps = {
  href: string;
  label: string;
};

export default function ResourcesPage() {
  const DownloadLink = ({ href, label }: DownloadLinkProps) => (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2.5 px-3 py-2 rounded-lg bg-sky-50/80 hover:bg-indigo-50 border border-sky-150 text-indigo-700 text-sm font-semibold transition-all hover:translate-x-1"
    >
      <svg className="h-5 w-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>{label}</span>
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-10 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              Official Downloads &amp; KYC
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Downloads &amp; Resource Center
            </h1>
            <p className="text-gray-600 text-base">
              Access statutory forms, KYC formats, affidavit templates, and transmission documents for investor servicing.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Dividend */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span>💰</span> Dividend &amp; Tax Exemption
              </h2>
              <div className="flex flex-col gap-2.5">
                <DownloadLink
                  href="/beneficial-owndership-declaration.docx"
                  label="Dividend Exemption Form"
                />
                <DownloadLink href="/FORM_15G.pdf" label="Form 15G" />
                <DownloadLink href="/form-15H.pdf" label="Form 15H" />
                <DownloadLink href="/NECS-Form.docx" label="NECS Form" />
              </div>
            </section>

            {/* Duplicate Share Certificate */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span>📜</span> Duplicate Share Certificate
              </h2>
              <div className="flex flex-col gap-2.5">
                <DownloadLink
                  href="/Affidavit-for-Duplicate-cum-transmission.doc"
                  label="Affidavit for Duplicate cum transmission"
                />
                <DownloadLink
                  href="/Application-for-Duplicate-Share-Certificate-cum-Transmission.doc"
                  label="Application for Duplicate Share Certificate cum Transmission"
                />
                <DownloadLink
                  href="/Indemnity-Bond-for-Duplicate-cum-Transmission.doc"
                  label="Indemnity Bond for Duplicate cum Transmission"
                />
                <DownloadLink
                  href="/AFFIDAVIT-for-Issue-of-Duplicate-Share-Certificate-D.docx"
                  label="AFFIDAVIT for Issue of Duplicate Share Certificate-D"
                />
                <DownloadLink
                  href="/INDEMNITY-BOND-for-Issue-of-Duplicate-Share-Certificate.docx"
                  label="INDEMNITY BOND for Issue of Duplicate Share Certificate"
                />
                <DownloadLink
                  href="/Website-Duplicate-Procedure.docx"
                  label="Website - Duplicate Procedure"
                />
              </div>
            </section>

            {/* Formats KYC */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span>🆔</span> Formats KYC
              </h2>
              <div className="flex flex-col gap-2.5">
                <DownloadLink
                  href="/KYC_Affidavit-for-change-of-signature.docx"
                  label="KYC Affidavit for change of signature"
                />
                <DownloadLink
                  href="/KYC_new-bankers-verification.docx"
                  label="KYC new bankers verification"
                />
                <DownloadLink
                  href="/KYC_Nomination-Registration-Form-1.1-SH13-29.04.docx"
                  label="KYC Nomination Registration Form (SH13)"
                />
              </div>
            </section>

            {/* Forms 10F / 15G / 15H */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span>📑</span> Tax Forms (10F / 15G / 15H)
              </h2>
              <div className="flex flex-col gap-2.5">
                <DownloadLink href="/Form_10F.pdf" label="Form 10F" />
                <DownloadLink href="/FORM_15G.pdf" label="Form 15G" />
                <DownloadLink href="/FORM_NO_15H.pdf" label="Form 15H" />
                <DownloadLink href="/Self-Declaration-Form.docx" label="Self Declaration Form" />
              </div>
            </section>

            {/* Transmission & Name Corrections */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span>🔄</span> Transmission &amp; Name Corrections
              </h2>
              <div className="flex flex-col gap-2.5">
                <DownloadLink
                  href="/Format-4-Correction-Name_Address_Bank-details.docx"
                  label="Format 4: Correction Name / Address / Bank details"
                />
                <DownloadLink
                  href="/Affidavit-for-Name-deletion-cum-duplicate.docx"
                  label="Affidavit for Name deletion cum duplicate"
                />
                <DownloadLink
                  href="/Indemnity-Bond-For-Name-Deletion-Cum-Duplicate.docx"
                  label="Indemnity Bond For Name Deletion Cum Duplicate"
                />
                <DownloadLink
                  href="/NOC-for-Transmission.doc"
                  label="NOC for Transmission"
                />
                <DownloadLink
                  href="/Transmission-Affidavit.docx"
                  label="Transmission Affidavit"
                />
                <DownloadLink
                  href="/Transmission-Application.docx"
                  label="Transmission Application"
                />
              </div>
            </section>

            {/* Nomination & Securities Transfer */}
            <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span>📋</span> Nomination &amp; Share Transfer
              </h2>
              <div className="flex flex-col gap-2.5">
                <DownloadLink
                  href="/Nomination-Registration-Form.pdf"
                  label="Nomination Registration Form"
                />
                <DownloadLink
                  href="/Nomination-Cancellation-Form.pdf"
                  label="Nomination Cancellation Form"
                />
                <DownloadLink
                  href="/Securities-Transfer-Form-SH4-Cos-Act-2013-Finalised.pdf"
                  label="Securities Transfer Form SH-4"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
