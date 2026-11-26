import type { Metadata } from "next";
import JsonLd, { type FAQItem } from "../../components/JsonLd";
import RelatedCalculators from "../../components/RelatedCalculators";
import WisePayPalCalculator from "../../components/calculators/WisePayPalCalculator";

const description = "Compare estimated Wise and PayPal cross-border transfer costs, fee assumptions, FX spreads, and recipient amounts with an adjustable calculator.";
const faqs: FAQItem[] = [
  { question: "Is Wise always cheaper than PayPal for international transfers?", answer: "No provider is always cheapest for every route. The total depends on the currency pair, sending and receiving countries, funding method, account type, transfer speed, and the exchange rate offered at the time. Compare final quotes for the same amount and route." },
  { question: "What costs should I compare beyond the transfer fee?", answer: "Compare percentage and fixed fees, the exchange-rate margin or spread, funding costs, receiving-bank charges, withdrawal costs, and any intermediary-bank deductions that may apply." },
  { question: "Can I use this calculator for any currency pair?", answer: "The calculator is a simplified USD-denominated comparison model. You can adjust fee and FX assumptions, but it does not fetch live exchange rates or provider quotes. Use the provider quote for your exact currency pair." },
  { question: "Why can the amount received differ from this estimate?", answer: "Provider pricing, payment method, route availability, exchange rates, intermediary fees, and recipient-bank rules can change the final amount. This tool isolates the assumptions you enter rather than predicting a guaranteed payout." },
  { question: "Should a freelancer receive client payments through Wise or PayPal?", answer: "Choose based on the client's preferred payment method, invoice and checkout needs, payout route, currency conversion, dispute handling, and the total quoted cost. A lower fee alone may not determine the best fit." },
];

export const metadata: Metadata = {
  title: "Wise vs PayPal Transfer & Fee Calculator | SoloFinKit",
  description,
  alternates: { canonical: "https://solofinkit.com/wise-vs-paypal-transfer-calculator" },
  openGraph: { title: "Wise vs PayPal Transfer & Fee Calculator | SoloFinKit", description, url: "https://solofinkit.com/wise-vs-paypal-transfer-calculator", siteName: "SoloFinKit", type: "website" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <JsonLd name="Wise vs PayPal Cross-Border Transfer & Fee Calculator" description={description} path="/wise-vs-paypal-transfer-calculator" faqs={faqs} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-5 text-sm text-slate-500"><a href="/">Home</a> / Wise vs PayPal Calculator</nav>
        <header className="mb-8"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-700">Cross-border cost comparison</p><h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Wise vs PayPal Cross-Border Transfer & Fee Calculator</h1><p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">Compare estimated fees and recipient amounts using your own assumptions. Adjust percentage fees, fixed charges, and FX spreads to model the route you actually plan to use.</p></header>
        <WisePayPalCalculator />
        <section className="mt-12 space-y-5">
          <h2 className="text-2xl font-bold text-slate-900">How to compare the full transfer cost</h2>
          <p className="leading-7 text-slate-600">A useful comparison looks beyond the headline transfer fee. The effective cost can include the provider fee, a margin embedded in the exchange rate, funding or card charges, withdrawal costs, and charges imposed by receiving or intermediary banks. Compare both services using the same sending amount, destination, currencies, and delivery method.</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="px-4 py-3">Cost component</th><th className="px-4 py-3">Wise route</th><th className="px-4 py-3">PayPal route</th></tr></thead><tbody className="divide-y divide-slate-200">
            <tr><td className="px-4 py-3 font-medium">Provider fee</td><td className="px-4 py-3">Route-specific transfer fee</td><td className="px-4 py-3">Commercial processing / cross-border fees may apply</td></tr>
            <tr><td className="px-4 py-3 font-medium">Exchange rate</td><td className="px-4 py-3">Compare the quoted rate and disclosed fee</td><td className="px-4 py-3">Conversion margin may apply when currency conversion occurs</td></tr>
            <tr><td className="px-4 py-3 font-medium">Payout</td><td className="px-4 py-3">Bank and route availability vary</td><td className="px-4 py-3">Withdrawal and conversion options depend on account and country</td></tr>
            <tr><td className="px-4 py-3 font-medium">Best next step</td><td className="px-4 py-3">Check a live quote for the exact route</td><td className="px-4 py-3">Check the applicable merchant rate and payout method</td></tr>
          </tbody></table></div>
          <h2 className="text-2xl font-bold text-slate-900">Typical amount comparison</h2>
          <p className="leading-7 text-slate-600">There is no universal break-even amount because fixed fees, percentage fees, and exchange-rate margins vary. Enter common transaction sizes such as $250, $1,000, and $5,000 in the calculator, then repeat the comparison using current provider quotes.</p>
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">Important: the calculator does not connect to Wise or PayPal APIs and does not retrieve live rates. The result is only as accurate as the assumptions you enter.</div>
        </section>
        <section className="mt-12 space-y-5"><h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>{faqs.map((faq) => <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">{faq.question}</summary><p className="mt-3 leading-7 text-slate-600">{faq.answer}</p></details>)}</section>
        <RelatedCalculators currentSlug="/wise-vs-paypal-transfer-calculator" />
        <p className="mt-10 text-xs leading-relaxed text-slate-500">SoloFinKit provides estimates for planning and comparison only. Confirm provider quotes, fees, and availability before sending money.</p>
      </div>
    </main>
  );
}
