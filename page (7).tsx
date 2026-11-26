
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact SoloFinKit to report calculation errors, suggest fee updates, or request new financial calculators.",
  alternates: {
    canonical: "/contact",
  },
};

const CONTACT_EMAIL = "eomoak896@gmail.com";

export default function ContactPage() {
  const subjects = [
    "Report a calculation issue",
    "Suggest a fee or rate update",
    "Request a new calculator",
    "General feedback",
  ];

  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        GET IN TOUCH
      </p>

      <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
        Contact SoloFinKit
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Have a question, spotted an incorrect calculation,
        or want to suggest a new tool? We welcome your feedback.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            Email Support
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Send us your questions, suggestions, or feedback.
            Please include the relevant tool name when
            reporting a calculation issue.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}?subject=SoloFinKit%20Feedback`}
            className="mt-6 inline-flex break-all font-semibold text-blue-600 hover:text-blue-800"
          >
            {CONTACT_EMAIL} →
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            Improve Our Tools
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            We value reports about outdated payment fees,
            currency conversion assumptions, calculation
            discrepancies, and ideas for future tools.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Tool%20Suggestion`}
            className="mt-6 inline-flex font-semibold text-blue-600 hover:text-blue-800"
          >
            Send a suggestion →
          </a>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-slate-100 p-7">
        <h2 className="font-semibold text-slate-900">
          What to Include in Your Feedback
        </h2>

        <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-7 text-slate-600">
          {subjects.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>

        <p className="mt-5 text-sm leading-7 text-slate-500">
          For calculation reports, please provide example
          inputs and the expected result. Do not include
          passwords, payment credentials, or sensitive
          personal financial information.
        </p>
      </div>
    </section>
  );
}
