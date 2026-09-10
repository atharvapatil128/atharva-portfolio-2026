import Link from "next/link";
import Image from "next/image";
import { BackLink } from "@/components/back-link";
import { AmbientVideo } from "@/components/ambient-video";
import { ExpandableImage } from "@/components/expandable-image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const researchLoop = [
  ["Browse", "Open a platform looking for an easy way to unwind."],
  ["Compare", "Scan rows, open titles, and switch between services."],
  ["Hesitate", "Energy drops while the perceived cost of choosing rises."],
  ["Loop", "Keep scrolling, leave, or return to something familiar."],
] as const;

const decisions = [
  {
    title: "Intervene only when support is useful.",
    signal: "Users were not always done choosing.",
    constraint: "A feed or heavy recommendation tool would add another decision layer.",
    choice: "Keep the capstone helper passive during normal browsing, surface it at hesitation, and allow on-demand access.",
  },
  {
    title: "Separate choosing from stopping.",
    signal: "Friends felt trustworthy; familiar titles worked as a safety net.",
    constraint: "Showing both paths together would create another decision.",
    choice: "Friend recommendations come first during hesitation. Comfort Pick remains the fallback for when choosing is over.",
  },
  {
    title: "Limit choice on purpose.",
    signal: "More options increased decision effort; too few felt restrictive.",
    constraint: "The helper could not become another catalogue to evaluate.",
    choice: "Show five friend recommendations at a time: enough variety to compare, narrow enough to act.",
  },
] as const;

const recommendationFlow = [
  {
    src: "/images/streaming-helper/recommend-open-hd.png",
    step: "01 / OPEN",
    caption: "The extension recognizes the title without interrupting playback.",
    alt: "Streaming page with the Streaming Helper recommendation panel opened beside the video.",
  },
  {
    src: "/images/streaming-helper/recommend-selected-hd.png",
    step: "02 / CHOOSE",
    caption: "A friend is selected and the action becomes explicit.",
    alt: "Streaming Helper panel with a friend selected and the send recommendation button active.",
  },
  {
    src: "/images/streaming-helper/recommend-sent-hd.png",
    step: "03 / CONFIRM",
    caption: "A clear receipt closes the loop without pulling the viewer away.",
    alt: "Streaming Helper confirmation showing that the recommendation was added to a friend's list.",
  },
] as const;

const productChapters = [
  {
    label: "IN THE STREAM",
    title: "Two paths appear when choosing starts to feel like work.",
    description: "The helper stays compact during normal browsing. When support is wanted, a viewer can return to trusted recommendations or ask for one familiar Comfort Pick.",
    surfaces: [
      {
        src: "/images/streaming-helper/extension-ready-hd.png",
        label: "EXTENSION / READY STATE",
        title: "The helper offers two distinct exits from hesitation",
        alt: "Streaming service with the compact Streaming Helper menu showing friend recommendations and Comfort Pick ready.",
        format: "standard",
      },
      {
        src: "/images/streaming-helper/comfort-pick-hd.jpg",
        label: "EXTENSION / COMFORT PICK",
        title: "A focused fallback ends another round of browsing",
        alt: "Streaming Helper Comfort Pick presenting five recommendations over a streaming service.",
        format: "standard",
      },
    ],
  },
  {
    label: "OUTSIDE THE STREAM",
    title: "The companion product keeps recommendations useful later.",
    description: "What a friend sends should not disappear with the viewing session. The dashboard preserves those recommendations, while the Comfort List gives familiar titles a deliberate place to live.",
    surfaces: [
      {
        src: "/images/streaming-helper/dashboard-recommendations-hd.png",
        label: "COMPANION PRODUCT / RECOMMENDATIONS",
        title: "Sent titles remain searchable and attributable",
        alt: "Streaming Helper dashboard showing sent recommendations organized in a searchable grid.",
        format: "wide",
      },
      {
        src: "/images/streaming-helper/comfort-list-hd.png",
        label: "COMPANION PRODUCT / COMFORT LIST",
        title: "Familiar titles stay ready for low-energy moments",
        alt: "Streaming Helper Comfort List with familiar movies and shows saved for later.",
        format: "wide",
      },
    ],
  },
] as const;

export function StreamingHelperCaseStudy() {
  return (
    <>
      <SiteHeader />
      <main>
        <article className="sh-case">
          <header className="sh-hero">
            <svg className="sh-hero-pattern" viewBox="0 0 1600 760" preserveAspectRatio="none" aria-hidden="true">
              <path d="M-90 170C220 22 300 380 608 217S1025 69 1170 292s330 214 518 28" />
              <path d="M-130 420c258-116 405 173 674 26s443-295 653-76 327 249 506 57" />
              <path d="M280-72c29 207-91 285 35 458s312 98 377 294" />
              <path d="M1248-96c-71 194 45 293-87 457s-297 122-334 339" />
            </svg>
            <BackLink href="/#selected-work">Back to selected work</BackLink>
            <div className="sh-hero-grid">
              <div className="sh-hero-copy">
                <span className="sh-status-pill mono">INDIVIDUAL CAPSTONE · SPRING 2026</span>
                <h1>Streaming Helper</h1>
                <p className="sh-hero-line">Support for the moment choosing becomes exhausting.</p>
                <p className="sh-hero-summary">An HCI capstone about low-energy decision-making that later became a working browser extension and companion product.</p>
                <a href="https://streaminghelper.net/" target="_blank" rel="noreferrer" className="sh-hero-live">Open live website <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
              </div>

              <figure className="sh-hero-media">
                <div className="sh-hero-image">
                  <AmbientVideo src="/videos/streaming-helper-demo.mp4" poster="/images/streaming-helper/demo-poster.webp" controls label="Streaming Helper product walkthrough, a silent screen recording" />
                  <span className="sh-hero-product-icon" aria-hidden="true"><Image src="/images/streaming-helper/product-icon.png" alt="" width={76} height={76} priority /></span>
                </div>
                <figcaption className="mono"><span>WORKING PRODUCT / 1:41 WALKTHROUGH</span><span>PLAY, PAUSE, OR OPEN THE LIVE BUILD</span></figcaption>
              </figure>
            </div>

            <dl className="sh-facts">
              <div><dt>Role</dt><dd>Research, product design, prototyping, and implementation</dd></div>
              <div><dt>Research</dt><dd>30 survey responses · 7 interviews</dd></div>
              <div><dt>Testing</dt><dd>5+ iterative prototype sessions</dd></div>
              <div><dt>Now</dt><dd>Working browser extension and companion product</dd></div>
            </dl>
          </header>

          <section className="sh-section sh-scan">
            <div>
              <h2>The case in 30 seconds</h2>
              <p className="sh-scan-statement">The capstone began with too many choices. Research revealed a sharper problem: <span>hesitation when energy was low.</span> Building it later showed something more concrete: <span>keep trusted recommendations from disappearing before people need them.</span></p>
            </div>
            <dl className="sh-summary-facts">
              <div><dt><i aria-hidden="true">01</i> Problem</dt><dd>Repeated browsing became hesitation when users were tired.</dd></div>
              <div><dt><i aria-hidden="true">02</i> Capstone response</dt><dd>A passive helper with friend recommendations and a comfort fallback.</dd></div>
              <div><dt><i aria-hidden="true">03</i> Product today</dt><dd>A live Chrome extension and companion app for sending, saving, and returning to recommendations.</dd></div>
            </dl>
            <div className="sh-decision-moment" aria-label="Browsing to support sequence">
              <div className="sh-panel-label mono"><span>THE DECISION MOMENT</span><span>LOW ENERGY / HIGH CHOICE</span></div>
              <div className="sh-moment-stages">
                <div><span className="mono">01</span><strong>Browse</strong><p>Compare titles.<br />Switch services.<br />Keep scrolling.</p></div>
                <div className="is-active"><span className="mono">02</span><strong>Hesitation</strong><p>Effort rises while confidence drops.</p></div>
                <div><span className="mono">03</span><strong>Support</strong><p>Trusted suggestions make the next step smaller.</p></div>
              </div>
              <p className="sh-moment-takeaway mono">THE PRODUCT INTERVENES AT THE DECISION, NOT THE DISCOVERY</p>
            </div>
          </section>

          <section className="sh-section sh-product-states">
            <h2>One idea, two product states</h2>
            <p className="sh-section-intro">The capstone established the behavioral opportunity. Implementation forced the concept to become smaller, clearer, and technically honest.</p>
            <div className="sh-state-comparison">
              <article>
                <span className="mono">CAPSTONE CONCEPT</span>
                <h3>Support hesitation across TV and computer streaming.</h3>
                <ul>
                  <li>Passive overlay helper</li>
                  <li>Personalized hesitation detection</li>
                  <li>Five friend recommendations</li>
                  <li>Comfort Pick fallback</li>
                  <li>Companion web app</li>
                </ul>
              </article>
              <div className="sh-translation mono" aria-hidden="true"><span>BUILT, TESTED,</span><span>AND NARROWED</span></div>
              <article className="sh-state-current">
                <span className="mono">WORKING BETA</span>
                <h3>A browser-first product with a deliberate human handoff.</h3>
                <ul>
                  <li>Chrome extension on supported title pages</li>
                  <li>Send a title directly to a friend</li>
                  <li>Saved recommendations in a web dashboard</li>
                  <li>Friends, Comfort Picks, onboarding, and help</li>
                </ul>
                <a href="https://streaminghelper.net/" target="_blank" rel="noreferrer" className="sh-live-link mono">OPEN LIVE PRODUCT</a>
              </article>
            </div>
            <p className="sh-survival-note"><strong>What survived:</strong> trusted friend recommendations, a comfort fallback, and the companion product. <strong>What changed:</strong> the interaction became user-triggered, browser-first, and feasible without pretending unvalidated detection or TV integration already worked.</p>
          </section>

          <section className="sh-section sh-reframing">
            <div className="sh-section-heading">
              <h2>The problem changed when I stopped counting options.</h2>
              <p className="mono">30 SURVEY RESPONSES<br />7 INTERVIEWS<br />AFFINITY SYNTHESIS</p>
            </div>
            <p className="sh-section-intro">The recurring pattern was not discovery. It was hesitation: browsing for several minutes, switching services, delaying the choice, or falling back on something familiar.</p>
            <div className="sh-loop">
              {researchLoop.map(([title, body], index) => (
                <article key={title}>
                  <span className="mono">0{index + 1} / {title.toUpperCase()}</span>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <p className="sh-insight-line mono">HUMAN OVER ALGORITHM · FEAR OF WASTING TIME · LOW COGNITIVE ENERGY · COMFORT AS A SAFETY NET</p>
          </section>

          <section className="sh-section sh-decisions">
            <h2>Three decisions shaped the system</h2>
            <p className="sh-section-intro">Each decision connects a research signal to a constraint and the product choice that followed.</p>
            <div className="sh-decision-list">
              {decisions.map((decision, index) => (
                <article key={decision.title}>
                  <div className="sh-decision-title"><span className="mono">DECISION 0{index + 1}</span><h3>{decision.title}</h3></div>
                  <div className="sh-decision-flow">
                    <div><span className="mono">SIGNAL</span><p>{decision.signal}</p></div>
                    <i className="sh-flow-arrow" aria-hidden="true">→</i>
                    <div><span className="mono">CONSTRAINT</span><p>{decision.constraint}</p></div>
                    <i className="sh-flow-arrow" aria-hidden="true">→</i>
                    <div className="sh-choice"><span className="mono">CHOICE</span><p>{decision.choice}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="sh-section sh-system">
            <h2>A support system, not another streaming service</h2>
            <p className="sh-section-intro">The capstone wrapped around existing services. Each part had one job, and the viewing moment stayed deliberately light.</p>
            <div className="sh-system-parts">
              <article><span className="mono">HELPER OVERLAY</span><p>Stayed passive during browsing, signaled at hesitation, and remained available on demand.</p></article>
              <article><span className="mono">COMPANION WEB APP</span><p>Managed friends, received recommendations, connected services, and the Comfort List.</p></article>
              <article><span className="mono">RECOMMENDATION FLOW</span><p>Let someone send the title they were watching directly to selected friends.</p></article>
            </div>
            <div className="sh-paths">
              <article><span className="mono">STILL WANTS TO CHOOSE</span><h3>Friend recommendations</h3><p>Five trusted options make comparison feel smaller and less risky.</p></article>
              <article><span className="mono">WANTS TO STOP DECIDING</span><h3>Comfort Pick</h3><p>A familiar title bypasses another round of evaluation.</p></article>
            </div>
          </section>

          <section className="sh-section sh-walkthrough">
            <div className="sh-walkthrough-heading" id="product-walkthrough">
              <div>
                <h2>The working product, in context</h2>
                <p className="sh-section-intro">The live product connects two moments: recommending something while it is already on screen, and returning to it when a friend is ready to watch.</p>
              </div>
              <div className="sh-product-mark">
                <Image src="/images/streaming-helper/product-icon.png" alt="Streaming Helper app icon" width={72} height={72} />
                <span className="mono">LIVE PRODUCT<br />CHROME EXTENSION + WEB APP</span>
              </div>
              <a href="https://streaminghelper.net/" target="_blank" rel="noreferrer" className="sh-section-live mono">OPEN LIVE WEBSITE <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg></a>
            </div>

            <div className="sh-primary-media">
              <div className="sh-media-label mono"><span>DIRECT RECOMMENDATION</span><span>STREAMING PAGE → FRIEND → CONFIRMATION</span></div>
              <div className="sh-flow-grid">
                {recommendationFlow.map((frame) => (
                  <figure key={frame.step}>
                    <div className="sh-image-frame"><ExpandableImage src={frame.src} alt={frame.alt} width={2560} height={1600} sizes="(max-width: 760px) 84vw, 31vw" caption={`${frame.step} — ${frame.caption}`} /></div>
                    <figcaption><span className="mono">{frame.step}</span><p>{frame.caption}</p></figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="sh-product-chapters">
              {productChapters.map((chapter) => (
                <section className="sh-product-chapter" key={chapter.label}>
                  <header>
                    <span className="mono">{chapter.label}</span>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.description}</p>
                  </header>
                  <div className="sh-product-gallery">
                    {chapter.surfaces.map((surface) => (
                      <figure key={surface.label}>
                        <div className={`sh-image-frame ${surface.format === "wide" ? "sh-image-frame-wide" : ""}`}><ExpandableImage src={surface.src} alt={surface.alt} width={surface.format === "wide" ? 2936 : 2560} height={1600} sizes="(max-width: 760px) 100vw, 50vw" caption={surface.title} loading="eager" /></div>
                        <figcaption><span className="mono">{surface.label}</span><strong>{surface.title}</strong></figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <figure className="sh-demo">
              <figcaption>
                <span className="mono">FULL PRODUCT WALKTHROUGH · 1:41</span>
                <h3>See the extension and companion app working together.</h3>
                <p>The walkthrough follows the complete product flow; the same key interactions are described in the screenshots above.</p>
              </figcaption>
              <video controls preload="metadata" poster="/images/streaming-helper/demo-poster.webp" aria-label="Streaming Helper product walkthrough">
                <source src="/videos/streaming-helper-demo.mp4" type="video/mp4" />
              </video>
            </figure>
          </section>

          <section className="sh-section sh-validation">
            <h2>What the prototype established, and what it didn&apos;t</h2>
            <div className="sh-validation-grid">
              <article>
                <span className="mono">ITERATIVE TESTING · 5+ PROTOTYPE TESTS</span>
                <ul>
                  <li>A clearer helper symbol made passive and triggered states easier to understand.</li>
                  <li>Friend indicators, ratings, and time cues made recommendations more useful for choosing.</li>
                  <li>Confirmation and undo made sending a title feel recoverable rather than final.</li>
                </ul>
              </article>
              <aside>
                <span className="mono">NOT VALIDATED IN THE CAPSTONE</span>
                <ul>
                  <li>Cross-platform hesitation detection</li>
                  <li>Non-disruptive system overlays</li>
                  <li>TV and OS-level integration</li>
                  <li>Production privacy behavior</li>
                </ul>
              </aside>
            </div>
            <p className="sh-measurement mono">SUCCESS WOULD BE MEASURED BY · TIME-TO-PLAY · ABANDONMENT · PLATFORM SWITCHING · RECOMMENDATION TRUST · COMFORT PICK USAGE · SATISFACTION</p>
          </section>

          <section className="sh-section sh-reflection">
            <h2>Building it became another round of research.</h2>
            <div className="sh-reflection-grid">
              <article><span className="mono">WHAT I LEARNED</span><p>Research is useful only when it changes a product decision. The capstone’s strongest move was removing interaction until support was useful. Implementation added a second lesson: technical constraints can expose a clearer product than the original concept.</p></article>
              <article><span className="mono">WHAT I WOULD TEST NEXT</span><ul><li>Whether sending a recommendation is useful enough to keep the extension installed</li><li>Where setup or permissions create hesitation</li><li>How often saved recommendations lead to action</li><li>Whether Comfort Picks support low-energy moments</li></ul></article>
            </div>
            <p className="sh-ai-note">AI accelerated synthesis, ideation, copy refinement, and rapid prototyping. I remained responsible for what to keep, remove, test, and build.</p>
          </section>

          <Link href="/work/mead" className="next-case" aria-label="Next case study: MEAD">
            <span className="next-case-copy"><span className="mono">NEXT CASE STUDY</span><strong>MEAD</strong><span className="next-case-descriptor">Exploring continuity, identity, and care for people living with advanced dementia.</span></span>
            <span className="next-case-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          </Link>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
