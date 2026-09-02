import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { notes } from "@/lib/site-data";
import { IntroDotField } from "@/components/intro-dot-field";

export default function NotesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="editorial-hero top-stage section-pad">
        <IntroDotField variant="notes" />
        <h1>Notes from the work, the track,<br />and everything between.</h1>
        <p>Shorter reads about product judgment, AI-assisted workflows, karting, running, and the messy middle between an idea and something real.</p>
        </section>
        <section className="notes-index section-pad">
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
