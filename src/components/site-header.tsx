"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { SectionLink } from "@/components/section-link";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

const links = [
  { href: "/#selected-work", label: "Work", match: (path: string) => path.startsWith("/work") },
  { href: "/notes", label: "Notes", match: (path: string) => path.startsWith("/notes") },
  { href: "/about", label: "About", match: (path: string) => path.startsWith("/about") },
];

export function SiteHeader() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [workInView, setWorkInView] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => setMounted(true), []);
  useEffect(() => { if (menuRef.current) menuRef.current.open = false; }, [pathname]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setWorkInView(false);
      return;
    }

    const workSection = document.getElementById("selected-work");
    if (!workSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setWorkInView(entry.isIntersecting),
      { rootMargin: "-22% 0px -48% 0px", threshold: 0 },
    );

    observer.observe(workSection);
    return () => observer.disconnect();
  }, [isHome]);

  const isLinkActive = (link: (typeof links)[number]) =>
    mounted && (link.label === "Work" ? (isHome ? workInView : link.match(pathname)) : link.match(pathname));

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <Link className="identity" href="/" aria-label="Atharva Patil, home" onClick={handleHomeClick}>
        <BrandMark className="brand-mark" />
        <span className="identity-name">Atharva Patil</span>
      </Link>

      <nav className="primary-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <SectionLink key={link.href} href={link.href} aria-current={isLinkActive(link) ? "page" : undefined}>
            {link.label}
          </SectionLink>
        ))}
      </nav>

      <div className="header-actions">
        <span className="availability"><i aria-hidden="true" />Available</span>
        <Link className="nav-cta" href="/contact" aria-current={mounted && pathname.startsWith("/contact") ? "page" : undefined}>
          <span>Let&apos;s talk</span><svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 14 14 4M7 4h7v7" /></svg>
        </Link>
      </div>

      <details className="mobile-menu" ref={menuRef} onKeyDown={(event) => {
        if (event.key === "Escape" && menuRef.current?.open) {
          menuRef.current.open = false;
          menuRef.current.querySelector("summary")?.focus();
        }
      }}>
        <summary aria-label="Toggle navigation menu"><svg className="menu-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg></summary>
        <nav aria-label="Mobile navigation" onClick={(event) => {
          if ((event.target as HTMLElement).closest("a") && menuRef.current) menuRef.current.open = false;
        }}>
          {links.map((link) => (
            <SectionLink key={link.href} href={link.href} aria-current={isLinkActive(link) ? "page" : undefined}>
              {link.label}
            </SectionLink>
          ))}
          <Link href="/resume">Résumé</Link>
          <Link href="/contact" aria-current={mounted && pathname.startsWith("/contact") ? "page" : undefined}>Let&apos;s talk</Link>
        </nav>
      </details>
    </header>
  );
}
