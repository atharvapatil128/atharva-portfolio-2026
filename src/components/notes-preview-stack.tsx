"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import styles from "./notes-preview-stack.module.css";

type NotePreview = {
  readonly type: string;
  readonly date: string;
  readonly title: string;
  readonly description: string;
  readonly slug: string;
};

export function NotesPreviewStack({ notes }: { notes: readonly NotePreview[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.stack} aria-label="Recent notes">
      {notes.map((note, index) => (
        <motion.div
          className={index === 0 ? styles.front : styles.back}
          initial={reduceMotion ? false : { y: 34 }}
          animate={reduceMotion ? undefined : { y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          key={note.slug}
        >
          <Link className={styles.sheet} href={`/notes/${note.slug}`}>
            <span className={styles.tab} aria-hidden="true" />
            <span className={`${styles.meta} mono`}><span>{note.type}</span><span>{note.date}</span></span>
            <span className={styles.rule} aria-hidden="true" />
            <strong>{note.title}</strong>
            <p>{note.description}</p>
            <span className={`${styles.action} mono`}>Read note <span aria-hidden="true">↗</span></span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
