import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoloFinKit — Cross-Border Finance & Freelance Tools",
  description:
    "Free calculators and financial tools for cross-border freelancers, contractors, and solopreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}