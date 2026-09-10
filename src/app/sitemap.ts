import type { MetadataRoute } from "next";
import { notes, projects } from "@/lib/site-data";

const origin = "https://atharvapatil.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: origin, changeFrequency: "monthly", priority: 1 },
    { url: `${origin}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${origin}/notes`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${origin}/ask`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${origin}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const work: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${origin}/work/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Planned notes have no page, so listing them would advertise a 404.
  const published: MetadataRoute.Sitemap = notes
    .filter((note) => note.status === "published")
    .map((note) => ({
      url: `${origin}/notes/${note.slug}`,
      changeFrequency: "yearly",
      priority: 0.5,
    }));

  return [...pages, ...work, ...published].map((entry) => ({ ...entry, lastModified: updated }));
}
