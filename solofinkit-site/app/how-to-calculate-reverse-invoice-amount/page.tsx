import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { type FAQItem } from "../../components/JsonLd";
import RelatedCalculators from "../../components/RelatedCalculators";

const description = "Learn the reverse invoice gross-up formula to calculate how much to charge after percentage processing fees, fixed fees, and optional currency conversion costs.";
const faqs: FAQItem[] = [
  { question: "How do I calculate an invoice amount to receive a specific net payout?", answer: "For a percentage fee p and fixed fee f, with no FX conversion, divide the target net amount plus the fixed fee by one minus the percentage fee: invoice = (target net + f) / (1 - p). Enter percentages as decimals in the formula." },
  { question: "Why can't I simply add the fee percentage to my target amount?", answer: "The processor applies its percentage fee to the gross invoice amount, not just the target net amount. Adding the fee percentage to the target underestimates the required gross amount because the fee itself also applies to the added amount." },
  { question: "How do I include a currency conversion spread?", answer: "If the FX spread s is modeled as a percentage deducted after processing, invoice = (target net / (1 - s) + f) / (1 - p). Confirm whether the provider applies conversion to the full balance or another base." },
  { question: "Does the reverse invoice formula include taxes?", answer: "No. This formula grosses up payment processing and optional conversion costs only. If you need to reserve money for income or business taxes, model that separately and use jurisdiction-specific tax guidance." },
  { question: "Are the example fee rates guaranteed provider rates?", answer: "No. The rates in the examples are hypothetical calculation inputs. Actual fees depend on merchant country, customer location, payment method, account agreement, currency, and provider pricing changes." },
];

export const metadata: Metadata = {
  title: "How to Calculate a Reverse Invoice Amount | SoloFinKit",
  description,
  alternates: { canonical: "https://solofinkit.com/how-to-calculate-reverse-invoice-amount" },
  openGraph: { title: "How to Calculate a Reverse Invoice Amount | SoloFinKit", description, url: "https://solofinkit.com/how-to-calculate-reverse-invoice-amount", siteName: "SoloFinKit", type: "article" },
};

function invoice(target: number, pct: number, fixed: number) {
  return (target + fixed) / (1 - pct / 100);
}
const fmt = (v: number) => `$${v.toFixed(2)}`;

export default function Page() {
  const targets = [100, 500, 1000];
  const rates = [{ label: "2.9% + $0.30", pct: 2.9, fixed: 0.3 }, { label: "3.49% + $0.49", pct: 3.49, fixed: 0.49 }, { label: "4.4% + $0.30", pct: 4.4, fixed: 0.3 }];
  return (
    <main className="min-h-screen bg-slate-50">
      <JsonLd name="How to Calculate Reverse Invoice Amount to Net an Exact Payout" description={description} path="/how-to-calculate-reverse-invoice-amount" faqs={faqs} includeApplication={false} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-5 text-sm text-slate-500"><Link href="/">Home</Link> / Reverse Invoice Amount Guide</nav>
        <header className="mb-8"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-700">Freelance pricing guide</p><h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">How to Calculate a Reverse Invoice Amount to Net an Exact Payout</h1><p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">If you want to keep $500 after payment processing fees, the invoice must be higher than $500. This guide explains the gross-up formula, fixed-fee impact, and optional currency conversion adjustment.</p></header>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"><h2 className="text-2xl font-bold text-slate-900">The reverse invoice formula</h2><p className="mt-3 leading-7 text-slate-600">Let N be your target net payout, p the percentage fee as a decimal, and f the fixed fee.</p><div className="my-5 overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm text-amber-300">Invoice = (N + f) ÷ (1 − p)</div><p className="leading-7 text-slate-600">If an FX spread s is modeled as a percentage deduction after processing, the adjusted formula is:</p><div className="my-5 overflow-x-auto rounded-xl bg-slate-900 p-5 font-mono text-sm text-amber-300">Invoice = (N ÷ (1 − s) + f) ÷ (1 − p)</div><p className="text-sm leading-6 text-slate-500">This assumes the fixed processing fee is charged before the modeled FX deduction. Actual provider fee bases can differ, so use the exact pricing and settlement rules for your account.</p></section>
        <section className="mt-10 space-y-5"><h2 className="text-2xl font-bold text-slate-900">Why adding the fee percentage is not enough</h2><p className="leading-7 text-slate-600">If you need to receive $500 and the fee is 2.9% + $0.30, simply adding 2.9% to $500 does not fully gross up the invoice. The processor calculates the percentage on the larger gross amount, including the portion added to cover the fee. Dividing by 1 − p solves that circular calculation.</p><h3 className="text-lg font-semibold text-slate-900">Worked example: target net of $500</h3><p className="leading-7 text-slate-600">With a hypothetical 2.9% percentage fee and $0.30 fixed fee, the invoice estimate is ($500 + $0.30) ÷ 0.971, or approximately $515.24 before any currency conversion or other charges.</p></section>
        <section className="mt-10 space-y-4"><h2 className="text-2xl font-bold text-slate-900">Reverse invoice amount quick reference</h2><div className="overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-slate-100"><tr><th className="px-4 py-3">Hypothetical fee</th>{targets.map((t) => <th key={t} className="px-4 py-3 text-right">Net {fmt(t)}</th>)}</tr></thead><tbody className="divide-y divide-slate-200">{rates.map((r) => <tr key={r.label}><td className="px-4 py-3 font-medium">{r.label}</td>{targets.map((t) => <td key={t} className="px-4 py-3 text-right tabular-nums">{fmt(invoice(t, r.pct, r.fixed))}</td>)}</tr>)}</tbody></table></div><p className="text-xs leading-6 text-slate-500">Examples exclude FX spread, tax reserves, refunds, disputes, and other charges. Fee combinations are illustrative, not current provider quotations.</p></section>
        <section className="mt-10 space-y-4"><h2 className="text-2xl font-bold text-slate-900">Common reverse-invoicing mistakes</h2><ul className="list-disc space-y-2 pl-5 leading-7 text-slate-600"><li>Forgetting the fixed fee, which matters most on smaller transactions.</li><li>Ignoring currency conversion costs when the invoice and payout currencies differ.</li><li>Confusing payment processing gross-up with income-tax planning. Tax reserves should be modeled separately.</li><li>Using a generic rate instead of the exact fee schedule for the merchant account and payment route.</li></ul></section>
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7"><h2 className="text-2xl font-bold text-slate-900">Calculate your own invoice amount</h2><p className="mt-2 leading-7 text-slate-600">Enter your actual processing and FX assumptions in the relevant calculator.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/paypal-international-fee-calculator" className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">PayPal reverse invoice calculator</Link><Link href="/stripe-international-fee-calculator" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Stripe payout calculator</Link><Link href="/freelance-invoice-net-income-calculator" className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50">Freelance net income calculator</Link></div></section>
        <section className="mt-12 space-y-5"><h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>{faqs.map((faq) => <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">{faq.question}</summary><p className="mt-3 leading-7 text-slate-600">{faq.answer}</p></details>)}</section>
        <RelatedCalculators currentSlug="/how-to-calculate-reverse-invoice-amount" />
        <p className="mt-10 text-xs leading-relaxed text-slate-500">This guide is educational and does not constitute tax, legal, or financial advice. Confirm applicable fees and local invoicing rules.</p>
      </div>
    </main>
  );
}
