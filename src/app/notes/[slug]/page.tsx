import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BackLink } from "@/components/back-link";
import { NoteStory } from "@/components/note-story";
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
  const relatedNote = notes.find((candidate) => candidate.status === "published" && candidate.slug !== note.slug);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="note-article">
          <BackLink href="/notes#all-notes">Back to all notes</BackLink>
          <header>
            <p className="note-article-meta mono"><span>{note.type}</span><span>{note.date}</span><span>{note.readTime}</span></p>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </header>
          <NoteStory slug={note.slug} />
          {relatedNote ? (
            <Link className="note-next" href={`/notes/${relatedNote.slug}`}>
              <span className="mono">Continue reading</span>
              <strong>{relatedNote.title}</strong>
              <span aria-hidden="true">↗︎</span>
            </Link>
          ) : null}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
