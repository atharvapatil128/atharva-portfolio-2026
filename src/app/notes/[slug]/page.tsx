import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BackLink } from "@/components/back-link";
import { notes } from "@/lib/site-data";
import { openGraphFor } from "@/lib/metadata";

export function generateStaticParams() {
  return notes
    .filter((note) => note.status === "published")
    .map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((candidate) => candidate.slug === slug);
  if (!note || note.status !== "published") return {};
  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: openGraphFor(`/notes/${note.slug}`, { title: note.title, description: note.description }),
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = notes.find((candidate) => candidate.slug === slug);
  if (!note || note.status !== "published") notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <article className="note-article">
        <BackLink href="/notes#all-notes">Back to all notes</BackLink>
        <header>
          <p className="mono">{note.type.toUpperCase()} · {note.date.toUpperCase()}</p>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
        </header>
        <section className="article-placeholder">
          <p className="mono">EDITORIAL DRAFT SPACE</p>
          <h2>This note is scaffolded and ready for the real story.</h2>
          <p>The publishing system is in place. The final writing, process captures, and source imagery will be added during the content pass rather than filled with invented detail.</p>
        </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
