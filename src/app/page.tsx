import { FeaturedProjectArtifact } from "@/components/featured-project-artifact";
import { HeroObjects } from "@/components/hero-objects";
import { HeroReveal } from "@/components/hero-reveal";
import { HomeSections } from "@/components/home-sections";
import { LocationPin } from "@/components/location-pin";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionLink } from "@/components/section-link";
import { resumeUrl } from "@/lib/site-data";

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
                AI takes me to a prototype fast. <mark className="signal-emphasis">Taste</mark> takes it all the way.
              </h1>
              <p className="hero-summary t-stagger-line t-stagger-line--2">
                I&apos;m Atharva, a product designer with a computer science background and a Masters in HCI/d from Indiana University. I research, prototype, test, and write the front end, from streaming apps to embassy tooling.
              </p>
            </HeroReveal>
            <p className="availability-line mono"><i aria-hidden="true" />Available for product design roles · 2026</p>
            <div className="hero-actions">
              <SectionLink className="button button-signal" href="#selected-work">View selected work</SectionLink>
              <a className="button button-quiet" href={resumeUrl} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗︎</span></a>
            </div>
            <div className="hero-meta mono"><span className="location-label"><LocationPin className="location-pin" />Based in Bloomington, Indiana</span><span>Open to relocate</span></div>
          </div>
          <FeaturedProjectArtifact />
        </section>

        <HomeSections />
      </main>
      <SiteFooter />
    </>
  );
}
