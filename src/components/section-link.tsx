"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    const destination = new URL(href, window.location.href);
    const isCurrentPage =
      destination.origin === window.location.origin &&
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search;

    if (!isCurrentPage || !destination.hash) return;

    const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    event.currentTarget.closest("details")?.removeAttribute("open");
    window.history.replaceState(null, "", `${destination.pathname}${destination.search}${destination.hash}`);
    target.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
