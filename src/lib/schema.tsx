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
  description:
    "Product designer working across research, prototyping, testing, and front-end implementation.",
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
