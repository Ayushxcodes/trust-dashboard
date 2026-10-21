import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import EscalationMatrixTable from "@/components/Investor/EscalationMatrixTable";

export default function ComplianceOfficerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-5xl space-y-8">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              Key Statutory Officers
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Compliance Officer &amp; Key Officers</h1>
            <p className="text-xs text-slate-500">Official statutory disclosure in accordance with SEBI Master Circular for Category-I RTAs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Compliance Officer
              </span>
              <h2 className="text-xl font-bold text-slate-900">Pooja Bansal</h2>
              <p className="text-xs text-slate-500 font-medium">Compliance Officer • Statutory Regulatory Lead</p>
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                <p><span className="font-semibold text-slate-500">SEBI Registration No:</span> <span className="font-mono font-bold text-indigo-700">INR000004510</span></p>
                <p><span className="font-semibold text-slate-500">Direct Email:</span> <a href="mailto:poojabansal.ssdco@gmail.com" className="text-indigo-600 hover:underline font-bold font-mono">poojabansal.ssdco@gmail.com</a></p>
                <p><span className="font-semibold text-slate-500">Contact No:</span> <a href="tel:+919560982564" className="font-mono font-bold text-slate-900">+91 95609 82564</a></p>
                <p><span className="font-semibold text-slate-500">Office Address:</span> 312, Pratap Bhawan, Bahadur Shah Zafar Marg, New Delhi-110002</p>
                <p><span className="font-semibold text-slate-500">Working Hours:</span> 10:00 am-6:00 pm (Mon to Fri)</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Chief Executive Officer
              </span>
              <h2 className="text-xl font-bold text-slate-900">Nishant Khemani</h2>
              <p className="text-xs text-slate-500 font-medium">Director &amp; Chief Executive Officer (CEO)</p>
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                <p><span className="font-semibold text-slate-500">Corporate Identity (CIN):</span> <span className="font-mono text-slate-700">U74999DL2018PTC335492</span></p>
                <p><span className="font-semibold text-slate-500">Direct Email:</span> <a href="mailto:khemaninishant@gmail.com" className="text-indigo-600 hover:underline font-bold font-mono">khemaninishant@gmail.com</a></p>
                <p><span className="font-semibold text-slate-500">Contact No:</span> <a href="tel:+919910118347" className="font-mono font-bold text-slate-900">+91 99101 18347</a></p>
                <p><span className="font-semibold text-slate-500">Office Address:</span> 312, Pratap Bhawan, Bahadur Shah Zafar Marg, New Delhi-110002</p>
                <p><span className="font-semibold text-slate-500">Working Hours:</span> 10:00 am-6:00 pm (Mon to Fri)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <EscalationMatrixTable />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
