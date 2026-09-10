import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { IntroDotField } from "@/components/intro-dot-field";
import { resumeUrl } from "@/lib/site-data";

const resumeDownloadUrl = "https://drive.google.com/uc?export=download&id=1mrmP2kJmFNJ1GdWXoZlMbsNyvmgnLa53";

export const metadata: Metadata = {
  title: "Résumé",
  description: "View Atharva Patil's current product design résumé.",
  alternates: { canonical: "/resume" },
  robots: { index: false, follow: true },
};

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="resume-live top-stage section-pad">
          <IntroDotField variant="resume" />
          <div className="resume-live-copy">
            <p className="mono">Résumé / Current edition</p>
            <h1>A living résumé, one reliable link.</h1>
            <p>The current version lives in Google Drive, so this page always points to the latest document rather than a file that quietly goes out of date.</p>
            <div className="resume-actions">
              <a className="button button-signal" href={resumeUrl} target="_blank" rel="noreferrer">View résumé <span aria-hidden="true">↗︎</span></a>
              <a className="button button-quiet" href={resumeDownloadUrl}>Download PDF</a>
            </div>
            <p className="resume-source mono">View-only · Updated at the source</p>
          </div>
          <aside className="resume-sheet" aria-label="Résumé summary">
            <div className="resume-sheet-head">
              <span className="mono">Atharva Patil</span>
              <span className="resume-sheet-status mono"><i aria-hidden="true" />Current</span>
            </div>
            <h2>Product designer and AI-native builder</h2>
            <ul>
              <li>Product design</li>
              <li>User research</li>
              <li>AI-assisted prototyping</li>
              <li>Front-end implementation</li>
            </ul>
            <div className="resume-sheet-foot">
              <span>Bloomington, Indiana</span>
              <a href={resumeUrl} target="_blank" rel="noreferrer" aria-label="Open current résumé">Open <span aria-hidden="true">↗︎</span></a>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
