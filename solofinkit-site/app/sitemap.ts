
import type { MetadataRoute } from "next";
import { ACTIVE_TOOLS } from "@/data/tools";

const BASE_URL = "https://solofinkit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
  ];

  const staticEntries: MetadataRoute.Sitemap =
    staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.5,
    }));

  const toolEntries: MetadataRoute.Sitemap =
    ACTIVE_TOOLS.map((tool) => ({
      url: `${BASE_URL}${tool.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticEntries, ...toolEntries];
}
