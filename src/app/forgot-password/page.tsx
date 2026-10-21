"use client";

import { useState } from "react";
import Link from "next/link";
import { requestPasswordReset } from "../actions";

export default function ForgotPasswordPage() {
  const [corporateId, setCorporateId] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"password" | "corporateId">("password");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) return;
    
    setIsPending(true);
    const res = await requestPasswordReset(email, corporateId);
    setIsPending(false);
    
    if (res && res.success) {
      setSubmitted(true);
    } else {
      setError(res?.error || "Failed to dispatch reset email.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0B1528] flex flex-col items-center justify-between p-6 font-sans relative selection:bg-slate-800 selection:text-white">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4 px-4 border-b border-zinc-200/80 shrink-0">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="TrustLink Logo" className="h-16 md:h-20 w-auto" />
        </Link>
        <Link
          href="/login"
          className="px-3.5 py-1.5 rounded bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-800 font-extrabold text-[10px] uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Back to Portal Login
        </Link>
      </header>

      {/* Main Form Container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full py-8">
        <div className="w-full max-w-md bg-white border border-zinc-250 rounded p-8 shadow-xl space-y-6">
          
          {/* Header Branding */}
          <div className="flex flex-col items-center text-center space-y-2">
            <img src="/logo.png" alt="TrustLink Logo" className="h-14 w-auto mb-1" />
            <div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                Institutional Access Recovery
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Reset Account Access
              </h1>
            </div>
          </div>

          {/* Recovery Type Toggle Tabs */}
          {!submitted && (
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("password")}
                className={`py-2 text-center rounded transition-all cursor-pointer ${
                  activeTab === "password"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Forgot Password
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("corporateId")}
                className={`py-2 text-center rounded transition-all cursor-pointer ${
                  activeTab === "corporateId"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Forgot Corporate ID
              </button>
            </div>
          )}

          {submitted ? (
            /* Confirmation View */
            <div className="space-y-6 text-center py-2 animate-fade-in-up">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Access Instructions Dispatched
                </h2>
                <p className="text-slate-600 text-xs leading-relaxed px-2">
                  A secure access recovery link and verification code have been sent to{" "}
                  <strong className="text-slate-900 font-bold">{email}</strong>.
                </p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-[11px] font-mono text-slate-700 mt-3 text-left space-y-1">
                  <div><strong>Reference Ticket:</strong> REC-2026-{Math.floor(100000 + Math.random() * 900000)}</div>
                  <div><strong>Status:</strong> Verification Email Dispatched</div>
                  <div><strong>Validity:</strong> 15 Minutes</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/login"
                  className="w-full py-2.5 px-4 rounded bg-[#0B1528] hover:bg-[#1E293B] text-white font-extrabold text-xs tracking-wider transition-colors inline-block uppercase shadow-sm"
                >
                  Return to Portal Login &rarr;
                </Link>
              </div>
            </div>
          ) : activeTab === "password" ? (
            /* Forgot Password Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 text-center leading-relaxed">
                Enter your Corporate ID and official registered email address to receive password reset instructions.
              </p>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Corporate ID (Optional)
                </label>
                <input
                  type="text"
                  value={corporateId}
                  onChange={(e) => setCorporateId(e.target.value)}
                  placeholder="ENT-0000-000"
                  className="w-full px-4 py-2.5 rounded border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Official Registered Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@entity.com"
                  className="w-full px-4 py-2.5 rounded border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-4 rounded bg-[#0B1528] hover:bg-[#1E293B] text-white font-extrabold text-xs tracking-wider transition-colors active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 mt-2 cursor-pointer uppercase shadow-sm"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Dispatching Instructions...
                  </>
                ) : (
                  <>
                    Send Password Reset Link
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <Link href="/login" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
                  &larr; Back to Login Page
                </Link>
              </div>
            </form>
          ) : (
            /* Forgot Corporate ID Info */
            <div className="space-y-4 text-left">
              <p className="text-xs text-slate-600 leading-relaxed">
                If you have forgotten your entity's <strong>Corporate ID</strong>, please verify your official email or contact the RTA Helpdesk.
              </p>

              <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  RTA Nodal Compliance Helpdesk
                </div>
                <div className="space-y-1 font-mono text-[11px]">
                  <div>Email: <a href="mailto:info@trustlinkinvestor.com" className="text-indigo-600 underline font-bold">info@trustlinkinvestor.com</a></div>
                  <div>Phone: <span className="font-bold text-slate-900">+91-9910118347</span></div>
                  <div>SEBI Reg: <span className="font-bold text-slate-900">INR000004510</span></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Or Recover Corporate ID via Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@entity.com"
                  className="w-full px-4 py-2.5 rounded border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 px-4 rounded bg-[#0B1528] hover:bg-[#1E293B] text-white font-extrabold text-xs tracking-wider transition-colors uppercase shadow-sm cursor-pointer"
                >
                  {isPending ? "Retrieving Corporate ID..." : "Send Corporate ID Reminder"}
                </button>
              </form>

              <div className="pt-2 text-center">
                <Link href="/login" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
                  &larr; Back to Login Page
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer link bar */}
      <footer className="w-full max-w-5xl border-t border-slate-200/80 pt-4 flex flex-col sm:flex-row items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest gap-2">
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-slate-700 transition-colors">Privacy Policy</Link>
          <span>/</span>
          <Link href="/security" className="hover:text-slate-700 transition-colors">Security Architecture</Link>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
          SECURE RTA IDENTITY RECOVERY
        </div>
      </footer>
    </div>
  );
}
