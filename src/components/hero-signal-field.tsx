"use client";

import { useEffect, useRef } from "react";

type SignalPoint = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  tone: 0 | 1 | 2;
  looseness: number;
};

const palette = ["17,19,24", "255,90,24", "54,93,228"] as const;

const seeded = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const smoothstep = (value: number) => {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
};

export function HeroSignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    let points: SignalPoint[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let visible = true;
    let startTime = performance.now();
    const pointer = { x: 0, y: 0, active: false };

    const build = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const compact = width < 760;
      const startX = width * (compact ? 0.58 : 0.69);
      const endX = width * 0.985;
      const step = compact ? 13 : 14;
      const rowGap = compact ? 31 : 43;
      const centerY = height * (compact ? 0.79 : 0.62);
      const nextPoints: SignalPoint[] = [];
      let index = 0;

      for (let row = 0; row < 3; row += 1) {
        const rowY = centerY + (row - 1) * rowGap;
        for (let x = startX; x <= endX; x += step) {
          const progress = (x - startX) / Math.max(1, endX - startX);
          const looseness = smoothstep((progress - 0.78) / 0.22);
          const seed = index + row * 101;
          const scatterX = (seeded(seed + 2) - 0.5) * step * 1.15 * looseness;
          const scatterY = (seeded(seed + 7) - 0.5) * (compact ? 88 : 150) * looseness;
          const targetX = x + scatterX;
          const targetY = rowY + scatterY;
          const startScatter = compact ? 48 : 92;
          const startPointX = targetX + (seeded(seed + 13) - 0.5) * startScatter;
          const startPointY = targetY + (seeded(seed + 19) - 0.5) * startScatter;
          const isDecisionPoint = row === 1 && progress < 0.08;
          const tone = (
            isDecisionPoint
              ? 1
              : row === 1 && seed % 4 === 0
                ? 1
                : row === 2 && seed % 3 === 0
                  ? 2
                  : 0
          ) as 0 | 1 | 2;

          nextPoints.push({
            startX: startPointX,
            startY: startPointY,
            targetX,
            targetY,
            x: startPointX,
            y: startPointY,
            vx: 0,
            vy: 0,
            radius: isDecisionPoint ? 3.1 : 2.15 + seeded(seed + 29) * 0.6,
            alpha: (isDecisionPoint ? 1 : 0.64 + (1 - looseness) * 0.2) * (0.9 + seeded(seed + 31) * 0.1),
            phase: seeded(seed + 37) * Math.PI * 2,
            tone,
            looseness,
          });
          index += 1;
        }
      }

      points = nextPoints;
      startTime = performance.now();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      if (!visible) return;

      const elapsed = Math.max(0, time - startTime);
      const entrance = reducedMotion ? 1 : 1 - Math.exp(-elapsed / 420);
      const driftTime = time * 0.00055;

      for (const point of points) {
        const baseX = point.startX + (point.targetX - point.startX) * entrance;
        const baseY = point.startY + (point.targetY - point.startY) * entrance;
        const drift = reducedMotion ? 0 : point.looseness;
        let desiredX = baseX + Math.sin(driftTime + point.phase) * 2.4 * drift;
        let desiredY = baseY + Math.cos(driftTime * 0.86 + point.phase) * 3.6 * drift;

        if (pointer.active && !coarsePointer && !reducedMotion) {
          const dx = desiredX - pointer.x;
          const dy = desiredY - pointer.y;
          const distance = Math.hypot(dx, dy);
          const influence = Math.max(0, 1 - distance / 94);
          if (influence > 0 && distance > 0.1) {
            desiredX += (dx / distance) * influence * 22;
            desiredY += (dy / distance) * influence * 22;
          }
        }

        point.vx = (point.vx + (desiredX - point.x) * 0.075) * 0.76;
        point.vy = (point.vy + (desiredY - point.y) * 0.075) * 0.76;
        point.x += point.vx;
        point.y += point.vy;

        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${palette[point.tone]},${point.alpha * entrance})`;
        context.fill();
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
      pointer.active = pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height;
    };
    const onPointerLeave = () => { pointer.active = false; };

    const resizeObserver = new ResizeObserver(() => {
      build();
      if (reducedMotion) draw(performance.now());
    });
    const viewportObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible && !reducedMotion) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      } else if (visible) draw(performance.now());
      else cancelAnimationFrame(frame);
    }, { threshold: 0.01 });

    resizeObserver.observe(canvas);
    viewportObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    build();
    draw(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewportObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-signal-field" aria-hidden="true" />;
}
