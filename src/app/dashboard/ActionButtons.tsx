"use client";

import { useState } from "react";

export function VerifyStatusButton({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    // Simulate real-time API request to central NSDL/CDSL databases
    setTimeout(() => {
      setLoading(false);
      alert(
        `TrustLink Depository Sync Success!\n\nAll physical-to-demat verification checks for client ID ${userId} were successfully updated against central depository records.`
      );
    }, 1500);
  };

  return (
    <button
      onClick={handleVerify}
      disabled={loading}
      className="px-4.5 py-1.5 rounded border border-zinc-300 text-zinc-700 hover:text-[#0B1528] hover:bg-zinc-50 text-xs font-bold transition-colors cursor-pointer uppercase shadow-sm flex items-center gap-1.5 disabled:opacity-50"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-3 w-3 text-zinc-700" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Verifying...
        </>
      ) : (
        "Verify Status"
      )}
    </button>
  );
}

export function BriefActions({ companyName }: { companyName: string }) {
  const handleExport = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `TrustLink Regulatory Compliance Briefing for ${companyName} regarding Rule 9B Dematerialization.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "TrustLink Compliance Brief",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\nLink: ${shareUrl}`);
        alert("Compliance Briefing Share Link copied to clipboard!");
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        alert(`Share information: ${shareText} - URL: ${shareUrl}`);
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="px-4 py-2 rounded border border-zinc-300 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-650 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
      >
        <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        EXPORT PDF
      </button>
      <button
        onClick={handleShare}
        className="px-4 py-2 rounded bg-[#0B1528] text-white hover:bg-[#1E293B] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.828-2.414m0 5.414l-4.828-2.414m5.414 4.828a3 3 0 11-6 0 3 3 0 016 0zm-6-11a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        SHARE BRIEF
      </button>
    </div>
  );
}
