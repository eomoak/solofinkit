import type { Metadata } from "next";
import JsonLd, { type FAQItem } from "../../components/JsonLd";
import RelatedCalculators from "../../components/RelatedCalculators";
import HourlySalaryCalculator from "../../components/calculators/HourlySalaryCalculator";

const description = "Convert an hourly rate to annual and monthly gross income or reverse-calculate an hourly rate from salary, with work weeks, non-billable time, and reserve assumptions.";
const faqs: FAQItem[] = [
  { question: "How do I convert an hourly rate to an annual salary?", answer: "Multiply the hourly rate by scheduled hours per week and working weeks per year. For example, $50 per hour × 40 hours × 48 weeks equals $96,000 in annual gross income before taxes and expenses." },
  { question: "How many working weeks should I use?", answer: "Use 52 weeks for a theoretical full-year schedule, or reduce the number to account for vacation, holidays, unpaid leave, gaps between contracts, and time without billable work." },
  { question: "What is the difference between nominal and effective hourly rate?", answer: "Nominal hourly rate is the stated rate or salary divided by scheduled hours. Effective hourly rate accounts for time spent on unpaid administration, sales, communication, revisions, and other non-billable work." },
  { question: "Does this calculator estimate take-home pay after tax?", answer: "It shows an optional reserve estimate based on a percentage you enter. It is not a tax calculation and does not account for tax brackets, deductions, credits, payroll taxes, or local rules." },
  { question: "How can a freelancer compare an hourly contract with a salaried job?", answer: "Compare annual gross income using realistic working weeks and hours, then account separately for benefits, paid leave, insurance, retirement contributions, equipment, taxes, and unpaid business time." },
];

export const metadata: Metadata = {
  title: "Hourly Rate to Annual Salary Calculator | SoloFinKit",
  description,
  alternates: { canonical: "https://solofinkit.com/hourly-rate-to-salary-calculator" },
  openGraph: { title: "Hourly Rate to Annual Salary Calculator | SoloFinKit", description, url: "https://solofinkit.com/hourly-rate-to-salary-calculator", siteName: "SoloFinKit", type: "website" },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <JsonLd name="Hourly Rate to Annual Salary & Effective Rate Calculator" description={description} path="/hourly-rate-to-salary-calculator" faqs={faqs} />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-5 text-sm text-slate-500"><a href="/">Home</a> / Hourly Rate to Salary Calculator</nav>
        <header className="mb-8"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-700">Income planning calculator</p><h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Hourly Rate to Annual Salary & Effective Rate Calculator</h1><p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">Translate an hourly rate into annual and monthly gross income, or work backward from an annual salary. Adjust working weeks and non-billable time to understand your effective hourly rate.</p></header>
        <HourlySalaryCalculator />
        <section className="mt-12 space-y-5">
          <h2 className="text-2xl font-bold text-slate-900">Nominal hourly rate vs. effective hourly rate</h2>
          <p className="leading-7 text-slate-600">A stated hourly rate does not always reflect the value of each hour spent working. Freelancers and contractors may spend time on proposals, client communication, bookkeeping, revisions, training, and business development without billing for it. The effective-rate estimate divides gross income by productive hours after the non-billable allowance.</p>
          <h2 className="text-2xl font-bold text-slate-900">Common work-year assumptions</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="px-4 py-3">Schedule</th><th className="px-4 py-3 text-right">Hours/week</th><th className="px-4 py-3 text-right">Weeks/year</th><th className="px-4 py-3 text-right">Annual hours</th></tr></thead><tbody className="divide-y divide-slate-200"><tr><td className="px-4 py-3">Full theoretical year</td><td className="px-4 py-3 text-right">40</td><td className="px-4 py-3 text-right">52</td><td className="px-4 py-3 text-right">2,080</td></tr><tr><td className="px-4 py-3">Four weeks away</td><td className="px-4 py-3 text-right">40</td><td className="px-4 py-3 text-right">48</td><td className="px-4 py-3 text-right">1,920</td></tr><tr><td className="px-4 py-3">Six weeks away / gaps</td><td className="px-4 py-3 text-right">40</td><td className="px-4 py-3 text-right">46</td><td className="px-4 py-3 text-right">1,840</td></tr><tr><td className="px-4 py-3">Part-time schedule</td><td className="px-4 py-3 text-right">25</td><td className="px-4 py-3 text-right">48</td><td className="px-4 py-3 text-right">1,200</td></tr></tbody></table></div>
          <p className="text-sm leading-6 text-slate-500">These are schedule examples, not a prediction of actual paid hours or employee benefits.</p>
        </section>
        <section className="mt-12 space-y-5"><h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>{faqs.map((faq) => <details key={faq.question} className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer font-semibold text-slate-900">{faq.question}</summary><p className="mt-3 leading-7 text-slate-600">{faq.answer}</p></details>)}</section>
        <RelatedCalculators currentSlug="/hourly-rate-to-salary-calculator" />
        <p className="mt-10 text-xs leading-relaxed text-slate-500">Income figures are estimates before personal tax and other employment or business costs unless explicitly stated.</p>
      </div>
    </main>
  );
}
