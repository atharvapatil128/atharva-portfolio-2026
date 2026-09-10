import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StreamingHelperCaseStudy } from "@/components/streaming-helper-case-study";
import { MeadCaseStudy } from "@/components/mead-case-study";
import { FieldMaintenanceCaseStudy } from "@/components/field-maintenance-case-study";
import { getProject, projects } from "@/lib/site-data";
import { openGraphFor } from "@/lib/metadata";
import { JsonLd, breadcrumbSchema, caseStudySchema } from "@/lib/schema";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.descriptor,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: openGraphFor(`/work/${project.slug}`, { title: `${project.name} — Atharva Patil`, description: project.descriptor }),
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const schema = (
    <JsonLd
      graph={[
        caseStudySchema(project),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: project.name, path: `/work/${project.slug}` },
        ]),
      ]}
    />
  );
  if (project.slug === "streaming-helper") return <>{schema}<StreamingHelperCaseStudy /></>;
  if (project.slug === "mead") return <>{schema}<MeadCaseStudy /></>;
  if (project.slug === "field-maintenance") return <>{schema}<FieldMaintenanceCaseStudy /></>;
  notFound();
}
