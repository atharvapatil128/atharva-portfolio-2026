import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { FooterSignalField } from "@/components/footer-signal-field";
import { LocationPin } from "@/components/location-pin";
import { SectionLink } from "@/components/section-link";
import { resumeUrl } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-cta">
          <p className="footer-statement">Have something interesting?<br />I&apos;d like to hear about it.</p>
          <p className="footer-support">Open to product design roles, thoughtful collaborations, and conversations about complicated products.</p>
          <Link className="footer-button" href="/contact"><span>Let&apos;s talk</span><svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 14 14 4M7 4h7v7" /></svg></Link>
        </div>
        <div className="footer-motion">
          <FooterSignalField />
        </div>
      </div>
      <div className="footer-base">
        {/* Visible text names this link already; an aria-label would override it (WCAG 2.5.3). */}
        <Link className="footer-brand" href="/"><BrandMark className="brand-mark" /><span>Atharva Patil<br /><small>Product designer</small></span></Link>
        {/*
          The LinkedIn link is not decoration. Person schema claims that profile
          via sameAs, and search engines only treat that as confirmation when the
          two point at each other, so this link is half of that pair.
        */}
        <nav aria-label="Footer navigation"><SectionLink href="/#selected-work">Work</SectionLink><Link href="/notes">Notes</Link><Link href="/about">About</Link><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗︎</span></a><a href="https://www.linkedin.com/in/atharvahpatil" target="_blank" rel="noreferrer me">LinkedIn <span aria-hidden="true">↗︎</span></a></nav>
        <div className="footer-status"><span className="availability footer-availability"><i aria-hidden="true" />Available for the right team</span><p className="footer-credit">Designed + built by Atharva<span className="footer-location"><LocationPin className="location-pin" />Bloomington, Indiana</span></p></div>
      </div>
    </footer>
  );
}
