import { notFound } from "next/navigation";
import { StreamingHelperCaseStudy } from "@/components/streaming-helper-case-study";
import { MeadCaseStudy } from "@/components/mead-case-study";
import { FieldMaintenanceCaseStudy } from "@/components/field-maintenance-case-study";
import { getProject, projects } from "@/lib/site-data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  if (project.slug === "streaming-helper") return <StreamingHelperCaseStudy />;
  if (project.slug === "mead") return <MeadCaseStudy />;
  if (project.slug === "field-maintenance") return <FieldMaintenanceCaseStudy />;
  notFound();
}
