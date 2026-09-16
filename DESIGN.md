---
name: Atharva Patil Portfolio 2026
description: Evidence-led product design presented with the precision and confidence of a modern paddock.
colors:
  canvas: "#F6F7F4"
  surface: "#FFFFFF"
  subtle: "#E8EBEF"
  field-warm: "#F1EFE8"
  strong: "#111318"
  text-secondary: "#616671"
  text-tertiary: "#858B96"
  line: "#D5D9E0"
  signal: "#FF5A18"
  cobalt: "#365DE4"
  acid: "#D6FF63"
  coral: "#E97B72"
  oat: "#DDD1B0"
  slate: "#4F5966"
  ink-on-signal: "#1F222A"
  line-active: "color-mix(in srgb, {colors.strong} 30%, {colors.line})"
typography:
  display:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "clamp(52px, 4.45vw, 64px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  case-display:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "clamp(64px, 7.6vw, 110px)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "clamp(48px, 4.45vw, 64px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Instrument Sans, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.333
    letterSpacing: "0.015em"
rounded:
  soft: "14px"
  field: "18px"
  card: "24px"
  interactive: "26px"
  pill: "999px"
spacing:
  micro: "8px"
  control: "12px"
  card-gap: "18px"
  inset: "24px"
  page: "clamp(24px, 4.45vw, 64px)"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    backgroundImage: "{face.signal}"
    textColor: "{colors.ink-on-signal}"
    typography: "{typography.body}"
    fontWeight: 600
    rounded: "{rounded.pill}"
    padding: "11px 24px 12px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.strong}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "11px 24px 12px"
    height: "48px"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.strong}"
    rounded: "{rounded.card}"
    padding: "18px 21px 20px"
  note-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.strong}"
    rounded: "{rounded.field}"
    padding: "24px"
---

# Design System: Atharva Patil Portfolio 2026

## Overview

**Creative North Star: "Precision Paddock"**

This system presents product-design evidence with the disciplined calm of a modern race paddock: generous working room, precise instrumentation, controlled color, and a small number of tactile moments. It is plush without becoming decorative and technical without becoming cold. The page should feel authored, stable, and easy to trust before it tries to feel impressive.

The visual story moves from complexity to confidence. Large plain-language statements establish judgment; compact mono metadata supplies evidence; project surfaces and interactions invite depth. The system rejects generic SaaS decoration, scattered accent colors, scroll-jacking, invented outcomes, and spectacle that delays a hiring manager's scan.

**Key Characteristics:**

- Warm porcelain fields with soft-black structure.
- Instrument Sans for human clarity; IBM Plex Mono for verified metadata and telemetry.
- Orange for decisive action, cobalt for system structure, and quieter local colors for authored content.
- Large, calm spatial fields interrupted by precise interactive cards.
- One memorable desk composition supported by restrained motion elsewhere.

## Colors

The palette is predominantly neutral. Color appears in project media, purposeful fields, and explicit signals—not as ambient decoration.

### Primary

- **Signal Orange:** The primary action and decision color. It marks the one action or resolved state that deserves immediate attention.
- **Structural Cobalt:** The system color for care/research data, active structure, and selected authored surfaces.

### Secondary

- **Selection Acid:** Reserved for text selection and rare high-contrast utility moments.
- **Measured Coral:** A supporting authored-media color, not a default UI accent.
- **Field Oat:** A warm material tone for personal or editorial cards.

### Neutral

- **Porcelain Canvas:** The default page field and the source of the site's warm, clean atmosphere.
- **White Surface:** Raised or isolated content surfaces.
- **Warm Parchment:** The brighter alternating section field; visibly warmer than the porcelain canvas without becoming a second accent color.
- **Fog Subtle:** Quiet project visuals and low-contrast separation within sections.
- **Soft Black:** Primary text, dark fields, and the strongest structural contrast.
- **Secondary Graphite / Tertiary Graphite:** Supporting copy and non-primary metadata.
- **Hairline Gray:** Dividers, quiet borders, and control outlines.
- **Slate:** Scrollbar and muted technical material.

**The Rare Signal Rule.** Signal Orange marks a decision or primary action. Do not scatter it across labels, ornaments, and secondary controls.

**The Authored Color Rule.** Supporting color belongs to project media and deliberate content fields. The shared interface remains neutral.

## Typography

**Display Font:** Instrument Sans (with Arial and sans-serif fallbacks)  
**Body Font:** Instrument Sans (with Arial and sans-serif fallbacks)  
**Label/Mono Font:** IBM Plex Mono (with monospace fallback)

**Character:** Instrument Sans makes large statements feel contemporary, direct, and human. IBM Plex Mono creates the precise evidentiary voice used for project indices, status, controls, and telemetry.

### Hierarchy

- **Display** (600, fluid 52–64px, 1.06): Homepage hero statements and the strongest page-level messages.
- **Case Display** (600, fluid 64–110px, 0.92): Project names on case-study routes.
- **Headline** (600, fluid 48–64px, 1.06): Major homepage and section headings.
- **Body** (400, 16px, 1.5): General explanations, evidence, and supporting copy. Important summaries may step up to 20px with the same measured rhythm.
- **Label** (500, 12px, 0.015em): Functional metadata, indices, status, and interaction instructions. Use sentence case by default; reserve all caps for compact operational labels inside project-specific interfaces.

**The Mono Legibility Floor.** IBM Plex Mono never renders below 10px and uses at least weight 500 at that floor. Dense evidence can become concise or progressively disclosed, but it must not become faint microtype.

**The Plain-Language First Rule.** A reader encounters the meaningful statement before its technical classification. Mono labels support the message; they do not become invented eyebrow copy above every heading.

**The Two-Voice Rule.** Use Instrument Sans for content and IBM Plex Mono for evidence. Do not add a third display family.

## Layout

The desktop experience is art-directed around a 1440px reference viewport with a shared fluid page inset. The homepage uses a centered reading column framed by five real desk-object assets. Home-specific identity, summary, availability, actions, and location remain the focal point; a real Streaming Helper proof card rises from the lower edge in the position formerly occupied by the Notes preview. The hero spotlights one shipped project without duplicating the complete Selected Work comparison index below it. Major sections are full-width tonal fields with content aligned to the same inset.

The Selected Work deck favors one project at a time on fine pointers while keeping every project legible. At the mobile breakpoint it becomes a horizontal snap rail with the next card visibly peeking into the viewport. The Beyond the Work field follows the same discoverable rail behavior, giving personality content a deliberate but secondary role.

The system uses content-driven breakpoints near 1100px and 760px. Below 760px, navigation condenses, the hero becomes a vertical sequence, both recruiter actions remain available, project descriptors remain visible, case-study facts stack, and drag-first behaviors gain native horizontal scrolling. Page sections reduce top/bottom rhythm but preserve the 24px horizontal inset and 44–48px tap targets.

Individual Notes use a calm editorial reading column for the narrative while source artifacts, comparison sets, and thesis moments may widen beyond it. This keeps prose easy to follow without shrinking the evidence that supports it; wide material returns to the single column on small screens.

**The Thirty-Second Rule.** Role, strongest work, project meaning, résumé, and the next path must remain visible without requiring hover or animation.

**The Peek Rule.** Horizontal rails show enough of the next card to communicate that more content exists; never hide required navigation behind an invisible gesture.

## Dimensional Surfaces, Elevation & Depth

The interface uses one quiet, consistent light source from the top-left. Controls, cards, and contained media receive a shallow tonal face plus a soft lower-right cast shadow; this makes the site feel tactile without turning it glossy or skeuomorphic. Page fields, text columns, and large uninterrupted sections remain flat so the dimensional moments keep their meaning.

Light surfaces move from white or warm porcelain at the top-left toward a slightly cooler, darker edge at the bottom-right. Dark surfaces use the same geometry with a much narrower tonal range. Image frames use a hairline inner ring and cast shadow rather than a light face, which keeps photography crisp. Form fields invert the model with a restrained inset shadow so they read as places to enter information.

### Shadow Vocabulary

- **Face:** Paired one-pixel inset highlights and shade edges that establish the common top-left light source.
- **Control Lift:** A compact cast shadow for buttons, tabs, and small controls. Hover raises it by only a few pixels; active returns it to the surface.
- **Panel Lift:** A wider, lower-contrast shadow for cards and form panels. Large panels never reuse the tighter control shadow.
- **Media Lift:** A soft cast shadow plus a neutral inner ring for photography, video, and project imagery.
- **Resolved Lift:** The broadest resting shadow, reserved for the layered homepage proof artifact and overlapping Notes sheets.
- **Menu Float:** A compact ambient shadow that separates the mobile menu from the page.

**The One-Light Rule.** Any dimensional surface must agree with the top-left source. Never mix highlight directions, stack unrelated halos, or add depth to a section merely because a neighboring card has it.

**The Restraint Rule.** A surface may use tonal separation and a shadow when it represents a control, card, panel, or framed artifact. Page fields and reading columns remain flat. Colored project media can keep its own authored depth instead of receiving the global white-face treatment.

**The Conditional Translucency Rule.** Translucency is always progressive enhancement, never the base state. A frosted surface declares its solid fill first and only becomes translucent inside a feature query for backdrop blur; without that guard, a browser lacking the filter renders unblurred content bleeding through the panel. Every frosted surface also honours a reduced-transparency preference by returning to its solid fill.

**Two tiers of depth.** Shared interface surfaces — controls, cards, panels, form fields, framed media — take their depth from the shared tokens so they read as one system. Authored artifacts such as device mockups, case-study hero compositions, and floating product frames keep deliberately heavier bespoke shadows, because an object floating well above the page cannot borrow a button's cast shadow and still look physical. Fact grids, list rows, and other divisions *within* a surface stay flat; they are not objects resting on the page.

## Shapes

Cards use generous but disciplined curves. Primary project and personal cards use 24px corners; smaller note fields use 18px; floating interactive layers may reach 26px; actions are fully pill-shaped. Borders are usually one quiet hairline, with stronger two-pixel outlines reserved for the resolved hero surface.

The recurring silhouette is a rounded field containing precise internal geometry. Organic curves are allowed inside authored media—track lines, telemetry, outdoor horizons—but not as arbitrary page containers.

**The Contained Curve Rule.** Curves belong to controls, cards, and authored visuals. Keep the page grid and section edges straight and dependable.

## Components

### Buttons

- **Shape:** Fully pill-shaped with a 48px minimum height.
- **Primary:** A shallow Signal Orange gradient carrying Ink-on-Signal text at weight 600. The label is deliberately not Soft Black; see The Coupled Contrast Rule below.
- **Secondary:** White Surface with a Hairline Gray border. On hover the edge lifts to Line Active and gains a faint halo rather than snapping to a hard outline.
- **Surface:** A shallow directional face and Control Lift, both derived from the shared tokens rather than one-off gradients.
- **Hover / Focus:** Fine pointers receive a 2px upward lift and a slightly stronger cast shadow. Hover *lightens* the face rather than deepening it, which suits a control rising toward the light and keeps contrast climbing rather than falling. Keyboard focus uses a clear cobalt outline outside the control. Active state returns to the baseline quickly.

**The Coupled Contrast Rule.** Primary button text sits on the darkest stop of the Signal gradient, so the label colour and that stop are a single decision. Ink-on-Signal is as light as the gradient currently allows; the gradient's dark stop is held shallow for the same reason. Measured against Ink-on-Signal, the gradient runs 5.81:1 to 4.72:1 at rest and 6.06:1 to 4.90:1 on hover — every stop above the 4.5:1 floor, with the resting dark end the tightest point in the system. Lightening the label without lightening that stop, or deepening the gradient without darkening the label, drops the control below AA silently and with no visual warning. Change them together or not at all.

**No light text on Signal Orange.** At 16px nothing lighter than roughly `#252525` clears 4.5:1 on this orange, and white measures about 3.1:1. Dark text is a contrast requirement here, not a stylistic preference.

### Cards / Containers

- **Corner Style:** 24px for primary cards, 18px for compact fields.
- **Background:** White Surface, Fog Subtle, or Soft Black according to hierarchy.
- **Shadow Strategy:** Panel Lift at rest when a surface is meaningfully raised or overlapping; interaction increases the cast shadow without changing the light direction. Flat editorial groupings remain border-only.
- **Border:** One quiet hairline; the active resolved experience may use a stronger Soft Black outline.
- **Internal Padding:** Generally 18–24px, increasing only for major editorial sections.

### Navigation

The desktop header is a sticky porcelain rail with Atharva's geometric AP/apex mark, centered segmented navigation, a green live-availability signal, and one high-contrast Let's Talk action. It compresses slightly after scrolling and gains measured depth without transparency or glass. Active routes receive a contained surface, short underline, and signal dot; the contact control reverses its black/orange split treatment on the contact route. On mobile, a native disclosure exposes Work, Notes, About, Résumé, and Let's Talk in a floating field with 44px rows.

### Featured Project Artifact and Notes Index

The homepage signature is a product-proof composition rather than a second navigation index. Tactile desk objects create an authored field around a protected central reading column. The foreground Streaming Helper proof card names the product, the customer problem, the research evidence, and both the case-study and live-product paths. It rises into place with restrained depth, while the complete meaning remains legible at rest and in reduced-motion mode.

Notes uses a quieter editorial introduction with a two-sheet preview of the two real published notes on the right. The overlap borrows the tactile paper language of the homepage artifact without repeating its product-proof treatment: both sheets are actionable, the newest note leads, and one restrained orange filing tab connects the composition to the shared signal color. The complete index remains directly below as the scannable destination and must stay useful when the collection grows.

### Selected Work Deck

Desktop hover/focus changes the active column and reveals a compact, evidence-led project brief: role and period are grouped together, followed by verified project evidence, so the expanded surface reads as a case-study preview rather than decoration. Collapsed cards remain quieter but are not empty: the title leads, followed by the project claim and a restrained category/evidence line. Their artwork occupies a consistent media zone with a deliberate gap before the copy; expanded cards preserve an equivalent horizontal gap between the reading column and artifact. The deck is deliberately substantial enough to dominate the section rather than read as a compact index. Mobile and tablet use native horizontal snapping, preserve large touch-sized project canvases, clamp descriptors on complete lines, and leave the next card peeking into view; the denser desktop brief and category/evidence line are omitted there. Project-specific compositions adapt rather than crop mechanically: MEAD's two screens remain fully framed on touch layouts. Each project owns a distinct media grammar rather than sharing one generic thumbnail.

### Note Row

Editorial entries use a bordered 18px field with metadata, a clear title, and supporting copy. Hover increases surface contrast and border definition without adding a decorative effect.

### Long-Form Note Story

Published Notes pair a measured single-column narrative with occasional dark thesis moments and oversized pull quotes that mark genuine turns in the argument. Source artifacts appear as captioned Media Lift figures and always provide an explicit path to the full-size original; a preview is never the only available evidence. Each story closes with one decisive next-note continuation rather than a generic cluster of related links.

### Résumé Route

Recruiter-facing résumé actions in Home, About, Contact, and shared navigation open the verified Google Drive source directly. The `/resume` route remains a shareable fallback with distinct view and download actions, but it is never a required intermediate click. Present that connection as a composed portfolio surface: porcelain copy field, existing pill controls, and one dimensional résumé sheet using the shared Face and Panel Lift vocabulary.

### What Sharpens My Eye Rail

Personal cards connect build logs, karting, running, outdoors, and travel to concrete design instincts. Every card is a real link with an explicit summary; the rail supports drag, native scroll, and keyboard arrows, and no destination or meaning depends on the gesture.

### Contact Form, About Telemetry, and Footer

Contact is task-first: a light, compact form validates the visitor's name, reply address, context, and message, then sends it server-side through Resend to Atharva's inbox. Sending, success, configuration, provider-error, and direct-email fallback states remain honest and accessible. Direct email, LinkedIn, and résumé routes stay visible below it. The About telemetry panel uses the dark instrumentation surface only where it has semantic value: an explicitly illustrative feedback-loop trace connects discover, frame, make, and test, while the readouts carry truthful current context rather than invented performance metrics. The dark footer closes the site within the same Soft Black and Signal Orange system and pairs a direct statement with a living canvas field of orange, cobalt, and porcelain signals.

### Motion

The hero is the primary authored entrance. Its copy becomes clear first, while the five desk objects hold their framing positions and the Streaming Helper proof card rises into the reading path. The Home desk objects use true alpha cutouts; a white rectangular source canvas may never be visible. Secondary page heroes share the same restrained intro dot field, seed, density, and orange accent distribution; Home remains the exception because its real desk objects already form the visual field. The Notes sheets enter as one staggered editorial moment and then stay quiet so the index remains the destination rather than a second showpiece. About photography receives subtle scroll-linked crop movement inside stable frames; text and controls do not drift. Teak-inspired text emphasis is reserved for one meaningful word at a time and appears as a compact translucent signal highlight, never as a long underline. The canvas signal field remains available for supporting surfaces, not behind the homepage composition. A single site-level circular equalizer may follow fine pointers across open negative space, but it fades over copy, navigation, actions, forms, and project media. The native cursor remains visible and precise. The footer signal field stays concentrated around the closing action rather than becoming a universal background. All experiences become static under reduced-motion preferences, and coarse pointers receive the same complete content.

### Case-Study Structure

Every case study opens with project identity, a plain-language descriptor, the core problem statement, contribution facts, and a reserved media field. Deeper sections prioritize a 30-second summary, direct contribution, pivotal decisions, outcomes, and qualifications. Final mockups and content may change, but this evidence-first hierarchy is durable.

**The Evidence Boundary Rule.** When a project spans an earlier concept and a later working product, label and compare those states explicitly, show what survived and what changed, and keep research counts and validation limits attached to the state that produced them. Later implementation must not retroactively imply that the earlier study validated shipped behavior.

## Do's and Don'ts

### Do:

- **Do** preserve the neutral-to-signal ratio; most of every screen should remain Porcelain, White, Fog, or Soft Black.
- **Do** show the meaningful claim before its metadata and give factual qualifications visible weight.
- **Do** keep résumé and case-study paths available on desktop and mobile.
- **Do** let Notes alternate calm reading rhythm with source evidence, and preserve full-size access to every embedded artifact.
- **Do** keep every résumé action connected to the same verified Drive-backed source, and make primary recruiter paths one click.
- **Do** use motion to explain state, depth, or discoverability and respect reduced-motion preferences.
- **Do** give each project or personality card its own authored visual logic.

### Don't:

- **Don't** add invented metrics, statuses, outcomes, testimonials, or product claims.
- **Don't** turn mono metadata into decorative eyebrow copy above every heading.
- **Don't** distribute Signal Orange across secondary actions and ornaments.
- **Don't** hide essential descriptions behind hover, drag, or a large media placeholder.
- **Don't** add glassmorphism to flat content, gradient text, generic icon grids, or ornamental 3D that slows the scan. A restrained translucent menu or caption is allowed only when it is visibly refracting content behind it.
- **Don't** mirror the résumé into a separately maintained portfolio file that can drift from its verified source.
