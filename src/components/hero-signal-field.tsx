"use client";

import { useEffect, useRef } from "react";

type Tone = 0 | 1 | 2 | 3 | 4;
type SignalBar = { x: number; y: number; homeX: number; homeY: number; vx: number; vy: number; baseWidth: number; baseHeight: number; baseAlpha: number; phase: number; tone: Tone };

const palette = ["#365de4", "#ff5a18", "#d6ff63", "#9aaeff", "#858b96"] as const;

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
    let frame = 0;
    let visible = true;

    const addBar = (homeX: number, homeY: number, baseWidth: number, baseHeight: number, tone: Tone, baseAlpha: number, phase: number) => {
      if (homeX < 10 || homeX > width - 10 || homeY < 10 || homeY > height - 10) return;
      bars.push({ x: homeX, y: homeY, homeX, homeY, vx: 0, vy: 0, baseWidth, baseHeight, tone, baseAlpha, phase });
    };

    const buildRail = (x: number, y: number, scale = 1) => {
      for (let column = 0; column < 17; column += 1) addBar(x + column * 9 * scale, y, 6 * scale, 8 * scale, column === 15 ? 3 : 0, .62, column * .31);
      for (let column = 0; column < 11; column += 1) addBar(x + (5 + column) * 9 * scale, y + 15 * scale, 6 * scale, 8 * scale, column === 10 ? 3 : 0, .54, 1 + column * .29);
      for (let column = 0; column < 6; column += 1) addBar(x + (column * 3 + 1) * 9 * scale, y + 34 * scale, 2 * scale, 7 * scale, 2, .42, 2 + column);
    };

    const buildCascade = (x: number, y: number, scale = 1) => {
      for (let column = 0; column < 6; column += 1) {
        const count = column < 2 ? column + 1 : Math.max(1, 5 - column);
        for (let row = 0; row < count; row += 1) {
          const tone: Tone = column === 4 && row === 0 ? 1 : row === count - 1 ? 3 : 0;
          addBar(x + column * 12 * scale, y + column * 11 * scale + row * 14 * scale, 4 * scale, (8 + column * 3) * scale, tone, .58, column * .7 + row);
        }
      }
      addBar(x + 16 * scale, y + 52 * scale, 2 * scale, 12 * scale, 2, .5, 6);
      addBar(x + 76 * scale, y + 72 * scale, 2 * scale, 9 * scale, 2, .42, 7);
    };

    const buildTrail = (x: number, y: number, scale = 1) => {
      for (let index = 0; index < 8; index += 1) {
        const tone: Tone = index === 4 ? 1 : index < 6 ? 3 : 0;
        addBar(x + index * 14 * scale, y - Math.sin((index / 7) * Math.PI) * 36 * scale, 5 * scale, (7 + index * 1.8) * scale, tone, .58, index * .8);
      }
      addBar(x - 14 * scale, y + 6 * scale, 2 * scale, 11 * scale, 2, .4, 8);
      addBar(x + 112 * scale, y - 4 * scale, 2 * scale, 8 * scale, 2, .38, 9);
    };

    const buildOrb = (centerX: number, centerY: number, scale = 1) => {
      for (let index = -7; index <= 7; index += 1) {
        const normalized = index / 7;
        const silhouette = Math.sqrt(Math.max(0, 1 - normalized * normalized));
        const barHeight = (20 + silhouette * 70) * scale;
        addBar(centerX + index * 9 * scale + 3 * scale, centerY + 5 * scale, 5 * scale, barHeight * .82, 3, .3, index * .42);
        addBar(centerX + index * 9 * scale, centerY, 6 * scale, barHeight, index === 6 ? 1 : 0, .72, 2 + index * .4);
      }
      for (const index of [-9, -8, 8, 9]) addBar(centerX + index * 9 * scale, centerY, 2 * scale, (18 - Math.abs(index) * .8) * scale, 2, .42, 4 + index);
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
      const local = headline ? { left: headline.left - box.left, right: headline.right - box.left, top: headline.top - box.top, bottom: headline.bottom - box.top } : { left: width * .05, right: width * .46, top: height * .18, bottom: height * .46 };

      if (width < 700) {
        buildRail(Math.max(24, width - 142), Math.max(20, local.top - 54), .72);
        buildTrail(28, Math.min(height - 220, local.bottom + 285), .72);
        buildOrb(width - 74, height - 105, .55);
      } else {
        buildRail(local.left + 36, Math.max(28, local.top - 76));
        buildCascade(Math.min(width - 118, local.right + 104), Math.max(54, local.top - 28));
        buildTrail(local.left + 250, height - 122);
        buildOrb(Math.min(width - 120, Math.max(local.right + 125, width * .51)), height - 154);
      }
      if (reduced || coarse) requestAnimationFrame(() => draw(performance.now()));
    };

    const roundedBar = (x: number, y: number, barWidth: number, barHeight: number, color: string, alpha: number) => {
      context.globalAlpha = Math.max(0, Math.min(1, alpha));
      context.fillStyle = color;
      context.beginPath();
      context.roundRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, Math.min(2.5, barWidth / 2));
      context.fill();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      if (!visible) return;
      const seconds = time * .001;
      pointer.x += (pointer.targetX - pointer.x) * .16;
      pointer.y += (pointer.targetY - pointer.y) * .16;
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * .08;

      for (const bar of bars) {
        const ambientX = reduced ? 0 : Math.sin(seconds * .72 + bar.phase) * 1.2;
        const ambientY = reduced ? 0 : Math.cos(seconds * .58 + bar.phase) * 1.8;
        const dx = bar.x - pointer.x;
        const dy = bar.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const proximity = pointer.strength * Math.max(0, 1 - distance / 175);
        const force = proximity * proximity * 1.8;
        bar.vx += (bar.homeX + ambientX - bar.x) * .06 + (dx / distance) * force;
        bar.vy += (bar.homeY + ambientY - bar.y) * .06 + (dy / distance) * force;
        bar.vx *= .84;
        bar.vy *= .84;
        bar.x += bar.vx;
        bar.y += bar.vy;
        roundedBar(bar.x, bar.y, bar.baseWidth, bar.baseHeight + proximity * 13, palette[bar.tone], bar.baseAlpha + proximity * .22);
      }
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
    }, { threshold: .01 });
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
