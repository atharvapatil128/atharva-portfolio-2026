import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TelemetryPanel } from "@/components/telemetry-panel";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="about-hero section-pad">
        <div>
          <h1>Product designer, builder, and lifelong student of fast feedback.</h1>
          <p>I work across research, interaction design, prototyping, and AI-assisted building to turn complicated systems into products people can trust.</p>
          <div className="hero-actions"><Link className="button button-signal" href="/resume">View résumé</Link><Link className="button button-quiet" href="/contact">Start a conversation</Link></div>
        </div>
        <TelemetryPanel />
        </section>
        <section className="work-principles section-pad">
        <h2>How I tend to work</h2>
        <div>
          <article><h3>Find the real decision</h3><p>Research is useful when it changes what gets built—not when it only adds another artifact to the file.</p></article>
          <article><h3>Make it tangible early</h3><p>A prototype creates a better disagreement than a polished explanation.</p></article>
          <article><h3>Stay for the messy part</h3><p>Edge cases, content changes, and implementation constraints are part of the design.</p></article>
        </div>
        </section>
        <section className="fast-feedback section-pad">
        <h2>Fast laps, long runs, open air.</h2>
        <p>Karting taught me to read a system through feedback: brake later, change one thing, and let the next lap tell you whether it worked.</p>
        <div className="lap-visual" aria-label="Karting telemetry-inspired visual"><i /><i /><i /><i /></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
