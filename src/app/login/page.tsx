"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { login } from "../actions";

export default function LoginPage() {
  const [corporateId, setCorporateId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [showTotp, setShowTotp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleEstablishSession = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!corporateId || !email || !password) {
      setError("Please fill out all credential fields.");
      return;
    }
    // Transition to the Multi-Factor Authentication view
    setShowTotp(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (totpCode.trim().length < 6) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("corporateId", corporateId);
      formData.append("email", email);
      formData.append("password", password);
      
      const res = await login(formData);
      if (res && !res.success) {
        setError(res.error || "An unexpected error occurred.");
        setShowTotp(false); // Reset to credentials step on failure
      }
    });
  };

  // Helper for quick-login actions
  const handleQuickLogin = (testCorpId: string, testEmail: string, testPass: string) => {
    setCorporateId(testCorpId);
    setEmail(testEmail);
    setPassword(testPass);
    setTotpCode("849204"); // Prefilled mock TOTP
    setError(null);
    setShowTotp(true);
    
    // Automatically submit with a minor delay so the user sees the transition
    setTimeout(() => {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("corporateId", testCorpId);
        formData.append("email", testEmail);
        formData.append("password", testPass);
        
        const res = await login(formData);
        if (res && !res.success) {
          setError(res.error || "An unexpected error occurred.");
          setShowTotp(false);
        }
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0B1528] flex flex-col items-center justify-between p-6 font-sans relative selection:bg-indigo-500 selection:text-white">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main Spacer Top */}
      <div className="flex-1 flex flex-col items-center justify-center w-full py-8">
        
        {/* Main Auth Container Card */}
        <div className="w-full max-w-md bg-white border border-zinc-200 rounded p-8 shadow-xl space-y-6">
          
          {/* Logo & Subtitles */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-[#0B1528] rounded flex items-center justify-center shadow">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.9a1 1 0 011.07-.872C4.839 4.148 7.502 5 10 5c2.498 0 5.161-.852 6.764-.972a1 1 0 011.07.872C18.312 8.72 17.158 12.08 10 17.568 2.842 12.08 1.688 8.72 2.166 4.9zm8.834 8.742a1 1 0 001.218-1.556l-2.25-1.75a1 1 0 00-1.218 0l-2.25 1.75a1 1 0 101.218 1.556L9 12.568l1.796 1.074z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-black text-[#0B1528] tracking-widest">TRUSTLINK</h2>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mt-0.5">
                Institutional Registry Portal
              </span>
            </div>
          </div>

          {/* Validation Alert */}
          {error && (
            <div className="p-3.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2">
              <svg className="w-4.5 h-4.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          {!showTotp ? (
            <form onSubmit={handleEstablishSession} className="space-y-4">
              
              {/* Corporate ID */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-zinc-550 uppercase tracking-wider">
                  Corporate ID
                </label>
                <input
                  type="text"
                  required
                  disabled={isPending}
                  value={corporateId}
                  onChange={(e) => setCorporateId(e.target.value)}
                  placeholder="ENT-0000-000"
                  className="w-full px-4 py-2.5 rounded border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-50"
                />
              </div>

              {/* Official Email */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-zinc-550 uppercase tracking-wider">
                  Official Email
                </label>
                <input
                  type="email"
                  required
                  disabled={isPending}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@entity.com"
                  className="w-full px-4 py-2.5 rounded border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-50"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-extrabold text-zinc-550 uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-[10px] font-extrabold text-zinc-500 hover:text-zinc-800 transition-colors">
                    Forgot Access?
                  </Link>
                </div>
                <input
                  type="password"
                  required
                  disabled={isPending}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-50"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-4 rounded bg-[#0B1528] hover:bg-[#152238] text-white font-extrabold text-xs tracking-wider transition-colors active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 mt-2 cursor-pointer uppercase shadow"
              >
                Establish Secure Session
                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </button>
            </form>
          ) : (
            // MULTI-FACTOR AUTHORIZATION SCREEN (TOTP)
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2 text-center">
                <span className="inline-flex p-2 bg-indigo-50 text-indigo-650 rounded-full">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <h3 className="text-sm font-bold text-zinc-900">Multi-Factor Authentication</h3>
                <p className="text-[11px] text-zinc-550 leading-relaxed">
                  Enter the 6-digit Time-based One-Time Password (TOTP) pushed to your registered mobile device or Authenticator App.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-zinc-550 uppercase tracking-wider text-center">
                  Verification Code (MFA Code)
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  disabled={isPending}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 123456"
                  className="w-full px-4 py-2.5 rounded border border-zinc-200 bg-zinc-50/50 text-center font-mono text-base tracking-widest text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setShowTotp(false); setTotpCode(""); }}
                  className="flex-1 py-3 px-4 rounded border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-650 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  disabled={isPending || totpCode.length < 6}
                  className="flex-1 py-3 px-4 rounded bg-[#0B1528] hover:bg-[#1E293B] text-white font-extrabold text-xs tracking-wider transition-colors active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer uppercase shadow"
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Authenticating...
                    </>
                  ) : (
                    "Secure Sign-In"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Under Line Warning */}
          <div className="pt-4 border-t border-zinc-150 flex gap-3 text-[9px] text-zinc-450 leading-relaxed">
            <svg className="w-5.5 h-5.5 text-zinc-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>
              This system is for authorized institutional use only. All activities are logged and monitored under the Global Registry Compliance Framework. Unauthorized access attempts will be reported to governing authorities.
            </span>
          </div>

        </div>

        {/* Quick Test Accounts Box */}
        <div className="w-full max-w-md mt-6 bg-white border border-zinc-200 rounded p-5 shadow-lg space-y-3">
          <h4 className="text-[10px] font-extrabold text-zinc-450 uppercase tracking-widest text-center">
            Demo Testing Portal (Includes MFA Bypass)
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={() => handleQuickLogin("ENT-4229-701", "jane@acme.com", "jane123")}
              disabled={isPending}
              className="flex items-center justify-between p-3 rounded bg-zinc-50 border border-zinc-200 hover:border-indigo-500 hover:bg-indigo-50/30 text-left transition-all group cursor-pointer"
            >
              <div>
                <span className="block text-xs font-bold text-zinc-800 group-hover:text-indigo-650 transition-colors">
                  Jane Doe (Client)
                </span>
                <span className="block text-[9px] text-zinc-500 font-mono">
                  ID: ENT-4229-701 • Acme Corp
                </span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white border border-zinc-200 text-zinc-650 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                AUTO-FILL
              </span>
            </button>

            <button
              onClick={() => handleQuickLogin("ENT-2156-204", "bruce@stark.com", "bruce123")}
              disabled={isPending}
              className="flex items-center justify-between p-3 rounded bg-zinc-50 border border-zinc-200 hover:border-indigo-500 hover:bg-indigo-50/30 text-left transition-all group cursor-pointer"
            >
              <div>
                <span className="block text-xs font-bold text-zinc-800 group-hover:text-indigo-650 transition-colors">
                  Bruce Wayne (Client)
                </span>
                <span className="block text-[9px] text-zinc-500 font-mono">
                  ID: ENT-2156-204 • Stark Industries
                </span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white border border-zinc-200 text-zinc-650 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                AUTO-FILL
              </span>
            </button>

            <button
              onClick={() => handleQuickLogin("ENT-ADMIN-000", "admin@trustlink.com", "admin123")}
              disabled={isPending}
              className="flex items-center justify-between p-3 rounded bg-zinc-50 border border-zinc-200 hover:border-indigo-500 hover:bg-indigo-50/30 text-left transition-all group cursor-pointer"
            >
              <div>
                <span className="block text-xs font-bold text-zinc-800 group-hover:text-indigo-650 transition-colors">
                  Alex Mercer (Admin)
                </span>
                <span className="block text-[9px] text-zinc-500 font-mono">
                  ID: ENT-ADMIN-000 • Registry Admin
                </span>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-50 border border-indigo-150 text-indigo-655">
                AUTO-FILL
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* Footer link bar */}
      <footer className="w-full max-w-5xl border-t border-zinc-200/60 pt-4 flex flex-col sm:flex-row items-center justify-between text-[9px] font-bold text-zinc-400 uppercase tracking-widest gap-2">
        <div className="flex gap-4">
          <Link href="#sovereignty" className="hover:text-zinc-650 transition-colors">Data Sovereignty</Link>
          <span>/</span>
          <Link href="#status" className="hover:text-zinc-650 transition-colors">System Status</Link>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-650 animate-pulse">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          SECURE CONNECTION
        </div>
      </footer>
    </div>
  );
}
