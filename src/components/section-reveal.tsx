"use client";

import { useEffect, useRef } from "react";

/** Progressive enhancement: visible without JS and when reduced motion is enabled. */
export function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const styles = getComputedStyle(root);
    const duration = parseFloat(styles.getPropertyValue("--stagger-dur")) || 500;
    const stagger = parseFloat(styles.getPropertyValue("--stagger-stagger")) || 40;
    const ease = styles.getPropertyValue("--stagger-ease").trim() || "ease-out";
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal], .t-stagger-line"));
    const revealOrder = new Map(targets.map((target, index) => [target, index]));
    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
        observer.unobserve(entry.target);
        if (preference.matches) return;
        const photo = (entry.target as HTMLElement).dataset.reveal === "photo";
        const index = revealOrder.get(entry.target as HTMLElement) ?? 0;
        const animation = entry.target.animate(photo ? [
          { opacity: 0.8, clipPath: "inset(4% 0 0 0 round 14px)", translate: "0 12px" },
          { opacity: 1, clipPath: "inset(0% 0 0 0 round 14px)", translate: "0 0" },
        ] : [
          { opacity: 0.12, translate: "0 12px" },
          { opacity: 1, translate: "0 0" },
        ], { duration, delay: Math.min(index, 3) * stagger, easing: ease });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -15% 0px" });
    targets.forEach((element) => observer.observe(element));
    const cancel = () => { if (preference.matches) animations.forEach((animation) => animation.cancel()); };
    preference.addEventListener("change", cancel);
    return () => { observer.disconnect(); preference.removeEventListener("change", cancel); animations.forEach((animation) => animation.cancel()); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
