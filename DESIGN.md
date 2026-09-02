---
name: Atharva Patil Portfolio 2026
description: Evidence-led product design presented with the precision and confidence of a modern paddock.
colors:
  canvas: "#F6F7F4"
  surface: "#FFFFFF"
  subtle: "#E8EBEF"
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
    textColor: "{colors.strong}"
    typography: "{typography.body}"
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
- One memorable complexity-to-clarity interaction supported by restrained motion elsewhere.

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
- **Fog Subtle:** Section fields, quiet project visuals, and low-contrast separation.
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
- **Label** (500, 12px, 0.015em, uppercase): Functional metadata, indices, status, and interaction instructions.

**The Plain-Language First Rule.** A reader encounters the meaningful statement before its technical classification. Mono labels support the message; they do not become invented eyebrow copy above every heading.

**The Two-Voice Rule.** Use Instrument Sans for content and IBM Plex Mono for evidence. Do not add a third display family.

## Layout

The desktop experience is art-directed around a 1440px reference viewport with a shared fluid page inset. Homepage A uses an asymmetric two-column composition: hiring signal and action on the left, the interactive Clarity Stack on the right. Homepage B (`/home-alt`) preserves the centered showcase-field composition for later A/B testing. Major sections are full-width tonal fields with content aligned to the same inset.

The Selected Work deck favors one project at a time on fine pointers while keeping every project legible. At the mobile breakpoint it becomes a horizontal snap rail with the next card visibly peeking into the viewport. The Beyond the Work field follows the same discoverable rail behavior, giving personality content a deliberate but secondary role.

The system uses content-driven breakpoints near 1100px and 760px. Below 760px, navigation condenses, the hero becomes a vertical sequence, both recruiter actions remain available, project descriptors remain visible, case-study facts stack, and drag-first behaviors gain native horizontal scrolling. Page sections reduce top/bottom rhythm but preserve the 24px horizontal inset and 44–48px tap targets.

**The Thirty-Second Rule.** Role, strongest work, project meaning, résumé, and the next path must remain visible without requiring hover or animation.

**The Peek Rule.** Horizontal rails show enough of the next card to communicate that more content exists; never hide required navigation behind an invisible gesture.

## Elevation & Depth

The system is flat by default and uses tonal contrast, borders, overlap, and clipping for most depth. Shadows are ambient and stateful: the resolved hero card carries a soft resting lift; project cards gain restrained elevation on hover/focus; the mobile menu floats above content. Dark sections and white cards create material contrast without glass effects.

### Shadow Vocabulary

- **Resolved Lift:** A broad, soft shadow under the hero's resolved card; use only for the signature movable surface.
- **Interactive Lift:** A lighter shadow accompanying a small upward hover/focus translation on project cards.
- **Menu Float:** A compact ambient shadow that separates the mobile menu from the page.

**The Flat-at-Rest Rule.** Shared surfaces stay flat until interaction or overlap creates a real reason for elevation.

## Shapes

Cards use generous but disciplined curves. Primary project and personal cards use 24px corners; smaller note fields use 18px; floating interactive layers may reach 26px; actions are fully pill-shaped. Borders are usually one quiet hairline, with stronger two-pixel outlines reserved for the resolved hero surface.

The recurring silhouette is a rounded field containing precise internal geometry. Organic curves are allowed inside authored media—track lines, telemetry, outdoor horizons—but not as arbitrary page containers.

**The Contained Curve Rule.** Curves belong to controls, cards, and authored visuals. Keep the page grid and section edges straight and dependable.

## Components

### Buttons

- **Shape:** Fully pill-shaped with a 48px minimum height.
- **Primary:** Signal Orange with Soft Black text and compact horizontal padding.
- **Secondary:** White Surface with a Hairline Gray border; it darkens structurally on hover rather than gaining more color.
- **Hover / Focus:** Fine pointers receive a 2px upward lift. Keyboard focus uses a clear cobalt outline outside the control. Active state returns to the baseline quickly.

### Cards / Containers

- **Corner Style:** 24px for primary cards, 18px for compact fields.
- **Background:** White Surface, Fog Subtle, or Soft Black according to hierarchy.
- **Shadow Strategy:** Flat at rest; ambient Interactive Lift only on an actionable hover/focus state.
- **Border:** One quiet hairline; the active resolved experience may use a stronger Soft Black outline.
- **Internal Padding:** Generally 18–24px, increasing only for major editorial sections.

### Navigation

The desktop header is a sticky porcelain rail with Atharva's geometric AP/apex mark, centered segmented navigation, a green live-availability signal, and one high-contrast Let's Talk action. It compresses slightly after scrolling and gains measured depth without transparency or glass. Active routes receive a contained surface, short underline, and signal dot; the contact control reverses its black/orange split treatment on the contact route. On mobile, a native disclosure exposes Work, Notes, About, Résumé, and Let's Talk in a floating field with 44px rows.

### Clarity Stack

The signature hero component turns a shipped product, a care-system case study, and an AI-assisted build note into three useful paths. The foreground card can be pressed or dragged; the linked supporting layers separate and realign with a damped spring. The instruction is explicit, the button carries an accurate pressed state, and reduced-motion users receive the same meaning without animation.

### Selected Work Deck

Desktop hover/focus changes the active column and reveals more project context. Mobile uses native horizontal snapping and keeps short descriptors visible. Each project owns a distinct media grammar rather than sharing one generic thumbnail.

### Note Row

Editorial entries use a bordered 18px field with metadata, a clear title, and supporting copy. Hover increases surface contrast and border definition without adding a decorative effect.

### What Sharpens My Eye Rail

Personal cards connect build logs, karting, running, outdoors, and travel to concrete design instincts. Every card is a real link with an explicit summary; the rail supports drag, native scroll, and keyboard arrows, and no destination or meaning depends on the gesture.

### Contact Signal and Footer

The contact visual is a pointer-responsive telemetry field with a small AP kart signal; it expresses availability without replacing the actual contact routes. The light footer remains within the Porcelain/White visual world: a direct left-aligned closing statement is paired with a living canvas field of orange, cobalt, and graphite signals. The dots drift continuously and respond to pointer movement, translating Luma's sense of an active closing field into the portfolio's own system rather than borrowing its dark styling.

### Motion

The hero is the primary authored entrance. Its content becomes clear first, while the Clarity Stack's evidence layers arrive from distinct directions, resolve their blur, and assemble around the foreground decision surface. The sticky header transitions only when scroll state changes; the footer signal field provides slow ambient motion and a local pointer response. All three experiences become static under reduced-motion preferences.

### Case-Study Structure

Every case study opens with project identity, a plain-language descriptor, the core problem statement, contribution facts, and a reserved media field. Deeper sections prioritize a 30-second summary, direct contribution, pivotal decisions, outcomes, and qualifications. Final mockups and content may change, but this evidence-first hierarchy is durable.

## Do's and Don'ts

### Do:

- **Do** preserve the neutral-to-signal ratio; most of every screen should remain Porcelain, White, Fog, or Soft Black.
- **Do** show the meaningful claim before its metadata and give factual qualifications visible weight.
- **Do** keep résumé and case-study paths available on desktop and mobile.
- **Do** use motion to explain state, depth, or discoverability and respect reduced-motion preferences.
- **Do** give each project or personality card its own authored visual logic.

### Don't:

- **Don't** add invented metrics, statuses, outcomes, testimonials, or product claims.
- **Don't** turn mono metadata into decorative eyebrow copy above every heading.
- **Don't** distribute Signal Orange across secondary actions and ornaments.
- **Don't** hide essential descriptions behind hover, drag, or a large media placeholder.
- **Don't** add glassmorphism, gradient text, generic icon grids, or ornamental 3D that slows the scan.
- **Don't** treat the current placeholder mockups, résumé destination, or contact destinations as finished launch content.
