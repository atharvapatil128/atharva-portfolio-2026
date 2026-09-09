import Image from "next/image";
import Link from "next/link";
import { FeaturedProjectArtifact } from "@/components/featured-project-artifact";
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
          <div className="hero-objects" aria-hidden="true">
            <Image className="hero-object hero-object-laptop" src="/images/notes-objects/laptop.webp" alt="" width={1040} height={960} priority />
            <Image className="hero-object hero-object-keyboard" src="/images/notes-objects/keyboard.webp" alt="" width={1240} height={800} priority />
            <Image className="hero-object hero-object-paperclip" src="/images/notes-objects/paperclip.webp" alt="" width={360} height={680} priority />
            <Image className="hero-object hero-object-binder" src="/images/notes-objects/binder-clip.webp" alt="" width={470} height={630} priority />
            <Image className="hero-object hero-object-car" src="/images/notes-objects/f1-model.webp" alt="" width={1270} height={880} priority />
          </div>
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
