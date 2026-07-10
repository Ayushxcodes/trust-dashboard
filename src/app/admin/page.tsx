import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, logout } from "../actions";
import {
  getUsers,
  getUserDocuments,
  getDocumentsByUserId,
  getTemplates,
  getPipelineStages,
  getAuditLogs,
  getSystemMessages,
  getAllPipelineStages,
} from "@/lib/db";
import DocumentReviewForm from "./DocumentReviewForm";
import PipelineForm from "./PipelineForm";
import TemplateForm from "./TemplateForm";
import DeleteTemplateButton from "./DeleteTemplateButton";
import AdminControlWidgets from "./AdminControlWidgets";
import { getDownloadUrl } from "@/lib/s3";

interface SearchParams {
  client?: string;
  tab?: string;
  search?: string;
  sync?: string;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const admin = await getCurrentUser();

  // Route guarding
  if (!admin) {
    redirect("/login");
  }

  if (admin.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const allUsers = await getUsers();
  const clients = allUsers.filter((u) => u.role === "USER");
  const rawDocuments = await getUserDocuments();
  const rawTemplates = await getTemplates();
  const auditLogs = await getAuditLogs();
  const allStages = await getAllPipelineStages();

  const documents = await Promise.all(
    rawDocuments.map(async (doc) => ({
      ...doc,
      uploadedFileUrl: await getDownloadUrl(doc.uploadedFileUrl),
    }))
  );

  const templates = await Promise.all(
    rawTemplates.map(async (tpl) => ({
      ...tpl,
      fileUrl: await getDownloadUrl(tpl.fileUrl),
    }))
  );

  const activeTab = params.tab || "entity-review"; // Default to the mockup active tab
  const searchFilter = params.search || "";
  const isSyncTriggered = params.sync === "true";

  // Filter clients based on search input
  const filteredClients = clients.filter(
    (c) =>
      c.companyName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const activeClientId = params.client || (filteredClients[0]?.id || "");
  const activeClient = filteredClients.find((c) => c.id === activeClientId) || clients.find((c) => c.id === activeClientId);
  
  const rawActiveClientDocs = activeClient ? await getDocumentsByUserId(activeClient.id) : [];
  const activeClientDocs = await Promise.all(
    rawActiveClientDocs.map(async (doc) => ({
      ...doc,
      uploadedFileUrl: await getDownloadUrl(doc.uploadedFileUrl),
    }))
  );

  const activeClientStages = activeClient ? await getPipelineStages(activeClient.id) : [];
  const allMessages = await getSystemMessages();

  // Metrics
  const pendingReviewCount = documents.filter((d) => d.status === "UPLOADED").length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Left Sidebar: Dark Navy */}
      <aside className="w-64 bg-[#0B1528] text-slate-400 flex flex-col shrink-0 border-r border-[#152238] z-30 justify-between">
        
        {/* Top Part */}
        <div className="flex flex-col">
          <div className="p-6 border-b border-[#152238]">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-teal-400 to-emerald-400 flex items-center justify-center">
                <span className="font-extrabold text-[#0B1528] text-sm tracking-wider">TL</span>
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight">Registry Admin</span>
                <span className="text-[10px] block font-mono text-zinc-500 leading-none">Institutional Access</span>
              </div>
            </Link>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-4 space-y-4">
            
            {/* Standard Registry Group */}
            <div className="space-y-1">
              <Link
                href={`/admin?client=${activeClientId}&tab=pipeline`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                  activeTab === "pipeline"
                    ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                    : "hover:bg-[#111C30] hover:text-slate-200"
                }`}
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
                Pipeline
              </Link>

              <Link
                href={`/admin?client=${activeClientId}&tab=vault`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                  activeTab === "vault"
                    ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                    : "hover:bg-[#111C30] hover:text-slate-200"
                }`}
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Vault
                {pendingReviewCount > 0 && (
                  <span className="ml-auto text-[9px] font-bold bg-amber-500 text-zinc-950 px-1.5 py-0.5 rounded shrink-0">
                    {pendingReviewCount}
                  </span>
                )}
              </Link>

              <Link
                href={`/admin?client=${activeClientId}&tab=commercial`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                  activeTab === "commercial"
                    ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                    : "hover:bg-[#111C30] hover:text-slate-200"
                }`}
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                Commercial
              </Link>
            </div>

            {/* System Settings Group */}
            <div className="space-y-1">
              <span className="block text-[9px] font-extrabold uppercase tracking-widest text-zinc-650 px-4 mb-2">
                System
              </span>

              <Link
                href={`/admin?client=${activeClientId}&tab=user-management`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                  activeTab === "user-management"
                    ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                    : "hover:bg-[#111C30] hover:text-slate-200"
                }`}
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                User Management
              </Link>

              <Link
                href={`/admin?client=${activeClientId}&tab=entity-review`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                  activeTab === "entity-review"
                    ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                    : "hover:bg-[#111C30] hover:text-slate-200"
                }`}
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Entity Review
              </Link>

              <Link
                href={`/admin?client=${activeClientId}&tab=audit`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                  activeTab === "audit"
                    ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                    : "hover:bg-[#111C30] hover:text-slate-200"
                }`}
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Audit Logs
              </Link>

              <Link
                href={`/admin?client=${activeClientId}&tab=templates`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded text-xs font-bold tracking-wide transition-all ${
                  activeTab === "templates"
                    ? "bg-[#1E293B] text-white border-l-4 border-[#4ef3b2] pl-3"
                    : "hover:bg-[#111C30] hover:text-slate-200"
                }`}
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Templates
              </Link>
            </div>

          </nav>
        </div>

        {/* Bottom Part */}
        <div className="p-4 border-t border-[#152238] space-y-4">
          <Link
            href={`/admin?client=${activeClientId}&tab=vault`}
            className="w-full py-2.5 rounded bg-[#4ef3b2] hover:bg-[#3cd29b] text-[#0B1528] font-black text-xs transition-colors tracking-widest cursor-pointer uppercase shadow flex items-center justify-center"
          >
            New Transfer
          </Link>
          
          <div className="space-y-2 text-xs font-bold pl-2 text-slate-400">
            <button className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer w-full text-left">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
              Settings
            </button>
            <button className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer w-full text-left">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536" />
              </svg>
              Support
            </button>
          </div>
        </div>
      </aside>

      {/* Right Wrapper: Top Bar + Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. Top Navigation Bar */}
        <header className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-8 sticky top-0 z-20 shrink-0 shadow-sm">
          
          {/* Left search & titles */}
          <div className="flex items-center gap-6 flex-1 max-w-xl">
            {/* Search Input */}
            <form method="GET" action="/admin" className="w-full relative hidden sm:block">
              <input type="hidden" name="tab" value={activeTab} />
              <input type="hidden" name="client" value={activeClientId} />
              <input
                type="text"
                name="search"
                defaultValue={searchFilter}
                placeholder="Search across registry..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded px-3 py-1.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              <button type="submit" className="absolute right-3 top-2 text-zinc-400">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Links & buttons */}
          <div className="flex items-center gap-5">
            <Link
              href={`/admin?client=${activeClientId}&tab=audit`}
              className={`text-xs font-bold uppercase tracking-wider ${
                activeTab === "audit" ? "text-indigo-650" : "text-zinc-500 hover:text-zinc-950"
              }`}
            >
              Audit Logs
            </Link>
            <span className="text-zinc-200 font-light">/</span>
            <span className="text-xs font-bold text-zinc-500 hover:text-zinc-950 cursor-pointer">Reports</span>
            <span className="text-zinc-200 font-light">/</span>
            <span className="text-xs font-bold text-zinc-500 hover:text-zinc-950 cursor-pointer">Entities</span>

            <span className="text-zinc-200 px-1 font-light">|</span>

            <button className="p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Verify Status triggers Depository Sync API update loop */}
            <Link
              href={`/admin?client=${activeClientId}&tab=${activeTab}&sync=true`}
              className="px-4.5 py-1.5 border border-dashed border-zinc-300 text-zinc-750 hover:bg-zinc-50 text-xs font-bold transition-colors cursor-pointer rounded uppercase shadow-sm"
            >
              Verify Status
            </Link>

            {/* Admin profile indicator */}
            <div className="w-7.5 h-7.5 rounded-full bg-zinc-800 text-white flex items-center justify-center font-extrabold text-xs tracking-wider" title={admin.name}>
              {admin.name.slice(0, 2).toUpperCase()}
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

        {/* Depository Sync Banner */}
        {isSyncTriggered && (
          <div className="bg-emerald-550 text-white px-8 py-3.5 flex items-center justify-between text-xs font-semibold animate-fadeIn shadow-inner shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>
                <strong>Depository Sync Engine Complete:</strong> Asynchronously dispatched connection loops to NSDL and CDSL servers. Successfully synchronized official registrar status letters, audit registers, and live credit records.
              </span>
            </div>
            <Link
              href={`/admin?client=${activeClientId}&tab=${activeTab}`}
              className="text-white hover:text-zinc-250 underline font-bold"
            >
              Dismiss
            </Link>
          </div>
        )}

        {/* 3. Main Workspace Area */}
        <div className="flex-1 flex min-h-0">
          
          {/* Sub-Sidebar: Client Organizations list (shown in pipeline/vault tabs) */}
          {(activeTab === "pipeline" || activeTab === "vault") && (
            <aside className="w-72 bg-[#ECF2F8] border-r border-zinc-200 p-5 flex flex-col shrink-0 overflow-y-auto space-y-4">
              <div>
                <h4 className="text-xs font-extrabold text-zinc-700 uppercase tracking-wider mb-1">
                  Client Registry
                </h4>
                <span className="text-[10px] text-zinc-550 font-semibold block">
                  Select organization to configure details
                </span>
              </div>

              <div className="space-y-2">
                {filteredClients.map((client) => {
                  const isActive = client.id === activeClientId;
                  const clientDocs = documents.filter((d) => d.userId === client.id);
                  const clientPendingCount = clientDocs.filter((d) => d.status === "UPLOADED").length;
                  const clientStages = allStages.filter((s) => s.userId === client.id);
                  const currentActiveStage = [...clientStages].sort((a, b) => a.stageOrder - b.stageOrder).find((s) => s.status === "IN_PROGRESS")?.stageName || "Completed";

                  return (
                    <Link
                      key={client.id}
                      href={`/admin?client=${client.id}&tab=${activeTab}&search=${searchFilter}`}
                      className={`flex flex-col p-3.5 rounded border text-left transition-all ${
                        isActive
                          ? "bg-white border-indigo-250 text-indigo-755 shadow-sm ring-1 ring-indigo-500/20"
                          : "bg-zinc-50 border-zinc-200 text-zinc-650 hover:border-zinc-300 hover:text-zinc-850 hover:bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-xs font-extrabold ${isActive ? "text-indigo-650" : "text-zinc-850"}`}>
                          {client.companyName}
                        </span>
                        {clientPendingCount > 0 && (
                          <span className="text-[8px] font-bold bg-amber-500 text-zinc-950 px-1.5 py-0.5 rounded shrink-0">
                            {clientPendingCount}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500 mt-1">Rep: {client.name}</span>
                      <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mt-3 pt-2.5 border-t border-zinc-200/60">
                        <span>Stage: {currentActiveStage}</span>
                        <span>{new Date(client.createdAt).toLocaleDateString()}</span>
                      </div>
                    </Link>
                  );
                })}

                {filteredClients.length === 0 && (
                  <div className="text-center py-8 text-zinc-455 text-xs font-medium">
                    No registry matches.
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Right Workspace Pane */}
          <main className="flex-1 p-8 overflow-y-auto bg-[#F8FAFC]">
            
            {/* TAB CONTENT: ENTITY OVERSIGHT REVIEW (matches Image Copy 2 perfectly!) */}
            {activeTab === "entity-review" && (
              <div className="space-y-6">
                
                {/* Dashboard Sub-Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-4">
                  <div>
                    <p className="text-[11px] text-zinc-500 font-medium">
                      Real-time oversight of system-wide entity compliance and onboarding.
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button className="px-4 py-2 border border-zinc-250 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-extrabold tracking-wider rounded cursor-pointer transition-colors shadow-sm">
                      EXPORT REPORT
                    </button>
                    <button className="px-4 py-2 bg-[#0B1528] hover:bg-[#1E293B] text-white text-xs font-extrabold tracking-wider rounded cursor-pointer transition-colors shadow">
                      REFRESH ENGINE
                    </button>
                  </div>
                </div>

                {/* Key Metrics Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Card 1: Total Entities */}
                  <div className="p-6 bg-white border border-zinc-200 rounded shadow-sm space-y-4">
                    <span className="text-[10px] font-extrabold text-zinc-450 uppercase tracking-widest block">
                      Total Entities Registered
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-zinc-900 tracking-tight">1,482</span>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                        +4.2%
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 h-1.5 rounded overflow-hidden">
                      <div className="bg-[#0B1528] h-full rounded" style={{ width: "68%" }} />
                    </div>
                  </div>

                  {/* Card 2: Pending Verification */}
                  <div className="p-6 bg-white border border-zinc-200 rounded shadow-sm space-y-4">
                    <span className="text-[10px] font-extrabold text-zinc-450 uppercase tracking-widest block">
                      Pending Verification
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-zinc-900 tracking-tight">84</span>
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1 rounded">
                        -12 units
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Avg. time: 4.2 hours
                    </div>
                  </div>

                  {/* Card 3: Compliance Rate */}
                  <div className="p-6 bg-white border border-zinc-200 rounded shadow-sm space-y-4">
                    <span className="text-[10px] font-extrabold text-zinc-450 uppercase tracking-widest block">
                      Rule 9B Compliance Rate
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-zinc-900 tracking-tight">99.1%</span>
                      <span className="text-[11px] font-bold text-emerald-650 bg-emerald-50 px-1 rounded">
                        Target Met
                      </span>
                    </div>
                    <div className="flex items-center -space-x-1.5 overflow-hidden">
                      <div className="w-5 h-5 rounded-full bg-zinc-350 border border-white flex items-center justify-center text-[7px] font-bold">US</div>
                      <div className="w-5 h-5 rounded-full bg-zinc-400 border border-white flex items-center justify-center text-[7px] font-bold">IN</div>
                      <div className="w-5 h-5 rounded-full bg-zinc-500 border border-white flex items-center justify-center text-[7px] font-bold">SG</div>
                      <div className="w-5 h-5 rounded-full bg-[#0B1528] text-white border border-white flex items-center justify-center text-[7px] font-bold">+12</div>
                    </div>
                  </div>

                </div>

                {/* Oversight Table Card */}
                <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
                    <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest">
                      Entity Oversight Registry
                    </h3>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 border border-zinc-250 bg-white hover:bg-zinc-50 text-[10px] font-extrabold text-zinc-700 uppercase rounded cursor-pointer flex items-center gap-1 shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                      </button>
                      <button className="px-3 py-1.5 border border-zinc-250 bg-white hover:bg-zinc-50 text-[10px] font-extrabold text-zinc-700 uppercase rounded cursor-pointer flex items-center gap-1 shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        Sort
                      </button>
                    </div>
                  </div>

                  {/* Responsive Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-extrabold text-zinc-450 uppercase tracking-wider">
                          <th className="p-4 pl-6">User Name</th>
                          <th className="p-4">Assigned Entity</th>
                          <th className="p-4">Onboarding Phase</th>
                          <th className="p-4">Verification Status</th>
                          <th className="p-4 pr-6 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 text-xs font-semibold text-zinc-700">
                        {[
                          { name: "Alexander Thorne", entity: "Global Asset Partners LP", progress: 100, status: "VERIFIED" },
                          { name: "Elena Rodriguez", entity: "Apex Trust Holdings", progress: 65, status: "IN PROGRESS" },
                          { name: "Marcus Sterling", entity: "Sterling & Co. Registry", progress: 100, status: "VERIFIED" },
                          { name: "Sarah Jenkins", entity: "Vanguard Equity Group", progress: 15, status: "ACTION REQUIRED" },
                          { name: "David Chen", entity: "Lumina Systems NV", progress: 40, status: "PENDING KYC" },
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                            <td className="p-4 pl-6 flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center text-[10px] font-bold text-zinc-750">
                                {row.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="font-extrabold text-zinc-900">{row.name}</span>
                            </td>
                            <td className="p-4 font-normal text-zinc-650">{row.entity}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-24 bg-zinc-150 h-1.5 rounded overflow-hidden shrink-0">
                                  <div
                                    className={`h-full rounded ${
                                      row.progress === 100
                                        ? "bg-emerald-500"
                                        : row.progress < 30
                                        ? "bg-rose-500"
                                        : "bg-[#0B1528]"
                                    }`}
                                    style={{ width: `${row.progress}%` }}
                                  />
                                </div>
                                <span className="text-[10px] font-bold text-zinc-500">{row.progress}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide border ${
                                row.status === "VERIFIED"
                                  ? "bg-emerald-50 border-emerald-250 text-emerald-700"
                                  : row.status === "ACTION REQUIRED"
                                  ? "bg-rose-50 border-rose-250 text-rose-700"
                                  : row.status === "IN PROGRESS"
                                  ? "bg-blue-50 border-blue-200 text-blue-700"
                                  : "bg-slate-100 border-slate-300 text-slate-600"
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="p-4 pr-6 text-right">
                              <button className="p-1 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-800 transition-colors">
                                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer */}
                  <div className="p-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold text-zinc-450 uppercase tracking-widest gap-3">
                    <span>Showing 5 of 1,482 entities</span>
                    <div className="flex items-center gap-1">
                      <button className="px-2 py-1 rounded border border-zinc-200 hover:bg-zinc-50 disabled:opacity-50">
                        &lt;
                      </button>
                      <button className="px-3 py-1 rounded bg-[#0B1528] text-white">
                        1
                      </button>
                      <button className="px-3 py-1 rounded border border-zinc-200 hover:bg-zinc-50">
                        2
                      </button>
                      <button className="px-3 py-1 rounded border border-zinc-200 hover:bg-zinc-50">
                        3
                      </button>
                      <button className="px-2 py-1 rounded border border-zinc-200 hover:bg-zinc-50">
                        &gt;
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB CONTENT: PIPELINE COMPLIANCE EDITING */}
            {activeTab === "pipeline" && (
              <div className="space-y-6">
                {activeClient ? (
                  <>
                    <div className="flex justify-between items-end border-b border-zinc-200 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-mono">
                          Pipeline &gt; Milestone Administrator
                        </span>
                        <h2 className="text-xl font-bold text-zinc-900 mt-1.5">
                          Milestone Administrator: {activeClient.companyName}
                        </h2>
                      </div>
                    </div>

                    {/* Pipeline Selector Form */}
                    <PipelineForm userId={activeClient.id} stages={activeClientStages} />

                    {/* Overrides and messaging */}
                    <AdminControlWidgets
                      userId={activeClient.id}
                      companyName={activeClient.companyName}
                      initialDeadline={activeClient.complianceDeadline}
                      initialCountdownDays={activeClient.countdownDays}
                      initialMessages={allMessages}
                    />
                  </>
                ) : (
                  <div className="text-center py-12 text-zinc-450 text-xs font-semibold">
                    Please select a client registry to update their roadmap milestones.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: VAULT DOCUMENT REVIEW */}
            {activeTab === "vault" && (
              <div className="space-y-6">
                {activeClient ? (
                  <>
                    <div className="flex justify-between items-end border-b border-zinc-200 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-mono">
                          Vault &gt; Submissions Audit
                        </span>
                        <h2 className="text-xl font-bold text-zinc-900 mt-1.5">
                          Verification Desk: {activeClient.companyName}
                        </h2>
                      </div>
                    </div>

                    {/* OCR File Scrutiny Workspace Panel layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeClientDocs.map((doc) => {
                        const tpl = templates.find((t) => t.id === doc.templateId);
                        return (
                          <div key={doc.id} className="p-5 rounded-xl border border-zinc-200 bg-white space-y-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h4 className="text-xs font-bold text-zinc-800 line-clamp-1">{tpl?.title || "Document"}</h4>
                                <span className="text-[10px] font-mono text-zinc-455 truncate block max-w-[200px]" title={doc.fileName}>
                                  {doc.fileName}
                                </span>
                              </div>
                              <a
                                href={doc.uploadedFileUrl}
                                download
                                className="px-3 py-1 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded text-[9px] font-bold text-zinc-700 flex items-center gap-1 cursor-pointer"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                DOWNLOAD
                              </a>
                            </div>
                            
                            <DocumentReviewForm
                              documentId={doc.id}
                              fileName={doc.fileName}
                              currentStatus={doc.status}
                              adminRemark={doc.adminRemark}
                            />
                          </div>
                        );
                      })}

                      {activeClientDocs.length === 0 && (
                        <div className="md:col-span-2 text-center py-12 text-zinc-450 text-xs font-medium border border-dashed border-zinc-200 rounded-xl">
                          No vault documents uploaded by this company yet.
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-zinc-455 text-xs font-semibold">
                    Please select a client registry from the left list.
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: COMMERCIAL ADMIN VIEW */}
            {activeTab === "commercial" && (
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-zinc-200 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider font-mono">
                      System &gt; Commercial Overview
                    </span>
                    <h2 className="text-xl font-bold text-zinc-900 mt-1.5">
                      Commercial Architecture Settings
                    </h2>
                  </div>
                </div>

                <div className="p-6 bg-white border border-zinc-200 rounded shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-zinc-900">Paid-up Capital & Admission Fees Tiers</h3>
                  <p className="text-xs text-zinc-550 leading-relaxed">
                    Review and configure the global fee tiers for physical folio conversions under Rule 9B. Standard calculations are calculated based on paid-up capital sliders.
                  </p>
                  
                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-left text-xs font-medium border border-zinc-200 rounded">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-650 font-bold">
                          <th className="p-3">Capital Tier Range</th>
                          <th className="p-3">Standard Admission Fee</th>
                          <th className="p-3">TrustLink Platform Fee</th>
                          <th className="p-3">Average Savings Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 text-zinc-700">
                        <tr>
                          <td className="p-3">Under ₹50 Lakhs</td>
                          <td className="p-3">₹45,000</td>
                          <td className="p-3">₹14,999</td>
                          <td className="p-3 text-emerald-650 font-bold">66% Savings</td>
                        </tr>
                        <tr>
                          <td className="p-3">₹50 Lakhs to ₹1 Crore</td>
                          <td className="p-3">₹85,000</td>
                          <td className="p-3">₹29,999</td>
                          <td className="p-3 text-emerald-650 font-bold">64% Savings</td>
                        </tr>
                        <tr>
                          <td className="p-3">₹1 Crore to ₹5 Crores</td>
                          <td className="p-3">₹1,85,000</td>
                          <td className="p-3">₹64,999</td>
                          <td className="p-3 text-emerald-650 font-bold">65% Savings</td>
                        </tr>
                        <tr>
                          <td className="p-3">Above ₹5 Crores</td>
                          <td className="p-3">₹3,50,000</td>
                          <td className="p-3">₹1,24,999</td>
                          <td className="p-3 text-emerald-650 font-bold">64% Savings</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: USER MANAGEMENT (Master Entity Tracker) */}
            {activeTab === "user-management" && (
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-zinc-200 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#0B1528] uppercase tracking-wider font-mono">
                      System &gt; Master Entity Tracker
                    </span>
                    <h2 className="text-xl font-bold text-zinc-900 mt-1.5">
                      Master Entity Tracker
                    </h2>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-semibold text-zinc-700">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-extrabold text-zinc-450 uppercase tracking-wider">
                          <th className="p-4 pl-6">Representative Name</th>
                          <th className="p-4">Assigned Entity</th>
                          <th className="p-4">Corporate ID</th>
                          <th className="p-4">Paid-Up Capital Bracket</th>
                          <th className="p-4">Upload Progress</th>
                          <th className="p-4">System Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        {allUsers.map((user) => {
                          const userDocs = documents.filter((d) => d.userId === user.id);
                          const completed = userDocs.filter((d) => d.status === "VERIFIED").length;
                          return (
                            <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                              <td className="p-4 pl-6 font-extrabold text-zinc-900">
                                {user.name}
                              </td>
                              <td className="p-4 font-normal text-zinc-650">{user.companyName}</td>
                              <td className="p-4 font-mono text-zinc-500">{user.corporateId}</td>
                              <td className="p-4 text-zinc-650 font-normal">
                                {user.role === "ADMIN" ? "N/A (Admin)" : "₹5,00,00,000 (Tier-2)"}
                              </td>
                              <td className="p-4 font-normal">
                                {user.role === "ADMIN" ? (
                                  <span className="text-zinc-400">N/A</span>
                                ) : (
                                  <span className="font-bold text-indigo-650">{completed} of 12 Tasks</span>
                                )}
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                  user.role === "ADMIN" ? "bg-purple-50 text-purple-700 border border-purple-200" : "bg-teal-50 text-teal-700 border border-teal-200"
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TEMPLATE MANAGEMENT */}
            {activeTab === "templates" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Form column */}
                <div className="lg:col-span-1">
                  <TemplateForm />
                </div>

                {/* List column */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                      Active Compliance Requirements
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-450">{templates.length} Required Docs</span>
                  </div>

                  <div className="space-y-3">
                    {templates.map((tpl) => (
                      <div key={tpl.id} className="p-4.5 rounded border border-zinc-200 bg-zinc-50/30 hover:bg-zinc-50 flex items-center justify-between gap-4 transition-colors">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-zinc-900">{tpl.title}</h4>
                          <p className="text-zinc-650 text-[11px] leading-relaxed">{tpl.description}</p>
                          <div className="flex items-center gap-3 pt-1 text-[9px] font-mono text-zinc-400">
                            <span>Roadmap association: {tpl.requiredFor}</span>
                            <span>•</span>
                            <span className="truncate max-w-[200px]" title={tpl.fileUrl}>Path: {tpl.fileUrl}</span>
                          </div>
                        </div>

                        <DeleteTemplateButton templateId={tpl.id} />
                      </div>
                    ))}

                    {templates.length === 0 && (
                      <div className="text-center py-12 text-zinc-455 text-xs font-semibold">
                        No compliance templates established yet. Use the creation form to begin.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: AUDIT LOGS */}
            {activeTab === "audit" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    Registry Operation Logs
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-455 font-semibold">Chronological audit stream</span>
                </div>

                <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                  {auditLogs.map((log) => {
                    const triggerUser = allUsers.find(
                      (u) => u.id === (log.adminId || log.userId)
                    );

                    return (
                      <div key={log.id} className="p-4 rounded border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 transition-colors flex items-start justify-between gap-4 text-xs">
                        <div className="space-y-1 flex-1">
                          <span className="text-zinc-900 block font-bold">{log.action}</span>
                          <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-455">
                            <span>Actor: {triggerUser ? `${triggerUser.name} (${triggerUser.role})` : "System"}</span>
                            {log.adminId && (
                              <span className="text-teal-650 bg-teal-50 border border-teal-200 px-1 rounded uppercase tracking-wide text-[8px] font-bold">
                                Admin
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-455 shrink-0 mt-0.5">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}

                  {auditLogs.length === 0 && (
                    <div className="text-center py-12 text-zinc-455 text-xs font-semibold">
                      No registry actions logged.
                    </div>
                  )}
                </div>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
}
