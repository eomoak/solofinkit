import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { type FAQItem } from "../../components/JsonLd";
import RelatedCalculators from "../../components/RelatedCalculators";

const description = "Compare PayPal and Stripe fee structures for international payments, including processing fees, cross-border costs, currency conversion, disputes, and business use cases.";
const faqs: FAQItem[] = [
  { question: "Is PayPal or Stripe cheaper for international payments?", answer: "Neither is universally cheaper. The result depends on the merchant country, customer country, card or payment method, transaction size, currency conversion, negotiated pricing, and withdrawal route. Compare the total cost using your own account rates." },
  { question: "Do PayPal and Stripe charge the same international fees?", answer: "No. Each provider has its own pricing structure, country coverage, payment-method rules, cross-border additions, fixed fees, and currency conversion terms. Check the current official pricing for the merchant account country." },
  { question: "Which processor is better for a freelancer?", answer: "PayPal may suit freelancers whose clients prefer PayPal invoices or wallet payments. Stripe may suit businesses that need card checkout, payment links, subscriptions, or deeper integration. Availability and features vary by country." },
  { question: "Are refunds and disputes free?", answer: "Refund and dispute treatment differs by provider, country, payment method, and current policy. Processing fees may not always be returned on refunds, and dispute or chargeback fees may apply. Review the provider terms for your account." },
  { question: "How can I compare fees for my own transaction amount?", answer: "Use the PayPal and Stripe calculators linked on this page. Enter your actual account rates, fixed fees, international additions, and any currency conversion assumptions to compare estimated net proceeds." },
];

export const metadata: Metadata = {
  title: "PayPal vs Stripe Fees for International Payments | SoloFinKit",
  description,
  alternates: { canonical: "https://solofinkit.com/paypal-vs-stripe-fees" },
  openGraph: { title: "PayPal vs Stripe Fees for International Payments | SoloFinKit", description, url: "https://solofinkit.com/paypal-vs-stripe-fees", siteName: "SoloFinKit", type: "article" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <JsonLd name="PayPal vs Stripe Fees: Which Costs Less for International Payments?" description={description} path="/paypal-vs-stripe-fees" faqs={faqs} includeApplication={false} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-5 text-sm text-slate-500"><Link href="/">Home</Link> / PayPal vs Stripe Fees</nav>
        <header className="mb-8"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-700">Payment processor comparison</p><h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">PayPal vs Stripe Fees: Which Costs Less for International Payments?</h1><p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">The right processor depends on more than its headline percentage. Compare processing structure, cross-border additions, currency conversion, customer checkout, and dispute handling against your own transaction mix.</p></header>
        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6"><h2 className="text-xl font-bold text-slate-900">Quick decision summary</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700"><li>Choose based on the actual account pricing and payment route, not a generic advertised rate.</li><li>PayPal can be useful when customers expect wallet payments or PayPal invoices.</li><li>Stripe can be a strong fit for card checkout, payment links, subscriptions, and product integrations where available.</li><li>For international transactions, include currency conversion and payout costs in the comparison.</li></ul></section>
        <section className="mt-10 space-y-5"><h2 className="text-2xl font-bold text-slate-900">PayPal vs Stripe: comparison dimensions</h2><div className="overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-slate-100"><tr><th className="px-4 py-3">Dimension</th><th className="px-4 py-3">PayPal</th><th className="px-4 py-3">Stripe</th></tr></thead><tbody className="divide-y divide-slate-200">
          <tr><td className="px-4 py-3 font-semibold">Fee structure</td><td className="px-4 py-3">Commercial rate, fixed fee, and possible cross-border charges</td><td className="px-4 py-3">Processing rate, fixed fee, and possible international-card additions</td></tr>
          <tr><td className="px-4 py-3 font-semibold">Currency conversion</td><td className="px-4 py-3">Conversion margin may apply when balances are converted</td><td className="px-4 py-3">Conversion fees may apply depending on settlement and presentment currencies</td></tr>
          <tr><td className="px-4 py-3 font-semibold">Customer experience</td><td className="px-4 py-3">Wallet, invoice, and checkout options vary by market</td><td className="px-4 py-3">Card checkout, payment links, and integrated payment flows</td></tr>
          <tr><td className="px-4 py-3 font-semibold">Disputes / refunds</td><td className="px-4 py-3">Follow PayPal seller protection and dispute rules</td><td className="px-4 py-3">Follow Stripe dispute, refund, and chargeback rules</td></tr>
          <tr><td className="px-4 py-3 font-semibold">Potential fit</td><td className="px-4 py-3">Freelancers and sellers whose customers prefer PayPal</td><td className="px-4 py-3">Businesses needing card payments, subscriptions, or developer integrations</td></tr>
        </tbody></table></div><p className="text-xs leading-6 text-slate-500">This is a feature-level comparison, not a universal price ranking. Exact rates, available payment methods, refund treatment, and dispute fees vary by country and account.</p></section>
        <section className="mt-10 space-y-4"><h2 className="text-2xl font-bold text-slate-900">How transaction size changes the decision</h2><h3 className="text-lg font-semibold text-slate-900">Small, frequent payments</h3><p className="leading-7 text-slate-600">Fixed fees can represent a larger percentage of a small transaction. Compare both the percentage charge and fixed amount, and consider whether your customers are more likely to complete checkout with a wallet or card.</p><h3 className="text-lg font-semibold text-slate-900">Higher-value international invoices</h3><p className="leading-7 text-slate-600">On larger invoices, percentage fees and currency conversion margins can dominate. A small difference in the effective percentage can outweigh a modest fixed-fee difference. Also consider settlement currency and how funds reach your bank.</p></section>
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"><h2 className="text-2xl font-bold text-slate-900">Calculate your own estimated fees</h2><p className="mt-2 leading-7 text-slate-600">Use the calculators with the pricing shown in your own provider dashboard or contract.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/paypal-international-fee-calculator" className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">Calculate PayPal fees</Link><Link href="/stripe-international-fee-calculator" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Calculate Stripe fees</Link></div></section>
        <section className="mt-12 space-y-5"><h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>{faqs.map((faq) => <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">{faq.question}</summary><p className="mt-3 leading-7 text-slate-600">{faq.answer}</p></details>)}</section>
        <RelatedCalculators currentSlug="/paypal-vs-stripe-fees" />
        <p className="mt-10 text-xs leading-relaxed text-slate-500">Always confirm current provider pricing, supported countries, refund rules, and dispute policies before choosing a payment processor.</p>
      </div>
    </main>
  );
}
