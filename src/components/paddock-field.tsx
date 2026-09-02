"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const fragments = [
  { label: "BUILD LOG", count: "01 / 05", title: "Designing this site with AI", detail: "The decisions, misses, and human taste behind the build.", href: "/notes/building-this-portfolio", tone: "light", visual: "build" },
  { label: "TRACK NOTES", count: "02 / 05", title: "Learning through karting", detail: "Fast feedback, clear signals, and committing to a line.", href: "/notes/karting-and-feedback", tone: "dark", visual: "track" },
  { label: "OUTSIDE", count: "03 / 05", title: "Running, trails, and open air", detail: "Long efforts teach patience with incomplete information.", href: "/about", tone: "outdoors", visual: "outside" },
  { label: "RACE WEEKEND", count: "04 / 05", title: "Clean lines over late corrections", detail: "A field note on systems that reward early clarity.", href: "/notes/karting-and-feedback", tone: "cobalt", visual: "race" },
  { label: "FIELD NOTES", count: "05 / 05", title: "Travel as a way to notice systems", detail: "New contexts expose invisible assumptions.", href: "/about", tone: "oat", visual: "travel" },
] as const;

export function PaddockField() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [leftLimit, setLeftLimit] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return;
      const limit = Math.min(0, viewportRef.current.clientWidth - trackRef.current.scrollWidth);
      setLeftLimit(limit);
      if (x.get() < limit) x.set(limit);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [x]);

  const nudge = (direction: -1 | 1) => {
    const next = Math.max(leftLimit, Math.min(0, x.get() + direction * 344));
    if (reducedMotion) x.set(next);
    else animate(x, next, { type: "spring", stiffness: 340, damping: 36 });
  };

  return (
    <div
      className="paddock-viewport"
      ref={viewportRef}
      tabIndex={0}
      role="region"
      aria-label="Personal notes and experiments. Use left and right arrow keys to explore."
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); nudge(-1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); nudge(1); }
      }}
    >
      <motion.div
        className="paddock-track"
        ref={trackRef}
        style={{ x }}
        drag={reducedMotion ? false : "x"}
        dragConstraints={{ left: leftLimit, right: 0 }}
        dragElastic={0.08}
        dragMomentum
      >
        {fragments.map((fragment) => (
          <Link key={fragment.label} href={fragment.href} className={`paddock-tile tone-${fragment.tone}`}>
            <div className="paddock-top mono"><span>{fragment.label}</span><span>{fragment.count}</span></div>
            <div className={`paddock-visual visual-${fragment.visual}`} aria-hidden="true"><i /><i /><i /></div>
            <h3>{fragment.title}</h3>
            <p>{fragment.detail}</p>
            <span className="paddock-open mono">OPEN ↗</span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
