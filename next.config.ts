import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Static export is only needed for GitHub Pages.
  // Vercel serves the app natively via `next build` (no export).
  ...(isGhPages ? { output: "export" as const } : {}),
  trailingSlash: true,
  images: {
    unoptimized: isGhPages,
  },
  ...(isGhPages && {
    basePath: "/engagement",
    assetPrefix: "/engagement/",
  }),
};

export default nextConfig;
