
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Review the SoloFinKit Terms of Use, including calculator limitations, financial disclaimers, and acceptable website usage.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        LEGAL
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
        Terms of Use
      </h1>

      <p className="mt-4 text-sm text-slate-400">
        Last updated: November 20, 2026
      </p>

      <p className="mt-6 leading-8 text-slate-600">
        By accessing or using SoloFinKit, you agree to these
        Terms of Use. Please read them carefully before using
        our website and calculators.
      </p>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            1. Purpose of Our Tools
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            SoloFinKit provides online calculators and
            informational resources to help users estimate
            payment processing fees, currency conversion costs,
            invoice amounts, and other financial figures.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Our tools are intended for general informational
            and educational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            2. No Professional Advice
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Calculations and information provided by SoloFinKit
            do not constitute legal, tax, accounting, investment,
            or professional financial advice.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            You should consult an appropriately qualified
            professional before making decisions that require
            professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            3. Calculation Accuracy and Provider Fees
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Calculator results are estimates based on the
            formulas, assumptions, and input values provided.
            Actual transaction fees, exchange rates, and
            settlement amounts may differ.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Payment providers and financial institutions may
            change their rates, policies, and transaction
            conditions at any time. Always refer to the
            provider&apos;s latest official documentation
            before making a transaction or issuing an invoice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            4. User Responsibilities
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            You are responsible for the accuracy of the
            information you enter and for independently
            verifying results before relying on them.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            You must not use the website for unlawful purposes,
            attempt to compromise its security, interfere with
            its operation, or abuse its services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            5. Acceptable Use and Automated Access
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            You may use our tools for personal and legitimate
            business purposes. Unauthorized scraping, excessive
            automated requests, service disruption, security
            circumvention, or other abusive activities are
            prohibited.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Nothing in this section restricts lawful activities
            permitted by applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            6. Third-Party Services and Links
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Our website may reference or link to third-party
            services and payment providers. Such references
            are provided for informational purposes and do
            not imply endorsement, partnership, or affiliation.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            We are not responsible for the content, availability,
            policies, or practices of external websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            7. Intellectual Property
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Unless otherwise stated, the website design,
            original content, and software components of
            SoloFinKit are protected by applicable intellectual
            property laws.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            You may not reproduce or commercially redistribute
            substantial portions of our original materials
            without prior authorization.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            8. Limitation of Liability
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            To the extent permitted by applicable law,
            SoloFinKit is provided on an &quot;as is&quot; and
            &quot;as available&quot; basis without warranties
            of uninterrupted availability or guaranteed
            calculation accuracy.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            To the extent permitted by law, we are not liable
            for losses arising from reliance on estimates,
            incorrect inputs, provider fee changes, or
            temporary website interruptions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            9. Changes to These Terms
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            We may revise these Terms of Use from time to time.
            Continued use of the website after updated terms
            are published constitutes acceptance of the
            revised terms to the extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            10. Contact
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            If you have questions about these terms, please
            contact us through our Contact page.
          </p>
          <a
            href="/contact"
            className="mt-3 inline-block font-semibold text-blue-600 hover:text-blue-800"
          >
            Contact SoloFinKit →
          </a>
        </section>
      </div>
    </article>
  );
}
