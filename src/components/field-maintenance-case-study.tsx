import Image from "next/image";
import Link from "next/link";
import { AmbientVideo } from "@/components/ambient-video";
import { BackLink } from "@/components/back-link";
import { ExpandableImage } from "@/components/expandable-image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const findings = [
  {
    title: "Standardization was the dominant issue",
    body: "Across 45 interviews, inconsistent maintenance records emerged as the most important problem in the process.",
  },
  {
    title: "Batteries exposed the tracking gap",
    body: "Batteries were a common frustration and were often not tracked because they fell below the $500 asset threshold.",
  },
  {
    title: "Problems were discovered too late",
    body: "Technicians could arrive at a post before learning that a part needed attention, delaying work orders and replacement orders.",
  },
] as const;

const decisions = [
  {
    title: "Replace paper and memory with field entry",
    problem: "Paper notes and later re-entry created delay, inconsistency, and missing detail.",
    response: "The mobile checklist records voltage, installation dates, serial information, and observations during the inspection.",
  },
  {
    title: "Make the next maintenance need visible",
    problem: "Technicians lacked a simple way to see which assets and non-assets required attention before arriving at a post.",
    response: "Post, location, asset, and attention states are brought into one mobile view so the technician can prepare earlier.",
  },
  {
    title: "Start with the overlooked battery routine",
    problem: "A solution for every maintenance category would be too broad for the first implementation, while batteries had a repeated and documented tracking gap.",
    response: "The team used battery inspections as a concrete starting point, built in Power Apps with structured data stored through Dataverse.",
  },
] as const;

const workflow = [
  {
    label: "Select",
    title: "Choose the post, location, and asset",
    body: "The app narrows the technician's context before showing the relevant maintenance record.",
  },
  {
    label: "Inspect",
    title: "Record the battery condition",
    body: "The checklist captures voltage, battery percentage, installation dates, comments, and follow-up needs.",
  },
  {
    label: "Save",
    title: "Create a dated maintenance history",
    body: "A completed entry can be saved for later review, while urgent findings can initiate a work-order handoff.",
  },
] as const;

export function FieldMaintenanceCaseStudy() {
  return (
    <>
      <SiteHeader />
      <main>
        <article
          className="field-case"
          data-design-contract="THESIS: show how 45 interviews turned a broad field-maintenance problem into a concrete battery-tracking starting point. OWN-WORLD: Precision Paddock with operational charcoal, inspection orange, and real Power Apps evidence. STORY: field constraint, interview pattern, narrowed scope, three decisions, functional workflow, evidence boundary. FIRST VIEWPORT: the actual mobile MVP appears beside a plain-language account of the problem. FORM: decision-led enterprise case study. SEED: field-log-45-interviews."
        >
          <header className="field-hero">
            <BackLink href="/#selected-work">Back to selected work</BackLink>
            <div className="field-hero-grid">
              <div className="field-hero-copy">
                <h1>A mobile maintenance companion for embassy engineers.</h1>
                <p>Technicians recorded work on paper or from memory, then returned to a desk to enter it. Across 45 interviews, standardization emerged as the widespread problem and battery tracking became the team's concrete starting point.</p>
              </div>
              <figure className="field-hero-product">
                <div className="field-hero-product-frame field-device-stage">
                  <Image
                    className="field-device field-device-location"
                    src="/images/field-maintenance/location-select.png"
                    alt="Power Maintenance post and location selection screen"
                    width={576}
                    height={920}
                    loading="eager"
                    sizes="(max-width: 760px) 44vw, 17vw"
                  />
                  <Image
                    className="field-device field-device-assets"
                    src="/images/field-maintenance/asset-list.png"
                    alt="Power Maintenance asset list showing maintenance attention states"
                    width={527}
                    height={882}
                    loading="eager"
                    sizes="(max-width: 760px) 48vw, 18vw"
                  />
                  <Image
                    className="field-device field-device-entry"
                    src="/images/field-maintenance/maintenance-entry.png"
                    alt="Power Maintenance battery entry screen with condition values and work-order action"
                    width={497}
                    height={874}
                    loading="eager"
                    sizes="(max-width: 760px) 44vw, 17vw"
                  />
                </div>
                <figcaption className="mono"><span>FUNCTIONAL POWER APPS MVP</span><span>SELECT / REVIEW / RECORD</span></figcaption>
              </figure>
            </div>
            <dl className="field-facts">
              <div><dt>Role</dt><dd>UX strategy, discovery research, product design</dd></div>
              <div><dt>Period</dt><dd>February–June 2025</dd></div>
              <div><dt>Evidence</dt><dd>45 stakeholder interviews</dd></div>
              <div><dt>Build</dt><dd>Power Apps + Dataverse MVP</dd></div>
            </dl>
          </header>

          <section className="field-scan">
            <h2>The project in 30 seconds</h2>
            <div className="field-scan-grid">
              <article><span className="mono">PROBLEM</span><p>Maintenance happened away from the system of record, so technicians depended on paper, memory, and later data entry.</p></article>
              <article className="is-pivot"><span className="mono">RESEARCH</span><p>Forty-five interviews showed that inconsistent records were widespread, with battery tracking standing out as a common frustration.</p></article>
              <article><span className="mono">MVP</span><p>A Power Apps companion for selecting a post, viewing assets, and logging structured battery-maintenance data on site.</p></article>
            </div>
          </section>

          <section className="field-reality">
            <div className="field-reality-copy">
              <h2>Maintenance happened in the field. The record waited at the desk.</h2>
              <p>A typical Security Engineering Officer travels between posts, inspects assets and non-assets, takes notes on paper, and later returns to a workstation to enter the data. The delay made it harder to know what required attention before the technician arrived.</p>
              <p className="field-question"><strong>Design question</strong> How could technicians capture structured maintenance data at the point of inspection without introducing an unapproved platform?</p>
            </div>
            <div className="field-findings">
              {findings.map((finding) => (
                <article key={finding.title}>
                  <h3>{finding.title}</h3>
                  <p>{finding.body}</p>
                </article>
              ))}
            </div>
            <figure className="field-context-media">
              <AmbientVideo
                src="/videos/field-maintenance-context.mp4"
                poster="/images/field-maintenance/cover.webp"
                className="field-context-video"
                controls
                autoPlayWhenVisible={false}
                label="Silent illustration of the outdated tools and delayed field-maintenance workflow before Power Maintenance"
              />
              <figcaption><span className="mono">BEFORE THE MVP</span><span>FIELD OBSERVATION → PAPER OR MEMORY → LATER DESK ENTRY</span></figcaption>
            </figure>
          </section>

          <section className="field-pivot">
            <div className="field-section-head">
              <h2>Testing changed the product from reactive work orders to proactive maintenance.</h2>
              <p>The first concept focused on managing work orders in the field. Early validation showed that similar work was already underway, and that technicians needed to know what required attention before something failed.</p>
            </div>
            <div className="field-pivot-sequence">
              <article><span className="mono">FIRST CONCEPT</span><strong>Mobile work-order tracking</strong><p>Help technicians manage tasks after an issue was already known.</p></article>
              <svg viewBox="0 0 80 24" aria-hidden="true"><path d="M2 12h72M66 5l8 7-8 7" /></svg>
              <article><span className="mono">VALIDATION FINDING</span><strong>The workflow still reacted too late</strong><p>Technicians needed visibility before a visit, not another surface for work already assigned.</p></article>
              <svg viewBox="0 0 80 24" aria-hidden="true"><path d="M2 12h72M66 5l8 7-8 7" /></svg>
              <article className="is-result"><span className="mono">REVISED MVP</span><strong>Checklist-based battery logging</strong><p>Record condition and attention states during inspections to build a proactive history.</p></article>
            </div>
            <figure className="field-iteration-evidence">
              <div>
                <span className="mono">ITERATION EVIDENCE</span>
                <h3>The checklist became useful when attention states moved to the asset list.</h3>
                <p>Early screens showed a general status. The sketch and revised interface surfaced missing data, overdue maintenance, and battery condition before a technician opened the full record.</p>
              </div>
              <ExpandableImage
                src="/images/field-maintenance/iterations.png"
                alt="Power Maintenance iterations from initial screens and a hand-drawn attention state to the revised asset list"
                width={4096}
                height={3736}
                sizes="(max-width: 760px) 100vw, 58vw"
                caption="Power Maintenance iteration sheet — early screens, paper sketch, and revised attention-state list."
              />
            </figure>
          </section>

          <section className="field-decisions">
            <div className="field-section-head">
              <h2>Three decisions translate the interview findings into the MVP.</h2>
              <p>Each decision connects a documented field problem to a specific product response.</p>
            </div>
            <div className="field-decision-list">
              {decisions.map((decision) => (
                <article key={decision.title}>
                  <h3>{decision.title}</h3>
                  <div><span className="mono">OBSERVED PROBLEM</span><p>{decision.problem}</p></div>
                  <div className="field-decision-response"><span className="mono">MVP RESPONSE</span><p>{decision.response}</p></div>
                </article>
              ))}
            </div>
          </section>

          <section className="field-product">
            <div className="field-section-head">
              <h2>The functional MVP turns one inspection into a reusable record.</h2>
              <p>The final flow moves from post selection to asset status, then into the information and maintenance fields for a specific battery.</p>
            </div>
            <div className="field-product-grid">
              <figure>
                <div className="field-product-gallery" aria-label="Individual Power Maintenance screens">
                  <div className="field-product-screen">
                    <ExpandableImage
                      src="/images/field-maintenance/asset-list.png"
                      alt="Power Maintenance asset list showing battery condition and maintenance attention states"
                      width={527}
                      height={882}
                      sizes="(max-width: 760px) 78vw, 34vw"
                      loading="eager"
                      caption="Asset list — maintenance needs are visible before opening the full record."
                    />
                    <span className="mono">01 / REVIEW</span>
                  </div>
                  <div className="field-product-screen">
                    <ExpandableImage
                      src="/images/field-maintenance/asset-information.png"
                      alt="Power Maintenance asset-information form for battery and equipment records"
                      width={506}
                      height={894}
                      sizes="(max-width: 760px) 78vw, 34vw"
                      loading="eager"
                      caption="Asset information — structured equipment data stays connected to the maintenance record."
                    />
                    <span className="mono">02 / INSPECT</span>
                  </div>
                  <div className="field-product-screen">
                    <ExpandableImage
                      src="/images/field-maintenance/maintenance-entry.png"
                      alt="Power Maintenance form showing battery percentages, comments, save, and work-order actions"
                      width={497}
                      height={874}
                      sizes="(max-width: 760px) 78vw, 34vw"
                      loading="eager"
                      caption="Maintenance entry — save the inspection or hand an urgent finding into a work order."
                    />
                    <span className="mono">03 / RECORD</span>
                  </div>
                </div>
                <figcaption>Scroll through the individual screens. Open any image to inspect it at full size.</figcaption>
              </figure>
              <ol className="field-workflow">
                {workflow.map((step, index) => (
                  <li key={step.label}>
                    <span className="field-workflow-number mono">0{index + 1}</span>
                    <div><span className="mono">{step.label}</span><strong>{step.title}</strong><p>{step.body}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="field-flow-overview">
              <div className="field-flow-overview-copy">
                <h3>The full flow shows how one field check becomes a maintenance record.</h3>
                <p>The overview connects post selection, asset status, equipment information, battery condition, comments, and work-order escalation in one sequence.</p>
                <figcaption>Open the complete workflow to trace every screen at full size.</figcaption>
              </div>
              <div className="field-flow-map">
                <ExpandableImage
                  src="/images/field-maintenance/final-flow.png"
                  alt="Complete Power Maintenance workflow connecting location selection, asset status, equipment information, and battery maintenance entry"
                  width={2048}
                  height={3562}
                  sizes="(max-width: 760px) 100vw, 62vw"
                  caption="Complete Power Maintenance flow — from selecting a post to saving maintenance data and initiating a work-order handoff."
                />
              </div>
            </figure>
          </section>

          <section className="field-validation">
            <div className="field-outcome">
              <h2>The MVP earned interest for a field pilot.</h2>
              <p>Validation with the primary beneficiary and multiple Security Engineering Officers led to continued rollout conversations while the checklist-based MVP was refined for field readiness.</p>
              <div className="field-metrics" aria-label="Projected impact estimates">
                <div><strong>~ 40%</strong><span>projected time savings</span></div>
                <div><strong>~ 30%</strong><span>projected cost savings</span></div>
              </div>
              <p className="field-metric-note">These are projected estimates based on sponsor discussions and field validation, not measured production results.</p>
              <blockquote>
                <p>“I really hope we can get this done and continue development of more apps based on the refined interface.”</p>
                <cite>Officer-in-Charge, Engineering Services Office, U.S. Embassy Vienna</cite>
              </blockquote>
            </div>
            <aside>
              <h3>What a pilot still needed to prove</h3>
              <p>The functional MVP established the workflow and sponsor interest. Deployment evidence remained the next step.</p>
              <ul>
                <li>Production adoption and longitudinal usage</li>
                <li>Measured time or cost savings</li>
                <li>IBM Maximo integration at deployment scale</li>
                <li>Offline synchronization in operational conditions</li>
              </ul>
            </aside>
          </section>

          <section className="field-reflection">
            <h2>The strongest move was choosing a tractable starting point.</h2>
            <p>“Field maintenance” was too broad to design as one undifferentiated problem. The interviews made it clear that the shared need was standardized mobile records, while the battery workflow gave the team a specific routine to build and a future pilot something concrete to evaluate.</p>
          </section>

          <Link href="/work/streaming-helper" className="next-case field-next-case" aria-label="Next case study: Streaming Helper">
            <span className="next-case-copy"><span className="mono">NEXT CASE STUDY</span><strong>Streaming Helper</strong><span className="next-case-descriptor">Taking “what should we watch?” from a graduate capstone to a working product.</span></span>
            <span className="next-case-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          </Link>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
