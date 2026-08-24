import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

export default function GrievanceRedressalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
            Grievance Redressal Mechanism
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            At <span className="font-medium text-gray-800">Trustlink Investor Services Private Limited</span>, 
            we are committed to providing prompt and effective resolution of investor grievances.
            If you are not satisfied with the response received to your queries or services, 
            you may escalate your concern using the channels mentioned below.
          </p>

          {/* First Level Escalation */}
          <div className="bg-white shadow-md rounded-2xl p-8 mb-8 border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
              Level 1: Grievance Escalation
            </h2>

            <ul className="space-y-4 text-gray-700">
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="font-semibold w-40 text-gray-800">Grievance Email:</span>
                <a
                  href="mailto:info@trustlinkinvestor.com"
                  className="text-blue-600 font-medium hover:underline"
                >
                  info@trustlinkinvestor.com
                </a>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="font-semibold w-40 text-gray-800">Compliance Email:</span>
                <a
                  href="mailto:info@trustlinkinvestor.com"
                  className="text-blue-600 font-medium hover:underline"
                >
                  info@trustlinkinvestor.com
                </a>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="font-semibold w-40 text-gray-800">Contact Number:</span>
                <a
                  href="tel:+919910118347"
                  className="text-blue-600 font-medium hover:underline"
                >
                  +91 99101 18347
                </a>
              </li>
            </ul>
          </div>

          {/* Second Level Escalation */}
          <div className="bg-slate-50 shadow-md rounded-2xl p-8 border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">2</span>
              Level 2: Compliance Officer / Principal Officer
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              If you are still not satisfied with the resolution provided by our team, 
              you may directly contact our designated Compliance Officer / Principal Officer:
            </p>

            <div className="space-y-2 text-gray-700 bg-white p-5 rounded-xl border border-gray-200">
              <p className="font-bold text-gray-900 text-lg">
                Mr. Nishant Khemani
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Director / Compliance Officer / Principal Officer
              </p>
              <p className="text-sm pt-2">
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:info@trustlinkinvestor.com"
                  className="text-blue-600 font-medium hover:underline"
                >
                  info@trustlinkinvestor.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
