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
        animate={separated ? { x: -58, y: -20, rotate: -3 } : { x: 0, y: 0, rotate: 7 }}
        transition={spring}
      >
        <span>CASE STUDY / STREAMING HELPER</span>
        <Link href="/work/streaming-helper">Choosing together, faster <b>↗</b></Link>
      </motion.div>

      <motion.div
        className="stack-layer stack-constraints"
        animate={separated ? { x: 56, y: -42, rotate: 3 } : { x: 0, y: 0, rotate: -7 }}
        transition={spring}
      >
        <span>CASE STUDY / MEAD</span>
        <Link href="/work/mead">Care, made more legible <b>↗</b></Link>
      </motion.div>

      <motion.div
        className="stack-layer stack-decisions"
        animate={separated ? { x: 72, y: 52, rotate: -2 } : { x: 0, y: 0, rotate: 5 }}
        transition={spring}
      >
        <span>FIELD NOTE / AI WORKFLOW</span>
        <Link href="/notes/building-this-portfolio">Building this portfolio <b>↗</b></Link>
      </motion.div>

      <motion.button
        type="button"
        className="resolved-card"
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
