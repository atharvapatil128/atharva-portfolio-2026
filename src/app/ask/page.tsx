import type { Metadata } from "next";
import { AskConsole } from "@/components/ask-console";
import styles from "@/components/ask-console.module.css";
import { IntroDotField } from "@/components/intro-dot-field";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { openGraphFor } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Ask",
  description:
    "Ask questions about Atharva Patil's projects, decisions, and process, answered from the work published on this site.",
  alternates: { canonical: "/ask" },
  openGraph: openGraphFor("/ask"),
};

export default function AskPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className={`${styles.stage} top-stage section-pad`}>
          <IntroDotField variant="about" />
          <div className={styles.intro}>
            <p className="mono">ATHARVA&apos;S ASSISTANT / ANSWERED FROM THIS SITE</p>
            <h1>
              Ask about the <span className="signal-emphasis">work</span>.
            </h1>
            <p>
              The case studies cover what happened. This answers the follow-up questions, what Atharva
              owned, why a decision went the way it did, and where the evidence stops.
            </p>
          </div>
          <AskConsole />

          <section className={styles.primer} aria-labelledby="ask-primer">
            <h2 id="ask-primer">What this assistant can tell you</h2>
            <p>
              It reads the same published work you can, so it is useful for the questions a case study
              answers slowly: what Atharva actually owned, why a call went one way, and where the
              evidence runs out.
            </p>
            <div className={styles.primerGrid}>
              <div>
                <h3 className="mono">Questions worth asking</h3>
                <ul>
                  <li>What did Atharva own on Field Maintenance, and what did the wider team own?</li>
                  <li>Why does Streaming Helper limit recommendations to five?</li>
                  <li>How did privacy constraints shape the MEAD recording flow?</li>
                  <li>Which claims on this site are measured, and which are projections?</li>
                  <li>What would he do differently on any of these projects?</li>
                </ul>
              </div>
              <div>
                <h3 className="mono">Where answers come from</h3>
                <ul>
                  <li>The three case studies: Streaming Helper, MEAD, Field Maintenance</li>
                  <li>The published notes on process and design systems</li>
                  <li>The About page and the current résumé summary</li>
                </ul>
              </div>
            </div>
            <p className={styles.primerNote}>
              It will not invent a project, a metric, or an employer. When something is not covered by
              the published work, it says so and points you to the contact form rather than guessing.
              Conversations are limited to a handful of exchanges, so treat it as a way in rather than
              a replacement for talking to Atharva directly.
            </p>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
