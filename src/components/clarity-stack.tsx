"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function ClarityStack() {
  const [separated, setSeparated] = useState(false);
  const reduceMotion = useReducedMotion();
  const spring = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 320, damping: 28 };
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion || !stackRef.current) return;
    const specifications = [
      [".stack-research", "translate(-58px, 20px) rotate(-2deg)", "translate(0, 0) rotate(7deg)", 100],
      [".stack-constraints", "translate(58px, -34px) rotate(2deg)", "translate(0, 0) rotate(-7deg)", 170],
      [".stack-decisions", "translate(66px, 38px) rotate(0deg)", "translate(0, 0) rotate(5deg)", 240],
      [".resolved-card", "translateY(28px) scale(.96)", "translateY(0) scale(1)", 310],
    ] as const;
    const animations = specifications.flatMap(([selector, from, to, delay]) => {
      const element = stackRef.current?.querySelector<HTMLElement>(selector);
      if (!element) return [];
      return [element.animate(
        [
          { opacity: 0.68, transform: from },
          { opacity: 1, transform: to },
        ],
        { duration: 580, delay, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      )];
    });
    return () => animations.forEach((animation) => animation.cancel());
  }, [reduceMotion]);

  return (
    <div className="clarity-stack" data-separated={separated} ref={stackRef}>
      <motion.div
        className="stack-layer stack-research"
        animate={separated ? { x: -58, y: -20, rotate: -3, opacity: 1, filter: "blur(0px)" } : { x: 0, y: 0, rotate: 7, opacity: 1, filter: "blur(0px)" }}
        transition={spring}
      >
        <span>CASE STUDY / STREAMING HELPER</span>
        <Link href="/work/streaming-helper">Choosing together, faster <b>↗</b></Link>
      </motion.div>

      <motion.div
        className="stack-layer stack-constraints"
        animate={separated ? { x: 56, y: -42, rotate: 3, opacity: 1, filter: "blur(0px)" } : { x: 0, y: 0, rotate: -7, opacity: 1, filter: "blur(0px)" }}
        transition={spring}
      >
        <span>CASE STUDY / MEAD</span>
        <Link href="/work/mead">Care, made more legible <b>↗</b></Link>
      </motion.div>

      <motion.div
        className="stack-layer stack-decisions"
        animate={separated ? { x: 72, y: 52, rotate: -2, opacity: 1, filter: "blur(0px)" } : { x: 0, y: 0, rotate: 5, opacity: 1, filter: "blur(0px)" }}
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
