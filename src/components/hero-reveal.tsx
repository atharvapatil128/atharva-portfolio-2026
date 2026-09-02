"use client";

import { useEffect, useRef } from "react";

export function HeroReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animations = Array.from(ref.current?.querySelectorAll<HTMLElement>(".t-stagger-line") ?? []).map((element, index) =>
      element.animate(
        [
          { opacity: 0.72, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 460, delay: index * 36, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      ),
    );
    return () => animations.forEach((animation) => animation.cancel());
  }, []);

  return <div ref={ref} className="t-stagger">{children}</div>;
}
