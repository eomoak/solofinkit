import type { Metadata } from "next";
import JsonLd, { type FAQItem } from "../../components/JsonLd";
import RelatedCalculators from "../../components/RelatedCalculators";
import FreelanceInvoiceCalculator from "../../components/calculators/FreelanceInvoiceCalculator";

const description = "Calculate freelance net income after payment processing fees, estimated tax reserves, and business expenses, or reverse-calculate the invoice needed for a target take-home amount.";
const faqs: FAQItem[] = [
  {
    "question": "How do I calculate freelance take-home pay from an invoice?",
    "answer": "Start with gross invoice revenue, subtract payment processing fees, set aside your chosen tax reserve, and subtract fixed business expenses. The remainder is estimated take-home pay."
  },
  {
    "question": "What percentage should freelancers reserve for taxes?",
    "answer": "There is no universal percentage. It depends on country, state or region, business structure, income, deductions, and other circumstances. Use the reserve field as a planning assumption and confirm your tax position with a qualified professional."
  },
  {
    "question": "Can I calculate an invoice from my hourly rate?",
    "answer": "Yes. Enable the hourly-rate option and enter your hourly rate and billable hours. The calculator multiplies them to estimate gross invoice revenue."
  },
  {
    "question": "How much should I invoice to take home a target amount?",
    "answer": "Choose Target take-home mode, enter the amount you want to keep, and provide your payment fee, tax reserve percentage, and fixed expenses. The calculator estimates the gross invoice required."
  },
  {
    "question": "Are payment processing fees deductible business expenses?",
    "answer": "Payment processing fees may be deductible business expenses in many tax systems, but eligibility and reporting depend on your jurisdiction and circumstances. Keep records and consult local tax guidance."
  }
];

export const metadata: Metadata = {
  title: "Freelance Invoice & Net Take-Home Calculator | SoloFinKit",
  description,
  alternates: { canonical: "https://solofinkit.com/freelance-invoice-net-income-calculator" },
  openGraph: { title: "Freelance Invoice & Net Take-Home Calculator | SoloFinKit", description, url: "https://solofinkit.com/freelance-invoice-net-income-calculator", siteName: "SoloFinKit", type: "website" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <JsonLd name="Freelance Invoice & Net Take-Home Calculator" description={description} path="/freelance-invoice-net-income-calculator" faqs={faqs} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-5 text-sm text-slate-500"><a href="/" className="hover:text-blue-700">Home</a> / Freelance Invoice & Net Take-Home Calculator</nav>
        <header className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-700">Free online finance calculator</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Freelance Invoice & Net Take-Home Calculator</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">Turn an invoice amount or hourly-rate estimate into a practical take-home estimate. Account for payment processing costs, a configurable tax reserve, and fixed business expenses, or work backward from the amount you want to keep.</p>
        </header>
        <FreelanceInvoiceCalculator />
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">How the calculation works</h2>
          <p className="leading-relaxed text-slate-600">The estimate subtracts payment fees from gross invoice revenue, calculates the tax reserve on the amount after payment fees, and then subtracts fixed business expenses. Reverse mode solves for the gross invoice required to reach your target net amount using the same assumptions.</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700"><tr><th className="px-4 py-3">Scenario</th><th className="px-4 py-3 text-right">Gross</th><th className="px-4 py-3 text-right">Estimated net</th></tr></thead>
              <tbody><tr className="border-t border-slate-200"><td className="px-4 py-3">$1,000 invoice</td><td className="px-4 py-3 text-right">$1,000.00</td><td className="px-4 py-3 text-right">$523.78</td></tr>
<tr className="border-t border-slate-200"><td className="px-4 py-3">$3,000 invoice</td><td className="px-4 py-3 text-right">$3,000.00</td><td className="px-4 py-3 text-right">$2,037.02</td></tr>
<tr className="border-t border-slate-200"><td className="px-4 py-3">$5,000 invoice</td><td className="px-4 py-3 text-right">$5,000.00</td><td className="px-4 py-3 text-right">$3,550.25</td></tr></tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">Illustrative examples only. Actual payment fees and tax outcomes vary by provider, country, account, and individual circumstances.</p>
        </section>
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">How do I calculate freelance take-home pay from an invoice?</summary><p className="mt-3 leading-relaxed text-slate-600">Start with gross invoice revenue, subtract payment processing fees, set aside your chosen tax reserve, and subtract fixed business expenses. The remainder is estimated take-home pay.</p></details>
<details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">What percentage should freelancers reserve for taxes?</summary><p className="mt-3 leading-relaxed text-slate-600">There is no universal percentage. It depends on country, state or region, business structure, income, deductions, and other circumstances. Use the reserve field as a planning assumption and confirm your tax position with a qualified professional.</p></details>
<details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">Can I calculate an invoice from my hourly rate?</summary><p className="mt-3 leading-relaxed text-slate-600">Yes. Enable the hourly-rate option and enter your hourly rate and billable hours. The calculator multiplies them to estimate gross invoice revenue.</p></details>
<details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">How much should I invoice to take home a target amount?</summary><p className="mt-3 leading-relaxed text-slate-600">Choose Target take-home mode, enter the amount you want to keep, and provide your payment fee, tax reserve percentage, and fixed expenses. The calculator estimates the gross invoice required.</p></details>
<details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">Are payment processing fees deductible business expenses?</summary><p className="mt-3 leading-relaxed text-slate-600">Payment processing fees may be deductible business expenses in many tax systems, but eligibility and reporting depend on your jurisdiction and circumstances. Keep records and consult local tax guidance.</p></details>
        </section>
        <RelatedCalculators currentSlug="/freelance-invoice-net-income-calculator" />
        <p className="mt-10 text-xs leading-relaxed text-slate-500">SoloFinKit provides educational estimates only. Confirm provider pricing and consult qualified tax professionals for advice specific to your situation.</p>
      </div>
    </main>
  );
}
