import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const siteUrl = "https://solofinkit.com";
const logoUrl = `${siteUrl}/solofinkit-logo.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SoloFinKit - Financial & Cross-Border Calculators",
    template: "%s | SoloFinKit",
  },
  description: "Practical financial and cross-border calculators for freelancers, independent professionals, and global sellers.",
  applicationName: "SoloFinKit",
  openGraph: {
    title: "SoloFinKit - Financial & Cross-Border Calculators",
    description: "Practical financial and cross-border calculators for freelancers and global sellers.",
    url: siteUrl,
    siteName: "SoloFinKit",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SoloFinKit — Practical Financial & Cross-Border Calculators" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoloFinKit - Financial & Cross-Border Calculators",
    description: "Practical financial and cross-border calculators for freelancers and global sellers.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "SoloFinKit",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "SoloFinKit",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <Navbar />
        <main className="min-h-screen flex-1">{children}</main>
        <Footer />

        {/* Google Analytics 4 — existing environment-variable setup preserved */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
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
