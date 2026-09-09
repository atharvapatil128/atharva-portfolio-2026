"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const spring = {
  type: "spring" as const,
  stiffness: 180,
  damping: 24,
  mass: 0.8,
};

export function FeaturedProjectArtifact() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : spring;

  return (
    <div className="featured-project-artifact" aria-label="Featured shipped project">
      <motion.div
        className="featured-project-sheet featured-project-sheet-back"
        aria-hidden="true"
        initial={reduceMotion ? false : { x: 0, y: 34, rotate: 0 }}
        animate={{ x: 14, y: -42, rotate: 2.3 }}
        transition={{ ...transition, delay: reduceMotion ? 0 : 0.08 }}
      />
      <motion.div
        className="featured-project-sheet featured-project-sheet-middle"
        aria-hidden="true"
        initial={reduceMotion ? false : { x: 0, y: 38, rotate: 0 }}
        animate={{ x: -10, y: -19, rotate: -1.5 }}
        transition={{ ...transition, delay: reduceMotion ? 0 : 0.14 }}
      />
      <motion.article
        className="featured-project-proof"
        initial={reduceMotion ? false : { y: 42 }}
        animate={{ y: 0 }}
        transition={{ ...transition, delay: reduceMotion ? 0 : 0.2 }}
      >
        <div className="featured-project-meta mono">
          <span>Shipped product</span>
          <span className="featured-project-live"><i aria-hidden="true" />Live</span>
        </div>
        <h2>Streaming Helper</h2>
        <p>Helping tired viewers move from endless browsing to a confident pick.</p>
        <ul className="featured-project-evidence" aria-label="Project research evidence">
          <li><strong>30</strong><span>Survey responses</span></li>
          <li><strong>7</strong><span>Interviews</span></li>
          <li><strong>5+</strong><span>Prototype tests</span></li>
        </ul>
        <div className="featured-project-actions">
          <Link href="/work/streaming-helper">View case study</Link>
          <a href="https://streaminghelper.net/" target="_blank" rel="noreferrer">Open live product</a>
        </div>
      </motion.article>
    </div>
  );
}
