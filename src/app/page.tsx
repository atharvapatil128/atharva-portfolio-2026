import Link from "next/link";
import { ClarityStack } from "@/components/clarity-stack";
import { HeroReveal } from "@/components/hero-reveal";
import { HeroSignalField } from "@/components/hero-signal-field";
import { HomeSections } from "@/components/home-sections";
import { SignalCursor } from "@/components/signal-cursor";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero section-pad" aria-labelledby="hero-title">
        <HeroSignalField />
        <SignalCursor />
        <div className="hero-copy">
          <HeroReveal>
            <h1 id="hero-title" className="t-stagger-line t-stagger-line--1">
              I take fuzzy problems all the way to something people can use.
            </h1>
            <p className="hero-summary t-stagger-line t-stagger-line--2">
              I&apos;m Atharva, a product designer with a background in HCI and computer science. I research, prototype, test, and sometimes write the front end too.
            </p>
          </HeroReveal>
          <p className="availability-line mono"><i aria-hidden="true" />AVAILABLE FOR PRODUCT DESIGN ROLES · 2026</p>
          <div className="hero-actions">
            <Link className="button button-signal" href="#selected-work">View selected work</Link>
            <Link className="button button-quiet" href="/resume">Résumé</Link>
          </div>
          <div className="hero-meta mono"><span>BASED IN INDIANAPOLIS</span><span>OPEN TO RELOCATE</span></div>
        </div>
        <ClarityStack />
        </section>

        <HomeSections />
      </main>
      <SiteFooter />
    </>
  );
}
