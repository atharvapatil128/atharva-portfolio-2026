"use client";

import { useEffect, useRef } from "react";

type AmbientVideoProps = {
  src: string;
  poster: string;
  className?: string;
  controls?: boolean;
  muted?: boolean;
  autoPlayWhenVisible?: boolean;
  label?: string;
};

export function AmbientVideo({
  src,
  poster,
  className,
  controls = false,
  muted = true,
  autoPlayWhenVisible = true,
  label,
}: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (!autoPlayWhenVisible) return;
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = Boolean(entry?.isIntersecting);
        if (!isVisibleRef.current || document.hidden || reducedMotion.matches) {
          video.pause();
          return;
        }
        void video.play().catch(() => undefined);
      },
      { threshold: 0.35 },
    );

    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else if (isVisibleRef.current && !reducedMotion.matches) void video.play().catch(() => undefined);
    };

    observer.observe(video);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [autoPlayWhenVisible]);

  return (
    <video
      ref={videoRef}
      className={className}
      muted={muted}
      loop
      playsInline
      controls={controls}
      preload="metadata"
      poster={poster}
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
