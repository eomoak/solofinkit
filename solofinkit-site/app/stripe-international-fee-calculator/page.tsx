import type { Metadata } from "next";
import JsonLd, { type FAQItem } from "../../components/JsonLd";
import RelatedCalculators from "../../components/RelatedCalculators";
import StripeCalculator from "../../components/calculators/StripeCalculator";

const description = "Estimate Stripe international card processing fees, currency conversion costs, net payouts, and the charge required to reach a target payout.";
const faqs: FAQItem[] = [
  {
    "question": "What Stripe fees apply to international card payments?",
    "answer": "International card payments may include the standard processing rate plus an additional international-card fee. Exact rates depend on your Stripe account country, card origin, payment method, and pricing plan."
  },
  {
    "question": "How do I calculate my Stripe net payout?",
    "answer": "Subtract the percentage processing fee, international-card add-on, fixed processing fee, optional currency conversion cost, and any payout fee from the customer charge."
  },
  {
    "question": "How much should I charge to receive a specific amount after Stripe fees?",
    "answer": "Use Target net payout mode, enter your desired amount, and adjust the fee assumptions to match your Stripe account. The calculator solves for the gross charge needed."
  },
  {
    "question": "Does Stripe charge an extra fee for currency conversion?",
    "answer": "Currency conversion costs can apply when the presentment currency differs from the settlement currency. The rate and availability depend on your account and transaction setup."
  },
  {
    "question": "Are these Stripe fee estimates guaranteed?",
    "answer": "No. The preset values are illustrative assumptions, not a quote or guarantee. Check your Stripe Dashboard and official pricing page for fees that apply to your account."
  }
];

export const metadata: Metadata = {
  title: "Stripe International Fee & Payout Calculator | SoloFinKit",
  description,
  alternates: { canonical: "https://solofinkit.com/stripe-international-fee-calculator" },
  openGraph: { title: "Stripe International Fee & Payout Calculator | SoloFinKit", description, url: "https://solofinkit.com/stripe-international-fee-calculator", siteName: "SoloFinKit", type: "website" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <JsonLd name="Stripe International Fee & Payout Calculator" description={description} path="/stripe-international-fee-calculator" faqs={faqs} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-5 text-sm text-slate-500"><a href="/" className="hover:text-blue-700">Home</a> / Stripe International Fee & Payout Calculator</nav>
        <header className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-700">Free online finance calculator</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Stripe International Fee & Payout Calculator</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">Estimate how much you may receive after Stripe processing fees, international card add-ons, optional currency conversion costs, and payout fees. Switch to reverse mode to estimate the charge needed for a target net payout.</p>
        </header>
        <StripeCalculator />
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">How the calculation works</h2>
          <p className="leading-relaxed text-slate-600">Forward mode models processing as gross charge × (base rate + international add-on) plus the fixed fee. Optional FX cost is applied to the amount remaining after processing, then any additional payout fee is subtracted. Reverse mode solves for the gross charge using the same assumptions.</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700"><tr><th className="px-4 py-3">Scenario</th><th className="px-4 py-3 text-right">Gross</th><th className="px-4 py-3 text-right">Estimated net</th></tr></thead>
              <tbody><tr className="border-t border-slate-200"><td className="px-4 py-3">$500 card payment</td><td className="px-4 py-3 text-right">$500.00</td><td className="px-4 py-3 text-right">$477.70</td></tr>
<tr className="border-t border-slate-200"><td className="px-4 py-3">$1,000 card payment</td><td className="px-4 py-3 text-right">$1,000.00</td><td className="px-4 py-3 text-right">$955.80</td></tr>
<tr className="border-t border-slate-200"><td className="px-4 py-3">$2,500 card payment</td><td className="px-4 py-3 text-right">$2,500.00</td><td className="px-4 py-3 text-right">$2,385.30</td></tr></tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">Illustrative examples only. Actual payment fees and tax outcomes vary by provider, country, account, and individual circumstances.</p>
        </section>
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">What Stripe fees apply to international card payments?</summary><p className="mt-3 leading-relaxed text-slate-600">International card payments may include the standard processing rate plus an additional international-card fee. Exact rates depend on your Stripe account country, card origin, payment method, and pricing plan.</p></details>
<details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">How do I calculate my Stripe net payout?</summary><p className="mt-3 leading-relaxed text-slate-600">Subtract the percentage processing fee, international-card add-on, fixed processing fee, optional currency conversion cost, and any payout fee from the customer charge.</p></details>
<details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">How much should I charge to receive a specific amount after Stripe fees?</summary><p className="mt-3 leading-relaxed text-slate-600">Use Target net payout mode, enter your desired amount, and adjust the fee assumptions to match your Stripe account. The calculator solves for the gross charge needed.</p></details>
<details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">Does Stripe charge an extra fee for currency conversion?</summary><p className="mt-3 leading-relaxed text-slate-600">Currency conversion costs can apply when the presentment currency differs from the settlement currency. The rate and availability depend on your account and transaction setup.</p></details>
<details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">Are these Stripe fee estimates guaranteed?</summary><p className="mt-3 leading-relaxed text-slate-600">No. The preset values are illustrative assumptions, not a quote or guarantee. Check your Stripe Dashboard and official pricing page for fees that apply to your account.</p></details>
        </section>
        <RelatedCalculators currentSlug="/stripe-international-fee-calculator" />
        <p className="mt-10 text-xs leading-relaxed text-slate-500">SoloFinKit provides educational estimates only. Confirm provider pricing and consult qualified tax professionals for advice specific to your situation.</p>
      </div>
    </main>
  );
}
