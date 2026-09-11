/**
 * JSON-LD for search engines and AI answer engines.
 *
 * Everything here is asserted as fact to Google, so this file only states what
 * the site itself already says. Credentials that appear nowhere in the pages
 * (degree, employer, awards) are deliberately absent rather than inferred.
 */

export const siteUrl = "https://atharvapatil.net";

/** Stable @id so Person, WebSite and every BlogPosting resolve to one entity. */
const personId = `${siteUrl}/#atharva`;
const siteId = `${siteUrl}/#website`;

/**
 * sameAs is how Google confirms that this site and that profile are the same
 * person. It only works when the profile links back, so adding a URL here
 * without adding the return link is half a signal.
 */
const profiles = ["https://www.linkedin.com/in/atharvahpatil"];

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: "Atharva Patil",
  url: siteUrl,
  jobTitle: "Product Designer",
  /**
   * Points at the file in public/ rather than a /_next/image URL: the optimizer
   * URL carries a width and quality that would go stale, and search engines
   * want a stable, directly fetchable original.
   */
  image: {
    "@type": "ImageObject",
    url: `${siteUrl}/images/personal/graduation.jpg`,
    width: 1200,
    height: 1600,
    caption: "Atharva Patil",
  },
  /**
   * No description field. Person is emitted on every page, so any one sentence
   * disagrees with the visible copy almost everywhere, which reads as schema
   * drift to crawlers and AI extractors. The entity is identified by name, url
   * and sameAs; a description bought nothing and cost a mismatch on 7 pages.
   */
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bloomington",
    addressRegion: "IN",
    addressCountry: "US",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indiana University Bloomington",
    sameAs: "https://www.indiana.edu/",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    educationalLevel: "Master's degree",
    name: "Master of Science in Human-Computer Interaction Design (HCI/d)",
    recognizedBy: { "@type": "CollegeOrUniversity", name: "Indiana University Bloomington" },
  },
  knowsAbout: [
    "Product Design",
    "Interaction Design",
    "User Research",
    "Design Systems",
    "AI-assisted prototyping",
    "Front-end implementation",
  ],
  sameAs: profiles,
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": siteId,
  url: siteUrl,
  name: "Atharva Patil",
  inLanguage: "en-US",
  publisher: { "@id": personId },
};

export function blogPostingSchema(note: {
  title: string;
  description: string;
  slug: string;
  published: string;
  type: string;
}) {
  const url = `${siteUrl}/notes/${note.slug}`;
  return {
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: note.title,
    description: note.description,
    url,
    // Google treats image as recommended for Article results. The site card is
    // the only 1200x630 raster every note is guaranteed to have.
    image: `${siteUrl}/opengraph-image`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: note.published,
    dateModified: note.published,
    articleSection: note.type,
    inLanguage: "en-US",
    author: { "@id": personId },
    publisher: { "@id": personId },
    isPartOf: { "@id": siteId },
  };
}

export function caseStudySchema(project: {
  name: string;
  descriptor: string;
  slug: string;
  category: string;
}) {
  const url = `${siteUrl}/work/${project.slug}`;
  return {
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: project.name,
    description: project.descriptor,
    url,
    genre: project.category,
    inLanguage: "en-US",
    creator: { "@id": personId },
    isPartOf: { "@id": siteId },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: `${siteUrl}${step.path}`,
    })),
  };
}

/** One graph per page keeps the cross-references resolvable by @id. */
export function JsonLd({ graph }: { graph: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
