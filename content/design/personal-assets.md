# Personal section assets

Implementation: `src/components/personal-journal.tsx` and its CSS module. The photo selection governs the composition. All UI colors use the incumbent canvas, subtle, ink, text-secondary, and signal tokens. No local cream, sage, or green UI palette remains. The original illustration strip is presented in signal orange using an SVG color mask; photographs retain their natural colors and the shared media radius. Display text retains the earlier scale and weights; the renamed Values heading uses the shared section scale. Mobile secondary photos scroll natively with keyboard access. Captions are always visible. No exact place or event date is inferred. See `cohesion-pass.md` for subsequent typography and motion refinements.

Validation: desktop and 390px mobile sections visually reviewed, including document overflow checks. Type checking and production build pass. The original font families are now bundled locally, removing the Google Fonts download dependency. Root DESIGN.md remains unchanged.

## User photographs

Originals remain in `C:/Users/athar/Downloads/Portfolio Website Assets/`. Copies live in `public/images/personal/` and are served through Next Image for responsive sizing and lazy loading.

| Copy | Original filename |
| --- | --- |
| running.jpg | WhatsApp Image 2026-09-07 at 18.37.26.jpeg |
| graduation.jpg | WhatsApp Image 2026-09-07 at 18.36.43.jpeg |
| presentation.jpg | WhatsApp Image 2026-09-07 at 18.38.20.jpeg |
| sunset.jpg | WhatsApp Image 2026-09-07 at 18.38.40.jpeg |
| trail.jpg | WhatsApp Image 2026-09-07 at 18.40.34.jpeg |
| gallery.jpg | WhatsApp Image 2026-09-07 at 18.41.33.jpeg |
| boat.jpg | WhatsApp Image 2026-09-07 at 18.42.53.jpeg |

## Generated illustration

`public/images/personal/values-frieze.png` was created with the built-in image generator. Its four quarters are displayed with the associated belief text. Original generation: `C:/Users/athar/.codex/generated_images/01a059e8-2aa4-7c13-aa9d-0e2cf78cd1a5/exec-321de011-535e-4f5b-a659-7072fee507f3.png`.

Exact prompt:

> Create ONE wide horizontal editorial illustration frieze for a product designer's personal portfolio. Canvas aspect 3:1. Four equally spaced separate bold organic deep forest green #356044 illustrations, centered at 12.5%,37.5%,62.5%,87.5% width, all within their own quarter with generous clear margins. Pure solid off-white background #F6F7F4. Left to right: (1) an expressive open eye nestled in an irregular window frame, discovery and observation; (2) playful overlapping folded sheets and a hand forming a tangible paper prototype; (3) two organic interlocking forms fitted together with a small intricate negative-space joint, caring for details; (4) a thick winding path looping back toward itself with a directional opening, learning from feedback. Sophisticated flat cut-paper printmaking, confident imperfect contours, no shading, no gradients, no thin line drawings, no text, no letters, no captions, no border. Cohesive original graphic art, each motif roughly equal visual mass. This is a production website illustration strip, not a mockup.
