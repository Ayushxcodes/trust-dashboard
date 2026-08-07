import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, logout } from "../actions";
import { getTemplates, getDocumentsByUserId, getPipelineStages, getUsers, getUserById, getSystemMessages, calculateRemainingDays } from "@/lib/db";
import UploadButton from "./UploadButton";
import CommercialTab from "./CommercialTab";
import { VerifyStatusButton, BriefActions } from "./ActionButtons";
import SettingsTab from "./SettingsTab";
import SupportTab from "./SupportTab";
import EquityCalculator from "./EquityCalculator";
import DepositorySyncEngine from "./DepositorySyncEngine";
import { getDownloadUrl } from "@/lib/s3";

interface PageProps {
  searchParams: Promise<{
    tab?: string;
    userContext?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();

  // Route guarding
  if (!user) {
    redirect("/login");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  const params = await searchParams;
  const activeTab = params.tab || "vault";
  const contextUserId = user.id;

  const activeCompanyUser = user;

  const rawTemplates = await getTemplates();
  const templates = await Promise.all(
    rawTemplates.map(async (tpl) => ({
      ...tpl,
      fileUrl: await getDownloadUrl(tpl.fileUrl),
    }))
  );
  const rawUploads = await getDocumentsByUserId(contextUserId);
  const uploads = await Promise.all(
    rawUploads.map(async (doc) => ({
      ...doc,
      uploadedFileUrl: await getDownloadUrl(doc.uploadedFileUrl),
    }))
  );
  const stages = await getPipelineStages(contextUserId);
  const messages = await getSystemMessages(contextUserId);

  const totalStages = stages.length;
  const completedStages = stages.filter((s) => s.status === "COMPLETED").length;
  const progressPercent = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;
  const sortedStages = [...stages].sort((a, b) => a.stageOrder - b.stageOrder);

  // Map upload files to template IDs for fast lookup
  const uploadMap = uploads.reduce((acc, doc) => {
    acc[doc.templateId] = doc;
    return acc;
  }, {} as Record<string, typeof uploads[0]>);

  const verifiedCount = uploads.filter((d) => d.status === "VERIFIED").length;
  const totalTasks = templates.length;
  const calculatedCountdownDays = calculateRemainingDays(activeCompanyUser.complianceDeadline, activeCompanyUser.countdownDays);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Left Sidebar: Dark Navy */}
      <aside className="w-64 bg-[#0B1528] text-slate-400 flex flex-col shrink-0 border-r border-[#152238] z-30 justify-between">
        
        {/* Top Section */}
        <div>
          {/* Sidebar Header Logo */}
          <div className="p-6 border-b border-[#152238]">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-teal-400 to-emerald-400 flex items-center justify-center">
                <span className="font-extrabold text-[#0B1528] text-sm tracking-wider">TL</span>
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight uppercase">TrustLink</span>
                <span className="text-[9px] block font-mono text-zinc-500 leading-none">Client Portal</span>
              </div>
            </Link>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-4 space-y-1.5">
            <Link
              href="/dashboard?tab=pipeline"
              className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                activeTab === "pipeline"
                  ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                  : "hover:bg-[#111C30] hover:text-slate-200 text-slate-400"
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
              Pipeline
            </Link>

            <Link
              href="/dashboard?tab=vault"
              className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                activeTab === "vault"
                  ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                  : "hover:bg-[#111C30] hover:text-slate-200 text-slate-400"
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Vault
            </Link>

            <Link
              href="/dashboard?tab=commercial"
              className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                activeTab === "commercial"
                  ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                  : "hover:bg-[#111C30] hover:text-slate-200 text-slate-400"
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Commercial
            </Link>

            <Link
              href="/dashboard?tab=settings"
              className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                activeTab === "settings"
                  ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                  : "hover:bg-[#111C30] hover:text-slate-200 text-slate-400"
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
              Settings
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#152238] space-y-4">
          
          {/* New Transfer green floating button */}
          <Link
            href="/dashboard?tab=vault"
            className="w-full py-2.5 rounded bg-[#4ef3b2] hover:bg-[#3cd29b] text-[#0B1528] font-black text-xs transition-colors tracking-widest cursor-pointer uppercase flex items-center justify-center shadow"
          >
            New Transfer
          </Link>
          
          <div className="space-y-2 text-xs font-bold pl-2 text-slate-400">
            <Link
              href="/dashboard?tab=settings"
              className={`flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer w-full text-left ${
                activeTab === "settings" ? "text-white font-extrabold" : "text-slate-400"
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
              Settings
            </Link>
            <Link
              href="/dashboard?tab=support"
              className={`flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer w-full text-left ${
                activeTab === "support" ? "text-white font-extrabold" : "text-slate-400"
              }`}
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536" />
              </svg>
              Support
            </Link>
          </div>
        </div>
      </aside>

      {/* Right Wrapper: Top Bar + Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. Top Navigation Bar (Context Bar) */}
        <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8 sticky top-0 z-20 shrink-0 shadow-sm">
          
          {/* Global Account Switcher dropdown & Search Bar */}
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            {/* Active Company Name display */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-bold text-zinc-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{activeCompanyUser.companyName}</span>
            </div>
          </div>

          {/* Quick Context Links & Profile Action */}
          <div className="flex items-center gap-4.5">
            <span className="text-[10px] font-extrabold text-zinc-450 uppercase tracking-widest font-mono hidden md:inline">
              Secure client portal
            </span>

            <span className="text-zinc-200 px-1 font-light hidden md:inline">|</span>

            {/* Verify Status primary button */}
            <VerifyStatusButton userId={contextUserId} />

            {/* Profile indicator & Settings Link */}
            <Link
              href="/dashboard?tab=settings"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors"
              title="Account & Entity Settings"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
              <span>Settings</span>
            </Link>

            <div className="w-7.5 h-7.5 rounded-full bg-[#0B1528] text-white flex items-center justify-center font-extrabold text-xs tracking-wider" title={user.name}>
              {user.name.slice(0, 2).toUpperCase()}
            </div>

            <form action={logout}>
              <button
                type="submit"
                className="px-3 py-1.5 rounded border border-zinc-250 text-zinc-650 hover:text-zinc-950 text-xs font-semibold hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </form>
          </div>
        </header>

        {/* Global Notifications/Broadcast Banner */}
        {messages.length > 0 && (
          <div className="bg-zinc-50 border-b border-zinc-200 px-8 py-4 space-y-3">
            <span className="text-[9px] font-extrabold text-zinc-450 uppercase tracking-widest font-mono block">
              System Broadcasts & Administrative Updates
            </span>
            <div className="flex flex-col gap-2.5">
              {messages.map((msg) => {
                let cardColor = "bg-blue-50 border-blue-200 text-blue-800";
                let typeLabel = "Info";
                if (msg.type === "WARNING") {
                  cardColor = "bg-amber-50 border-amber-250 text-amber-800";
                  typeLabel = "Warning";
                } else if (msg.type === "CRITICAL") {
                  cardColor = "bg-rose-50 border-rose-250 text-rose-800";
                  typeLabel = "Urgent";
                }
                return (
                  <div key={msg.id} className={`flex items-start justify-between p-3.5 rounded-xl border text-xs gap-4 shadow-sm ${cardColor}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold uppercase text-[9px] tracking-wider bg-white/70 px-2 py-0.5 rounded border border-current/10 leading-none">
                        {typeLabel}
                      </span>
                      <p className="font-bold">{msg.messageText}</p>
                    </div>
                    <span className="text-[9px] text-zinc-400 font-mono shrink-0 font-bold">
                      {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Main Content Switching Pane */}
        {activeTab === "vault" && (
          <div className="flex flex-1 min-h-0">
            {/* Vault Left Sub-Sidebar (Sequential Stage Registry) */}
            <aside className="w-72 bg-[#ECF2F8] border-r border-zinc-200 p-6 flex flex-col shrink-0 overflow-y-auto">
              <h4 className="text-xs font-extrabold text-zinc-700 uppercase tracking-wider mb-1">
                Compliance Journey
              </h4>
              <span className="text-[10px] text-zinc-500 font-bold block mb-4">
                {completedStages} of {totalStages} Stages Completed
              </span>

              {/* Progress Status Tracker completion bar */}
              <div className="w-full bg-zinc-200 h-1.5 rounded overflow-hidden mb-8">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Checklist phases (Sequential Stage Registry) */}
              <div className="space-y-4">
                {sortedStages.map((stage) => {
                  let statusIcon = null;
                  let textColor = "text-zinc-450 font-bold";

                  if (stage.status === "COMPLETED") {
                    statusIcon = (
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[9px] font-extrabold shrink-0">
                        ✓
                      </span>
                    );
                    textColor = "text-emerald-600 font-bold";
                  } else if (stage.status === "IN_PROGRESS") {
                    statusIcon = (
                      <span className="w-4 h-4 rounded-full bg-[#0B1528] text-white flex items-center justify-center text-[8px] font-bold shrink-0 animate-pulse">
                        ●
                      </span>
                    );
                    textColor = "text-[#0B1528] font-extrabold";
                  } else {
                    statusIcon = (
                      <span className="w-4 h-4 rounded-full border border-zinc-300 bg-white shrink-0" />
                    );
                    textColor = "text-zinc-400 font-medium";
                  }

                  return (
                    <div key={stage.id} className="flex items-center gap-2.5 text-xs">
                      {statusIcon}
                      <span className={`${textColor} truncate`} title={stage.stageName}>
                        {stage.stageName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Vault Right Main Table Panel (Spec Grouped Phases) */}
            <main className="flex-1 p-8 bg-white overflow-y-auto space-y-8">
              <div className="flex justify-between items-end border-b border-zinc-200 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    Compliance Architecture
                  </span>
                  <h2 className="text-xl font-extrabold text-zinc-900 mt-1">Document Vault &amp; Authorization Matrix</h2>
                </div>
                <div className="text-right leading-none">
                  <span className="block text-[9px] uppercase font-bold text-zinc-400">Compliance Target</span>
                  <span className="text-xs font-bold text-rose-600 mt-1 block font-mono uppercase">
                    {activeCompanyUser.complianceDeadline
                      ? new Date(activeCompanyUser.complianceDeadline).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                      : "OCT 24 2026"}
                  </span>
                </div>
              </div>

              {/* 1. Phase 1 — Corporate Identity */}
              <section className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-zinc-900 text-white text-[10px] font-black flex items-center justify-center font-mono">
                      P1
                    </span>
                    <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">
                      Vault: Phase 1 — Corporate Identity
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Primary KYC &amp; UBO Verification
                  </span>
                </div>

                <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  {templates
                    .filter((t) => t.requiredFor.includes("Phase 1"))
                    .map((tpl) => {
                      const doc = uploadMap[tpl.id];
                      return (
                        <div key={tpl.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-zinc-900">{tpl.title}</h4>
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                                Green Verified Check on Completion
                              </span>
                            </div>
                            <p className="text-zinc-550 text-[11px]">{tpl.description}</p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {doc && doc.status === "VERIFIED" ? (
                              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center gap-1">
                                ✓ Green Check Verified
                              </span>
                            ) : doc ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-600">
                                {doc.status}
                              </span>
                            ) : null}
                            <UploadButton templateId={tpl.id} templateTitle={tpl.title} activeUserId={contextUserId} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>

              {/* 2. Step 04 — Certificate Collection Vault */}
              <section className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-indigo-900 text-white text-[10px] font-black flex items-center justify-center font-mono">
                      S4
                    </span>
                    <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">
                      Vault: Certificate Collection Vault (Step 04)
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Legal Upload Rows (COI, BR, Financials)
                  </span>
                </div>

                <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  {templates
                    .filter((t) => t.requiredFor.includes("Step 04"))
                    .map((tpl) => {
                      const doc = uploadMap[tpl.id];
                      return (
                        <div key={tpl.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/50 transition-colors">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-zinc-900">{tpl.title}</h4>
                              <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                OCR compliance scan &rarr; green &nbsp; Verified &nbsp; chip
                              </span>
                            </div>
                            <p className="text-zinc-550 text-[11px]">{tpl.description}</p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {doc && (
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                                  doc.status === "VERIFIED" ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold" : "bg-amber-50 text-amber-700 border-amber-200"
                                }`}>
                                  {doc.status === "VERIFIED" ? "✓ VERIFIED CHIP" : doc.status}
                                </span>
                              </div>
                            )}
                            <UploadButton templateId={tpl.id} templateTitle={tpl.title} activeUserId={contextUserId} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>

              {/* 3. Phase 2 — Professional Authorizations */}
              <section className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-teal-700 text-white text-[10px] font-black flex items-center justify-center font-mono">
                      P2
                    </span>
                    <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">
                      Vault: Phase 2 — Professional Authorizations
                    </h3>
                  </div>
                  <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Active Focus per Spec
                  </span>
                </div>

                <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm p-4 space-y-4">
                  {templates
                    .filter((t) => t.requiredFor.includes("Phase 2"))
                    .map((tpl) => {
                      const doc = uploadMap[tpl.id];
                      return (
                        <div key={tpl.id} className="p-3 rounded-lg bg-zinc-50/50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1 flex-1">
                            <h4 className="text-xs font-bold text-zinc-900">{tpl.title}</h4>
                            <p className="text-zinc-550 text-[11px]">{tpl.description}</p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <UploadButton templateId={tpl.id} templateTitle={tpl.title} activeUserId={contextUserId} />
                          </div>
                        </div>
                      );
                    })}

                  {/* Embedded Step 05 Equity Stability Calculator */}
                  <EquityCalculator />
                </div>
              </section>

              {/* 4. Phase 3 — Depository Execution Forms (Padlocked) */}
              <section className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-zinc-400 text-white text-[10px] font-black flex items-center justify-center font-mono">
                      🔒
                    </span>
                    <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">
                      Vault: Phase 3 — Depository Execution Forms
                    </h3>
                  </div>
                  <span className="text-[9px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    🔒 Padlocked until prior phases clear
                  </span>
                </div>

                <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50/50 shadow-sm p-4 space-y-3">
                  {templates
                    .filter((t) => t.requiredFor.includes("Phase 3"))
                    .map((tpl) => {
                      return (
                        <div key={tpl.id} className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-100/60 flex items-center justify-between gap-4 opacity-75">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-zinc-500">🔒 [PADLOCKED]</span>
                              <h4 className="text-xs font-bold text-zinc-700">{tpl.title}</h4>
                            </div>
                            <p className="text-zinc-500 text-[10px] mt-0.5">{tpl.description}</p>
                          </div>
                          <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-2 py-1 rounded font-mono border border-amber-250">
                            Locked (Clear Phase 1 &amp; 2)
                          </span>
                        </div>
                      );
                    })}
                </div>
              </section>

              {/* Technical Guidance Card */}
              <div className="p-5 rounded-xl bg-[#EBF3FC] border-l-4 border-[#3B82F6] flex gap-4 text-xs">
                <div className="w-5 h-5 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center shrink-0 font-bold mt-0.5">
                  i
                </div>
                <div>
                  <h4 className="font-extrabold text-[#1E3A8A] mb-1">Technical Guidance</h4>
                  <p className="text-zinc-650 leading-relaxed">
                    Ensure all uploaded documents are in high-resolution PDF format. Scanned copies must be clearly legible and feature original wet signatures where specified. All documents will undergo automated OCR validation before being queued for manual registrar review. Verification typically takes 24 to 48 business hours.
                  </p>
                </div>
              </div>
            </main>
          </div>
        )}

        {/* PIPELINE BRIEFING TAB (Regulatory Briefing - Rule 9B) */}
        {activeTab === "pipeline" && (
          <main className="flex-1 p-8 overflow-y-auto max-w-5xl mx-auto w-full space-y-8">
            
            {/* Breadcrumb Header */}
            <div>
              <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-mono">
                Pipeline &gt; Regulatory Briefing &gt; Rule 9B
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1.5">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">Regulatory Briefing: Rule 9B Compliance</h2>
                  <p className="text-zinc-550 text-xs mt-0.5">
                    Guidelines for Mandatory Dematerialization of Physical Folios for Unlisted Public Companies.
                  </p>
                </div>
                {/* Action Utilities Group */}
                <BriefActions companyName={activeCompanyUser.companyName} />
              </div>
            </div>

            {/* Red Alert Banner & Urgency Countdown Widget */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Regulatory Alert Card */}
              <div className="md:col-span-2 p-5 rounded-xl bg-rose-50 border border-rose-250 flex items-start gap-4">
                <div className="w-8 h-8 rounded bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 text-lg font-black">
                  !
                </div>
                <div className="space-y-3">
                  <h4 className="font-extrabold text-rose-900 text-sm">Critical Regulatory Deadline</h4>
                  <p className="text-rose-700 text-xs leading-relaxed">
                    All unlisted public companies must ensure that the entire holding of securities of its promoters, directors, and key managerial personnel has been dematerialized by the target date.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-rose-600 text-white font-mono px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                      DEADLINE: {activeCompanyUser.complianceDeadline
                        ? new Date(activeCompanyUser.complianceDeadline).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()
                        : "NOT SPECIFIED"}
                    </span>
                    <span className="text-[10px] font-bold text-rose-800 italic">
                      Action required: Immediate Audit
                    </span>
                  </div>
                </div>
              </div>

              {/* Urgency Countdown Widget (Dynamic Calculation) */}
              <div className="p-5 rounded-xl bg-[#121B2A] text-white flex flex-col justify-between shadow-lg">
                <span className="text-[9px] font-bold text-teal-400 uppercase tracking-widest">
                  Remaining Time
                </span>
                <div className="my-3">
                  <span className="text-3xl font-extrabold tracking-tight">
                    {calculatedCountdownDays}
                  </span>
                  <span className="text-sm font-semibold text-zinc-450 ml-1.5">Days left</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 border-t border-zinc-800 pt-2.5">
                  <span>CLOCK_SYNC: T-MINUS</span>
                  <span className="text-emerald-450 font-bold uppercase flex items-center gap-1">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                    Live Tracking
                  </span>
                </div>
              </div>

            </div>

            {/* Step 08 — Depository Sync Engine (NSDL & CDSL System-Fetched Letters) */}
            <DepositorySyncEngine />

            {/* GTM Briefing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 01: Objective */}
              <div className="p-6 bg-white border border-zinc-200 rounded-xl space-y-3 shadow-sm">
                <div className="w-8 h-8 rounded bg-zinc-50 border border-zinc-150 text-zinc-650 flex items-center justify-center text-xs font-bold">
                  01
                </div>
                <h4 className="font-bold text-xs text-zinc-900 uppercase tracking-wide">01. Objective</h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  The primary mandate is the absolute conversion of all physical share certificates into electronic (demat) form. This initiative aims to enhance transparency, prevent fraud, and facilitate seamless share transfers within the unlisted sector.
                </p>
              </div>

              {/* Card 02: Scope */}
              <div className="p-6 bg-white border border-zinc-200 rounded-xl space-y-3 shadow-sm">
                <div className="w-8 h-8 rounded bg-zinc-50 border border-zinc-150 text-zinc-650 flex items-center justify-center text-xs font-bold">
                  02
                </div>
                <h4 className="font-bold text-xs text-zinc-900 uppercase tracking-wide">02. Scope</h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  This rule applies to all Unlisted Public Companies. Any new issue of securities or transfer of securities must only be processed in dematerialized form as per Section 29 of the Companies Act.
                </p>
              </div>

              {/* Card 03: Consequences */}
              <div className="p-6 bg-white border border-zinc-200 rounded-xl space-y-3 shadow-sm">
                <div className="w-8 h-8 rounded bg-zinc-50 border border-zinc-150 text-zinc-650 flex items-center justify-center text-xs font-bold">
                  03
                </div>
                <h4 className="font-bold text-xs text-zinc-900 uppercase tracking-wide">03. Consequences</h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  Non-compliance will result in an operational freeze. The company will be prohibited from issuing new securities, including bonus shares, right issues, or private placements.
                </p>
              </div>
            </div>

            {/* Roadmap Stages */}
            <div className="bg-white border border-zinc-200 p-6 rounded-xl shadow-sm space-y-6">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Compliance Roadmap &amp; Milestones
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {stages.map((stage, idx) => {
                  let statusColor = "text-zinc-400 bg-zinc-50 border-zinc-200";
                  let textBadge = "text-zinc-400";
                  
                  if (stage.status === "COMPLETED") {
                    statusColor = "bg-emerald-50 border-emerald-250 text-emerald-600 shadow-sm";
                    textBadge = "text-emerald-600";
                  } else if (stage.status === "IN_PROGRESS") {
                    statusColor = "bg-indigo-50 border-indigo-255 text-indigo-650 animate-pulse shadow-sm";
                    textBadge = "text-indigo-600";
                  }

                  return (
                    <div key={stage.id} className="flex flex-col items-center text-center">
                      <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-extrabold transition-all ${statusColor}`}>
                        {stage.status === "COMPLETED" ? "✓" : idx + 1}
                      </div>
                      <span className="mt-2 text-[10px] font-bold text-zinc-800 line-clamp-1">
                        {stage.stageName}
                      </span>
                      <span className={`text-[8px] font-mono mt-0.5 uppercase font-bold ${textBadge}`}>
                        {stage.status.toLowerCase()}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Administrative Active Stage details */}
              {stages.find((s) => s.status === "IN_PROGRESS") && (
                <div className="p-4 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs">
                  <span className="font-extrabold text-indigo-850 block mb-0.5">
                    Current Operations Instruction: {stages.find((s) => s.status === "IN_PROGRESS")?.stageName}
                  </span>
                  <p className="text-zinc-650">
                    {stages.find((s) => s.status === "IN_PROGRESS")?.adminNote || "We are currently checking the submitted details. We will notify you once verified."}
                  </p>
                </div>
              )}
            </div>
          </main>
        )}

        {activeTab === "commercial" && (
          <main className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC]">
            <CommercialTab key={contextUserId} companyName={activeCompanyUser.companyName} />
          </main>
        )}

        {activeTab === "settings" && (
          <SettingsTab
            userId={activeCompanyUser.id}
            initialName={activeCompanyUser.name}
            initialEmail={activeCompanyUser.email}
            initialAvatarUrl={activeCompanyUser.avatarUrl}
          />
        )}

        {activeTab === "support" && (
          <SupportTab />
        )}

      </div>
    </div>
  );
}
