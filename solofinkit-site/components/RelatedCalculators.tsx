import Link from "next/link";
import { ACTIVE_TOOLS } from "../data/tools";
export default function RelatedCalculators({ currentSlug }: { currentSlug: string }) {
  const items = ACTIVE_TOOLS.filter((tool) => tool.slug !== currentSlug);
  if (!items.length) return null;
  return (
    <section className="mt-10 border-t border-slate-200 pt-8">
      <h2 className="mb-4 text-xl font-bold text-slate-900">Related Calculators</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((tool) => (
          <Link key={tool.slug} href={tool.slug} className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-500 hover:shadow-sm">
            <div className="font-semibold text-slate-900 group-hover:text-blue-700">{tool.name}</div>
            <p className="mt-1 text-sm text-slate-600">{tool.shortDesc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
