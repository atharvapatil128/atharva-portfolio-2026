import type { NextConfig } from "next";

/**
 * Vercel terminates TLS and adds HSTS, but not these. Kept deliberately narrow:
 * no CSP here, because this site loads its own fonts and images and a policy
 * written blind is more likely to break a page than to protect one.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    /**
     * Optimized images were being served max-age=0, must-revalidate, so every
     * visit re-validated all 27 of them. These are content-addressed by the
     * ?url&w&q query, so a changed image is a changed URL and a long TTL is
     * safe. 31536000 = one year.
     */
    minimumCacheTTL: 31536000,
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Preserve the public URLs from the previous Readymag site during cutover.
      { source: "/1", destination: "/", permanent: true },
      { source: "/works", destination: "/#selected-work", permanent: true },
      { source: "/project1", destination: "/work/streaming-helper", permanent: true },
      { source: "/project2", destination: "/work/mead", permanent: true },
      { source: "/project3", destination: "/work/field-maintenance", permanent: true },
      {
        source: "/notes/karting-and-feedback",
        destination: "/notes/extending-porsche-design-system",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        /**
         * Files under public/ keep their filename across edits, so they cannot
         * be cached immutably the way hashed build output is: replacing a photo
         * would leave visitors on the old one until the TTL expired. A day,
         * with a week of stale-while-revalidate, ends the max-age=0 revalidation
         * on every view while keeping a same-name replacement visible quickly.
         */
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
