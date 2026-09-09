import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { notes } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short reads about product decisions, AI-assisted builds, karting, and what changes once an idea meets real feedback.",
  alternates: { canonical: "/notes" },
  openGraph: { url: "/notes" },
};

export default function NotesPage() {
  const publishedNotes = notes.filter((note) => note.status === "published");

  return (
    <>
      <SiteHeader />
      <main>
        <section className="notes-editorial-hero section-pad" aria-labelledby="notes-hero-title">
          <div className="notes-editorial-copy">
            <h1 id="notes-hero-title">Notes from the work, the track, and the messy middle.</h1>
            <p>Short reads about product decisions, AI-assisted builds, karting, and what changes once an idea meets real feedback.</p>
            <Link className="button notes-editorial-button" href="#all-notes">Browse the notes</Link>
            <div className="notes-editorial-topics mono" aria-label="Topics covered">
              <span>Product judgment</span>
              <span>Build notes</span>
              <span>Off track</span>
            </div>
          </div>
        </section>
        <section className="notes-index section-pad" id="all-notes">
          <h2>Published notes</h2>
          <div className="note-list">
            {publishedNotes.map((note) => (
              <Link key={note.slug} href={`/notes/${note.slug}`} className="note-row">
                <span className="note-meta mono"><span>{note.type}</span><span>{note.date}</span></span>
                <strong>{note.title}</strong>
                <p>{note.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
