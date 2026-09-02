"use client";

import { useEffect, useRef } from "react";

type DotFieldVariant = "about" | "contact" | "notes" | "resume";

const seeds: Record<DotFieldVariant, number> = {
  about: 13,
  contact: 29,
  notes: 47,
  resume: 71,
};

const clusterSets: Record<DotFieldVariant, Array<[number, number, number, number]>> = {
  about: [[0.1, 0.15, 0.23, 0.24], [0.88, 0.76, 0.2, 0.28]],
  contact: [[0.92, 0.12, 0.25, 0.24], [0.12, 0.82, 0.22, 0.26]],
  notes: [[0.12, 0.18, 0.25, 0.22], [0.82, 0.22, 0.24, 0.25], [0.52, 0.9, 0.26, 0.18]],
  resume: [[0.84, 0.14, 0.28, 0.22], [0.2, 0.84, 0.25, 0.24]],
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function IntroDotField({ variant }: { variant: DotFieldVariant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = () => {
      const box = canvas.getBoundingClientRect();
      const width = box.width;
      const height = box.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const random = seededRandom(seeds[variant]);
      const spacing = width < 760 ? 17 : 19;
      const clusters = clusterSets[variant];

      for (let y = -spacing; y < height + spacing; y += spacing) {
        for (let x = -spacing; x < width + spacing; x += spacing) {
          const normalizedX = x / Math.max(1, width);
          const normalizedY = y / Math.max(1, height);
          let density = 0;

          for (const [centerX, centerY, radiusX, radiusY] of clusters) {
            const dx = (normalizedX - centerX) / radiusX;
            const dy = (normalizedY - centerY) / radiusY;
            density = Math.max(density, Math.exp(-(dx * dx + dy * dy) * 1.65));
          }

          const contour = 0.78 + Math.sin(normalizedX * 16 + normalizedY * 9 + seeds[variant]) * 0.16;
          density *= contour;
          if (random() > density * 0.74) continue;

          const dotX = x + (random() - 0.5) * 3.5;
          const dotY = y + (random() - 0.5) * 3.5;
          const accentChance = random();
          const color = accentChance > 0.985 ? "54, 93, 228" : accentChance < 0.012 ? "255, 90, 24" : "17, 19, 24";
          const alpha = color === "17, 19, 24" ? 0.035 + density * 0.075 : 0.11;
          const radius = 0.65 + random() * 0.7;

          context.beginPath();
          context.fillStyle = `rgba(${color}, ${alpha})`;
          context.arc(dotX, dotY, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    return () => observer.disconnect();
  }, [variant]);

  return <canvas ref={canvasRef} className="intro-dot-field" aria-hidden="true" />;
}
