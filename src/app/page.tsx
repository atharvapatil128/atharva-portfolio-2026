import Link from "next/link";
import { ClarityStack } from "@/components/clarity-stack";
import { HeroReveal } from "@/components/hero-reveal";
import { HeroSignalField } from "@/components/hero-signal-field";
import { HomeSections } from "@/components/home-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero section-pad" aria-labelledby="hero-title">
        <HeroSignalField />
        <div className="hero-copy">
          <HeroReveal>
            <h1 id="hero-title" className="t-stagger-line t-stagger-line--1">
              I design complex products<br />{" "}so they feel obvious.
            </h1>
            <p className="hero-summary t-stagger-line t-stagger-line--2">
              Product designer shaping clear, dependable experiences across consumer and enterprise systems.
            </p>
          </HeroReveal>
          <p className="availability-line mono"><i aria-hidden="true" />AVAILABLE FOR PRODUCT DESIGN ROLES · 2026</p>
          <div className="hero-actions">
            <Link className="button button-signal" href="#selected-work">View selected work</Link>
            <Link className="button button-quiet" href="/resume">Résumé</Link>
          </div>
          <div className="hero-meta mono"><span>BASED IN INDIANAPOLIS</span><span>OPEN TO RELOCATE</span></div>
          <p className="hero-proof mono">COMPLEXITY → STRUCTURE → CONFIDENCE</p>
        </div>
        <ClarityStack />
        </section>

        <HomeSections />
      </main>
      <SiteFooter />
    </>
  );
}
