"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import Link from "next/link";

export function ClarityStack() {
  const [separated, setSeparated] = useState(false);
  const reduceMotion = useReducedMotion();
  const spring = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 320, damping: 28 };

  return (
    <div className="clarity-stack" data-separated={separated}>
      <motion.div
        className="stack-layer stack-research"
        initial={reduceMotion ? false : { x: -72, y: 20, rotate: -2, opacity: 0, filter: "blur(8px)" }}
        animate={separated ? { x: -58, y: -20, rotate: -3, opacity: 1, filter: "blur(0px)" } : { x: 0, y: 0, rotate: 7, opacity: 1, filter: "blur(0px)" }}
        transition={separated ? spring : { ...spring, delay: 0.12 }}
      >
        <span>CASE STUDY / STREAMING HELPER</span>
        <Link href="/work/streaming-helper">Choosing together, faster <b>↗</b></Link>
      </motion.div>

      <motion.div
        className="stack-layer stack-constraints"
        initial={reduceMotion ? false : { x: 70, y: -42, rotate: 2, opacity: 0, filter: "blur(8px)" }}
        animate={separated ? { x: 56, y: -42, rotate: 3, opacity: 1, filter: "blur(0px)" } : { x: 0, y: 0, rotate: -7, opacity: 1, filter: "blur(0px)" }}
        transition={separated ? spring : { ...spring, delay: 0.2 }}
      >
        <span>CASE STUDY / MEAD</span>
        <Link href="/work/mead">Care, made more legible <b>↗</b></Link>
      </motion.div>

      <motion.div
        className="stack-layer stack-decisions"
        initial={reduceMotion ? false : { x: 80, y: 46, rotate: 0, opacity: 0, filter: "blur(8px)" }}
        animate={separated ? { x: 72, y: 52, rotate: -2, opacity: 1, filter: "blur(0px)" } : { x: 0, y: 0, rotate: 5, opacity: 1, filter: "blur(0px)" }}
        transition={separated ? spring : { ...spring, delay: 0.28 }}
      >
        <span>FIELD NOTE / AI WORKFLOW</span>
        <Link href="/notes/building-this-portfolio">Building this portfolio <b>↗</b></Link>
      </motion.div>

      <motion.button
        type="button"
        className="resolved-card"
        initial={reduceMotion ? false : { y: 32, scale: 0.94, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 250, damping: 28, delay: 0.36 }}
        drag={reduceMotion ? false : true}
        dragSnapToOrigin
        dragElastic={0.16}
        whileDrag={{ scale: 1.025, boxShadow: "0 30px 70px rgba(17, 19, 24, 0.24)" }}
        onClick={() => setSeparated((value) => !value)}
        aria-pressed={separated}
        aria-label={separated ? "Resolve the design layers" : "Separate the design layers"}
      >
        <span className="mono">THE CLARITY STACK</span>
        <strong>Three ways in.</strong>
        <p>A shipped product, a care-system case study, and the process behind this site.</p>
        <div className="resolution-line" aria-hidden="true"><i /><i /><i /></div>
        <span className="mono">{separated ? "PRESS TO RESTACK" : "PRESS TO REVEAL"}</span>
      </motion.button>

      <p className="stack-instruction">MOVE TO SEPARATE · LINKS STAY LIVE</p>
    </div>
  );
}
