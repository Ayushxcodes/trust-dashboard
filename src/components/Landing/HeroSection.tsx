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
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-[#0B1528] px-6 py-3.5 font-bold text-white transition hover:bg-[#1A2B4C] shadow-md uppercase tracking-wider text-xs"
            >
              Access Client Portal &rarr;
            </Link>
            <a
              href="mailto:info@trustlinkinvestor.com"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3.5 font-bold text-white transition hover:bg-indigo-700 shadow-md text-xs uppercase tracking-wider"
            >
              Write to Us
            </a>
            <a
              href="https://calendly.com/grievance-trustlinkinvestor/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3.5 font-bold text-gray-700 transition hover:bg-gray-100 text-xs uppercase tracking-wider"
            >
              Book a Call
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="flex w-full md:w-1/2 items-center justify-center">
          <img 
            src="/trustlink_homepage.png" 
            alt="Registrar & Transfer Agent Solutions" 
            className="max-w-full h-auto rounded-2xl shadow-2xl border border-gray-100 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
