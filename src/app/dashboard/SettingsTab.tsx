"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateProfileSettings } from "../actions";

interface SettingsTabProps {
  userId: string;
  initialName: string;
  initialEmail: string;
  initialAvatarUrl?: string;
}

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
];

export default function SettingsTab({
  userId,
  initialName,
  initialEmail,
  initialAvatarUrl,
}: SettingsTabProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(
    initialAvatarUrl || AVATAR_PRESETS[0]
  );
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  // TOTP MFA Modal State
  const [showMfaModal, setShowMfaModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [totpToken, setTotpToken] = useState("");
  const [isVerifyingTotp, setIsVerifyingTotp] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await updateProfileSettings(
          userId,
          name,
          email,
          password || undefined,
          avatarUrl
        );
        if (res.success) {
          toast.success("Profile configurations saved successfully!");
          setPassword("");
        } else {
          toast.error(res.error || "Failed to update profile settings.");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred during profile updates.");
      }
    });
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto max-w-3xl mx-auto w-full space-y-8 bg-white">
      <div>
        <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-mono">
          Security &gt; User Settings
        </span>
        <h2 className="text-xl font-bold text-zinc-900 mt-1.5">
          User Settings &amp; Profile Control
        </h2>
        <p className="text-zinc-550 text-xs">
          Manage your credentials, verify account scopes, and update system identifiers.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Avatar Selection */}
        <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-4">
          <span className="block text-xs font-bold text-zinc-550 uppercase tracking-wider">
            Display Picture
          </span>
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-zinc-350 shadow-sm bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt="Selected profile display picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                Select Presets
              </span>
              <div className="flex gap-2.5">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAvatarUrl(preset)}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                      avatarUrl === preset ? "border-indigo-600 scale-105" : "border-zinc-200"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={preset}
                      alt={`Preset display picture option ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Identity Inputs */}
        <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-4">
          <span className="block text-xs font-bold text-zinc-550 uppercase tracking-wider">
            Account Identity Details
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Authorized Signatory Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-250 text-xs text-zinc-800 focus:outline-none focus:border-indigo-500 transition-colors font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-250 text-xs text-zinc-800 focus:outline-none focus:border-indigo-500 transition-colors font-bold"
                required
              />
            </div>
          </div>
        </div>

        {/* Security Credentials */}
        <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 space-y-4">
          <span className="block text-xs font-bold text-zinc-550 uppercase tracking-wider">
            Security &amp; Credentials
          </span>
          <div className="relative">
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Update Security Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to retain current password"
                className="w-full px-3 py-2 pr-10 rounded-lg bg-white border border-zinc-250 text-xs text-zinc-800 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-zinc-400 hover:text-zinc-600 text-xs font-bold cursor-pointer"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            <p className="text-[10px] text-zinc-450 mt-1.5 leading-relaxed">
              Passwords are encrypted before transit. Minimum recommended length is 8 characters.
            </p>
          </div>
        </div>

        {/* Multi-Factor Authentication (TOTP / Authenticator App Setup) */}
        <div className="p-6 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 002-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
                  2-Factor Authentication (TOTP)
                </h4>
                <p className="text-[11px] text-indigo-800 font-medium">
                  Pair Google Authenticator or Authy to secure portal logins.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={async () => {
                const { setupTOTPMFA } = await import("../actions");
                const res = await setupTOTPMFA();
                if (res.success && res.qrCodeUrl && res.secret) {
                  setQrCodeUrl(res.qrCodeUrl);
                  setSecret(res.secret);
                  setShowMfaModal(true);
                } else {
                  toast.error(res.error || "Failed to initialize MFA setup.");
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              Configure Authenticator
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-xl bg-[#0B1528] hover:bg-[#1E293B] text-white font-bold text-xs transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {isPending ? "Saving Configurations..." : "Save Settings"}
          </button>
        </div>

      </form>

      {/* TOTP Authenticator Setup Modal */}
      {showMfaModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 002-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Set Up TOTP Authenticator</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Scan QR code using Google Authenticator or Authy</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMfaModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-center">
              {qrCodeUrl ? (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 inline-block shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrCodeUrl} alt="MFA QR Code" className="w-44 h-44 mx-auto rounded" />
                </div>
              ) : (
                <div className="w-44 h-44 bg-slate-100 rounded-xl animate-pulse mx-auto flex items-center justify-center text-xs text-slate-400 font-mono">
                  Generating QR...
                </div>
              )}

              <div className="p-2.5 bg-slate-100 rounded-lg text-left space-y-1">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Secret Key (Manual Entry)</span>
                <code className="text-xs font-mono font-bold text-indigo-700 select-all break-all block">{secret}</code>
              </div>

              <div className="space-y-2 text-left pt-2">
                <label className="block text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                  Enter 6-Digit Code to Confirm Setup
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={totpToken}
                  onChange={(e) => setTotpToken(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 592814"
                  className="w-full px-4 py-2.5 rounded-lg border-2 border-indigo-200 text-center font-mono text-lg font-bold text-slate-900 tracking-widest focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowMfaModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isVerifyingTotp || totpToken.length !== 6}
                onClick={async () => {
                  setIsVerifyingTotp(true);
                  try {
                    const { verifyAndEnableTOTP } = await import("../actions");
                    const res = await verifyAndEnableTOTP(totpToken);
                    if (res.success) {
                      toast.success("TOTP Multi-Factor Authentication successfully enabled!");
                      setShowMfaModal(false);
                      setTotpToken("");
                    } else {
                      toast.error(res.error || "Invalid 6-digit TOTP code.");
                    }
                  } catch (err) {
                    console.error(err);
                    toast.error("Failed to verify TOTP code.");
                  } finally {
                    setIsVerifyingTotp(false);
                  }
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-all disabled:opacity-50 cursor-pointer uppercase tracking-wider shadow-md"
              >
                {isVerifyingTotp ? "Verifying..." : "Enable MFA"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
