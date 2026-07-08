import Link from "next/link";
import { getCurrentUser } from "./actions";

export default async function LandingPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden relative">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Navigation Header: Dark Navy Header matches Login/Sidebar Brand */}
      <header className="border-b border-[#152238] bg-[#0B1528] px-6 lg:px-16 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-tr from-teal-400 to-emerald-400 flex items-center justify-center shadow-md">
            <span className="font-extrabold text-[#0B1528] text-base tracking-wider">TL</span>
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white block">TrustLink</span>
            <span className="text-[9px] block font-mono text-zinc-400 leading-none uppercase tracking-widest">
              Institutional Registry Portal
            </span>
          </div>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Key Features</a>
          <a href="#pipeline" className="hover:text-white transition-colors">Pipeline System</a>
          <a href="#security" className="hover:text-white transition-colors">Compliance Tiers</a>
        </nav>

        {/* Auth CTA Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <Link
              href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="px-4.5 py-2 rounded bg-[#4ef3b2] hover:bg-[#3cd29b] text-[#0B1528] font-black text-xs transition-colors tracking-widest cursor-pointer uppercase shadow"
            >
              Enter Console
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors px-3 py-2"
              >
                Secure Sign In
              </Link>
              <Link
                href="/register"
                className="px-4.5 py-2 rounded bg-[#4ef3b2] hover:bg-[#3cd29b] text-[#0B1528] font-black text-xs transition-colors tracking-widest cursor-pointer uppercase shadow"
              >
                Register Entity
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 lg:px-16 pt-24 pb-16 max-w-5xl mx-auto flex-1 relative">
        
        {/* Compliance Version Chip */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-250 text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Rule 9B Compliance Registry Active
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-[#0B1528] mb-6">
          Institutional Share Conversion <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-650 to-indigo-755 bg-clip-text text-transparent">
            Simplified & Audited
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-zinc-650 max-w-2xl leading-relaxed mb-10 font-medium">
          TrustLink automates the conversion of physical share folios to demat records under Rule 9B. Built for unlisted public companies and compliance professionals to execute verified workflows instantly.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
          {user ? (
            <Link
              href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#0B1528] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-widest transition-colors text-center shadow-lg"
            >
              Go to Workspace
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#0B1528] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-widest transition-colors text-center shadow-lg"
              >
                Onboard Company
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded bg-white border border-zinc-250 text-zinc-750 hover:bg-zinc-50 font-bold text-xs uppercase tracking-widest transition-colors text-center shadow-sm"
              >
                Registry Login
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Interactive Mock Pipeline Display */}
      <section id="pipeline" className="border-t border-zinc-200 bg-[#ECF2F8]/60 py-20 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-extrabold text-indigo-650 uppercase tracking-widest block mb-2 font-mono">
              ROADMAP PROGRESS TRACKER
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[#0B1528] mb-4">
              Real-time Compliance Pipeline
            </h2>
            <p className="text-zinc-650 text-xs font-semibold max-w-md mx-auto leading-relaxed">
              Track the exact progress of physical folio conversions through 8 sequential validation stages updated dynamically by administrators.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative">
              {[
                { name: "Account Created", status: "COMPLETED", active: false },
                { name: "KYC Submitted", status: "COMPLETED", active: false },
                { name: "Docs Uploaded", status: "IN_PROGRESS", active: true },
                { name: "Admin Review", status: "PENDING", active: false },
                { name: "Compliance Ver.", status: "PENDING", active: false },
                { name: "Legal Processing", status: "PENDING", active: false },
                { name: "Final Approval", status: "PENDING", active: false },
                { name: "Completed", status: "PENDING", active: false },
              ].map((stage, idx) => (
                <div key={idx} className="flex flex-col items-center text-center relative group">
                  <div
                    className={`w-11 h-11 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      stage.status === "COMPLETED"
                        ? "bg-emerald-50 border-emerald-250 text-emerald-700 shadow-sm"
                        : stage.status === "IN_PROGRESS"
                        ? "bg-[#0B1528] border-[#0B1528] text-white animate-pulse shadow"
                        : "bg-zinc-50 border-zinc-200 text-zinc-400"
                    }`}
                  >
                    {stage.status === "COMPLETED" ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span className={`mt-3 text-[11px] font-bold ${stage.active ? "text-indigo-650" : "text-zinc-650"}`}>
                    {stage.name}
                  </span>
                  <span className={`text-[8px] mt-1 font-mono uppercase font-bold tracking-wider ${
                    stage.status === "COMPLETED" ? "text-emerald-600" : stage.status === "IN_PROGRESS" ? "text-indigo-600 animate-pulse" : "text-zinc-450"
                  }`}>
                    {stage.status === "IN_PROGRESS" ? "Active" : stage.status.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section id="features" className="border-t border-zinc-200 bg-white py-24 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="p-8 rounded border border-zinc-200 bg-zinc-50/20 hover:border-[#0B1528]/20 hover:bg-white shadow-sm transition-all group hover:shadow-md">
              <div className="w-11 h-11 rounded bg-zinc-100 flex items-center justify-center text-[#0B1528] border border-zinc-200 mb-6 group-hover:scale-105 transition-transform">
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-3">Document Vault</h3>
              <p className="text-zinc-600 text-xs font-semibold leading-relaxed">
                Download required templates directly from administrators, upload completed agreements, and track their verification statuses asynchronously.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded border border-zinc-200 bg-zinc-50/20 hover:border-[#0B1528]/20 hover:bg-white shadow-sm transition-all group hover:shadow-md">
              <div className="w-11 h-11 rounded bg-zinc-100 flex items-center justify-center text-[#0B1528] border border-zinc-200 mb-6 group-hover:scale-105 transition-transform">
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
              </div>
              <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-3">8-Stage Roadmap</h3>
              <p className="text-zinc-650 text-xs font-semibold leading-relaxed">
                Follow your compliance progress in an 8-stage interactive pipeline. Identify bottlenecks immediately when administrative review or corrections are required.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded border border-zinc-200 bg-zinc-50/20 hover:border-[#0B1528]/20 hover:bg-white shadow-sm transition-all group hover:shadow-md">
              <div className="w-11 h-11 rounded bg-zinc-100 flex items-center justify-center text-[#0B1528] border border-zinc-200 mb-6 group-hover:scale-105 transition-transform">
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-3">Administrative Remarks</h3>
              <p className="text-zinc-650 text-xs font-semibold leading-relaxed">
                Clear rejection workflows. When templates fail to verify, admins provide explicit notes and reasons, giving client teams direct steps for instant resolution.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer: Matches Dashboard aesthetic */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12 px-6 lg:px-16 text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#0B1528] flex items-center justify-center shadow-sm">
              <span className="font-bold text-white text-[10px]">TL</span>
            </div>
            <span className="font-black text-zinc-800 tracking-wider">TrustLink Compliance</span>
          </div>
          <div className="font-semibold text-zinc-450">
            &copy; {new Date().getFullYear()} TrustLink Portal. Secure Document Vaulting & Pipeline Compliance.
          </div>
        </div>
      </footer>
    </div>
  );
}
