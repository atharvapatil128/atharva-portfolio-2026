"use client";

import { useEffect, useRef } from "react";

type TrailPoint = { x: number; y: number; life: number; width: number };

const excludedSelector = [
  ".site-header",
  ".hero-copy",
  ".clarity-stack",
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
].join(",");

export function F1Cursor() {
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
    let opacity = 0;
    let targetOpacity = 0;
    let initialized = false;
    let lastTrailX = 0;
    let lastTrailY = 0;
    const trail: TrailPoint[] = [];
    const car = { x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, angle: 0 };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const roundedRect = (x: number, y: number, rectWidth: number, rectHeight: number, radius: number, fill: string) => {
      context.fillStyle = fill;
      context.beginPath();
      context.roundRect(x, y, rectWidth, rectHeight, radius);
      context.fill();
    };

    const drawCar = (speed: number) => {
      const scale = 1.2 + Math.min(0.14, speed * 0.006);
      context.save();
      context.translate(car.x, car.y);
      context.rotate(car.angle);
      context.scale(scale, scale);
      context.globalAlpha = opacity;

      context.save();
      context.translate(-2, 7);
      context.filter = "blur(10px)";
      context.fillStyle = "rgba(17, 19, 24, .28)";
      context.beginPath();
      context.ellipse(0, 0, 35, 14, 0, 0, Math.PI * 2);
      context.fill();
      context.restore();

      roundedRect(-24, -17, 13, 7, 2.5, "#111318");
      roundedRect(11, -17, 13, 7, 2.5, "#111318");
      roundedRect(-24, 10, 13, 7, 2.5, "#111318");
      roundedRect(11, 10, 13, 7, 2.5, "#111318");

      roundedRect(-31, -17, 6, 34, 2, "#111318");
      roundedRect(24, -19, 5, 38, 2, "#111318");
      roundedRect(27, -15, 7, 4, 1.5, "#ff5a18");
      roundedRect(27, 11, 7, 4, 1.5, "#ff5a18");

      const bodyGradient = context.createLinearGradient(-27, 0, 31, 0);
      bodyGradient.addColorStop(0, "#b82d10");
      bodyGradient.addColorStop(0.48, "#ff5a18");
      bodyGradient.addColorStop(1, "#ff7641");
      context.fillStyle = bodyGradient;
      context.beginPath();
      context.moveTo(-27, -8);
      context.bezierCurveTo(-17, -12, -7, -11, 3, -8);
      context.lineTo(24, -4);
      context.lineTo(31, 0);
      context.lineTo(24, 4);
      context.lineTo(3, 8);
      context.bezierCurveTo(-7, 11, -17, 12, -27, 8);
      context.closePath();
      context.fill();

      roundedRect(-18, -10, 20, 20, 7, "#ef4915");
      context.fillStyle = "#111318";
      context.beginPath();
      context.ellipse(-7, 0, 9, 6.5, 0, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#34373e";
      context.beginPath();
      context.ellipse(-4.5, -1.5, 4.2, 2.8, 0, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = "rgba(255,255,255,.68)";
      context.lineWidth = 1.2;
      context.beginPath();
      context.moveTo(3, -5.5);
      context.lineTo(22, -2.5);
      context.stroke();

      context.fillStyle = "#d6ff63";
      context.beginPath();
      context.arc(25.5, 0, 1.8, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      if (!running) return;
      car.vx += (car.targetX - car.x) * 0.105;
      car.vy += (car.targetY - car.y) * 0.105;
      car.vx *= 0.71;
      car.vy *= 0.71;
      car.x += car.vx;
      car.y += car.vy;
      opacity += (targetOpacity - opacity) * (targetOpacity > opacity ? 0.15 : 0.24);

      const speed = Math.hypot(car.vx, car.vy);
      if (speed > 0.18) {
        const targetAngle = Math.atan2(car.vy, car.vx);
        const angleDelta = Math.atan2(Math.sin(targetAngle - car.angle), Math.cos(targetAngle - car.angle));
        car.angle += angleDelta * 0.16;
      }

      if (targetOpacity > 0 && speed > 1.2 && Math.hypot(car.x - lastTrailX, car.y - lastTrailY) > 9) {
        trail.push({ x: car.x, y: car.y, life: 1, width: Math.min(2.4, 0.8 + speed * 0.04) });
        lastTrailX = car.x;
        lastTrailY = car.y;
      }

      for (let index = trail.length - 1; index >= 0; index -= 1) {
        const point = trail[index];
        point.life -= 0.045;
        if (point.life <= 0) {
          trail.splice(index, 1);
          continue;
        }
        context.globalAlpha = point.life * opacity * 0.24;
        context.fillStyle = index % 4 === 0 ? "#ff5a18" : "#365de4";
        context.beginPath();
        context.arc(point.x, point.y, point.width * point.life, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      drawCar(speed);
      frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
      const target = event.target instanceof Element ? event.target : null;
      const excluded = Boolean(target?.closest(excludedSelector));
      car.targetX = event.clientX - box.left;
      car.targetY = event.clientY - box.top;
      targetOpacity = inside && !excluded ? 1 : 0;

      if (inside && !initialized) {
        initialized = true;
        car.x = car.targetX;
        car.y = car.targetY;
        lastTrailX = car.x;
        lastTrailY = car.y;
      }
    };

    const start = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };
    const onVisibility = () => {
      running = !document.hidden && canvas.getBoundingClientRect().bottom > 0 && canvas.getBoundingClientRect().top < window.innerHeight;
      if (running) start();
      else cancelAnimationFrame(frame);
    };
    const viewportObserver = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden;
      if (running) start();
      else cancelAnimationFrame(frame);
    }, { threshold: 0.01 });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    viewportObserver.observe(canvas);
    resize();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewportObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="f1-cursor-canvas" aria-hidden="true" />;
}
