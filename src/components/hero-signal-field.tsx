"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; phase: number; tone: 0 | 1 | 2 };

export function HeroSignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let points: Point[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let visible = true;

    const build = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const gap = width < 700 ? 20 : 18;
      const startX = width < 700 ? width * 0.38 : width * 0.44;
      points = [];
      for (let y = gap; y < height; y += gap) {
        for (let x = startX; x < width; x += gap) {
          const column = Math.floor(x / gap);
          const row = Math.floor(y / gap);
          const tone = ((column + row * 2) % 31 === 0 ? 1 : (column * 3 + row) % 43 === 0 ? 2 : 0) as 0 | 1 | 2;
          points.push({ x, y, phase: column * 0.21 + row * 0.34, tone });
        }
      }
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      if (!visible) return;
      const t = reducedMotion ? 0 : time * 0.00032;

      for (const point of points) {
        const driftX = reducedMotion ? 0 : Math.sin(t + point.phase) * 1.6;
        const driftY = reducedMotion ? 0 : Math.cos(t * 0.82 + point.phase) * 2.2;
        const focusX = Math.max(0, 1 - Math.abs(point.x / width - 0.78) * 2.4);
        const focusY = Math.max(0, 1 - Math.abs(point.y / height - 0.52) * 1.75);
        const focus = focusX * focusY;
        const radius = 0.9 + focus * 0.42;

        context.beginPath();
        context.arc(point.x + driftX, point.y + driftY, radius, 0, Math.PI * 2);
        context.fillStyle = point.tone === 1
          ? `rgba(255,90,24,${0.09 + focus * 0.07})`
          : point.tone === 2
            ? `rgba(54,93,228,${0.065 + focus * 0.055})`
            : `rgba(17,19,24,${0.032 + focus * 0.035})`;
        context.fill();
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      build();
      if (reducedMotion) draw();
    });
    const viewportObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible && !reducedMotion) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      } else if (visible) draw();
      else cancelAnimationFrame(frame);
    }, { threshold: 0.01 });

    resizeObserver.observe(canvas);
    viewportObserver.observe(canvas);
    build();
    draw();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewportObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-signal-field" aria-hidden="true" />;
}
