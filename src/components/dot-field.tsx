"use client";

import { useEffect, useRef } from "react";

type DotFieldVariant = "hero" | "intro" | "footer";

function hash(column: number, row: number, seed: number) {
  const value = Math.sin(column * 12.9898 + row * 78.233 + seed * 37.719) * 43758.5453;
  return value - Math.floor(value);
}

/** One renderer with purpose-built compositions for hero, intro and footer surfaces. */
export function DotField({
  className,
  variant,
  interactive = false,
  seed = 1,
}: {
  className: string;
  variant: DotFieldVariant;
  interactive?: boolean;
  seed?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      strength: 0,
      targetStrength: 0,
    };
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    let ink = "#111318";
    let signal = "#ff5a18";
    let previousTime = 0;

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const moving = !preference.matches;
      const elapsed = previousTime ? Math.min(time - previousTime, 40) : 16;
      previousTime = time;
      const positionEase = 1 - Math.pow(0.0008, elapsed / 1000);
      const strengthEase = 1 - Math.pow(0.006, elapsed / 1000);
      pointer.x += (pointer.targetX - pointer.x) * positionEase;
      pointer.y += (pointer.targetY - pointer.y) * positionEase;
      pointer.strength += (pointer.targetStrength - pointer.strength) * strengthEase;
      const gap = variant === "footer" ? 16 : variant === "hero" ? 18 : 19;
      const startX = variant === "hero" ? width * 0.42 : gap / 2;

      for (let y = gap / 2, row = 0; y < height; y += gap, row++) {
        for (let x = startX, column = 0; x < width; x += gap, column++) {
          const nx = x / Math.max(width, 1);
          const ny = y / Math.max(height, 1);
          const wave = 0.5 + Math.sin(nx * 7.2 + time * 0.00024 + seed) * 0.12;
          const waveBand = Math.exp(-Math.pow((ny - wave) / 0.22, 2));
          const rightFocus = Math.max(0, 1 - Math.abs(nx - 0.78) * 2.25);
          const centerFocus = Math.max(0, 1 - Math.abs(ny - 0.52) * 1.7);
          const introCluster = Math.max(
            Math.exp(-Math.pow((nx - 0.9) / 0.28, 2) - Math.pow((ny - 0.18) / 0.3, 2)),
            Math.exp(-Math.pow((nx - 0.78) / 0.34, 2) - Math.pow((ny - 0.86) / 0.24, 2)),
            Math.exp(-Math.pow((nx - 0.05) / 0.22, 2) - Math.pow((ny - 0.08) / 0.18, 2)) * 0.5,
          );
          const emphasis = variant === "footer"
            ? 0.24 + waveBand * 0.76
            : variant === "hero"
              ? rightFocus * centerFocus
              : introCluster;
          const quietLeft = variant === "intro" && nx < 0.63 && ny > 0.16 && ny < 0.82 ? 0.45 : 1;
          const accent = hash(column, row, seed) > (variant === "footer" ? 0.91 : 0.955);
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const influence = moving && interactive
            ? Math.max(0, 1 - distance / 168) * pointer.strength
            : 0;
          const driftX = moving ? Math.sin(time * 0.00032 + column * 0.22 + row * 0.09) * (variant === "footer" ? 1.2 : 1.05) : 0;
          const driftY = moving ? Math.cos(time * 0.00027 + row * 0.24 + column * 0.07) * (variant === "footer" ? 1.55 : 1.3) : 0;
          const repulseX = distance ? (dx / distance) * influence * 10 : 0;
          const repulseY = distance ? (dy / distance) * influence * 10 : 0;
          const radius = (variant === "footer" ? 1.05 : 0.98) + emphasis * 0.62 + influence * 0.48;

          context.beginPath();
          context.arc(x + driftX + repulseX, y + driftY + repulseY, radius, 0, Math.PI * 2);
          context.fillStyle = accent ? signal : ink;
          const baseAlpha = variant === "footer" ? 0.08 : variant === "hero" ? 0.04 : 0.045;
          const emphasisAlpha = variant === "footer" ? 0.2 : variant === "hero" ? 0.11 : 0.105;
          context.globalAlpha = quietLeft * (baseAlpha + emphasis * emphasisAlpha + (accent ? 0.18 : 0) + influence * 0.08);
          context.fill();
        }
      }

      context.globalAlpha = 1;
      if (visible && !document.hidden && moving) frame = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden) draw();
    };

    const build = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const tokens = getComputedStyle(canvas);
      ink = tokens.getPropertyValue("--dot-ink").trim() || tokens.getPropertyValue("--ink").trim() || ink;
      signal = tokens.getPropertyValue("--dot-signal").trim() || tokens.getPropertyValue("--signal").trim() || signal;
      restart();
    };

    const resize = new ResizeObserver(build);
    const viewport = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    }, { threshold: 0.01 });
    const move = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.targetX = event.clientX - box.left;
      pointer.targetY = event.clientY - box.top;
      pointer.targetStrength = 1;
    };
    const leave = () => { pointer.targetStrength = 0; };

    resize.observe(canvas);
    viewport.observe(canvas);
    build();
    if (interactive) {
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerleave", leave);
    }
    preference.addEventListener("change", restart);
    document.addEventListener("visibilitychange", restart);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      viewport.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      preference.removeEventListener("change", restart);
      document.removeEventListener("visibilitychange", restart);
    };
  }, [interactive, seed, variant]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
