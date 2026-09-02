"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";

const links = [
  { href: "/", label: "Work", match: (path: string) => path === "/" || path === "/home-alt" || path.startsWith("/work") },
  { href: "/notes", label: "Notes", match: (path: string) => path.startsWith("/notes") },
  { href: "/about", label: "About", match: (path: string) => path.startsWith("/about") },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="identity" href="/" aria-label="Atharva Patil, home">
        <BrandMark className="brand-mark" />
        <span className="identity-name">ATHARVA PATIL</span>
      </Link>

      <nav className="primary-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href} aria-current={link.match(pathname) ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <span className="availability"><i aria-hidden="true" />AVAILABLE</span>
        <Link className="nav-cta" href="/contact" aria-current={pathname.startsWith("/contact") ? "page" : undefined}>
          LET&apos;S TALK <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <details className="mobile-menu">
        <summary>INDEX / MENU</summary>
        <nav aria-label="Mobile navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          <Link href="/resume">Résumé</Link>
          <Link href="/contact" aria-current={pathname.startsWith("/contact") ? "page" : undefined}>Let&apos;s talk</Link>
        </nav>
      </details>
    </header>
  );
}
