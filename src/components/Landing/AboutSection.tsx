"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AboutSection() {
  const credentials = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
      accentBorder: "border-l-blue-500",
      title: "SEBI Reg. No. INR000004510",
      description: "SEBI Registered Category I RTA operating under permanent registration with strict adherence to SEBI Master Circulars for RTAs.",
      badge: "Verified",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l2-2 4 4" />
        </svg>
      ),
      iconBg: "bg-indigo-500/10",
      iconColor: "text-indigo-600",
      accentBorder: "border-l-indigo-500",
      title: "100+ Corporate Issuer Clients",
      description: "Servicing over 100 corporate issuers across equity, debt, and dematerialized securities with seamless NSDL/CDSL depository sync.",
      badge: "Active",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600",
      accentBorder: "border-l-emerald-500",
      title: "500,000+ Investor Folios",
      description: "Managing 500,000+ shareholder folios, dividend disbursements, IEPF transfers, and physical share conversions with precision.",
      badge: "Scale",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600",
      accentBorder: "border-l-purple-500",
      title: "Designated Compliance Leadership",
      description: "Headed by Compliance & Nodal Officer Mr. Nishant Khemani, ensuring transparent escalation paths and quick TAT resolutions.",
      badge: "Leadership",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600",
      accentBorder: "border-l-amber-500",
      title: "Encrypted Vault & Audit Logs",
      description: "Strict PII & PAN data protection, MFA, audit trails, and document vault security adhering to SEBI cyber resilience standards.",
      badge: "Secure",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-600",
      accentBorder: "border-l-rose-500",
      title: "Statutory Grievance & SCORES 2.0",
      description: "3-level grievance escalation mechanism connected with SEBI SCORES 2.0 and SMART ODR for swift dispute resolution.",
      badge: "Compliance",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".credential-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 text-black overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <h2 className="mb-5 text-3xl font-extrabold leading-tight sm:text-4xl md:text-[2.75rem] text-slate-900 tracking-tight">
            Trusted, Compliant &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Technology-Driven
            </span>{" "}
            RTA Services
          </h2>

          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Incorporated with a commitment to governance and speed, Trustlink Investor Services Private Limited provides verifiable RTA expertise to issuer companies and investors across India.
          </p>
        </div>

        {/* Credential Cards Grid */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {credentials.map((card, index) => (
            <div
              key={index}
              className={`credential-card group relative bg-white rounded-2xl border border-slate-100 border-l-[3px] ${card.accentBorder} p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 ease-out`}
              style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease, translate 0.3s ease" }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  {card.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${card.badgeColor} font-mono`}>
                  {card.badge}
                </span>
              </div>

              {/* Card Body */}
              <h3 className="text-[17px] font-bold text-slate-900 mb-2.5 leading-snug group-hover:text-slate-800 transition-colors">
                {card.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                {card.description}
              </p>

              {/* Subtle hover indicator */}
              <Link href="/about" className="mt-5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors">
                <span>Learn more</span>
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6 px-8 rounded-2xl bg-slate-50/80 border border-slate-100">
            {[
              { label: "Est. Incorporation", value: "2018" },
              { label: "SEBI Category", value: "I RTA" },
              { label: "Depository Partners", value: "NSDL + CDSL" },
              { label: "Uptime SLA", value: "99.9%" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && (
                  <div className="hidden sm:block w-px h-8 bg-slate-200" />
                )}
                <div className="text-center sm:text-left">
                  <div className="text-lg font-black text-slate-900 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
