"use client";

import Image from "next/image";
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
        className="featured-project-window featured-project-window-main"
        initial={reduceMotion ? false : { x: 26, y: 18, rotate: 1.4 }}
        animate={{ x: 0, y: 0, rotate: -0.8 }}
        transition={{ ...transition, delay: reduceMotion ? 0 : 0.08 }}
      >
        <Link href="/work/streaming-helper" aria-label="View the Streaming Helper case study">
          <Image
            src="/images/streaming-helper/product-home-hd.png"
            alt="Streaming Helper product home showing recommendations and shared picks"
            fill
            priority
            sizes="(max-width: 760px) 92vw, (max-width: 1100px) 560px, 620px"
          />
        </Link>
      </motion.div>

      <motion.div
        className="featured-project-window featured-project-window-extension"
        initial={reduceMotion ? false : { x: -18, y: 34, rotate: -4 }}
        animate={{ x: 0, y: 0, rotate: 2.5 }}
        transition={{ ...transition, delay: reduceMotion ? 0 : 0.14 }}
        aria-hidden="true"
      >
        <Image
          src="/images/streaming-helper/extension-ready-hd.png"
          alt=""
          fill
          priority
          sizes="180px"
        />
      </motion.div>

      <motion.article
        className="featured-project-proof"
        initial={reduceMotion ? false : { y: 42, rotate: -2 }}
        animate={{ y: 0, rotate: -0.6 }}
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
