"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Drift is how far each object lags the scroll, in px, across the hero's exit.
 * Heavier cropped objects lag further so the composition separates gently
 * instead of moving as one flat plate.
 */
const objects = [
  { name: "laptop", src: "/images/notes-objects/laptop.webp", width: 1040, height: 960, drift: 40 },
  { name: "keyboard", src: "/images/notes-objects/keyboard-cutout.png", width: 1240, height: 800, drift: 30 },
  { name: "car", src: "/images/notes-objects/f1-model.webp", width: 1270, height: 880, drift: 22 },
  { name: "binder", src: "/images/notes-objects/binder-clip-clean.png", width: 470, height: 630, drift: 14 },
  { name: "paperclip", src: "/images/notes-objects/paperclip.webp", width: 360, height: 680, drift: 10 },
] as const;

type HeroObject = (typeof objects)[number];

function HeroObjectLayer({ object, progress, scale }: { object: HeroObject; progress: MotionValue<number>; scale: number }) {
  const y = useTransform(progress, [0, 1], [0, object.drift * scale]);

  return (
    <motion.div className="hero-object-layer" style={{ y }}>
      <Image
        className={`hero-object hero-object-${object.name}`}
        src={object.src}
        alt=""
        width={object.width}
        height={object.height}
        loading="eager"
        unoptimized
        draggable={false}
      />
    </motion.div>
  );
}

export function HeroObjects() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const scale = reduceMotion ? 0 : compact ? 0.45 : 1;

  return (
    <div className="hero-objects" ref={ref} aria-hidden="true">
      {objects.map((object) => (
        <HeroObjectLayer key={object.name} object={object} progress={scrollYProgress} scale={scale} />
      ))}
    </div>
  );
}
