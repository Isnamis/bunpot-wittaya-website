import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { getIndicators, getSchool, getStandards } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSchool().siteUrl;
  const staticRoutes = [
    "", "/about", "/about/history", "/about/vision", "/about/basic-information",
    "/academic", "/academic/curriculum", "/academic/learning", "/academic/innovation",
    "/students", "/students/outcomes", "/students/achievements", "/campus", "/community",
    "/news", "/activities", "/quality", "/evidence", "/contact",
  ];
  return [
    ...staticRoutes.map((r) => ({ url: `${base}${r}`, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.7 })),
    ...getStandards().map((s) => ({ url: `${base}/quality/${s.slug}`, priority: 0.8 })),
    ...getIndicators().map((i) => ({ url: `${base}/quality/indicator/${i.code}`, priority: 0.6 })),
  ];
}
