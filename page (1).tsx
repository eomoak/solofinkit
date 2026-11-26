
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the SoloFinKit Privacy Policy and learn how information may be processed when using our financial calculators.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        LEGAL
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
        Privacy Policy
      </h1>

      <p className="mt-4 text-sm text-slate-400">
        Last updated: November 20, 2026
      </p>

      <p className="mt-6 leading-8 text-slate-600">
        SoloFinKit respects your privacy. This policy explains
        what information may be processed when you visit our
        website and use our calculators.
      </p>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            1. Information You Provide
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Our calculators may ask you to enter transaction
            amounts, currencies, fee percentages, or other
            calculation inputs.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            For tools designed to calculate directly in your
            browser, these inputs are processed locally and are
            not intentionally transmitted to our servers by the
            calculation function itself. Actual processing may
            depend on the implementation of each individual tool
            and any third-party services you use.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Please do not enter passwords, payment card details,
            bank account credentials, or other sensitive
            authentication information into our calculators.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            2. Technical and Usage Information
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            When you access a website, certain technical
            information may be processed by our hosting provider
            or infrastructure services. This may include IP
            address, browser type, device information, requested
            pages, and server logs.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            We may also use privacy-conscious analytics or
            third-party analytics services to understand general
            website usage and improve our tools. Such services
            should be disclosed and configured according to
            their actual implementation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            3. Cookies and Similar Technologies
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Cookies or similar technologies may be used by our
            hosting infrastructure, analytics providers, or
            other services integrated into the website.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Their purpose and duration depend on the services
            enabled on the website. Where required by applicable
            law, we will provide appropriate consent and
            preference controls before using non-essential
            cookies or similar technologies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            4. Third-Party Services
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Our website may rely on third-party infrastructure,
            hosting, analytics, or advertising services. These
            providers may process information under their own
            privacy policies and applicable terms.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            We encourage users to review the privacy policies
            of relevant third-party providers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            5. Data Security and Retention
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            We take reasonable steps to protect information
            processed through our website. However, no internet
            transmission or storage system can be guaranteed
            to be completely secure.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Retention periods depend on the nature of the
            information and the services involved.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            6. Your Privacy Rights
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Depending on your location, you may have rights
            regarding access to, correction of, deletion of,
            or restrictions on the processing of your personal
            information.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            You may contact us to ask questions or submit a
            privacy-related request.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            7. Changes to This Policy
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            We may update this Privacy Policy when our services,
            practices, or legal requirements change. Updated
            versions will be published on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            8. Contact
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            For privacy questions, please contact us through
            our Contact page.
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
