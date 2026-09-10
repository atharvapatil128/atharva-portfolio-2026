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
            <p className="mono">ASK / ANSWERED FROM THIS SITE</p>
            <h1>
              Ask about the <span className="signal-emphasis">work</span>.
            </h1>
            <p>
              The case studies cover what happened. This answers the follow-up questions, what Atharva
              owned, why a decision went the way it did, and where the evidence stops.
            </p>
          </div>
          <AskConsole />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
