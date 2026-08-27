import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-white text-black py-10 md:py-20">
      <div className="container mx-auto flex flex-col md:flex-row px-6 items-center">
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-left mb-8 md:mb-0 pr-0 md:pr-8">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-[11px] uppercase tracking-wider mb-4 font-mono">
            SEBI Registered Category I RTA
          </span>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-slate-900">
            Seamless Registrar &amp; Transfer Agent Solutions
          </h1>

          <p className="mb-8 text-lg text-gray-600 sm:text-xl leading-relaxed">
            We offer comprehensive Registrar &amp; Transfer Agent (RTA) services
            anchored in strong regulatory expertise, secure technology, and
            transparent investor servicing—ensuring accuracy, compliance, and
            long-term confidence.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <Link
              href="/companies"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700 shadow-md text-xs uppercase tracking-wider gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Serviced Companies
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-[#0B1528] px-5 py-3 font-bold text-white transition hover:bg-[#1A2B4C] shadow-md uppercase tracking-wider text-xs gap-2"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Client Portal
            </Link>

            <Link
              href="/investor/grievance-redressal"
              className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-rose-700 px-5 py-3 font-bold transition hover:bg-red-100 text-xs uppercase tracking-wider gap-2"
            >
              <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Statutory Grievance
            </Link>

            <Link
              href="/track-request"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 font-bold text-gray-700 transition hover:bg-gray-100 text-xs uppercase tracking-wider gap-2"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Track SRN Request
            </Link>
          </div>

          {/* Key Metrics / Trust Signals */}
          <div className="mt-8 pt-6 border-t border-gray-150 grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-black text-indigo-900">2018</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Incorporation</div>
            </div>
            <div>
              <div className="text-2xl font-black text-indigo-900">100+</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Client Companies</div>
            </div>
            <div>
              <div className="text-2xl font-black text-indigo-900">500,000+</div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Folios Serviced</div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex w-full md:w-1/2 items-center justify-center">
          <img 
            src="/trustlink_homepage.png" 
            alt="Trustlink SEBI Registered Category I RTA Solutions" 
            className="max-w-full h-auto rounded-2xl shadow-2xl border border-gray-100 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
