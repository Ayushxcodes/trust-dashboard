"use client";

import { useState } from "react";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import Link from "next/link";
import { ServicedCompanyRecord } from "@/lib/db";

interface ServicedCompaniesClientProps {
  initialCompanies: ServicedCompanyRecord[];
}

export default function ServicedCompaniesClient({
  initialCompanies,
}: ServicedCompaniesClientProps) {
  const [companies] = useState<ServicedCompanyRecord[]>(initialCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.isin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.cin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" || company.type === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0B1528] to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
            Serviced Companies &amp; ISIN Directory
          </h1>
          <p className="text-slate-300 text-base max-w-3xl mx-auto leading-relaxed">
            Public directory of corporate issuers and companies serviced by Trustlink Investor Services Private Limited for share transfer, dematerialisation, and depository operations.
          </p>
        </div>
      </div>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-5xl space-y-8">
          
          {/* Search Controls */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm grid md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Search by Company Name, ISIN, or CIN
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Search Issuer Name / INE... / CIN..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <svg
                  className="w-5 h-5 text-slate-400 absolute left-3 top-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Filter Security Type
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="ALL">All Security Types ({companies.length})</option>
                <option value="Unlisted Public Equity">Unlisted Public Equity</option>
                <option value="Listed Equity">Listed Equity</option>
                <option value="Debt / Bonds">Debt / Bonds</option>
                <option value="Preference Shares">Preference Shares</option>
              </select>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{company.name}</h3>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                      {company.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 mb-4 font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="font-sans text-slate-400">ISIN Code:</span>
                      <strong className="text-indigo-600">{company.isin}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="font-sans text-slate-400">CIN:</span>
                      <span className="text-slate-800">{company.cin}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="font-sans text-slate-400">Category:</span>
                      <span className="font-sans font-bold text-slate-700">{company.type}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-sans text-slate-400">Depository Sync:</span>
                      <div className="flex gap-1">
                        {company.depositories.map((dep) => (
                          <span
                            key={dep}
                            className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-800 font-bold text-[9px]"
                          >
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`mailto:${company.nodalContact}`}
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Secretarial
                  </a>

                  <Link
                    href="/investor/grievance-redressal"
                    className="text-[11px] font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    Submit Grievance
                  </Link>
                </div>
              </div>
            ))}

            {filteredCompanies.length === 0 && (
              <div className="md:col-span-2 text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-3 shadow-xs">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900">Official Directory &amp; ISIN Activation Registry</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  {searchTerm
                    ? `No serviced companies match your search query "${searchTerm}".`
                    : "Serviced corporate entities and activated ISIN records are updated dynamically in sync with NSDL / CDSL depository declarations."}
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
