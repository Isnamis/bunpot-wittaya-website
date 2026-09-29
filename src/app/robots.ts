import type { MetadataRoute } from "next";
export const dynamic = "force-static";
import { getSchool } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  const base = getSchool().siteUrl;
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${base}/sitemap.xml` };
}
