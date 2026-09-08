import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { PersonalJournal } from "@/components/personal-journal";
import { ProjectDeck } from "@/components/project-deck";
import { notes } from "@/lib/site-data";

export function HomeSections() {
  return (
    <>
      <section className="selected-work section-pad" id="selected-work" aria-labelledby="work-title">
        <div className="section-heading"><h2 id="work-title">Selected work</h2><p className="mono">Shipped work, research, and decisions that changed</p></div>
        <ProjectDeck />
      </section>
      <section className="notes-section section-pad" aria-labelledby="notes-title">
        <div className="section-heading"><h2 id="notes-title">Notes &amp; experiments</h2><p className="mono">Process, prototypes, misc.</p></div>
        <div className="note-list">
          {notes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="note-row">
              <span className="note-meta mono"><span>{note.type}</span><span>{note.date}</span></span>
              <strong>{note.title}</strong><p>{note.description}</p>
            </Link>
          ))}
        </div>
        <ArrowLink href="/notes" className="section-link">View every note</ArrowLink>
      </section>
      <PersonalJournal />
    </>
  );
}
