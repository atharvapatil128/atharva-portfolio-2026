import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The contact endpoint is a POST-only mail handler with nothing to index.
      disallow: "/api/",
    },
    sitemap: "https://atharvapatil.net/sitemap.xml",
    host: "https://atharvapatil.net",
  };
}
