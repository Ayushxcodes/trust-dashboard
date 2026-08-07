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
    </main>
  );
}
