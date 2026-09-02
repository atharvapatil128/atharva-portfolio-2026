import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-field" aria-hidden="true" />
      <div className="footer-cta">
        <span className="availability footer-availability"><i aria-hidden="true" />AVAILABLE FOR THE RIGHT TEAM</span>
        <p className="footer-statement">Have a complex product?<br />Let&apos;s make it feel inevitable.</p>
        <Link className="footer-button" href="/contact">LET&apos;S TALK <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="footer-base">
        <Link className="footer-brand" href="/" aria-label="Atharva Patil, home"><BrandMark className="brand-mark" /><span>ATHARVA PATIL<br /><small>PRODUCT DESIGNER</small></span></Link>
        <nav aria-label="Footer navigation"><Link href="/">Work</Link><Link href="/notes">Notes</Link><Link href="/about">About</Link><Link href="/resume">Résumé</Link></nav>
        <p className="footer-credit mono">DESIGNED WITH AI ASSISTANCE,<br />DIRECTED WITH HUMAN TASTE.</p>
      </div>
    </footer>
  );
}
