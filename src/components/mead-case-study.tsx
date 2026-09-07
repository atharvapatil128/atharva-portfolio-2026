import Image from "next/image";
import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { ExpandableImage } from "@/components/expandable-image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const prototypeUrl = "https://www.figma.com/design/HbB96rktLaOSjzjX00IHPq/MEAD-Final-Design-File?node-id=1-2";

const signals = [
  ["Eye gaze", "Where attention settles and how it shifts."],
  ["Facial expression", "Visible responses such as smiling or contentment."],
  ["Gesture", "Movement, reaching, and physical response."],
  ["Vocalisation", "Sounds and other non-verbal communication."],
] as const;

const decisions = [
  {
    title: "Put the person before the form.",
    context: "In the existing tool, the Add Entry action was difficult to find and the form began before the caregiver had clear context.",
    move: "The prototype starts with a searchable care list and shows the selected person's details and access state before recording.",
  },
  {
    title: "Bring recording into the entry flow.",
    context: "Caregivers previously had to record, upload, and delete video through separate manual steps.",
    move: "The prototype places recording inside the mobile entry and makes the upload and deletion sequence visible instead of relying on memory.",
  },
  {
    title: "Show what comes back after submission.",
    context: "Epicollect5 collected videos for later expert analysis, but caregivers received no feedback through the product.",
    move: "The concept shows how reviewed entries could return observable engagement cues and practical suggestions for a future interaction.",
  },
] as const;

const workflowChanges = [
  {
    title: "Find the person",
    before: "The Add Entry action was difficult to locate.",
    proposed: "Start from a searchable care list with a visible access state.",
  },
  {
    title: "Record the interaction",
    before: "Recording and form completion happened across separate steps.",
    proposed: "Record a new video from inside the person's entry flow.",
  },
  {
    title: "Complete the transfer",
    before: "Uploading and deleting the video required manual follow-through.",
    proposed: "Make upload status and post-transfer deletion explicit in the interface.",
  },
  {
    title: "Use the feedback",
    before: "No guidance returned to the caregiver after submission.",
    proposed: "Show how reviewed cues and suggestions could inform a later interaction.",
  },
] as const;

const prototypeFlows = [
  {
    id: "access",
    label: "Build the care circle",
    title: "Establish access before asking for an entry.",
    description: "The caregiver can see who is already available, search when someone is missing, send a verification request, and continue only after a person is available in the care list.",
    screens: [
      { src: "/images/mead/care-circle-empty.png", alt: "MEAD Add People screen showing an empty care list and available members", width: 804, height: 1752, caption: "Review the current care list." },
      { src: "/images/mead/care-circle-search.png", alt: "MEAD Add People search showing a person who can be requested", width: 804, height: 1980, caption: "Search for a missing person." },
      { src: "/images/mead/care-circle-request-sent.png", alt: "MEAD verification request confirmation", width: 804, height: 1756, caption: "Make the verification state explicit." },
      { src: "/images/mead/care-circle-selected.png", alt: "MEAD care list with a verified person selected and the next action enabled", width: 804, height: 1756, caption: "Select a verified person and continue." },
    ],
  },
  {
    id: "capture",
    label: "Capture an entry",
    title: "Keep recording, context, and privacy in one path.",
    description: "The entry stays anchored to one person. Recording happens inside the app, the caregiver completes the context, and the product confirms both transfer and deletion.",
    screens: [
      { src: "/images/mead/entry-select-person.png", alt: "MEAD New Entry screen with a person selected and recording available", width: 804, height: 1982, caption: "Choose the person before recording." },
      { src: "/images/mead/entry-record-video.png", alt: "MEAD in-app video recording screen", width: 804, height: 1748, caption: "Record without leaving the entry." },
      { src: "/images/mead/entry-ready-upload.png", alt: "MEAD completed entry with recorded video, location, notes, and upload action", width: 804, height: 2090, caption: "Add context and complete the transfer." },
      { src: "/images/mead/entry-uploaded.png", alt: "MEAD upload complete screen explaining that the video was deleted for privacy", width: 804, height: 1748, caption: "Confirm upload and deletion." },
    ],
  },
] as const;

export function MeadCaseStudy() {
  return (
    <>
      <SiteHeader />
      <main>
        <article
          className="mead-case"
          data-design-contract="THESIS: turn a care-data capture workflow into a person-centered return loop. OWN-WORLD: inherited Precision Paddock structure with MEAD cobalt, clinical navy, and exact prototype artifacts. STORY: understand the engagement gap, scan the redesign, inspect the three decisions, and see the evidence boundary. FIRST VIEWPORT: the care-list, recording, and feedback system leads beside a qualified problem statement. FORM: artifact-led editorial case study inherited from the approved portfolio world. SEED: cobalt-clarity-stack-40-125 (inherited)."
        >
          <header className="mead-hero">
            <BackLink href="/#selected-work">Back to selected work</BackLink>
            <div className="mead-hero-grid">
              <div className="mead-hero-copy">
                <h1>A mobile app for responding to non-verbal cues in advanced dementia.</h1>
                <p className="mead-hero-summary">MEAD helps caregivers record a short interaction, receive reviewed observations, and use them to guide the next interaction. This six-day concept was not clinically validated.</p>
                <a className="mead-prototype-link" href={prototypeUrl} target="_blank" rel="noreferrer">
                  View the MEAD prototype
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </a>
              </div>

              <div className="mead-hero-system" aria-label="MEAD prototype flow from care-list access to recording and engagement feedback">
                <svg className="mead-orbit" viewBox="0 0 760 600" aria-hidden="true">
                  <path d="M-34 191C118 96 210 100 337 235s250 217 466 103" />
                  <path d="M22 444c154-90 259-48 361 34s211 78 408-39" />
                </svg>
                <figure className="mead-phone mead-phone-care">
                  <Image src="/images/mead/care-circle-selected.png" alt="MEAD Add People prototype screen with a verified care list" width={804} height={1756} loading="eager" />
                </figure>
                <figure className="mead-phone mead-phone-record">
                  <Image src="/images/mead/entry-record-video.png" alt="MEAD in-app recording prototype screen" width={804} height={1748} loading="eager" />
                </figure>
                <figure className="mead-feedback-card">
                  <span className="mono">RETURN VALUE</span>
                  <strong>Observe → interpret → adapt</strong>
                  <Image src="/images/mead/engagement-feedback-chart.png" alt="Prototype engagement feedback chart" width={344} height={236} />
                </figure>
              </div>
            </div>

            <dl className="mead-facts">
              <div><dt>Team and period</dt><dd>4 student designers · six-day sponsor sprint · May 2025</dd></div>
              <div><dt>My contribution</dt><dd>Research synthesis, UX strategy, prototyping, and visual design</dd></div>
              <div><dt>Source workflow</dt><dd>Epicollect5 video capture and expert review</dd></div>
              <div><dt>Evidence boundary</dt><dd>Concept prototype; no testing with actual caregivers</dd></div>
            </dl>
          </header>

          <section className="mead-meaning">
            <div className="mead-meaning-copy">
              <h2>Meaningful engagement is often non-verbal.</h2>
              <p>For people living with advanced dementia, meaningful engagement can appear through eye gaze, facial expression, gesture, or vocalisation. The design problem was not simply how to capture a video. It was how to help a busy caregiver notice and act on those signals.</p>
            </div>
            <div className="mead-signal-board">
              {signals.map(([title, body], index) => (
                <article key={title}>
                  <span className="mead-signal-mark" aria-hidden="true">{index + 1}</span>
                  <div><strong>{title}</strong><p>{body}</p></div>
                </article>
              ))}
            </div>
          </section>

          <section className="mead-scan">
            <h2>The case in 30 seconds</h2>
            <p className="mead-scan-lead">The existing tool successfully collected short interaction videos for expert review. The experience broke down around that core task: adding an entry was hard to find, form progress was unclear, upload and deletion were manual, and caregivers received no feedback after contributing data.</p>
            <dl>
              <div><dt>Problem</dt><dd>Evidence left the care moment, but useful guidance did not return.</dd></div>
              <div><dt>Design response</dt><dd>Connect verified access, in-app recording, protected transfer, and feedback in one person-centered flow.</dd></div>
              <div><dt>Result</dt><dd>A high-fidelity mobile prototype spanning care-list setup, recording, entries, and engagement feedback.</dd></div>
            </dl>
          </section>

          <section className="mead-system-model">
            <div>
              <h2>The redesign addresses four breaks in the existing workflow.</h2>
              <p>The audit showed that collecting a video was possible, but finding the task, completing the transfer, and receiving useful feedback were not connected.</p>
            </div>
            <ol aria-label="Existing workflow problems and proposed MEAD responses">
              {workflowChanges.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p><span>Before</span>{step.before}</p>
                  <p><span>Prototype</span>{step.proposed}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mead-decisions">
            <div className="mead-section-head">
              <h2>Three design decisions respond directly to the audit.</h2>
              <p>Each decision connects to a documented problem in the Epicollect5 workflow. They describe the prototype response, not a validated outcome.</p>
            </div>
            <div className="mead-decision-list">
              {decisions.map((decision) => (
                <article key={decision.title}>
                  <h3>{decision.title}</h3>
                  <div><span className="mono">CONTEXT</span><p>{decision.context}</p></div>
                  <div className="mead-decision-move"><span className="mono">DESIGN MOVE</span><p>{decision.move}</p></div>
                </article>
              ))}
            </div>
          </section>

          <section className="mead-walkthrough">
            <div className="mead-section-head">
              <h2>Three flows turn a recording into a useful return loop.</h2>
              <p>Each sequence is grouped around one caregiver outcome. Alternate states stay inside the task they explain instead of becoming a disconnected gallery.</p>
            </div>
            <div className="mead-flow-stories">
              {prototypeFlows.map((flow) => (
                <article className="mead-flow-story" key={flow.id}>
                  <header>
                    <span className="mono">{flow.label}</span>
                    <h3>{flow.title}</h3>
                    <p>{flow.description}</p>
                  </header>
                  <ol className="mead-phone-sequence" aria-label={`${flow.label} screen sequence`}>
                    {flow.screens.map((screen, index) => (
                      <li key={screen.src}>
                        <div className="mead-sequence-frame">
                          <ExpandableImage src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(max-width: 760px) 68vw, 19vw" caption={screen.caption} />
                        </div>
                        <span className="mead-step-copy"><b>{index + 1}</b>{screen.caption}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}

              <article className="mead-flow-story mead-flow-story-return">
                <header>
                  <span className="mono">Review and adapt</span>
                  <h3>Move from a person-level signal to the entry behind it.</h3>
                  <p>The return path begins with longitudinal engagement, narrows to the entries behind the pattern, and opens one detailed record with observable cues and practical suggestions.</p>
                </header>
                <ol className="mead-return-sequence" aria-label="Review and adapt screen sequence">
                  <li>
                    <div className="mead-landscape-frame"><ExpandableImage src="/images/mead/engagement-overview-hd.png" alt="MEAD engagement overview with recommendations and an engagement trend" width={801} height={1748} sizes="(max-width: 760px) 86vw, 36vw" caption="Start from the person's engagement overview." /></div>
                    <span className="mead-step-copy"><b>1</b>See the person-level pattern.</span>
                  </li>
                  <li>
                    <div className="mead-landscape-frame mead-landscape-frame-list"><ExpandableImage src="/images/mead/entries-list-hd.png" alt="MEAD All Entries screen with filters and two entry summaries" width={804} height={2242} sizes="(max-width: 760px) 86vw, 28vw" caption="Filter the entries that contributed to the pattern." /></div>
                    <span className="mead-step-copy"><b>2</b>Find the relevant entry.</span>
                  </li>
                  <li>
                    <div className="mead-landscape-frame mead-landscape-frame-detail"><ExpandableImage src="/images/mead/entry-detail-hd.png" alt="MEAD detailed entry showing recommendations and an engagement breakdown" width={802} height={2934} sizes="(max-width: 760px) 86vw, 44vw" caption="Open the record and use its recommendations in the next interaction." /></div>
                    <span className="mead-step-copy"><b>3</b>Review cues and decide what to try next.</span>
                  </li>
                </ol>
              </article>
            </div>
            <a className="mead-prototype-link mead-prototype-link-dark" href={prototypeUrl} target="_blank" rel="noreferrer">Explore the full prototype <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg></a>
          </section>

          <section className="mead-validation">
            <div>
              <h2>What the prototype demonstrates</h2>
              <ul>
                <li>A clearer mobile path from selecting a person to completing an entry.</li>
                <li>A concrete way to connect video capture with feedback for future interactions.</li>
                <li>A product direction that makes privacy and consent visible in the workflow.</li>
              </ul>
            </div>
            <aside>
              <h3>What remains unresolved</h3>
              <ul>
                <li>The prototype was not tested with actual caregivers.</li>
                <li>Consent management and UK GDPR handling require specialist validation.</li>
                <li>The engagement-analysis algorithm was not built or validated.</li>
                <li>Feedback language and visualisation still require research with caregivers.</li>
              </ul>
            </aside>
          </section>

          <section className="mead-reflection">
            <h2>The design is only useful if guidance returns.</h2>
            <p>The recording supports expert review, but the caregiver needs a clear next step in return. The sprint also made the project boundary explicit: privacy must be expressed through the workflow, and an encouraging prototype is not yet evidence strong enough for care practice.</p>
          </section>

          <Link href="/work/field-maintenance" className="next-case mead-next-case" aria-label="Next case study: Field Maintenance">
            <span className="next-case-copy"><span className="mono">NEXT CASE STUDY</span><strong>Field Maintenance</strong><span className="next-case-descriptor">Designing a clearer maintenance workflow from 45 stakeholder interviews.</span></span>
            <span className="next-case-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
          </Link>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
