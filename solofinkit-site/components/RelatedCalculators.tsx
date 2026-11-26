import Link from "next/link";
import { ACTIVE_TOOLS } from "../data/tools";

type Props = {
  currentSlug: string;
  limit?: number;
};

export default function RelatedCalculators({
  currentSlug,
  limit = 3,
}: Props) {
  const current = ACTIVE_TOOLS.find((tool) => tool.slug === currentSlug);
  const preferred = current?.relatedSlugs ?? [];

  const ranked = [
    ...preferred
      .map((slug) => ACTIVE_TOOLS.find((tool) => tool.slug === slug))
      .filter((tool): tool is (typeof ACTIVE_TOOLS)[number] => Boolean(tool)),
    ...ACTIVE_TOOLS.filter(
      (tool) => tool.slug !== currentSlug && !preferred.includes(tool.slug)
    ),
  ];

  const items = ranked
    .filter((tool, index, all) => tool.slug !== currentSlug && all.findIndex((x) => x.slug === tool.slug) === index)
    .slice(0, limit);

  if (!items.length) return null;

  return (
    <section className="mt-12 border-t border-slate-200 pt-8">
      <h2 className="mb-4 text-xl font-bold text-slate-900">
        Related Tools & Guides
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.slug}
            className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-500 hover:shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              {tool.kind === "guide" ? "Guide" : "Calculator"}
            </span>
            <div className="mt-1 font-semibold text-slate-900 group-hover:text-blue-700">
              {tool.name}
            </div>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {tool.shortDesc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
