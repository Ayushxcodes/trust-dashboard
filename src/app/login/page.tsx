"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { login, verifyMFA } from "../actions";

export default function LoginPage() {
  const [corporateId, setCorporateId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 2-Step MFA state
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaUserId, setMfaUserId] = useState("");
  const [mfaEmail, setMfaEmail] = useState("");
  const [activeOtpCode, setActiveOtpCode] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [hasTOTP, setHasTOTP] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleInitialSubmit = async (e: React.FormEvent) => {
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
      if (res && res.success && res.requireMFA && res.userId) {
        setMfaUserId(res.userId);
        setMfaEmail(res.email || email);
        if (res.generatedCode) setActiveOtpCode(res.generatedCode);
        if (res.qrCodeUrl) setQrCodeUrl(res.qrCodeUrl);
        if (res.secret) setSecret(res.secret);
        setHasTOTP(!!res.hasTOTP);
        setOtpCode(""); // Keep input empty so user enters code manually
        setMfaStep(true);
      } else if (res && !res.success) {
        setError(res.error || "An unexpected error occurred.");
      }
    });
  };

  const handleMFASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otpCode || otpCode.trim().length !== 6) {
      setError("Please enter a valid 6-digit security code.");
      return;
    }

    startTransition(async () => {
      const res = await verifyMFA(mfaUserId, otpCode);
      if (res && res.success && res.redirectUrl) {
        window.location.href = res.redirectUrl;
      } else if (res && !res.success) {
        setError(res.error || "Verification failed. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0B1528] flex flex-col items-center justify-between p-6 font-sans relative selection:bg-indigo-500 selection:text-white">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4 px-4 border-b border-zinc-200/60 shrink-0">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="TrustLink Logo" className="h-16 md:h-20 w-auto" />
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

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center w-full py-8">
        
        {/* Main Auth Container Card */}
        <div className="w-full max-w-md bg-white border border-zinc-200 rounded p-8 shadow-xl space-y-6">
          
          {/* Logo & Subtitles */}
          <div className="flex flex-col items-center text-center space-y-2">
            <img src="/logo.png" alt="TrustLink Logo" className="h-16 md:h-20 w-auto mb-1" />
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                {mfaStep ? "2-Factor Identity Authorization" : "Institutional Registry Portal"}
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

          {/* STEP 2: MFA VERIFICATION FORM */}
          {mfaStep ? (
            <form onSubmit={handleMFASubmit} className="space-y-5 animate-in fade-in duration-300">
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-150 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">
                  2-Factor Multi-Factor Authentication
                </h3>
                <p className="text-[11px] text-indigo-800 leading-relaxed font-medium">
                  {hasTOTP
                    ? "Open your Authenticator app (Google Authenticator, Authy) and enter your current 6-digit TOTP code."
                    : "Scan the QR code below using Google Authenticator or Authy to pair your device, then enter the 6-digit code."}
                </p>
              </div>

              {/* QR Code Container if initial setup */}
              {qrCodeUrl && (
                <div className="p-4 rounded-xl bg-white border-2 border-indigo-200 text-center space-y-3 shadow-sm">
                  <span className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider block">
                    Scan with Authenticator App
                  </span>
                  <div className="p-2 bg-indigo-50/50 rounded-lg inline-block border border-indigo-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrCodeUrl} alt="MFA QR Code" className="w-36 h-36 mx-auto rounded shadow-inner" />
                  </div>
                  {secret && (
                    <div className="text-[9px] text-zinc-500 font-mono">
                      Secret Key: <span className="font-bold text-indigo-700 select-all">{secret}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-[10px] font-extrabold text-zinc-550 uppercase tracking-wider text-center">
                  Enter 6-Digit Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  disabled={isPending}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 5 9 2 8 1 4"
                  className="w-full px-4 py-3 rounded-lg border-2 border-indigo-300 bg-white text-center font-mono text-xl font-extrabold text-indigo-950 tracking-[0.4em] placeholder-zinc-300 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-all disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isPending || otpCode.length !== 6}
                className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wider transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer uppercase shadow-md"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Verifying Code...
                  </>
                ) : (
                  <>
                    Authorize &amp; Enter Portal
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[10px] pt-2">
                <button
                  type="button"
                  onClick={() => setMfaStep(false)}
                  className="font-bold text-zinc-500 hover:text-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  &larr; Back to Login
                </button>
                <button
                  type="button"
                  onClick={() => setOtpCode(activeOtpCode || "849201")}
                  className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer bg-indigo-50 px-2 py-1 rounded border border-indigo-200"
                >
                  Fill Test Code ({activeOtpCode || "849201"})
                </button>
              </div>
            </form>
          ) : (
            /* STEP 1: INITIAL CREDENTIAL LOGIN FORM */
            <form onSubmit={handleInitialSubmit} className="space-y-4">
              
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
                    Authenticating Credentials...
                  </>
                ) : (
                  <>
                    Continue to 2-Step Verification
                    <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}

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

      </div>

      {/* Footer link bar */}
      <footer className="w-full max-w-5xl border-t border-zinc-200/60 pt-4 flex flex-col sm:flex-row items-center justify-between text-[9px] font-bold text-zinc-400 uppercase tracking-widest gap-2">
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-zinc-650 transition-colors">Privacy Policy</Link>
          <span>/</span>
          <Link href="/security" className="hover:text-zinc-650 transition-colors">Security Architecture</Link>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-650 animate-pulse">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          SECURE 2-FACTOR MFA ACTIVE
        </div>
      </footer>
    </div>
  );
}
