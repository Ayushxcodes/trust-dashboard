import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import HeroSection from "@/components/Landing/HeroSection";
import AboutSection from "@/components/Landing/AboutSection";
import OurServices from "@/components/Landing/OurServices";
import { getCurrentUser } from "./actions";
import Link from "next/link";

export default async function Homepage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-indigo-500 selection:text-white">
      
      {/* Top Session Banner if logged in */}
      {user && (
        <div className="bg-[#0B1528] text-white py-2 px-6 text-center text-xs font-semibold flex items-center justify-center gap-3">
          <span>Signed in as <strong className="text-emerald-400">{user.name}</strong> ({user.role})</span>
          <Link
            href={user.role === "ADMIN" ? "/admin" : "/dashboard"}
            className="px-3 py-1 rounded bg-[#4ef3b2] hover:bg-[#3cd29b] text-[#0B1528] font-black text-[10px] uppercase tracking-wider transition-colors"
          >
            Go to Console &rarr;
          </Link>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <OurServices />
      </main>

      {/* Main Footer */}
      <Footer />
    </div>
  );
}
