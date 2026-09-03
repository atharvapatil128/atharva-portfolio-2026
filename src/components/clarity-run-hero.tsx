"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { SectionLink } from "@/components/section-link";

type FragmentConfig = {
  kind: "line" | "block" | "note";
  tone: "ink" | "cobalt" | "signal" | "fog";
  start: [number, number];
  end: [number, number];
  rotate: number;
  depth: number;
};

const fragments: FragmentConfig[] = [
  { kind: "note", tone: "fog", start: [7, 16], end: [10, 57], rotate: -11, depth: 9 },
  { kind: "block", tone: "cobalt", start: [35, 10], end: [24, 57], rotate: 8, depth: 13 },
  { kind: "line", tone: "ink", start: [63, 20], end: [37, 57], rotate: -15, depth: 7 },
  { kind: "block", tone: "signal", start: [81, 34], end: [49, 57], rotate: 13, depth: 16 },
  { kind: "note", tone: "fog", start: [18, 79], end: [61, 57], rotate: 9, depth: 10 },
  { kind: "line", tone: "cobalt", start: [47, 84], end: [70, 57], rotate: -9, depth: 14 },
  { kind: "block", tone: "ink", start: [72, 76], end: [77, 57], rotate: 16, depth: 8 },
];

function SignalFragment({
  config,
  progress,
  pointerX,
  pointerY,
}: {
  config: FragmentConfig;
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const left = useTransform(progress, [0, 0.18, 0.82], [`${config.start[0]}%`, `${config.start[0]}%`, `${config.end[0]}%`]);
  const top = useTransform(progress, [0, 0.18, 0.82], [`${config.start[1]}%`, `${config.start[1]}%`, `${config.end[1]}%`]);
  const rotate = useTransform(progress, [0, 0.82], [config.rotate, 0]);
  const x = useTransform(pointerX, [-1, 1], [-config.depth, config.depth]);
  const y = useTransform(pointerY, [-1, 1], [-config.depth * 0.55, config.depth * 0.55]);

  return (
    <motion.span
      className={`clarity-fragment clarity-fragment-${config.kind} clarity-fragment-${config.tone}`}
      style={{ left, top, rotate, x, y }}
    />
  );
}

export function ClarityRunHero() {
  const shellRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, { stiffness: 120, damping: 24, mass: 0.5 });
  const pointerY = useSpring(rawPointerY, { stiffness: 120, damping: 24, mass: 0.5 });
  const progress = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: shellRef, offset: ["start start", "end end"] });
  const carLeft = useTransform(progress, [0, 0.82], [4, 43]);
  const carRotate = useTransform(progress, [0, 0.82], [-7, 0]);
  const trackScale = useTransform(progress, [0.14, 0.82], [0.08, 1]);
  const resolvedOpacity = useTransform(progress, [0.56, 0.86], [0.42, 1]);
  const resolvedY = useTransform(progress, [0.56, 0.86], [18, 0]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 920px), (pointer: coarse)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion || compact) {
      progress.set(1);
      return;
    }

    progress.set(scrollYProgress.get());
    return scrollYProgress.on("change", (value) => progress.set(value));
  }, [compact, progress, reduceMotion, scrollYProgress]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (compact || reduceMotion || !fieldRef.current) return;
    const bounds = fieldRef.current.getBoundingClientRect();
    rawPointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    rawPointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    rawPointerX.set(0);
    rawPointerY.set(0);
  };

  return (
    <section className="clarity-run-shell" ref={shellRef} aria-labelledby="clarity-run-title">
      <div className="clarity-run-stage section-pad">
        <div className="clarity-run-copy">
          <h1 id="clarity-run-title">I take fuzzy problems all the way to something people can use.</h1>
          <p>I&apos;m Atharva, a product designer with a background in HCI and computer science. I research, prototype, test, and sometimes write the front end too.</p>
          <p className="availability-line mono"><i aria-hidden="true" />AVAILABLE FOR PRODUCT DESIGN ROLES · 2026</p>
          <div className="hero-actions">
            <SectionLink className="button button-signal" href="#selected-work">View selected work</SectionLink>
            <Link className="button button-quiet" href="/resume">Résumé</Link>
          </div>
          <div className="hero-meta mono"><span>BASED IN INDIANAPOLIS</span><span>OPEN TO RELOCATE</span></div>
        </div>

        <div
          className="clarity-run-field"
          ref={fieldRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          aria-hidden="true"
        >
          <motion.div className="clarity-track" style={{ scaleX: trackScale }} />
          {fragments.map((fragment, index) => (
            <SignalFragment key={`${fragment.kind}-${index}`} config={fragment} progress={progress} pointerX={pointerX} pointerY={pointerY} />
          ))}
          <motion.div className="clarity-car" style={{ left: useTransform(carLeft, (value) => `${value}%`), rotate: carRotate }}>
            <Image src="/images/clarity-run/f1-cutout.png" alt="" width={1536} height={1024} priority />
          </motion.div>
          <motion.div className="clarity-output" style={{ opacity: resolvedOpacity, y: resolvedY }}>
            <span className="mono">CLARITY / READY</span>
            <strong>Something people can use.</strong>
            <span className="clarity-output-line"><i /><i /><i /></span>
          </motion.div>
          <p className="clarity-run-hint mono">SCROLL TO RESOLVE · MOVE TO INSPECT</p>
        </div>
      </div>
    </section>
  );
}
