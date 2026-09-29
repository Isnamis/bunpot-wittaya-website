import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 npm run build → static site in /out
 *   - used by GitHub Pages (.github/workflows/deploy.yml) with NEXT_PUBLIC_BASE_PATH=/<repo>
 *   - and by scripts/build-single-file.py to produce Bunpotwittaya.html
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = process.env.STATIC_EXPORT
  ? { output: "export", images: { unoptimized: true }, trailingSlash: true, basePath }
  : {};

export default nextConfig;
