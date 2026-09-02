"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; phase: number; speed: number; tone: 0 | 1 | 2 };

export function FooterSignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.68, y: 0.48, active: false };
    let points: Point[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;

    const build = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const gap = width < 700 ? 18 : 16;
      points = [];
      for (let y = gap; y < height; y += gap) {
        for (let x = gap; x < width; x += gap) {
          const nx = x / width;
          const ny = y / height;
          const tone = ((Math.floor(x / gap) + Math.floor(y / gap) * 2) % 17 === 0 ? 1 : (Math.floor(x / gap) * 3 + Math.floor(y / gap)) % 29 === 0 ? 2 : 0) as 0 | 1 | 2;
          points.push({ x: nx, y: ny, phase: nx * 5.8 + ny * 3.1, speed: 0.65 + ny * 0.45, tone });
        }
      }
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const t = reduceMotion ? 0.9 : time * 0.00055;
      for (const point of points) {
        const baseX = point.x * width;
        const baseY = point.y * height;
        const wave = Math.sin(t * point.speed + point.phase) * (5 + point.y * 8);
        const px = pointer.x * width;
        const py = pointer.y * height;
        const dx = baseX - px;
        const dy = baseY - py;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = pointer.active ? Math.max(0, 1 - distance / 150) : 0;
        const x = baseX + wave * 0.35 + (distance ? (dx / distance) * influence * 20 : 0);
        const y = baseY + Math.cos(t * 0.8 + point.phase) * 3 + (distance ? (dy / distance) * influence * 20 : 0);
        const focus = Math.max(0, 1 - Math.abs(point.x - 0.7) * 2.2);
        const radius = 1.15 + focus * 0.8 + influence * 1.2;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = point.tone === 1 ? `rgba(255,90,24,${0.32 + focus * 0.42})` : point.tone === 2 ? `rgba(54,93,228,${0.24 + focus * 0.34})` : `rgba(17,19,24,${0.08 + focus * 0.14})`;
        context.fill();
      }
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - box.left) / box.width;
      pointer.y = (event.clientY - box.top) / box.height;
      pointer.active = true;
    };
    const onPointerLeave = () => { pointer.active = false; };
    const observer = new ResizeObserver(() => { build(); if (reduceMotion) draw(); });
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    build();
    draw();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="footer-signal-canvas" aria-hidden="true" />;
}
