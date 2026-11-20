
import Link from "next/link";
import { TOOLS } from "@/data/tools";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.22),_transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-300">
              PRACTICAL FINANCIAL TOOLS
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Clear Financial Calculations.
              <span className="block text-blue-400">
                Better Business Decisions.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Simple and practical financial tools for freelancers,
              independent professionals, and cross-border businesses.
              Calculate payment fees, plan invoices, and understand
              your numbers with confidence.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/paypal-international-fee-calculator"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Open PayPal Fee Calculator
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>

              <Link
                href="#tools"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-slate-400 hover:bg-white/5"
              >
                Explore All Tools
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
              <span>✓ No registration required</span>
              <span>✓ Practical calculations</span>
              <span>✓ Built for global professionals</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tools"
        className="scroll-mt-20 mx-auto max-w-7xl px-5 py-20 sm:px-8"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              TOOL DIRECTORY
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Financial Tools
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore practical calculators designed to help you
              manage payment costs, international transactions,
              and independent business finances.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            {TOOLS.filter((tool) => tool.status === "active").length} tools available
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, index) => {
            const isActive = tool.status === "active";

            return (
              <article
                key={tool.slug}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {tool.category}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {isActive ? "Available" : "Coming Soon"}
                  </span>
                </div>

                <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-5 text-lg font-semibold leading-7 text-slate-900">
                  {tool.name}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                  {tool.shortDesc}
                </p>

                {isActive ? (
                  <Link
                    href={tool.slug}
                    className="mt-7 inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                  >
                    Open Calculator
                    <span className="ml-2" aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <span className="mt-7 text-sm font-medium text-slate-400">
                    Planned for a future release
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <div className="text-2xl font-bold text-blue-600">01</div>
            <h3 className="mt-3 font-semibold text-slate-900">
              Practical by Design
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Each tool focuses on a specific financial task,
              helping you find useful answers without unnecessary complexity.
            </p>
          </div>

          <div>
            <div className="text-2xl font-bold text-blue-600">02</div>
            <h3 className="mt-3 font-semibold text-slate-900">
              Transparent Estimates
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Calculation methods and rate assumptions are presented
              to help users understand how results are produced.
            </p>
          </div>

          <div>
            <div className="text-2xl font-bold text-blue-600">03</div>
            <h3 className="mt-3 font-semibold text-slate-900">
              Simple and Accessible
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-500">
              Our tools are designed for straightforward use,
              with no account registration required.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-100 p-7 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Understand Your Numbers Before You Make a Decision
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            SoloFinKit provides independent financial calculators
            based on documented calculation methods and publicly
            available information. Results are estimates, not
            professional financial, legal, or tax advice.
          </p>

          <div className="mt-6 flex flex-wrap gap-5 text-sm font-medium">
            <Link href="/about" className="text-blue-600 hover:text-blue-800">
              About SoloFinKit →
            </Link>
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
              Privacy Policy →
            </Link>
            <Link href="/terms" className="text-blue-600 hover:text-blue-800">
              Terms of Use →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
