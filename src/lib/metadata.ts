import type { Metadata } from "next";

/**
 * Next inherits a parent's `openGraph` only when a route declares none of its
 * own. Any route that sets so much as `url` drops the inherited block, which
 * silently takes the share image with it. Routes therefore build their
 * openGraph through this helper so the image is never lost.
 */
export const openGraphFor = (
  url: string,
  overrides: Omit<NonNullable<Metadata["openGraph"]>, "url"> = {},
): Metadata["openGraph"] => ({
  type: "website",
  siteName: "Atharva Patil",
  url,
  images: ["/opengraph-image"],
  ...overrides,
});
