"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

type NotePickerItem = {
  type: string;
  date: string;
  title: string;
  description: string;
  slug: string;
};

export function NotePicker({ items }: { items: readonly NotePickerItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const hasMultiple = items.length > 1;
  const activeNote = items[activeIndex];

  if (!activeNote) return null;

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + items.length) % items.length);
  };

  return (
    <div
      className="note-picker"
      data-multiple={hasMultiple}
      tabIndex={hasMultiple ? 0 : undefined}
      onKeyDown={(event) => {
        if (!hasMultiple) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
      }}
      aria-label={hasMultiple ? "Choose a note" : "Featured note"}
    >
      <div className="note-picker-stage" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            className="note-picker-card"
            key={activeNote.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: -1.8 }}
            animate={{ opacity: 1, y: 0, rotate: -0.5 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18, rotate: 1.2 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/notes/${activeNote.slug}`}>
              <span className="note-picker-meta mono">
                <span>{activeNote.type}</span>
                <span>{activeNote.date}</span>
              </span>
              <span className="note-picker-status mono">Featured note</span>
              <h2>{activeNote.title}</h2>
              <p>{activeNote.description}</p>
              <span className="note-picker-link">Read the note</span>
            </Link>
          </motion.article>
        </AnimatePresence>
      </div>

      {hasMultiple ? (
        <div className="note-picker-controls" aria-label="Note picker controls">
          <button type="button" onClick={() => move(-1)}>Previous</button>
          <span className="mono" aria-live="polite">{activeIndex + 1} of {items.length}</span>
          <button type="button" onClick={() => move(1)}>Next</button>
        </div>
      ) : (
        <p className="note-picker-caption mono">First published note</p>
      )}
    </div>
  );
}
