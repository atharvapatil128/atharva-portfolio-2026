"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const stages = ["Research", "Constraints", "Decisions", "Prototype", "Interface"];

export function ShowcaseHero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="showcase-hero section-pad" aria-labelledby="showcase-title">
      <div className="showcase-copy">
        <p className="availability-line mono"><i aria-hidden="true" />AVAILABLE FOR PRODUCT DESIGN ROLES · 2026</p>
        <h1 id="showcase-title">I turn complex systems<br />into clear decisions.</h1>
        <p>Product designer shaping dependable consumer and enterprise experiences.</p>
        <div className="hero-actions"><Link className="button button-signal" href="#selected-work">View selected work</Link><Link className="button button-quiet" href="/resume">Résumé</Link></div>
      </div>
      <div className="showcase-field" aria-label="An interactive view of the design process">
        <div className="showcase-line" aria-hidden="true" />
        {stages.map((stage, index) => <div className="showcase-stage" key={stage}><span className="mono">0{index + 1}</span><strong>{stage}</strong><i /></div>)}
        <motion.div className="showcase-marker" drag={reduceMotion ? false : "x"} dragConstraints={{ left: -270, right: 270 }} dragSnapToOrigin whileDrag={{ scale: 1.08 }} aria-hidden="true"><b />AP</motion.div>
        <span className="showcase-hint mono">DRAG THE SIGNAL THROUGH THE PROCESS</span>
      </div>
      <div className="showcase-meta mono"><span>BASED IN INDIANAPOLIS</span><span>OPEN TO RELOCATE</span><Link href="/">VIEW LAYOUT A ↗</Link></div>
    </section>
  );
}
