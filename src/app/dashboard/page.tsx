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
import CompanySwitcher from "./CompanySwitcher";
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
  const totalUploadedCount = uploads.length;
  const totalRequiredDocs = templates.length + 5;
  const calculatedCountdownDays = calculateRemainingDays(activeCompanyUser.complianceDeadline, activeCompanyUser.countdownDays);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col lg:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Mobile Top Header (< lg viewports) */}
      <div className="lg:hidden bg-[#0B1528] text-white border-b border-[#152238] sticky top-0 z-40 shrink-0">
        <div className="p-3.5 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="TrustLink Logo" className="h-8 w-auto bg-white p-1 rounded" />
            <div>
              <span className="text-sm font-extrabold text-white tracking-tight uppercase block leading-none">TrustLink</span>
              <span className="text-[8px] font-mono text-zinc-400">Client Portal</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <CompanySwitcher currentContextId={contextUserId} companyMap={[{ id: activeCompanyUser.id, name: activeCompanyUser.companyName }]} activeTab={activeTab} />
            <form action={logout}>
              <button
                type="submit"
                className="px-2.5 py-1 rounded border border-zinc-700 text-zinc-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Horizontal Scroll Tab Navigation */}
        <div className="px-3 py-2 bg-[#091120] border-t border-[#152238] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Link
            href="/dashboard?tab=pipeline"
            className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === "pipeline" ? "bg-[#1E293B] text-teal-400 border border-teal-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            Pipeline
          </Link>
          <Link
            href="/dashboard?tab=vault"
            className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === "vault" ? "bg-[#1E293B] text-teal-400 border border-teal-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            Vault
          </Link>
          <Link
            href="/dashboard?tab=commercial"
            className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === "commercial" ? "bg-[#1E293B] text-teal-400 border border-teal-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            Commercial
          </Link>
          <Link
            href="/dashboard?tab=settings"
            className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === "settings" ? "bg-[#1E293B] text-teal-400 border border-teal-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            Settings
          </Link>
          <Link
            href="/dashboard?tab=support"
            className={`px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-colors ${
              activeTab === "support" ? "bg-[#1E293B] text-teal-400 border border-teal-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            Support
          </Link>
        </div>
      </div>

      {/* 1. Left Sidebar: Dark Navy (Visible lg+) */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#0B1528] text-slate-400 shrink-0 border-r border-[#152238] z-30 justify-between min-h-screen sticky top-0 h-screen overflow-y-auto">
        
        {/* Top Section */}
        <div>
          {/* Sidebar Header Logo */}
          <div className="p-6 border-b border-[#152238]">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="TrustLink Logo" className="h-10 w-auto bg-white p-1 rounded" />
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
        <header className="h-auto min-h-16 py-3 border-b border-zinc-200 bg-white flex flex-wrap items-center justify-between px-4 sm:px-8 sticky top-0 z-20 shrink-0 shadow-sm gap-3">
          
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
          <div className="flex flex-col lg:flex-row flex-1 min-h-0">
            {/* Vault Left Sub-Sidebar (Sequential Stage Registry) */}
            <aside className="w-full lg:w-72 bg-[#ECF2F8] border-b lg:border-b-0 lg:border-r border-zinc-200 p-4 sm:p-6 flex flex-col shrink-0 overflow-y-auto">
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
            <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white overflow-y-auto space-y-6 md:space-y-8 min-w-0">
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

              {/* Document Metrics & Upload Progress Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50/80 to-emerald-50/50 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 font-mono block">
                      Documents Uploaded
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-black text-teal-950">{totalUploadedCount}</span>
                      <span className="text-xs font-bold text-teal-700">/ {totalRequiredDocs} Uploaded</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 flex items-center justify-center font-black text-lg">
                    ✓
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-purple-250 bg-gradient-to-br from-purple-50/90 via-indigo-50/50 to-purple-100/30 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-900 font-mono block">
                      Approved by Admin
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-black text-purple-950">{verifiedCount}</span>
                      <span className="text-xs font-bold text-purple-800">/ {totalRequiredDocs} Approved</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                    ✓
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/60 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-800 font-mono block">
                      Pending Uploads
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-black text-indigo-950">{Math.max(0, totalRequiredDocs - totalUploadedCount)}</span>
                      <span className="text-xs font-bold text-indigo-700">Remaining</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    ⏳
                  </div>
                </div>
              </div>

              {/* SECTION A: Admin Provided Templates & Formats */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#0B1528] text-white text-[10px] font-black flex items-center justify-center font-mono">
                      A
                    </span>
                    <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">
                      CDSL Execution Formats (Provided by Admin — Format Attached)
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Download Format &rarr; Sign &amp; Upload
                  </span>
                </div>

                <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  {templates.map((tpl) => {
                    const doc = uploadMap[tpl.id];
                    const hasFormat = Boolean(
                      tpl.fileUrl &&
                      tpl.fileUrl.trim() !== "" &&
                      tpl.fileUrl !== "#" &&
                      !tpl.fileUrl.toLowerCase().includes("placeholder")
                    );

                    const isVerified = doc?.status === "VERIFIED";
                    const isRejected = doc?.status === "REJECTED";

                    return (
                      <div
                        key={tpl.id}
                        className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                          doc
                            ? isVerified
                              ? "bg-gradient-to-r from-purple-50/90 via-indigo-50/40 to-white border-l-4 border-l-purple-600"
                              : isRejected
                              ? "bg-gradient-to-r from-rose-50/90 via-pink-50/40 to-white border-l-4 border-l-rose-600"
                              : "bg-gradient-to-r from-emerald-50/80 via-teal-50/30 to-white border-l-4 border-l-emerald-500"
                            : "hover:bg-zinc-50/50"
                        }`}
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              {doc && (
                                <span
                                  className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[11px] font-black shrink-0 shadow-sm ${
                                    isVerified ? "bg-purple-600" : isRejected ? "bg-rose-600" : "bg-emerald-500"
                                  }`}
                                  title={isVerified ? "Approved by Admin" : isRejected ? "Rejected by Admin" : "Document Uploaded"}
                                >
                                  {isRejected ? "✕" : "✓"}
                                </span>
                              )}
                              <h4 className={`text-xs font-bold ${
                                isVerified ? "text-purple-950 font-extrabold" : doc ? "text-emerald-950 font-extrabold" : "text-zinc-900"
                              }`}>
                                {tpl.title}
                              </h4>
                            </div>
                            {hasFormat ? (
                              <span className="text-[9px] font-bold text-indigo-700 bg-indigo-100/70 px-1.5 py-0.5 rounded border border-indigo-200 font-mono">
                                Format Attached
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 font-mono">
                                Document Required
                              </span>
                            )}
                            {doc && (
                              <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-mono shadow-sm ${
                                isVerified
                                  ? "bg-purple-600 text-white border-purple-600"
                                  : isRejected
                                  ? "bg-rose-600 text-white border-rose-600"
                                  : "bg-teal-600 text-white border-teal-600"
                              }`}>
                                {isVerified ? "✓ Approved by Admin" : isRejected ? "✕ Rejected by Admin" : "✓ Document Uploaded"}
                              </span>
                            )}
                          </div>
                          <p className="text-zinc-550 text-[11px] leading-relaxed">{tpl.description}</p>
                          <div className="text-[9px] font-mono text-zinc-400">
                            Requirement Phase: {tpl.requiredFor}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {/* Download Template Format Button — ONLY shown if format is attached */}
                          {hasFormat && (
                            <a
                              href={tpl.fileUrl}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-lg bg-white hover:bg-zinc-50 border border-zinc-250 text-zinc-750 font-bold text-[10px] transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                              title="Download Admin Provided Format"
                            >
                              <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download Format
                            </a>
                          )}

                          <UploadButton templateId={tpl.id} templateTitle={tpl.title} activeUserId={contextUserId} existingDoc={doc} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SECTION B: Direct Client Upload Items (No Admin Template Required) */}
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-teal-700 text-white text-[10px] font-black flex items-center justify-center font-mono">
                      B
                    </span>
                    <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">
                      Client Statutory Documents (Direct Upload — DSC Required)
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-250">
                    Upload Direct Client Files
                  </span>
                </div>

                <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  {[
                    {
                      id: "direct-coi",
                      title: "Certificate of Incorporation (COI)",
                      remarks: "Document required. (In case of name change during the tenure of the Company, copy of all COIs required).",
                      dscNote: "DSC of authorized signatory needs to be affixed on COI.",
                    },
                    {
                      id: "direct-financials",
                      title: "Financial Statements",
                      remarks: "Document required.",
                      dscNote: "DSC of authorized signatory needs to be affixed on Balance Sheet and Profit and Loss Account.",
                    },
                    {
                      id: "direct-moa",
                      title: "MOA and AOA",
                      remarks: "Document required.",
                      dscNote: "DSC of authorized signatory needs to be affixed on first and last page of MOA and AOA.",
                    },
                    {
                      id: "direct-gst",
                      title: "GST Certificate",
                      remarks: "Document required.",
                      dscNote: "DSC of authorized signatory needs to be affixed on first and last page of GST Certificate.",
                    },
                    {
                      id: "direct-pan",
                      title: "PAS3 / SH7 or PAN Card",
                      remarks: "Required in case of alteration of Capital. If no change of capital, copy of PAN Card is required (mandatory field).",
                      dscNote: "DSC of authorized signatory needs to be affixed on PAN Card.",
                    },
                  ].map((item) => {
                    const doc = uploadMap[item.id];
                    const isVerified = doc?.status === "VERIFIED";
                    const isRejected = doc?.status === "REJECTED";

                    return (
                      <div
                        key={item.id}
                        className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                          doc
                            ? isVerified
                              ? "bg-gradient-to-r from-purple-50/90 via-indigo-50/40 to-white border-l-4 border-l-purple-600"
                              : isRejected
                              ? "bg-gradient-to-r from-rose-50/90 via-pink-50/40 to-white border-l-4 border-l-rose-600"
                              : "bg-gradient-to-r from-emerald-50/80 via-teal-50/30 to-white border-l-4 border-l-emerald-500"
                            : "hover:bg-zinc-50/50"
                        }`}
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              {doc && (
                                <span
                                  className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[11px] font-black shrink-0 shadow-sm ${
                                    isVerified ? "bg-purple-600" : isRejected ? "bg-rose-600" : "bg-emerald-500"
                                  }`}
                                  title={isVerified ? "Approved by Admin" : isRejected ? "Rejected by Admin" : "Document Uploaded"}
                                >
                                  {isRejected ? "✕" : "✓"}
                                </span>
                              )}
                              <h4 className={`text-xs font-bold ${
                                isVerified ? "text-purple-950 font-extrabold" : doc ? "text-emerald-950 font-extrabold" : "text-zinc-900"
                              }`}>
                                {item.title}
                              </h4>
                            </div>
                            <span className="text-[9px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 font-mono">
                              Direct Upload
                            </span>
                            {doc && (
                              <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-mono shadow-sm ${
                                isVerified
                                  ? "bg-purple-600 text-white border-purple-600"
                                  : isRejected
                                  ? "bg-rose-600 text-white border-rose-600"
                                  : "bg-teal-600 text-white border-teal-600"
                              }`}>
                                {isVerified ? "✓ Approved by Admin" : isRejected ? "✕ Rejected by Admin" : "✓ Document Uploaded"}
                              </span>
                            )}
                          </div>
                          <p className="text-zinc-550 text-[11px] leading-relaxed">{item.remarks}</p>
                          <div className="text-[9px] font-bold text-amber-700 bg-amber-50/70 border border-amber-200/60 px-2 py-0.5 rounded inline-block">
                            🔒 {item.dscNote}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <UploadButton templateId={item.id} templateTitle={item.title} activeUserId={contextUserId} existingDoc={doc} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Embedded Step 05 Equity Stability Calculator */}
              <section className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-zinc-800 text-white text-[10px] font-black flex items-center justify-center font-mono">
                      C
                    </span>
                    <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">
                      Equity Capitalization &amp; Stability Verification
                    </h3>
                  </div>
                </div>
                <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white p-4 shadow-sm">
                  <EquityCalculator />
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
                    Ensure all uploaded documents are in high-resolution PDF format. Scanned copies must be clearly legible and feature original wet signatures where specified. All documents will be queued for manual registrar review. Verification typically takes 24 to 48 business hours.
                  </p>
                </div>
              </div>
            </main>
          </div>
        )}

        {/* PIPELINE BRIEFING TAB (Regulatory Briefing - Rule 9B) */}
        {activeTab === "pipeline" && (
          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-w-5xl mx-auto w-full space-y-6 md:space-y-8 min-w-0">
            
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
          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-[#F8FAFC] min-w-0">
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
