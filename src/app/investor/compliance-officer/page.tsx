import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

export default function ComplianceOfficerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
            Key Officer
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Compliance Officer Details</h1>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Mr. Nishant Khemani</h2>
            <p className="text-sm text-gray-600 font-medium">Director / Compliance Officer / Principal Officer</p>
            <div className="pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-700">
              <p><span className="font-semibold">SEBI Registration No:</span> INR000004510</p>
              <p><span className="font-semibold">Email:</span> <a href="mailto:info@trustlinkinvestor.com" className="text-blue-600 hover:underline">info@trustlinkinvestor.com</a></p>
              <p><span className="font-semibold">Phone:</span> +91 9910118347</p>
              <p><span className="font-semibold">Office Address:</span> Pratap Bhawan, 312–314, Bahadur Shah Zafar Marg, Vikram Nagar, New Delhi – 110002</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
