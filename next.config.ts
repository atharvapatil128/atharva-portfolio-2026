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
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
