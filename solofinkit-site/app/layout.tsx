
import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://solofinkit.com"),

  title: {
    default: "SoloFinKit | Financial Tools for Freelancers",
    template: "%s | SoloFinKit",
  },

  description:
    "Practical financial calculators for freelancers and cross-border professionals. Calculate payment fees, currency conversion costs, invoices, and financial estimates.",

  applicationName: "SoloFinKit",

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SoloFinKit",
    title: "SoloFinKit | Financial Tools for Freelancers",
    description:
      "Simple and practical financial calculators for freelancers and cross-border professionals.",
    url: "https://solofinkit.com",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased">
        <Navbar />

        <main className="min-h-screen flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
