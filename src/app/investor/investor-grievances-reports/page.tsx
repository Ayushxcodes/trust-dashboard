import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

export default function InvestorGrievancesReportsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
            SEBI Regulatory Reports
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Investor Grievances Reports</h1>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-4">
            <p className="text-gray-700 text-base leading-relaxed">
              In accordance with SEBI circulars, Trustlink Investor Services Private Limited publishes monthly and quarterly investor grievance reports and resolution metrics.
            </p>
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold uppercase text-xs">
                    <th className="p-3">Period</th>
                    <th className="p-3">Received</th>
                    <th className="p-3">Resolved</th>
                    <th className="p-3">Pending</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  <tr>
                    <td className="p-3 font-medium text-gray-900">Current Month</td>
                    <td className="p-3 font-bold text-slate-800">0</td>
                    <td className="p-3 font-bold text-emerald-600">0</td>
                    <td className="p-3 font-bold text-slate-500">0</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-gray-900">Previous Quarter</td>
                    <td className="p-3 font-bold text-slate-800">0</td>
                    <td className="p-3 font-bold text-emerald-600">0</td>
                    <td className="p-3 font-bold text-slate-500">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
