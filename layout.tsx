
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://solofinkit.com"),
  title: {
    default: "SoloFinKit - Finance Tools for Freelancers",
    template: "%s | SoloFinKit",
  },
  description:
    "Free online financial calculators and practical tools for freelancers, international contractors, and cross-border businesses.",
  applicationName: "SoloFinKit",
  openGraph: {
    title: "SoloFinKit - Finance Tools for Freelancers",
    description:
      "Free online financial calculators and practical tools for freelancers and cross-border businesses.",
    url: "https://solofinkit.com",
    siteName: "SoloFinKit",
    type: "website",
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
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Navbar />

        <main className="min-h-screen flex-1">
          {children}
        </main>

        <Footer />

        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />

            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
