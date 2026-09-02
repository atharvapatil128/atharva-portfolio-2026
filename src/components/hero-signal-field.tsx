"use client";

import { useEffect, useRef } from "react";

type SignalBar = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  baseHeight: number;
  phase: number;
  tone: 0 | 1 | 2 | 3;
};

type WakeBar = { x: number; y: number; vx: number; vy: number; offsetX: number; offsetY: number; phase: number };

const fallbackClusters = [
  { x: -0.09, y: 0.17, columns: 15, rows: 4, gapX: 11, gapY: 14 },
  { x: 0.34, y: 0.055, columns: 10, rows: 3, gapX: 12, gapY: 14 },
  { x: 0.83, y: 0.045, columns: 12, rows: 4, gapX: 11, gapY: 14 },
  { x: 0.925, y: 0.46, columns: 7, rows: 7, gapX: 12, gapY: 14 },
  { x: 0.44, y: 0.76, columns: 12, rows: 4, gapX: 11, gapY: 14 },
  { x: -0.025, y: 0.84, columns: 8, rows: 3, gapX: 12, gapY: 14 },
] as const;

const compactClusters = [
  { x: 0.62, y: 0.035, columns: 8, rows: 2, gapX: 10, gapY: 13 },
  { x: -0.06, y: 0.56, columns: 7, rows: 2, gapX: 10, gapY: 13 },
  { x: 0.82, y: 0.9, columns: 7, rows: 3, gapX: 10, gapY: 13 },
] as const;

const palette = ["#365de4", "#ff5a18", "#d6ff63", "#858b96"] as const;

export function HeroSignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false, strength: 0 };
    let width = 0;
    let height = 0;
    let ratio = 1;
    let bars: SignalBar[] = [];
    let wake: WakeBar[] = [];
    let frame = 0;
    let visible = true;

    const chooseTone = (column: number, row: number, cluster: number): 0 | 1 | 2 | 3 => {
      const key = column * 11 + row * 17 + cluster * 23;
      if (key % 31 === 0) return 1;
      if (key % 43 === 0) return 2;
      if (key % 7 === 0) return 3;
      return 0;
    };

    const build = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      bars = [];
      const headline = canvas.closest(".hero")?.querySelector("h1")?.getBoundingClientRect();
      const localHeadline = headline ? {
        left: headline.left - box.left,
        right: headline.right - box.left,
        top: headline.top - box.top,
        bottom: headline.bottom - box.top,
      } : null;
      const layoutClusters = width < 700
        ? compactClusters.map((cluster) => ({ ...cluster, x: cluster.x * width, y: cluster.y * height }))
        : localHeadline
          ? [
              { x: localHeadline.left - 74, y: localHeadline.top + 38, columns: 5, rows: 4, gapX: 10, gapY: 13 },
              { x: localHeadline.left + 158, y: localHeadline.top - 62, columns: 10, rows: 3, gapX: 11, gapY: 13 },
              { x: localHeadline.right + 26, y: localHeadline.top + 12, columns: 8, rows: 3, gapX: 11, gapY: 13 },
              { x: localHeadline.right + 22, y: localHeadline.bottom - 42, columns: 6, rows: 4, gapX: 11, gapY: 13 },
            ]
          : fallbackClusters.map((cluster) => ({ ...cluster, x: cluster.x * width, y: cluster.y * height }));
      layoutClusters.forEach((cluster, clusterIndex) => {
        for (let row = 0; row < cluster.rows; row += 1) {
          for (let column = 0; column < cluster.columns; column += 1) {
            const homeX = cluster.x + column * cluster.gapX;
            const homeY = cluster.y + row * cluster.gapY;
            if (homeX < -8 || homeX > width + 8 || homeY < -8 || homeY > height + 8) continue;
            bars.push({
              x: homeX,
              y: homeY,
              homeX,
              homeY,
              vx: 0,
              vy: 0,
              baseHeight: 5 + ((column + row * 2 + clusterIndex) % 4) * 2.2,
              phase: column * 0.48 + row * 0.72 + clusterIndex,
              tone: chooseTone(column, row, clusterIndex),
            });
          }
        }
      });

      const wakeColumns = 7;
      const wakeRows = 5;
      wake = [];
      for (let row = 0; row < wakeRows; row += 1) {
        for (let column = 0; column < wakeColumns; column += 1) {
          const offsetX = (column - (wakeColumns - 1) / 2) * 11;
          const offsetY = (row - (wakeRows - 1) / 2) * 13;
          wake.push({ x: width / 2, y: height / 2, vx: 0, vy: 0, offsetX, offsetY, phase: column * 0.7 + row * 0.4 });
        }
      }
      if (reduced || coarse) requestAnimationFrame(() => draw(performance.now()));
    };

    const roundedBar = (x: number, y: number, barWidth: number, barHeight: number, color: string, alpha: number) => {
      context.globalAlpha = Math.max(0, Math.min(1, alpha));
      context.fillStyle = color;
      context.beginPath();
      context.roundRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, Math.min(2, barWidth / 2));
      context.fill();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      if (!visible) return;
      const seconds = time * 0.001;
      pointer.x += (pointer.targetX - pointer.x) * 0.2;
      pointer.y += (pointer.targetY - pointer.y) * 0.2;
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.09;

      for (const bar of bars) {
        const ambientX = reduced ? 0 : Math.sin(seconds * 1.3 + bar.phase) * 1.7;
        const ambientY = reduced ? 0 : Math.cos(seconds * 1.05 + bar.phase) * 2.4;
        const dx = bar.x - pointer.x;
        const dy = bar.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const reach = 155;
        const proximity = pointer.strength * Math.max(0, 1 - distance / reach);
        const force = proximity * proximity * 3.6;
        bar.vx += (bar.homeX + ambientX - bar.x) * 0.055 + (dx / distance) * force;
        bar.vy += (bar.homeY + ambientY - bar.y) * 0.055 + (dy / distance) * force;
        bar.vx *= 0.82;
        bar.vy *= 0.82;
        bar.x += bar.vx;
        bar.y += bar.vy;
        const speed = Math.min(1, Math.sqrt(bar.vx * bar.vx + bar.vy * bar.vy) / 4);
        const barHeight = bar.baseHeight + proximity * 22 + speed * 6;
        const alpha = 0.34 + (bar.tone === 0 ? 0.28 : 0.18) + proximity * 0.32;
        roundedBar(bar.x, bar.y, 4, barHeight, palette[bar.tone], alpha);
      }

      wake.forEach((bar, index) => {
        const lag = 0.035 + (index % 7) * 0.004;
        const targetX = pointer.x + bar.offsetX + Math.sin(seconds * 2 + bar.phase) * 2;
        const targetY = pointer.y + bar.offsetY + Math.cos(seconds * 1.7 + bar.phase) * 2;
        bar.vx += (targetX - bar.x) * lag;
        bar.vy += (targetY - bar.y) * lag;
        bar.vx *= 0.76;
        bar.vy *= 0.76;
        bar.x += bar.vx;
        bar.y += bar.vy;
        const centerDistance = Math.sqrt(bar.offsetX * bar.offsetX + bar.offsetY * bar.offsetY);
        const centerWeight = Math.max(0.18, 1 - centerDistance / 72);
        const tone = index % 17 === 0 ? 1 : index % 23 === 0 ? 2 : 0;
        roundedBar(bar.x, bar.y, 4, 8 + centerWeight * 18, palette[tone], pointer.strength * (0.22 + centerWeight * 0.55));
      });
      context.globalAlpha = 1;
      if (!reduced && !coarse) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (coarse) return;
      const box = canvas.getBoundingClientRect();
      const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
      pointer.active = inside;
      if (!inside) return;
      pointer.targetX = event.clientX - box.left;
      pointer.targetY = event.clientY - box.top;
      if (pointer.x === 0 && pointer.y === 0) { pointer.x = pointer.targetX; pointer.y = pointer.targetY; }
    };
    const onPointerOut = (event: PointerEvent) => { if (!event.relatedTarget) pointer.active = false; };
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && (reduced || coarse)) draw(performance.now());
      else if (visible) { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); }
    };
    const viewportObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible && (reduced || coarse)) draw(performance.now());
      else if (visible) { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); }
      else cancelAnimationFrame(frame);
    }, { threshold: 0.01 });
    const resizeObserver = new ResizeObserver(build);

    resizeObserver.observe(canvas);
    viewportObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    build();
    if (!reduced && !coarse) frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewportObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-signal-field" aria-hidden="true" />;
}
