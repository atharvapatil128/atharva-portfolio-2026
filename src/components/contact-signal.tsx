"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export function ContactSignal() {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const x = useSpring(useTransform(px, [0, 1], [-34, 34]), { stiffness: 180, damping: 24 });
  const y = useSpring(useTransform(py, [0, 1], [-26, 26]), { stiffness: 180, damping: 24 });

  return (
    <motion.div
      className="contact-signal"
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const box = event.currentTarget.getBoundingClientRect();
        px.set((event.clientX - box.left) / box.width);
        py.set((event.clientY - box.top) / box.height);
      }}
      onPointerLeave={() => { px.set(0.5); py.set(0.5); }}
    >
      <span className="mono"><i aria-hidden="true" /> SIGNAL / AVAILABLE</span>
      <div className="signal-orbits" aria-hidden="true"><b /><b /><b /></div>
      <motion.div className="signal-kart" style={reduceMotion ? undefined : { x, y }} aria-hidden="true">
        <span /><span /><strong>AP</strong>
      </motion.div>
      <strong>MOVE THE SIGNAL · START A CONVERSATION</strong>
    </motion.div>
  );
}
