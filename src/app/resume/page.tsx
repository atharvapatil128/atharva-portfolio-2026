import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="resume-placeholder section-pad">
          <p className="mono">RÉSUMÉ / CONNECTION PENDING</p>
          <h1>The résumé route is ready for the final PDF.</h1>
          <p>We&apos;ll connect the verified source file here before deployment. Until then, the portfolio remains honest rather than linking to a guessed or outdated document.</p>
          <Link className="button button-signal" href="/">Return to selected work</Link>
        </section>
      </main>
    </>
  );
}
