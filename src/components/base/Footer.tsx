import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">
              Trustlink Investor Services Private Limited
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Registrar and Share Transfer Agent – Category I <br />
              SEBI Registration No.: <span className="font-medium text-slate-300">
                INR000004510
              </span>
            </p>
          </div>

          {/* Services & Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Information
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                Email:{" "}
                <a
                  href="mailto:grievance@trustlinkinvestor.com"
                  className="transition hover:text-white underline"
                >
                  grievance@trustlinkinvestor.com
                </a>
              </li>
              <li>Phone: +91 9910118347</li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Registered Office
            </h4>
            <p className="text-sm leading-relaxed text-slate-400">
              Pratap Bhawan, 312–314, <br />
              Bahadur Shah Zafar Marg, <br />
              Vikram Nagar, New Delhi, <br />
              Delhi – 110002
            </p>
          </div>

          {/* Regulatory Status & Access */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Institutional Access
            </h4>
            <p className="text-sm leading-relaxed text-slate-400 mb-4">
              Authorized client entities can access the Dematerialization & Document Compliance Vault below:
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Sign In to Vault Portal &rarr;
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Trustlink Investor Services Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-xs">
            <Link href="/login" className="hover:text-slate-300 transition-colors">Client Sign In</Link>
            <Link href="/register" className="hover:text-slate-300 transition-colors">Register Entity</Link>
            <Link href="/investor/grievance-redressal" className="hover:text-slate-300 transition-colors">Grievance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
