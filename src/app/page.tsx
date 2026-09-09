import Link from "next/link";
import { FeaturedProjectArtifact } from "@/components/featured-project-artifact";
import { HeroObjects } from "@/components/hero-objects";
import { HeroReveal } from "@/components/hero-reveal";
import { HomeSections } from "@/components/home-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionLink } from "@/components/section-link";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero section-pad" aria-labelledby="hero-title">
          <HeroObjects />
          <div className="hero-copy">
            <HeroReveal>
              <h1 id="hero-title" className="t-stagger-line t-stagger-line--1">
                I take fuzzy problems all the way to something people can use.
              </h1>
              <p className="hero-summary t-stagger-line t-stagger-line--2">
                I&apos;m Atharva, a product designer with a background in HCI and computer science. I research, prototype, test, and sometimes write the front end too.
              </p>
            </HeroReveal>
            <p className="availability-line mono"><i aria-hidden="true" />Available for product design roles · 2026</p>
            <div className="hero-actions">
              <SectionLink className="button button-signal" href="#selected-work">View selected work</SectionLink>
              <Link className="button button-quiet" href="/resume">Résumé</Link>
            </div>
            <div className="hero-meta mono"><span>Based in Indianapolis</span><span>Open to relocate</span></div>
          </div>
          <FeaturedProjectArtifact />
        </section>

        <HomeSections />
      </main>
      <SiteFooter />
    </>
  );
}
