
import Link from "next/link";
import { ACTIVE_TOOLS } from "../data/tools";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" aria-label="SoloFinKit home" className="inline-flex items-center">
              <BrandLogo size="md" />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
              Practical financial calculators for freelancers,
              independent professionals, and cross-border businesses.
              Make better decisions with clear and accessible tools.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Tools
            </h2>

            <ul className="mt-4 space-y-3">
              {ACTIVE_TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.slug}
                    className="text-sm leading-6 text-slate-500 transition hover:text-blue-600"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Company & Legal
            </h2>

            <ul className="mt-4 space-y-3">
              {[
                { label: "About", href: "/about" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 transition hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-slate-500">
            Calculations are for estimation purposes only.
            Always verify official fees and applicable rules.
          </p>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} SoloFinKit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
