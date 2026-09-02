import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { PaddockField } from "@/components/paddock-field";
import { ProjectDeck } from "@/components/project-deck";
import { notes } from "@/lib/site-data";

export function HomeSections() {
  return (
    <>
      <section className="selected-work section-pad" id="selected-work" aria-labelledby="work-title">
        <div className="section-heading"><h2 id="work-title">Selected work</h2><p className="mono">THREE CASE STUDIES · FOCUS REVEALS THE SYSTEM</p></div>
        <ProjectDeck />
      </section>
      <section className="notes-section section-pad" aria-labelledby="notes-title">
        <div className="section-heading"><h2 id="notes-title">Notes &amp; experiments</h2><p className="mono">PROCESS, PROTOTYPES, MISC.</p></div>
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
      <section className="paddock section-pad" id="beyond-work" aria-labelledby="paddock-title">
        <div className="paddock-heading">
          <h2 id="paddock-title">What sharpens my eye</h2>
          <p>Fast feedback on a track. Patience on a long run. Curiosity while building. These are the places my product instincts get trained.</p>
        </div>
        <PaddockField />
        <p className="paddock-instruction mono">DRAG TO EXPLORE · EACH STORY OPENS SOMEWHERE</p>
      </section>
    </>
  );
}
