import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { notes } from "@/lib/site-data";

export default function NotesPage() {
  const featuredNote = notes[0];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="notes-hero section-pad" aria-labelledby="notes-hero-title">
          <Image
            className="notes-hero-scene"
            src="/images/notes-workbench-hero.png"
            alt="A product designer's desk with a laptop, keyboard, paperclip, binder clip, and a red model race car."
            fill
            priority
            sizes="100vw"
          />
          <div className="notes-hero-copy">
            <h1 id="notes-hero-title">Notes from the work, the track, and the messy middle.</h1>
            <p>Short reads about product decisions, AI-assisted builds, karting, and what changes once an idea meets real feedback.</p>
            <Link className="button notes-hero-button" href="#all-notes">Browse the notes</Link>
            <div className="notes-hero-topics mono" aria-label="Topics covered">
              <span>PRODUCT JUDGMENT</span>
              <span>BUILD NOTES</span>
              <span>OFF TRACK</span>
            </div>
          </div>

          <Link className="notes-hero-preview" href={`/notes/${featuredNote.slug}`}>
            <span className="notes-preview-meta mono">
              <span>{featuredNote.type}</span>
              <span>{featuredNote.date}</span>
            </span>
            <div className="notes-preview-body">
              <span className="mono">WORKING NOTE / 01</span>
              <h2>{featuredNote.title}</h2>
              <p>{featuredNote.description}</p>
              <span className="notes-preview-link mono">READ THE NOTE ↗</span>
            </div>
          </Link>
        </section>
        <section className="notes-index section-pad" id="all-notes">
        <h2>All notes</h2>
        <div className="note-list">
          {notes.map((note) => (
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
