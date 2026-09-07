"use client";

import Image from "next/image";
import { useRef } from "react";

type ExpandableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  caption?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
};

export function ExpandableImage({ src, alt, width, height, sizes, caption, priority = false, loading }: ExpandableImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");

  function openImage() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
  }

  function closeImage() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.close();
  }

  function restorePage() {
    document.body.style.overflow = previousOverflow.current;
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <button ref={triggerRef} type="button" className="media-expand-trigger" onClick={openImage} aria-label={`View full image: ${alt}`} aria-haspopup="dialog">
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} loading={loading} />
        <span className="media-expand-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8.5 3.5h-5v5M15.5 3.5h5v5M8.5 20.5h-5v-5M20.5 15.5v5h-5" /></svg>
        </span>
      </button>
      <dialog
        ref={dialogRef}
        className="media-lightbox"
        aria-label={`Full image: ${alt}`}
        onClose={restorePage}
        onCancel={() => { document.body.style.overflow = previousOverflow.current; }}
        onClick={(event) => { if (event.currentTarget === event.target) closeImage(); }}
      >
        <div className="media-lightbox-inner">
          <button type="button" className="media-lightbox-close" onClick={closeImage} aria-label="Close full image">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
          <figure>
            <Image src={src} alt={alt} width={width} height={height} sizes="100vw" />
            {caption ? <figcaption>{caption}</figcaption> : null}
          </figure>
        </div>
      </dialog>
    </>
  );
}
