import React from "react";
export type FAQItem = { question: string; answer: string };
type Props = { name: string; description: string; path: string; faqs?: FAQItem[] };

export default function JsonLd({ name, description, path, faqs = [] }: Props) {
  const graph: Record<string, unknown>[] = [{
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description,
    url: `https://solofinkit.com${path}`,
  }];
  if (faqs.length) graph.push({
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question", name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
  const safe = JSON.stringify({ "@context": "https://schema.org", "@graph": graph })
    .replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safe }} />;
}
