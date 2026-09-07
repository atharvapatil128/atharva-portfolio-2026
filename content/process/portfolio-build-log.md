# Portfolio build log

Working notes for the future article about designing and building this portfolio with AI assistance. These are decision records, not polished blog copy.

## 2026-09-02 — Notes hero as a working desk

### Prompt and feedback

- The earlier Notes intro felt empty and generic.
- Atharva selected Acctual's invoicing hero as a compositional reference, especially its cropped three-dimensional desk objects and centered reading zone.
- The homepage animation had already been reverted, so this pass deliberately avoided adding another animated motif.

### Reference analysis

- The reference protects a quiet central column for the message.
- Large, realistically lit objects enter from the edges instead of forming a decorative frame around every side.
- A real product artifact rises from the bottom and gives the visual a reason to exist.
- The useful pattern is the spatial hierarchy; Acctual's copy, brand colors, and invoice imagery do not belong in this portfolio.

### Portfolio translation

- Recast the scene as Atharva's working desk: laptop, keyboard, paperclip, orange binder clip, and a small red Formula 1 model.
- Kept the established porcelain, soft-black, cobalt, and signal-orange system.
- Used a real note from the site's content as the bottom artifact rather than a decorative fake document.
- Centered the hero copy and shortened it so the visual remains easy to scan.
- Kept the hero static. Depth comes from photography, overlap, and a restrained hover state on the featured note.

### What to evaluate next

- Does the scene feel personal without turning into a hobby collage?
- Is the featured note visible enough at common laptop heights?
- Does the mobile crop keep the message primary and the desk objects secondary?
- During the content pass, replace the current short featured-note description with a real excerpt from the finished article.

## 2026-09-02 — Replacing the composite with sharp object layers

### What changed

- The first full-frame desk image became visibly soft once it was enlarged across the hero.
- Rebuilt the composition from five separately exported assets: laptop, keyboard, paperclip, binder clip, and Formula 1 model.
- Kept one controlled lighting recipe and contact-shadow language so the objects still read as a single desk scene.
- Exported the assets as WebP and display each below its native resolution, with Next.js serving responsive versions.

### Art direction

- Desktop retains the complete edge composition while protecting the central reading zone.
- Mobile keeps only the lightest visual cues: the paperclip and the car.
- Soft edge masks and multiply blending merge the porcelain asset backgrounds into the page without a visible rectangular crop.
- Copy and the live note preview remain above every decorative layer, so the objects never compromise legibility or interaction.

## 2026-09-02 — Isolating the F1 clarity-run concept

- Added `/home-clarity` as a separate homepage experiment so the approved landing page remains untouched.
- Kept the first viewport direct: a junior-product-designer introduction and recruiter actions sit beside one interactive transformation instead of behind atmospheric copy.
- Turned the earlier “clarity field” explanation into a working sequence: scattered interface fragments resolve into an ordered rail, the car advances, and a concrete “Something people can use” output becomes legible as the visitor scrolls.
- Used a sticky desktop stage to make the change of state readable without scroll-jacking. Pointer movement adds only shallow depth to the fragments on fine pointers.
- A red Formula 1 model travels along the rail, connecting Atharva's product practice and F1 interest to the same clarity story rather than using the car as unrelated decoration.
- Tablet, touch, coarse-pointer, and reduced-motion contexts receive the resolved composition immediately; the existing homepage sections continue below the experimental hero.
- Kept the implementation local to the new route and its clarity-run component/styles. The shared header only recognizes `/home-clarity` as a homepage path; `/` was not replaced.

### Asset provenance

- `public/images/clarity-run/f1-cutout.png` derives from the repository-owned raster `public/images/notes-objects/f1-model.webp`.
- Codex's built-in image-generation edit mode removed the off-white background while preserving the red Formula 1 car, its proportions, materials, details, and a soft semi-transparent contact shadow. The edit explicitly prohibited an opaque backdrop, rectangle, vignette, halo, border, or text.
- The generated 1536×1024 32-bit ARGB PNG has transparent corner pixels and was copied unchanged into the clarity-run directory. No post-processing, masking, or color grading was applied after generation.

### Finish disposition

- Visual and implementation review disposition: ship.
- No `DESIGN.md` change was needed. The durable system already defines the complexity-to-clarity interaction principle; this route's F1 rail, sticky staging, and copy sequence remain experiment-specific rather than global design rules.

## 2026-09-03 — Clarifying the Notes handoff and project continuation

- Archived the `/home-clarity` page source under `src/experiments`, outside the Next.js app router. Its component and generated asset remain available for reference, but the concept no longer creates a routed page or changes homepage-aware navigation.
- Rebuilt the Notes transition as a content-driven stack: the featured note now participates in the hero's layout instead of hanging below an `overflow: hidden` boundary. This keeps its full title, description, and action on the white surface, followed by a deliberate responsive breathing interval before the gray note index begins.
- Changed the case-study continuation from a passive cobalt band into one large link whose full surface advances to the next project. Context and description stay on the left while a right-arrow tile visually anchors the action; it is part of the same link rather than a separate target.
- Hover deepens the cobalt field and moves the arrow forward, keyboard focus receives a visible signal-orange inset outline, and the mobile two-column layout keeps the copy before the right-aligned arrow in reading order.
- Finish review disposition: pass. These are local hierarchy and interaction refinements, so they do not add a new durable rule to `DESIGN.md`.

## 2026-09-03 — Making section navigation repeatable

- Replaced one-shot `#selected-work` links with a shared same-page section link. When the destination hash is already in the URL, clicking Work or “View selected work” now explicitly scrolls the section back into position instead of relying on the browser to repeat an unchanged navigation.
- Kept normal cross-page navigation and modifier-key behavior intact, respected reduced-motion preferences, and closed the mobile navigation disclosure after the jump.

## 2026-09-03 — Separating the Streaming Helper concept from the working beta

- Translated the locked Figma composition into an editorial case study that leads with the decision moment, then moves from a 30-second summary into research, product decisions, system structure, validation, and reflection.
- Kept the capstone concept and the current browser-first beta in visibly separate, explicitly labeled states. A short “what survived / what changed” handoff makes the evolution legible without letting the shipped product overstate what the capstone validated.
- Preserved the research evidence labels and limits in the page itself: survey and interview counts, iterative prototype testing, and the unvalidated technical assumptions remain attached to the relevant claims.
- Used clearly labeled media reservations to lock hierarchy and responsive proportions without presenting placeholder artwork as product evidence. They are launch debt, not final mockups.
- At narrower widths, paired and multi-column evidence stacks into a single reading order. Only the decision-moment sequence becomes a deliberate horizontal rail; minimum-width constraints keep the remaining content inside the viewport.
- Finish review disposition: ship. Added the reusable Evidence Boundary Rule to `DESIGN.md`; the Streaming Helper sequence, copy, and media compositions remain page-specific.

## 2026-09-04 — Replacing media reservations with product evidence

- Replaced the labeled Streaming Helper placeholders with current extension and companion-product screenshots supplied from the live build.
- Edited the recommendation flow into three readable moments—open, choose, confirm—rather than showing several nearly identical frames or presenting the demo as decoration.
- Added four supporting surfaces that connect the in-stream helper, friend picks, account handoff, and saved-recommendation dashboard into one system.
- Kept the screenshots inside the case-study evidence boundary: they demonstrate what exists in the working product, while the earlier research counts and validation limits remain attached to the capstone concept.
- Reserved the 1:45 demo video for a later media pass. It should be compressed and edited around the story the page needs rather than embedded as a 209 MB download.
- Logged a later site-wide “human artifacts” pass: use small, authentic traces of the work and the person—annotations, testing remnants, build notes, track references, or imperfect process details—only where each artifact adds meaning. Avoid scattering ornamental stickers or personality motifs across every section.
- Finish review disposition: ship. No `DESIGN.md` change was needed; the existing Evidence Boundary Rule already governs the reusable behavior, while this page’s media sequence and gallery remain specific to Streaming Helper.

## 2026-09-04 — Letting the product lead the case study

- Replaced the abstract decision diagram in the hero with the live extension on a streaming page. The research diagram still matters, but now sits beside the 30-second case summary where it explains the behavioral model rather than competing with the shipped product.
- Replaced the homepage card’s generic three-bar thumbnail with the same real product moment and app icon, so the project is recognizable before someone opens the case study.
- Rebalanced the case summary: reduced the statement size, tightened the two-column gap, highlighted only the two pivotal findings in product violet, and gave the three summary facts compact numbered markers.
- Rebuilt the decision rows as a compact Signal → Constraint → Choice chain. Removed height-driven spacing, kept the cause-and-effect relationship on one line at wide widths, and used pale product violet for the resulting choice instead of another heavy black panel.
- Added an accessible full-screen viewer to every product screenshot, including a visible expand control, native dialog behavior, Escape/close support, scroll locking, contained imagery, and captions.
- Optimized the supplied 1:41 demo from its 200+ MB source into a web-ready 1440px MP4 with a separate poster. The source remains untouched; the embedded video uses controls, does not autoplay, and omits the source's near-empty audio track so it does not imply unavailable captions.
- Kept orange as the portfolio action color and introduced violet only where the case study is speaking in the product’s own visual language.
- Responsive and production checks passed. Desktop preserves the causal rows; mobile stacks each step and keeps the product hero ahead of supporting evidence.

## 2026-09-05 — Making the working product immediately reachable

- Promoted the compressed 1:41 walkthrough into the case-study hero, where it can demonstrate the extension before the research narrative begins. Playback pauses when the media leaves the viewport or the tab is hidden, and reduced-motion visitors receive a still poster until they choose to play.
- Replaced the Selected Work card's moving preview with the supplied Netflix extension screenshot. The homepage now gives a quicker, quieter read of the product while the full walkthrough remains available inside the case study.
- Added direct links to the live Streaming Helper website at the hero, current-product comparison, walkthrough, and Selected Work card. The case-study link and live-product link remain separate targets with clear labels.
- Shifted project-local actions from portfolio orange to Streaming Helper violet. The global navigation keeps the portfolio's orange action language; violet now identifies actions and highlights that belong to this product.
- Added large, low-contrast looping paths behind the hero content, derived from the live product site's recommendation-relay visual language. The motif sits behind the interface rather than competing with the walkthrough.
- Investigated the intermittent `postUserData` / `MutationObserver` fetch error. No matching code or failed request exists in the application, and a clean browser session produces no console error; the anonymous stack is consistent with an injected browser-extension script. The application does not suppress the external failure.
- Deferred final screenshot replacement to the planned high-resolution asset pass. Current media establishes composition, interaction, and responsive behavior without treating the existing exports as final-quality assets.

## 2026-09-05 — Turning the homepage thumbnail into a product preview

- Replaced the miniature full-desktop screenshot in Selected Work with a composed Streaming Helper preview: streaming context provides the use scene, the extension panel receives the visual focus, and a compact watching → recommend → saved relay explains the product at a glance.
- Reserved the preview's header for the browser-extension identity and direct live-product action, so the button no longer obscures the evidence visitors need to recognize.
- Built the composition from replaceable image layers and crisp interface structure. Higher-resolution product captures can be inserted later without changing the card's hierarchy or responsive behavior.

## 2026-09-05 — Replacing the preview and building the MEAD evidence path

- Replaced the bespoke Streaming Helper miniature with Atharva's supplied SVG composition. The thumbnail now uses one authored product visual rather than rebuilding the same interface from several tiny HTML layers.
- Reworked the Selected Work expansion with Motion layout interpolation. Removed the simultaneous width/height transition from each preview, which had compounded the grid change and forced visible layout thrash.
- Reconciled the MEAD portfolio frame, final product prototype, and 21-page pitch deck before writing the case study. The source record confirms a four-person student team, an Epicollect5 audit, and three core prototype flows: verified care-list access, in-app recording/upload, and returned engagement feedback.
- Replaced the generic MEAD route with a complete case study that opens on the product system, explains meaningful engagement through observable cues, summarizes the problem in 30 seconds, records the three pivotal design decisions, and uses direct Figma exports in the walkthrough.
- Kept the evidence boundary visible throughout: this was a high-fidelity concept prototype, not a clinical assessment; it was not tested with actual caregivers; consent, UK GDPR handling, and the engagement-analysis algorithm remain unresolved.
- Created `content/process/mead-case-study-source-notes.md` as the factual handoff for the later blog and content-polish pass.
- TypeScript, production build, desktop rendering, mobile rendering, route loading, and the Selected Work state change passed. Final high-resolution screenshot replacement remains intentionally deferred until Atharva supplies the source assets.

## 2026-09-05 — Restoring proportion and cross-case-study rhythm

- Corrected the Streaming Helper thumbnail's collapsed state by preserving the supplied SVG's native composition instead of cropping it to every intermediate card ratio. The surrounding violet field absorbs any remaining width without distorting or cutting off the product story.
- Brought MEAD's hero, section headings, lead paragraphs, decision titles, and vertical section spacing onto the same editorial scale used by the Streaming Helper case study. The page keeps its cobalt identity while no longer behaving like a separate typographic system.
- Reserved the three-part final-prototype walkthrough for conversion into an interactive Figma prototype once the exact public prototype URL and starting flow are supplied. The current exports remain a factual fallback rather than being discarded before the embed is verifiable.
- Audited the MEAD narrative for large statements that lacked a concrete payload. Replaced the abstract five-stage “care loop” with four source-backed workflow comparisons; each now states the existing problem and the prototype response. Rephrased the hero, decision, walkthrough, validation, and reflection headings so they describe the artifact or evidence instead of implying an outcome the sprint did not test.

## 2026-09-05 — Rebuilding Field Maintenance around the pivot

- Recovered the locked Field Maintenance case-study frame from the portfolio Figma file and checked its narrative against the original State Department challenge brief, the local Power Apps package, and the approved product mockup.
- Replaced the generic case-study template with a dedicated enterprise case that explains the field-versus-desk gap, the interview evidence, and the narrower battery-inspection MVP that followed.
- Made every decision row answer three questions: what was observed, what constraint mattered, and what the MVP did in response. The functional walkthrough is grounded in controls and fields present in the Power Apps source rather than invented showcase screens.
- Kept the evidence boundary visible: the initially available Figma frame supported 40+ interviews, functional MVP rather than deployment, and projected time/cost savings rather than measured outcomes. The later pitch-deck review below resolves the final interview count at 45.

## 2026-09-05 — Revising Field Maintenance with the final pitch deck

- Reconciled the case study with the missing 24-page Team Optima pitch deck. It resolves the interview count at 45 and identifies standardization—not a duplicated work-order concept—as the strongest reported research pattern.
- Rebuilt the central narrative as broad field problem → interview pattern → battery starting point. The revised sequence now explains why batteries mattered: they were a common frustration, often untracked below the $500 asset threshold, and could leave technicians discovering needs only after reaching a post.
- Added the product capabilities named in the deck: post and embassy-location selection, on-site asset visibility, and structured maintenance entry for voltage, serial numbers, comments, and related data.
- Kept the pitch claims honest. Approximately 40% time savings and 30% cost savings remain estimates; the $12,000 request, 1–2 developers, integration, and pilot rollout are presented as proposed next-phase work rather than completed deployment.
- Tightened the MEAD hero at the same time. The headline now names advanced dementia and non-verbal cues directly, the summary says each idea once, and the prototype action sits inside the copy column with sufficient separation from the facts row.

## 2026-09-06 — Replacing Field Maintenance placeholders with final evidence

- Audited the previous public case study before placing the final media. Preserved its strongest material—the reactive-to-proactive product shift, the primary-beneficiary feedback, and active pilot interest—while removing repeated background, carousel, and framework explanations.
- Rebuilt the hero with three real Power Apps screens rather than one repeated mockup. The composition now previews the actual select → review → record workflow in the product's blue visual language.
- Added the supplied eight-second field-context video, the iteration sheet showing the move toward explicit attention states, and the final end-to-end workflow as an expandable high-resolution artifact.
- Replaced source-facing prose such as “the deck presents” with reader-facing evidence. Approximately 40% time savings and 30% cost savings now appear as bold projected metrics with the qualification immediately adjacent.
- Added the approved Officer-in-Charge quotation and described the rollout accurately as active pilot interest, not completed deployment.
- Deferred the three homepage preview compositions until all case-study interiors and media sequences are settled, so each preview can be designed from the final story rather than an interim page state.

## 2026-09-06 — Refining Field Maintenance media and preview behavior

- Changed the field-context clip from a silent ambient loop into an intentional media player. It now starts paused with native play, pause, timeline, volume, and fullscreen controls; the supplied MP4 audio track is no longer forced muted.
- Replaced the zoomed-out workflow sheet in the product walkthrough with a horizontally scrollable sequence of individual final screens. Each screen remains large enough to read and can be opened independently at full size.
- Added a deeper navy-to-electric-blue stage treatment, retained restrained technical linework, and kept rounded corners on the hero, product gallery, individual screens, and mobile video.
- Added visible spacing to the projected metrics and retained their qualification as estimates.
- Replaced the Field Maintenance Selected Work placeholder with the supplied case-study cover image. The other two preview redesigns remain deferred until their interior pages are final.

## 2026-09-06 — Completing the Streaming Helper high-resolution media pass

- Replaced every low-resolution Streaming Helper product screenshot with the supplied source exports. The primary recommendation sequence now uses the full 2560 × 1600 open → choose → confirm frames, while the companion-product surfaces use their native wide compositions.
- Expanded the product evidence beyond the initial four screenshots to include the Recommendations dashboard, Comfort List, Comfort Pick, extension ready and sign-in states, product homepage, privacy controls, and help center. This keeps the case study grounded in the breadth of the working system without asking one image to explain every surface.
- Rebuilt the Selected Work preview from live product evidence rather than another authored thumbnail: a streaming-service context establishes where the extension operates, the companion dashboard shows where recommendations persist, and the product mark ties the two together.
- Standardized Field Maintenance card expansion on the same duration and easing tokens as Streaming Helper and MEAD. Its width and height now interpolate explicitly, removing the abrupt auto-size jump while preserving the requested top and bottom breathing room.
- Changed the 761–900 px Selected Work layout into a swipeable fixed-card rail. At that width, preserving readable imagery and text matters more than forcing three compressed columns; desktop hover behavior and mobile scroll behavior remain intact.
- Verified the homepage and Streaming Helper case study at 1440 px, 820 px, and 390 px. The final pass showed no page-level horizontal overflow, missing-image failures, browser errors, or framework error overlays.

## 2026-09-07 — Curating Streaming Helper media into a product story

- Corrected the high-resolution pass after recognizing that media quality and media quantity are separate decisions. A screenshot now earns its place only when it advances the visitor's understanding of the product system.
- Kept the three-step direct-recommendation sequence as the primary flow because its open → choose → confirm progression explains one complete task without supporting prose.
- Replaced the eight-image gallery with two explicit chapters. “In the stream” pairs the extension's ready state with Comfort Pick to explain the two responses to hesitation. “Outside the stream” pairs Recommendations with the Comfort List to show how the companion product preserves value after the viewing moment.
- Removed the sign-in, product marketing page, privacy settings, and help center from the visible sequence. They remain useful source artifacts, but they interrupt the case study's core path and do not justify a full-size position in this narrative.
- Set the four chapter images to load eagerly so a direct link or fast jump into the walkthrough does not briefly present empty media frames.

## 2026-09-07 — Turning MEAD media into three task flows

- Rejected filename order as the organizing principle and rebuilt the walkthrough around three caregiver outcomes: establish verified care-list access, capture and upload an entry, and move from a person-level engagement pattern into the detailed record behind it.
- Kept alternate states inside the task they explain. The care-circle sequence now reads empty list → search → verification sent → verified person selected; the capture sequence reads person selected → record → complete context → upload and deletion confirmed.
- Replaced the two overflowed recommendation exports with the cleaned portrait versions. Their horizontal recommendation carousels remain visible inside the product screen, but the portfolio no longer presents the surrounding black export canvas as part of the interface.
- Moved MEAD's hero and sequence stages to a lighter cobalt-tinted surface and changed product-screen framing to preserve the full screenshot. Bottom actions, status confirmations, and navigation are no longer sacrificed to a uniform crop.
- Rebuilt the MEAD Selected Work preview as a compact capture → review → adapt composition using the supplied high-resolution product screens.
- Restored the two supplied Field Maintenance cover variations in Selected Work. They now crossfade between condensed and expanded states inside a padded media stage; a soft image-derived fill absorbs ratio differences without exposing empty black bars.
- Verified that the MEAD page returns to the viewport width at 390 px after fixing the mobile flow rail's intrinsic-width overflow.

## 2026-09-07 — Making prototype sequences browsable

- Removed the nested backdrop and padded frame from the Field Maintenance Selected Work preview. The supplied cover variants now occupy the media area directly; the condensed state deliberately stretches the wide cover while the expanded state uses the matching full cover.
- Replaced MEAD's compressed desktop screenshot grids with horizontal, snap-aligned flow rails. Screens stay large enough to read, retain their numbered sequence, and expose a visible scroll cue instead of presenting as an unordered gallery.
- Copied the cleaned Engagement and Detailed Entry exports to new public asset paths so cached versions cannot survive the replacement. The review flow now uses those exact portrait exports.
- Replaced the repeated Add People phone in the MEAD hero with the Engagement overview. The first viewport now previews capture and returned guidance, while the complete Add People state sequence remains in its own care-circle flow.

## 2026-09-07 — Final MEAD overflow replacements

- Replaced the three remaining overflow-prone exports with the supplied final crops: Engagement, Add People with the keyboard open, and All Entries.
- Moved all references to fresh asset paths so the updated crops appear immediately instead of competing with cached files.
- Matched the hero's Engagement phone frame to the screenshot's actual aspect ratio, removing the artificial empty area below the product navigation.

## 2026-09-07 — Finalizing the Selected Work card system

- Removed the tiny process labels from the Streaming Helper and MEAD previews. At card scale they behaved as illegible decoration rather than useful explanation.
- Shifted MEAD onto a pale cobalt surface, creating a deliberate white → tinted → dark progression across the three projects while retaining the shared card structure.
- Replaced Field Maintenance's condensed cover crop with the supplied department seal on a deep blue identity field. The authored cover remains reserved for the expanded state, where its title and context are large enough to read.
- Tuned the Field transition as a staged identity-to-evidence swap: the seal exits quickly while the cover resolves over the existing card-resize duration, with reduced-motion support preserved.
- Reviewed the supplied MEAD walkthrough as a potential case-study asset. At 2:58 it duplicates the now-ordered screenshot flows and is too long for the portfolio's reading rhythm, so it remains unplaced unless a focused interaction excerpt is cut later.
- Preflighted a replacement Field context clip with Higgsfield. A credible eight-second 16:9 Seedance generation is viable, but the current account balance is below the estimated generation cost, so the existing clip remains in place pending an explicit generation decision.

## 2026-09-07 — Stabilizing the Field Maintenance project card

- Removed the alternate cover state from the Selected Work card after repeated crop and overflow failures across viewport sizes.
- The Field Maintenance card now uses one durable identity treatment—the supplied department seal centered on a deep blue field—across hover, focus, swipe, desktop, tablet, and mobile.
- Deferred all replacement context-video generation until the final portfolio pass because the available third-party video options require paid plans.
