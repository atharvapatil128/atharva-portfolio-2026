import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { FooterSignalField } from "@/components/footer-signal-field";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-cta">
          <p className="footer-statement">Let&apos;s make the complicated<br />feel inevitable.</p>
          <p className="footer-support">Open to product design roles where systems thinking, interaction craft, and implementation all matter.</p>
          <Link className="footer-button" href="/contact"><span>LET&apos;S TALK</span><svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 14 14 4M7 4h7v7" /></svg></Link>
        </div>
        <div className="footer-motion">
          <FooterSignalField />
          <span className="footer-motion-label mono">SIGNALS ALIGN WHEN YOU MOVE</span>
        </div>
      </div>
      <div className="footer-base">
        <Link className="footer-brand" href="/" aria-label="Atharva Patil, home"><BrandMark className="brand-mark" /><span>ATHARVA PATIL<br /><small>PRODUCT DESIGNER</small></span></Link>
        <nav aria-label="Footer navigation"><Link href="/">Work</Link><Link href="/notes">Notes</Link><Link href="/about">About</Link><Link href="/resume">Résumé</Link></nav>
        <div className="footer-status"><span className="availability footer-availability"><i aria-hidden="true" />AVAILABLE FOR THE RIGHT TEAM</span><p className="footer-credit mono">INDIANAPOLIS · OPEN TO RELOCATE</p></div>
      </div>
    </footer>
  );
}
