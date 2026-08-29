import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Trustlink Investor Services — SEBI Registered Category I RTA, New Delhi",
    template: "%s | Trustlink Investor Services",
  },
  description:
    "Trustlink Investor Services Private Limited is a SEBI registered Category I Registrar & Share Transfer Agent (SEBI Reg. No: INR000004510) in New Delhi providing dematerialization, physical share transfer, IEPF claims, and corporate action services.",
  keywords: [
    "Trustlink Investor Services",
    "SEBI Category I RTA",
    "Registrar and Share Transfer Agent",
    "RTA New Delhi",
    "INR000004510",
    "Dematerialization",
    "Share Transfer Agent",
    "IEPF Claims",
    "ISR forms RTA",
  ],
  authors: [{ name: "Trustlink Investor Services Private Limited" }],
  openGraph: {
    title: "Trustlink Investor Services — SEBI Registered Category I RTA",
    description:
      "SEBI registered Category I Registrar & Share Transfer Agent (INR000004510). Investor servicing, demat, statutory reporting, and client portal.",
    siteName: "Trustlink Investor Services",
    locale: "en_IN",
    type: "website",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://trustlinkinvestor.com/#organization",
      name: "Trustlink Investor Services Private Limited",
      url: "https://trustlinkinvestor.com",
      logo: "https://trustlinkinvestor.com/logo.png",
      description: "SEBI Registered Category I Registrar and Share Transfer Agent (Registration No: INR000004510)",
      email: "info@trustlinkinvestor.com",
      telephone: "+91-9910118347",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pratap Bhawan, 312–314, Bahadur Shah Zafar Marg, Vikram Nagar",
        addressLocality: "New Delhi",
        addressRegion: "Delhi",
        postalCode: "110002",
        addressCountry: "IN",
      },
    },
    {
      "@type": "FinancialService",
      "@id": "https://trustlinkinvestor.com/#localbusiness",
      name: "Trustlink Investor Services",
      image: "https://trustlinkinvestor.com/logo.png",
      telephone: "+91-9910118347",
      email: "info@trustlinkinvestor.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pratap Bhawan, 312–314, Bahadur Shah Zafar Marg, Vikram Nagar",
        addressLocality: "New Delhi",
        addressRegion: "Delhi",
        postalCode: "110002",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:30",
          closes: "18:00",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body suppressHydrationWarning className={`${jakarta.className} min-h-full flex flex-col`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
