import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#070D18] text-slate-400 border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="TrustLink Logo" className="h-8 w-auto bg-white p-1 rounded" />
              <h3 className="text-base font-extrabold text-white">
                Trustlink Investor Services Pvt. Ltd.
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 mb-4">
              SEBI Registered Category I Registrar &amp; Share Transfer Agent (RTA)<br />
              <strong>SEBI Registration No.:</strong> <span className="font-mono text-indigo-300">INR000004351</span>
            </p>
            <div className="text-xs space-y-2 text-slate-400 font-mono">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Pratap Bhawan, 312–314, Bahadur Shah Zafar Marg, New Delhi – 110002</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@trustlinkinvestor.com" className="text-indigo-300 hover:underline">info@trustlinkinvestor.com</a>
                <span className="text-slate-600">|</span>
                <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 9910118347</span>
              </p>
            </div>
          </div>

          {/* Statutory Disclosures */}
          <div>
            <h4 className="mb-4 text-xs font-mono font-bold uppercase tracking-wider text-white">
              SEBI Disclosures
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/investor/investor-charter" className="hover:text-white transition-colors">
                  Investor Charter
                </Link>
              </li>
              <li>
                <Link href="/investor/investor-grievances-reports" className="hover:text-white transition-colors">
                  Monthly Complaints Data
                </Link>
              </li>
              <li>
                <Link href="/investor/grievance-redressal" className="hover:text-white transition-colors">
                  Grievance &amp; Escalation Matrix
                </Link>
              </li>
              <li>
                <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  SEBI SCORES 2.0 ↗
                </a>
              </li>
              <li>
                <a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  SMART ODR Portal ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Public Tools */}
          <div>
            <h4 className="mb-4 text-xs font-mono font-bold uppercase tracking-wider text-white">
              Tools &amp; Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/companies" className="hover:text-white transition-colors">
                  Serviced Companies Directory
                </Link>
              </li>
              <li>
                <Link href="/track-request" className="hover:text-white transition-colors">
                  Track SRN &amp; Grievances
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Download Form ISR Series
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Investor FAQ &amp; MCA Rule 9B
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <h4 className="mb-4 text-xs font-mono font-bold uppercase tracking-wider text-white">
              Legal &amp; Governance
            </h4>
            <ul className="space-y-2 text-xs mb-4">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition-colors">
                  Cyber Security &amp; MFA
                </Link>
              </li>
            </ul>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] uppercase tracking-wider transition-colors shadow-sm"
            >
              Vault Sign In &rarr;
            </Link>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 border-t border-slate-800/80 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Trustlink Investor Services Private Limited. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-emerald-500 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              SEBI Category I RTA Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
