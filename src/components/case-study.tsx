import Link from "next/link";
import type { Project } from "@/lib/site-data";
import { projects } from "@/lib/site-data";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BackLink } from "@/components/back-link";

function CaseMockup({ slug }: { slug: string }) {
  return (
    <div className={`case-mockup case-mockup-${slug}`} aria-label="Reserved space for final project mockups">
      <div className="mockup-browser">
        <div className="mockup-chrome"><i /><i /><i /><span>PRODUCT WALKTHROUGH / MEDIA SLOT</span></div>
        <div className="mockup-canvas">
          <div className="mockup-sidebar" />
          <div className="mockup-main"><i /><i /><i /></div>
        </div>
      </div>
      <p className="mono">FINAL MOCKUPS AND LIVE PROTOTYPE EMBED WILL LAND HERE</p>
    </div>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const next = projects.find((candidate) => candidate.slug === project.next);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="case-study">
        <header className={`case-hero case-tone-${project.slug}`}>
          <BackLink href="/#selected-work">Back to selected work</BackLink>
          <div className="case-title-block">
            <h1>{project.name}</h1>
            <p className="case-descriptor">{project.descriptor}</p>
            <p className="case-category mono">{project.category.toUpperCase()}</p>
            <p className="case-mobile-summary">{project.summary}</p>
          </div>
          <dl className="case-facts">
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Period</dt><dd>{project.period}</dd></div>
            <div><dt>Status</dt><dd>Case-study content in refinement</dd></div>
          </dl>
          <CaseMockup slug={project.slug} />
        </header>

        <section className="case-scan">
          <div>
            <h2>{project.summary}</h2>
            <p className="case-section-marker mono">THE CASE IN 30 SECONDS</p>
          </div>
          <div className="evidence-grid">
            {project.evidence.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>

        <section className="contribution-section">
          <h2>My contribution</h2>
          <p className="case-section-statement">{project.contribution}</p>
        </section>

        <section className="decision-section">
          <div className="decision-heading">
            <h2>Three decisions that shaped the system</h2>
            <p>Hiring-manager view: the trade-offs, not a chronological design-process diary.</p>
          </div>
          <div className="decision-list">
            {project.decisions.map((decision, index) => (
              <article key={decision.title}>
                <span className="mono">0{index + 1}</span>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="outcome-section">
          <div><h2>What the work established</h2><p className="case-section-statement">{project.outcome}</p></div>
          {project.qualification && <aside><strong>Important qualification</strong><p>{project.qualification}</p></aside>}
        </section>

        {next && (
          <Link href={`/work/${next.slug}`} className="next-case">
            <span className="mono">NEXT CASE STUDY</span>
            <strong>{next.name}</strong>
            <span>{next.descriptor}</span>
          </Link>
        )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
