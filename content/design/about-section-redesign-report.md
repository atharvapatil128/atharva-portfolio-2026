# About experience redesign report

## Recommended direction: The Field Journal

Redesign the personal parts of the portfolio as one connected editorial system called **The Field Journal**:

- The **homepage** offers a quick, visual glimpse of the life and interests that shape the work.
- The **About page** turns those glimpses into a small set of memorable working values.

The experience should feel collected from real life—not generated from the same component kit as the case studies. Real photographs and achievement artifacts provide evidence; a custom illustration family interprets what those experiences mean.

This is the strongest response to the current visual problem: the site already communicates precision well, but the personal sections repeat its cards, bordered panels, dark backgrounds, and abstract interface graphics. They explain personality without allowing the visitor to feel it.

## What should change

### Current homepage section

“Things I make when nobody asked” is a strong headline, but the equal-width draggable cards turn karting, running, travel, and side projects into interchangeable content tiles. The CSS-generated circles and lines are too generic to substantiate those stories.

**Change:** keep the curiosity in the copy, but replace the five-card rail with an editorial photo composition that has one clear focal image, several smaller supporting moments, and concise field-note captions.

### Current About page

“How I tend to work” presents sound ideas, but three matching text columns read like a standard values block. “Fast laps, long runs, open air” then repeats the dark-panel language and uses a placeholder telemetry graphic instead of lived evidence.

**Change:** consolidate these areas into a visual beliefs sequence, followed by one deeper personal story. The section should connect the interests to the way Atharva works without forcing every hobby into a productivity lesson.

## Reference synthesis

The supplied [Mobbin Portrait reference](https://mobbin.com/sites/sections/59cfa145-633c-4455-a8d3-a41b8b1f1e9d) required sign-in, so its exact composition has not been verified. The direction below draws on the supplied screenshots and related sections visibly returned by the Mobbin connector. The most useful related patterns were:

- [Portrait](https://mobbin.com/sites/sections/a33802d9-bda7-4157-98d5-9e261a3cfb3a): overlapping photographs, variable image proportions, and personal fragments assembled into one composition.
- [Savor](https://mobbin.com/sites/sections/8691b8cf-86d0-4134-b528-d806561b518b): generous editorial space, an oversized identity statement, and photographs used as anchors instead of cards.
- [Intercom](https://mobbin.com/sites/sections/37b83ac0-3b81-4596-964b-d0a0cea46ba7): a restrained illustration layer drawn over photography, showing how authored marks can add character without obscuring the subject.
- [Dovetail](https://mobbin.com/sites/sections/37ee904d-4c14-4733-8e6d-a9262171d073): values expressed as distinct visual posters rather than identical text-only columns.
- [TheyDo](https://mobbin.com/sites/sections/4750ee08-482f-435b-8f8b-bad86b6f79e6): a consistent illustration family used to make abstract values easier to remember.

UX Pilot returned one relevant community template—**Tech Creator Portfolio Profile**—which is structured around selected work, metrics, activity, and availability. That is a useful negative benchmark: it is credible but conventional, and would push this portfolio back toward a résumé dashboard rather than the more personal editorial direction requested here.

## Homepage: proposed section

### Purpose

Give a visitor a 10–15 second answer to: **What does Atharva notice when he is not presenting a case study?**

### Recommended headline

Keep the existing headline:

> Things I make when nobody asked

It already has specificity and charm. Replace the explanatory sentence with a tighter bridge:

> Side quests, places, and pursuits that keep changing how I notice systems.

### Desktop composition

Use a full-width warm-porcelain section rather than another dark slab.

1. **Opening statement** — oversized headline occupying roughly six columns, with a small mono label such as `FIELD JOURNAL / 01–05`.
2. **Primary photograph** — a large vertical or near-square image of Atharva in context, not a formal headshot. It should overlap the headline's visual field slightly without reducing legibility.
3. **Supporting strip** — three images at deliberately different proportions: a wide travel environment, a close achievement artifact, and a candid activity image.
4. **Field-note captions** — short factual lines containing place/event, year, and one observation. These should resemble annotations, not marketing copy.
5. **Single route onward** — `More about me ↗`, linking to the expanded About experience.

The images should form one composition, not five bounded cards. Varying scale creates hierarchy; alignment to a shared invisible grid keeps it controlled.

### Suggested content sequence

| Moment | Image type | What it contributes |
| --- | --- | --- |
| Travel | Wide environmental photograph | Openness, curiosity, a change of context |
| Achievement | Artifact or event photograph | Evidence of commitment without becoming a trophy wall |
| Karting | Candid action/detail | Feedback, timing, iteration |
| Running or trail | Landscape/action image | Patience and working with incomplete information |
| Side build | Process image, sketch, or experiment | Curiosity that turns into making |

Do not force all five moments into equal visual weight. One or two should lead; the rest act as fragments.

### Interaction

- Desktop: images settle into place with a restrained stagger as the section enters the viewport. Hovering a photograph reveals its caption and a small index; it should not dramatically scale or tilt.
- Touch: use a horizontally scrollable photo strip after the leading image, with the next item visibly peeking into the viewport. Do not make the entire section dependent on drag discovery.
- Reduced motion: show the final layout immediately with no parallax.

## About page: proposed sections

### 1. Beliefs sequence

Replace the current three-column “How I tend to work” block with a four-part illustrated sequence inspired by the supplied “I believe” reference. Use a very large, low-contrast typographic phrase behind the row—**I believe** or **What I carry into the work**—and one custom symbol per belief.

Recommended draft beliefs:

1. **Find the decision hiding underneath.**  
   Research matters when it changes what the team chooses to do.

2. **Make it tangible while it is still cheap to change.**  
   A rough prototype creates a better conversation than polished ambiguity.

3. **Stay for the edge cases.**  
   The work is not finished when the presentation ends.

4. **Let feedback alter the line.**  
   Good systems make the next adjustment clearer.

These retain the substance of the existing About copy while giving each idea a visual identity.

### 2. Personal field note

Replace the abstract “Fast laps, long runs, open air” graphic with one immersive, photo-led story. Keep the current headline or shorten it to **Fast laps. Long runs. Open air.**

Recommended composition:

- one full-bleed landscape photograph occupying 55–60% of the module;
- one concise paragraph, no more than 55 words;
- a small three-item annotation rail such as `BRAKE LATER`, `CHANGE ONE THING`, `READ THE NEXT LAP`;
- an optional supporting detail image or artifact, such as a race result, route map, bib, medal, or track photo.

This section should be editorial, not a second values explanation. Let the experience remain personal; the connection to design can be present without becoming a lesson after every sentence.

### Page relationship

The homepage should preview three to five moments. The About page should not repeat the same collage. It should reuse at most one image and then deepen the story with the illustrated beliefs and one focused personal field note.

## Illustration art direction

The illustrations should become a small authored asset family, not CSS decoration and not generic iconography.

### Visual language

- Flat, organic silhouettes with irregular geometry and confident negative space.
- A shared optical weight across all four symbols.
- One primary ink color per set, supported by black and warm porcelain.
- Subtle grain is acceptable; glossy gradients and pseudo-3D rendering are not.
- Each symbol should still read at approximately 140 px wide on mobile.

### Metaphor sources

- a karting apex or racing line for feedback and adjustment;
- stacked prototype layers or registration marks for making ideas tangible;
- a trail switchback or contour lines for navigating ambiguity;
- a passport stamp, window, or shifted frame for context changing perception.

Avoid literal lightbulbs, handshake icons, generic stars, and disconnected blobs. The third supplied reference is useful for confidence and simplicity, but the shapes should be original and drawn from Atharva's own interests.

### Color recommendation

Keep the portfolio palette but change its distribution:

- warm porcelain as the primary field;
- soft black for type;
- signal orange for annotations and active details;
- cobalt used sparingly for one belief or navigational moment;
- introduce one muted field-note green only inside this personal system.

The green gives the About material a recognizable register without breaking the existing brand. It should appear in photographs/illustrations and not spread into unrelated UI components.

## Photography and achievement curation

### Photo selection update — 7 September 2026

Nine photographs have now been supplied and visually reviewed. They provide enough material for the first composition; video is optional. This selection supersedes the earlier hypothetical image mix and homepage headline recommendation.

The strongest common thread is time spent exploring, observing, and following something through. With these photographs, **A little further from the desk.** is a better homepage heading than “Things I make when nobody asked.” The latter can remain a title for actual side projects in Notes. Travel, graduation, and running deserve captions that describe the moments naturally.

Suggested supporting copy: “A few places, milestones, and things I keep coming back to.” This is draft copy, subject to the user's voice.

All filenames below share the prefix `WhatsApp Image 2026-09-07 at ` and extension `.jpeg`, under `C:/Users/athar/Downloads/Portfolio Website Assets/`. Filename timestamps identify the supplied files; they are not treated as dates of the events.

| Image | File time | Selection and placement | Crop guidance and provisional caption |
| --- | --- | --- | --- |
| 1 — running bib and medal | 18.37.26 | Homepage: medium portrait; a clear personal milestone | Keep the face, medal, and bib together. Trim some sky if needed. Caption: “After the run.” Do not infer a finish time or placing. |
| 2 — golf swing | 18.19.28 | Reserve for a later gallery expansion | Keep the club head, hands, and stance. Remove excess foreground through layout cropping. Its tall framing needs more room than a small tile provides. Caption: “At the driving range.” |
| 3 — graduation | 18.36.43 | About page: milestone portrait next to biography or education | Preserve cap, face, and diploma. Use its portrait proportions. Caption: “Graduation day.” Degree and year should come from confirmed biography content. |
| 4 — research poster presentation | 18.38.20 | About page: supporting photograph linking the person to the work | Preserve both person and poster; do not promise poster text is readable at thumbnail size. Caption: “Presenting Streaming Helper.” The photograph shows a presentation, not proof of an award. |
| 5 — sunset on water | 18.38.40 | Homepage: smaller horizontal pause between denser images | Crop excess sky with care; retain horizon and reflection as a pair. Caption: “Last light on the water.” Location is unconfirmed. |
| 6 — illuminated museum exterior and bicycles | 18.39.03 | Reserve; possible small About-page detail | Keep the bicycles and colored light. A landscape crop can work if it retains the building inscription. Caption: “An evening at the museum.” |
| 7 — hillside trail | 18.40.34 | Homepage: largest image and visual anchor | Keep the stone path entering from below and the walker within the scene. Start with a 4:5 frame; test a near-square crop. Do not identify the walker or location without confirmation. Caption: “Taking the longer route.” |
| 8 — looking at paintings | 18.41.33 | About page: main photograph for the personal story | Preserve the visitor and enough painting to convey scale. Keep a portrait frame; aggressive horizontal cropping loses the relationship. Caption: “Time in the galleries.” |
| 9 — boat and turquoise water | 18.42.53 | Homepage: medium supporting travel image | Keep the decorated bow, distant cliffs, and sea. A square crop can remove some sky while preserving the scene. Caption: “A different view from the water.” Exact destination is unconfirmed. |

**Homepage composition:** lead with image 7, then balance images 1 and 9 as medium photographs, with image 5 as a quieter, smaller frame. Leave deliberate space for the heading and one custom illustrative mark. These four images create a useful rhythm of person, landscape, action implied by the boat, and stillness. Use captions below the pictures so they remain legible on touch screens.

**About composition:** use image 8 to anchor the personal passage, image 3 beside the biography/milestone material, and image 4 near the connection to the work. Keep the four illustrated beliefs as a distinct visual passage. Seven photos are selected across the two pages; images 2 and 6 remain reserves so the layout has breathing room.

**Color refinement:** the photos already supply hillside green, sea blue, sunset amber, and graduation red. Use warm porcelain and dark type around them. Begin the custom belief illustrations in a single deep green, with the site's orange reserved for small interaction details. Avoid tinting the photographs to force them into the brand palette.

**Illustration refinement:** the supplied images suggest three useful original motifs: a winding path, a frame opening onto another view, and a loop that changes direction. Pair these with the prototype-layer motif already proposed. They should form one consistent set of authored assets. The photos do not replace the illustration work requested for the values section.

**Source constraints:** the supplied set is predominantly portrait. Choose the layout around those proportions and check crops individually. Originals remain unchanged. The homepage has enough material to proceed without a karting photo; do not substitute the golf picture for karting or invent a missing image. Exact locations, years, and achievement details can be added when confirmed; neutral captions allow composition work to proceed now.

**Video handling:** there is no video dependency for this section. If a later clip adds something useful, the user can provide its local file path, which avoids the chat upload limit. Inspect duration and size before making a separate web copy; choose an excerpt deliberately and retain a still-image fallback. No new personal videos have been opened or compressed in this update.

### Metadata for final captions

For each image, provide:

- original-resolution file;
- location or event;
- year;
- one sentence explaining why the moment matters;
- whether the image can be cropped tightly;
- whether other identifiable people are comfortable appearing publicly.

Aim to select 5–7 final images with this mix:

- two environmental wides;
- two candid activity images;
- one portrait or self-portrait in context;
- one achievement artifact/detail;
- one making/process image.

Achievements should be shown as evidence—an object, result, or moment with a precise caption—not as a logo wall or a list of awards. If an achievement needs several sentences to explain, it belongs in a note or case study rather than this visual section.

## Responsive behavior

### Tablet

- Preserve the lead-image hierarchy.
- Recompose the collage into one large image plus a two-column supporting grid.
- Keep values in a two-by-two arrangement.

### Mobile

- Stack the opening statement and lead photograph.
- Place secondary images in an accessible horizontal strip with visible overflow and scroll snap.
- Put each value in a compact two-row composition: illustration first, statement second.
- Never place essential copy only in a hover state.
- Use `aspect-ratio` containers and intentional `object-position` values so photographs do not crop faces or achievement details.

## Accessibility requirements

- Every meaningful photograph needs alt text that explains the moment, not its visual styling.
- Decorative marks and background type should be hidden from assistive technology.
- Captions must meet normal text contrast; the pale oversized background phrase is decorative only.
- Horizontal content must remain keyboard-scrollable and must not trap vertical touch movement.
- The section must be understandable with motion disabled.

## What not to carry forward

- Five equal cards for five different parts of a life.
- Abstract circles and lines standing in for photographs or illustrations.
- Another full-width dark block immediately after a visually heavy section.
- Repeating the same photographs on the homepage and About page.
- Generic values language detached from visible evidence.
- Travel imagery used as scenery without a specific caption or point of view.

## Recommended build sequence

1. Curate and label the photo/achievement candidates.
2. Produce a static desktop composition using the real assets.
3. Define the four illustration briefs from the approved belief statements.
4. Test the section at desktop, tablet, and mobile before adding motion.
5. Add restrained entrance, caption, and horizontal-scroll behavior.
6. Verify contrast, cropping, keyboard access, and reduced motion.

## Acceptance criteria

The redesign is successful when:

- a visitor can identify at least three genuine interests or experiences without reading a biography;
- the homepage preview and About page feel related but do not duplicate one another;
- each value is recognizable from its illustration and short statement;
- the layout remains intentional from 360 px mobile through wide desktop;
- no personal story is represented by a placeholder graphic;
- the section introduces a distinct visual register while still feeling part of the existing portfolio.
