"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 flex flex-col items-center justify-center p-6 relative font-sans">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="TrustLink Logo" className="h-12 w-auto" />
        </Link>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2 text-center">Reset Password</h2>
        
        {submitted ? (
          <div className="space-y-6 text-center mt-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-zinc-800">Verification Email Sent</h3>
              <p className="text-zinc-500 text-xs leading-relaxed px-4">
                We've dispatched a secure password recovery link to <span className="text-zinc-900 font-medium">{email}</span>. Please check your inbox.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-block px-5 py-2 rounded-xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-650 text-xs font-semibold transition-colors"
              >
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-zinc-500 text-xs text-center mb-6">
              Enter your corporate email address to receive password reset instructions
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                Send Reset Link
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
