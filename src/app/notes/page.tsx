import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { notes } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short reflections on product decisions, building this portfolio, and lessons from the track.",
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
            <h1 id="notes-hero-title">Notes on building, testing, and learning.</h1>
            <p>A small collection of what I learned while designing products, building this portfolio, and testing ideas beyond the screen.</p>
            <Link className="button notes-editorial-button" href="#all-notes">Read the notes</Link>
            <div className="notes-editorial-topics mono" aria-label="Topics covered">
              <span>Product decisions</span>
              <span>Build process</span>
              <span>Lessons from the track</span>
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
