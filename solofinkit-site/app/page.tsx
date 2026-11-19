import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-widest text-amber-400 mb-3">
        SoloFinKit.com
      </p>
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
        Cross-Border Finance & Freelance Tools
      </h1>
      <p className="text-slate-300 max-w-xl mb-8">
        Practical calculators for fees, taxes, invoicing, and multi-currency payouts.
      </p>
      <Link
        href="/paypal-international-fee-calculator"
        className="px-6 py-3 rounded-xl bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition"
      >
        Open PayPal Fee Calculator →
      </Link>
    </main>
  );
}