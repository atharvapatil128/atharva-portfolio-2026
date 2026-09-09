import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TelemetryPanel } from "@/components/telemetry-panel";
import { IntroDotField } from "@/components/intro-dot-field";
import { PersonalAbout } from "@/components/personal-journal";

export const metadata: Metadata = {
  title: "About",
  description:
    "I like staying close to a problem—from the first messy conversations through prototypes, feedback, implementation, and whatever needs fixing next.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="about-hero top-stage section-pad">
        <IntroDotField variant="about" />
        <div>
          <h1>I ask a lot of “why” questions. Then I make <span className="signal-emphasis">something</span> and see if I was right.</h1>
          <p>I like staying close to a problem—from the first messy conversations through prototypes, feedback, implementation, and whatever needs fixing next. A rationale helps, but it doesn&apos;t make a design correct. People using it get the final vote.</p>
          <div className="hero-actions about-actions">
            <Link className="about-primary-action" href="/resume">
              <span>View résumé</span>
              <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 14 14 4M7 4h7v7" /></svg>
            </Link>
            <ArrowLink className="about-secondary-action" href="/contact">Start a conversation</ArrowLink>
          </div>
        </div>
        <TelemetryPanel />
        </section>
        <PersonalAbout />
      </main>
      <SiteFooter />
    </>
  );
}
