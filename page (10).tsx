
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SoloFinKit, our mission, calculation principles, and the financial tools we build for freelancers and cross-border professionals.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        ABOUT US
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
        About SoloFinKit
      </h1>

      <p className="mt-6 text-lg leading-8 text-slate-600">
        Practical financial tools for people working across
        borders and building independent businesses.
      </p>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Why We Built SoloFinKit
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Freelancers, independent professionals, and cross-border
            businesses often deal with payment processing fees,
            currency conversion costs, invoicing decisions, and
            unfamiliar financial calculations.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Understanding these costs should not require navigating
            complicated spreadsheets or comparing multiple
            disconnected sources. SoloFinKit aims to make common
            financial calculations easier to understand and use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Who Our Tools Are For
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-slate-600">
            <li>Freelancers and independent contractors.</li>
            <li>Remote workers and digital professionals.</li>
            <li>Online businesses and cross-border sellers.</li>
            <li>Consultants and service providers receiving international payments.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Our Calculation Principles
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Our calculators use documented formulas, user-provided
            inputs, and publicly available fee information where
            applicable. We aim to make important assumptions visible
            so users can understand the basis of each estimate.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Actual transaction costs may vary depending on account
            location, payment method, currency, transaction type,
            and provider-specific conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Accuracy and Updates
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Payment providers and financial institutions may change
            their fees and policies. We aim to review relevant
            information and update our tools when material changes
            are identified. However, we cannot guarantee that every
            estimate reflects the latest provider terms at all times.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Users should verify applicable fees directly with the
            relevant provider before making financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Our Approach
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            We believe financial tools should be straightforward,
            transparent, and useful. SoloFinKit focuses on practical
            functionality rather than unnecessary complexity.
          </p>
        </section>
      </div>
    </article>
  );
}
