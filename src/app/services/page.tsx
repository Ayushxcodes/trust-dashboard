import OurServicesPage from "@/components/Services/OurServicesPage";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <OurServicesPage />
      </main>
      <Footer />
    </div>
  );
}
