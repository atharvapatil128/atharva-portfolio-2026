"use client";

import { useEffect, useRef } from "react";

type CursorBar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  offsetX: number;
  baseHeight: number;
  centerWeight: number;
};

const excludedSelector = [
  ".site-header",
  ".clarity-stack",
  ".paddock-viewport",
  ".showcase-field",
  ".footer-motion",
  ".contact-form",
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "h1",
  "h2",
  "h3",
  "p",
  "li",
  "dt",
  "dd",
  "strong",
  "small",
  ".mono",
  "[role='button']",
  "[contenteditable='true']",
].join(",");

export function SignalCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let ratio = 1;
    let frame = 0;
    let running = true;
    let initialized = false;
    let targetOpacity = 0;
    let opacity = 0;
    let lastTargetX = 0;
    let lastTargetY = 0;
    const cursor = { x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0 };
    const bars: CursorBar[] = [];

    for (let index = -7; index <= 7; index += 1) {
      const normalized = index / 7;
      const centerWeight = Math.sqrt(Math.max(0, 1 - normalized * normalized));
      bars.push({ x: 0, y: 0, vx: 0, vy: 0, offsetX: index * 8.5, baseHeight: 16 + centerWeight * 56, centerWeight });
    }

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const roundedBar = (x: number, y: number, barWidth: number, barHeight: number, color: string, alpha: number) => {
      context.globalAlpha = Math.max(0, Math.min(1, alpha));
      context.fillStyle = color;
      context.beginPath();
      context.roundRect(x - barWidth / 2, y - barHeight / 2, barWidth, barHeight, Math.min(2.5, barWidth / 2));
      context.fill();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      if (!running) return;

      const targetSpeed = Math.hypot(cursor.targetX - lastTargetX, cursor.targetY - lastTargetY);
      lastTargetX = cursor.targetX;
      lastTargetY = cursor.targetY;
      cursor.vx += (cursor.targetX - cursor.x) * .115;
      cursor.vy += (cursor.targetY - cursor.y) * .115;
      cursor.vx *= .7;
      cursor.vy *= .7;
      cursor.x += cursor.vx;
      cursor.y += cursor.vy;
      opacity += (targetOpacity - opacity) * (targetOpacity > opacity ? .16 : .22);

      const travel = Math.min(18, Math.hypot(cursor.vx, cursor.vy) * .72 + targetSpeed * .06);
      bars.forEach((bar, index) => {
        const edge = Math.abs(index - 7) / 7;
        const stiffness = .16 - edge * .035;
        const targetX = cursor.x + bar.offsetX - cursor.vx * edge * .52;
        const targetY = cursor.y - cursor.vy * edge * .18;
        bar.vx += (targetX - bar.x) * stiffness;
        bar.vy += (targetY - bar.y) * stiffness;
        bar.vx *= .65;
        bar.vy *= .65;
        bar.x += bar.vx;
        bar.y += bar.vy;

        const height = bar.baseHeight + travel * bar.centerWeight;
        roundedBar(bar.x + 2, bar.y + 3, 4, height * .78, "#9aaeff", opacity * .22);
        roundedBar(bar.x, bar.y, 5.5, height, index === 13 ? "#ff5a18" : "#365de4", opacity * .76);
      });
      roundedBar(cursor.x - 72, cursor.y, 2, 12, "#d6ff63", opacity * .42);
      roundedBar(cursor.x + 72, cursor.y, 2, 12, "#d6ff63", opacity * .42);
      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const excluded = Boolean(target?.closest(excludedSelector));
      const box = canvas.getBoundingClientRect();
      const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
      cursor.targetX = event.clientX - box.left;
      cursor.targetY = event.clientY - box.top;
      targetOpacity = inside && !excluded ? 1 : 0;

      if (inside && !initialized) {
        initialized = true;
        cursor.x = cursor.targetX;
        cursor.y = cursor.targetY;
        lastTargetX = cursor.targetX;
        lastTargetY = cursor.targetY;
        bars.forEach((bar) => { bar.x = cursor.targetX + bar.offsetX; bar.y = cursor.targetY; });
      }
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running) { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); }
      else cancelAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-cursor-canvas" aria-hidden="true" />;
}
