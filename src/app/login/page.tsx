"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { login } from "../actions";

export default function LoginPage() {
  const [corporateId, setCorporateId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!corporateId || !email || !password) {
      setError("Please fill out all credential fields.");
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
      }
    });
  };

  // Helper for quick-login actions
  const handleQuickLogin = (testCorpId: string, testEmail: string, testPass: string) => {
    setCorporateId(testCorpId);
    setEmail(testEmail);
    setPassword(testPass);
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("corporateId", testCorpId);
      formData.append("email", testEmail);
      formData.append("password", testPass);

      const res = await login(formData);
      if (res && !res.success) {
        setError(res.error || "An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0B1528] flex flex-col items-center justify-between p-6 font-sans relative selection:bg-indigo-500 selection:text-white">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-3 px-4 border-b border-zinc-200/60 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-xs font-black tracking-widest text-[#0B1528] uppercase hover:opacity-80 transition-opacity">
          <span className="w-6 h-6 rounded bg-[#0B1528] text-white flex items-center justify-center text-[10px] font-bold">TL</span>
          TrustLink
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hidden sm:inline">New Enterprise?</span>
          <Link
            href="/register"
            className="px-3.5 py-1.5 rounded bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 font-extrabold text-[10px] uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0l-3 3m3-3l3 3" />
            </svg>
            Register Company
          </Link>
        </div>
      </header>

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

          {/* Direct Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
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
                <Link href="/forgot-password" className="text-[10px] font-extrabold text-zinc-550 hover:text-zinc-800 transition-colors">
                  Forgot Access?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isPending}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-2.5 rounded border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-4 rounded bg-[#0B1528] hover:bg-[#152238] text-white font-extrabold text-xs tracking-wider transition-colors active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 mt-2 cursor-pointer uppercase shadow"
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
                <>
                  Sign In to Dashboard
                  <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Company Registration CTA Option */}
          <div className="pt-4 border-t border-zinc-150 flex flex-col items-center gap-2">
            <span className="text-[11px] font-medium text-zinc-550">
              Don&apos;t have an institutional account yet?
            </span>
            <Link
              href="/register"
              className="w-full py-2.5 px-4 rounded border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 hover:border-indigo-300 text-indigo-700 font-extrabold text-xs tracking-wider transition-all uppercase flex items-center justify-center gap-2 shadow-sm group cursor-pointer"
            >
              <svg className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0l-3 3m3-3l3 3" />
              </svg>
              Register Company / Onboard Entity
            </Link>
          </div>

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
            Demo Quick Login
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
                QUICK LOGIN
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
                QUICK LOGIN
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
                QUICK LOGIN
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
