# Cohesion and motion pass — September 2026

The existing Instrument Sans / IBM Plex Mono pairing remains authoritative. The local development CSS had contained only Arial fallback faces; IBM Plex Mono's fallback was enlarged to 134.59%. The original Latin WOFF2 files obtained by the successful Next Google Fonts build are now bundled through next/font/local, with upstream SIL OFL licenses in src/app/fonts. Instrument Sans supports weights 400–700; IBM Plex Mono is 500. No replacement font family was introduced.

Header, footer, homepage supporting labels, project controls, and Notes labels now use natural case. The previous personal-section heading scale and medium weight are retained; the new Values label uses medium weight rather than the oversized former I believe treatment. Technical case-study content and embedded product screenshot typography remain independent.

Motion uses shared reveal timing, visible server-rendered defaults, short capped staggers, and live reduced-motion preference support. Photos and their captions reveal together within their frames and gently zoom on fine-pointer hover; values icons respond with a small lift and rotation. Dot fields share one canvas renderer and palette, but use purpose-built compositions: a localized hero field, clustered secondary-page fields with quiet text zones, and a denser wave-shaped footer field with pointer response. All stop when offscreen or the document is hidden.

References inspected through Mobbin: [Portrait collage](https://mobbin.com/sites/sections/a33802d9-bda7-4157-98d5-9e261a3cfb3a), [Portrait personal collection](https://mobbin.com/sites/sections/59cfa145-633c-4455-a8d3-a41b8b1f1e9d), [Greptile footer](https://mobbin.com/sites/sections/11966ed2-b7f3-4c77-bedd-f02230f12815), and [Kinfolk About](https://mobbin.com/sites/sections/2b8f9706-5873-4524-a1d5-fa9e737f27d0). The varied image proportions, visible captions, quiet editorial links, and concentrated footer graphics informed the presentation; these static references are not evidence of exact animation timing. The live [Portrait site](https://portrait.so/) was also opened. This pass preserves the portfolio palette rather than copying another site's branding.

Verification: TypeScript and production build pass. Desktop, 1440px, and 390px mobile were inspected. The homepage photo composition no longer overlaps the trail caption, About actions remain single-line at mobile size, and the footer field is visible at both sizes. Values use a two-column mobile grid. Orange filter transparency was corrected after the first screenshot check. Footer sentence case and the restored font appearance were visually confirmed. No deployment performed.

## Tonal-field refinement

The public-facing pages now use intentional tonal alternation rather than several near-identical cool grays. `--canvas` remains Porcelain (`#f6f7f4`), `--field-warm` is the alternating field (`#eaebe5`), `--surface` is reserved for cards, and `--subtle` remains a cool media/system surface. Home alternates Porcelain → warm Selected work → Porcelain Notes → warm personal journal → dark footer. About alternates Porcelain → warm Values → Porcelain personal story → dark footer. Notes alternates Porcelain → warm index → dark footer.

Primary section headings use `--type-section`; case-study and article subsections use `--type-subsection`. Notes rest on white surfaces over the warm field, use medium-weight titles, and keep descriptions visible on small screens.

The footer is the strong closing field (`--strong`) with Porcelain copy and Porcelain/orange signal dots. The hero dot field remains quieter and localized so it supports the clarity-stack composition instead of becoming a page-wide texture.

Reveal order is assigned from stable DOM order. Each reveal target is observed independently with a bottom viewport margin, text uses opacity plus a 12px rise without blur, and photographs retain the clipped reveal. Reduced-motion behavior remains live and supported.
