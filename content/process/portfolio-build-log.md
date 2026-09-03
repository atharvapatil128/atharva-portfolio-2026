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
