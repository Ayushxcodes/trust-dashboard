"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInvestorDropdownOpen, setIsInvestorDropdownOpen] = useState(false);
  const [isMobileInvestorOpen, setIsMobileInvestorOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    isActive(href)
      ? "text-blue-700 font-bold border-b-2 border-blue-700 py-1.5"
      : "hover:text-blue-700 transition-colors py-1.5";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsInvestorDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="bg-slate-50/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4 md:py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="TrustLink Logo" className="h-14 md:h-16 w-auto transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-slate-800 text-sm">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/about" className={linkClass("/about")}>About Us</Link>
            <Link href="/services" className={linkClass("/services")}>Our Services</Link>
            <Link href="/companies" className={linkClass("/companies")}>Serviced Companies</Link>
            <Link href="/resources" className={linkClass("/resources")}>Resources</Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsInvestorDropdownOpen(!isInvestorDropdownOpen)}
                className="hover:text-blue-700 flex items-center gap-1.5 py-1.5 focus:outline-none cursor-pointer"
              >
                Investor Centre
                <svg className={`w-4 h-4 transition-transform ${isInvestorDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isInvestorDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                  <Link
                    href="/investor/grievance-redressal"
                    onClick={() => setIsInvestorDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    Grievance Redressal Mechanism
                  </Link>
                  <Link
                    href="/track-request"
                    onClick={() => setIsInvestorDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    Track Grievance / SRN Status
                  </Link>
                  <Link
                    href="/investor/investor-charter"
                    onClick={() => setIsInvestorDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    Investor Charter
                  </Link>
                  <Link
                    href="/investor/investor-grievances-reports"
                    onClick={() => setIsInvestorDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                  >
                    Monthly Investor Complaints Data
                  </Link>
                  <Link
                    href="/faq"
                    onClick={() => setIsInvestorDropdownOpen(false)}
                    className="block px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors border-t border-slate-100 mt-1 pt-2"
                  >
                    Investor FAQ &amp; MCA Rule 9B
                  </Link>
                  <a
                    href="https://scores.sebi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsInvestorDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center justify-between"
                  >
                    <span>SEBI SCORES 2.0</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href="https://smartodr.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsInvestorDropdownOpen(false)}
                    className="block px-4 py-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center justify-between"
                  >
                    <span>SMART ODR Portal</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Trigger */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl bg-[#0B1528] hover:bg-[#1A2B4C] text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Client Portal / Sign In
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden p-2.5 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 px-6 py-5 bg-white space-y-4">
            <nav className="flex flex-col gap-4 font-semibold text-slate-800 text-sm">
              <Link href="/" onClick={() => setIsOpen(false)} className={linkClass("/")}>Home</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className={linkClass("/about")}>About Us</Link>
              <Link href="/services" onClick={() => setIsOpen(false)} className={linkClass("/services")}>Our Services</Link>
              <Link href="/companies" onClick={() => setIsOpen(false)} className={linkClass("/companies")}>Serviced Companies</Link>
              <Link href="/resources" onClick={() => setIsOpen(false)} className={linkClass("/resources")}>Resources</Link>

              <div>
                <button
                  onClick={() => setIsMobileInvestorOpen(!isMobileInvestorOpen)}
                  className="w-full flex items-center justify-between text-left py-1 hover:text-indigo-600 font-semibold"
                >
                  <span>Investor Centre</span>
                  <svg className={`w-4 h-4 transition-transform ${isMobileInvestorOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMobileInvestorOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-2.5 border-l-2 border-indigo-200 pl-3">
                    <Link href="/investor/grievance-redressal" onClick={() => setIsOpen(false)} className="text-xs text-slate-700 hover:text-indigo-600 py-1">
                      Grievance Redressal
                    </Link>
                    <Link href="/track-request" onClick={() => setIsOpen(false)} className="text-xs text-slate-700 hover:text-indigo-600 py-1">
                      Track SRN / Grievance Status
                    </Link>
                    <Link href="/investor/investor-charter" onClick={() => setIsOpen(false)} className="text-xs text-slate-700 hover:text-indigo-600 py-1">
                      Investor Charter
                    </Link>
                    <Link href="/investor/investor-grievances-reports" onClick={() => setIsOpen(false)} className="text-xs text-slate-700 hover:text-indigo-600 py-1">
                      Monthly Complaints Data
                    </Link>
                    <Link href="/faq" onClick={() => setIsOpen(false)} className="text-xs text-slate-700 hover:text-indigo-600 py-1">
                      Investor FAQ &amp; MCA Rule 9B
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 text-center rounded-xl bg-[#0B1528] text-white font-extrabold text-xs uppercase tracking-wider"
              >
                Client Portal / Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
