import type { MetadataRoute } from "next";
import { ACTIVE_TOOLS } from "../data/tools";

const BASE_URL = "https://solofinkit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/privacy", "/terms", "/contact"];
  const uniqueRoutes = Array.from(new Set([
    ...staticRoutes,
    ...ACTIVE_TOOLS.map((tool) => tool.slug),
  ]));

  return uniqueRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : staticRoutes.includes(route) ? 0.5 : 0.8,
  }));
}
