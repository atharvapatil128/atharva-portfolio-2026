# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: Next.js App Router with TypeScript, deployed on Vercel. Use Motion for React for purposeful micro-interactions and native CSS transitions for simple states. Keep content file-based/MDX initially so case studies and Notes remain portable; introduce a CMS only if publishing frequency later justifies it.

The custom domain is currently connected to Readymag and registered through Squarespace. DNS migration to Vercel will happen only after the replacement site passes preview, content, redirect, metadata, analytics, performance, and accessibility checks.

## Users

The primary audience is hiring managers and recruiters reviewing Atharva for product-design roles. They usually arrive with limited time and need to understand the quality, relevance, outcomes, and depth of the work quickly enough to decide whether to move Atharva forward.

Their primary job is to scan the portfolio and its case studies within roughly 30 seconds, form confidence in Atharva's judgment and execution, and move easily into whichever project provides the strongest hiring signal.

## Product Purpose

The portfolio presents Atharva Patil's product-design, research, strategy, and building work in a form that is fast to scan and rewarding to explore. It must help a hiring decision-maker understand who Atharva is, what he contributed, why the work mattered, and what happened as a result.

Success means the visitor is delighted without being delayed, can reach substantive case-study evidence immediately, and leaves with enough confidence to advance Atharva in the hiring process.

## Positioning

Atharva combines product design and research judgment with the ability to turn concepts into working AI-assisted prototypes and products. AI is used to move faster, not think less: the differentiator is the combination of human judgment, validation, interaction craft, and the ability to ship.

## Operating Context

- Visitors may review the site quickly between many candidates, often on a laptop and sometimes on mobile.
- The homepage provides the fast path; full case studies provide deeper evidence.
- The existing Readymag portfolio remains the source for current project content during migration.
- The new portfolio will be designed comp-first in Figma until essential composition, hierarchy, interaction behavior, and system rules are locked, then move promptly into code for real responsive and motion validation.
- Notes will document experiments and process, beginning with the AI-assisted workflow used to create this portfolio.

## Capabilities and Constraints

- Provide a recruiter-oriented homepage with selected work, concise positioning, personality, resume access, and contact paths.
- Preserve and improve three detailed case studies: Streaming Helper, MEAD, and the U.S. Department of State field-maintenance project.
- Support a Work index, detailed case-study routes, Notes/editorial content, an About experience, resume, and contact information.
- Make Streaming Helper the leading proof candidate because it connects research, product design, building, and a working beta.
- Include polished micro-animations and at least one memorable interactive system, while keeping navigation and scanning immediate.
- Support desktop, laptop, tablet, and mobile layouts. Desktop is the primary art-directed experience and receives first design priority, but every core route, case study, interaction, and action must remain complete and intentional on smaller devices.
- Responsive implementation should use content-driven breakpoints and progressive enhancement: mobile-compatible base behavior, then richer composition and interaction where screen space and input capabilities allow.
- Incorporate go-karting, Formula 1, running, travel, and outdoor interests as real personality evidence rather than unrelated decoration.
- Keep full case-study depth while providing outcome-led summaries and obvious fast paths.
- Do not fabricate outcomes, users, testimonials, metrics, responsibilities, or product status.
- Performance must remain strong; avoid heavyweight 3D or scroll-jacking unless an approved interaction clearly requires it and has a robust fallback.
- Domain migration from Readymag to Vercel is a later launch task, not part of initial design exploration.

## Brand Commitments

- Name: Atharva Patil.
- Professional identity: Product Designer and AI-Native Builder.
- Voice: direct, thoughtful, confident, human, and specific; technically capable without sounding like an AI-product landing page.
- Quality target: plush, clean, solid, confidence-inspiring, and responsive, with Apple-like material discipline rather than an Apple imitation.
- Reference hierarchy: Taste Labs is the primary composition-and-motion beacon; Luma calibrates calm neutral surfaces and content-led color; Corgi Insurance provisionally calibrates confident orange-led contrast; Teak, Hex, Granola, Runner, Actual, Mobbin research, and the existing portfolio remain supporting evidence. Confirm the exact Corgi reference if a different product was intended.
- Personality should visibly include karting/F1 and may also include running, travel, and outdoor life.
- Use one concentrated signature interaction in the spirit of Taste Labs' draggable closing experience; keep the rest of the motion system restrained.
- Build color from a warm porcelain/fog foundation with soft-black typography. Use color in authored fields and project media—not as scattered SaaS accents—with orange as the confident signal and a small supporting family of sky, sage, lilac, and coral available for local content roles.

## Evidence on Hand

- Existing portfolio and case studies: https://atharvapatil.net/
- Streaming Helper live product: https://streaminghelper.net/
- Streaming Helper: research-to-working-beta story, companion web app, and Chrome extension.
- MEAD: caregiver-facing engagement-recording and feedback concept for advanced dementia, created through a six-day sponsor-led sprint.
- U.S. Department of State field-maintenance work: secure mobile-first workflow, 40+ stakeholder interviews, Power Apps/Dataverse constraints, and outcome estimates that must remain qualified as estimates.
- Existing resume and project assets are linked from the Readymag site; original/high-resolution source assets still need to be inventoried before production.
- Direction research and page-system plan: `research/portfolio-direction-brief.md`.
- No additional testimonials or hiring claims should be created without evidence.

## Product Principles

1. **Win the first 30 seconds.** Role, strongest work, outcomes, and the next path must be immediately legible.
2. **Lead with evidence.** Show decisions, artifacts, working products, and verified outcomes before broad capability claims.
3. **Delight without delay.** Motion and interaction create confidence and memory but never obstruct navigation or reading.
4. **Support scanning and depth.** Every case study offers a quick outcome-led path and a deeper decision narrative.
5. **Make the person visible.** Professional credibility and personality reinforce each other; neither becomes filler.

## Accessibility & Inclusion

- All essential navigation, case-study content, and interactions must work with keyboard, touch, and assistive technology.
- Respect `prefers-reduced-motion`; no information or destination may depend on animation, drag, hover, or parallax.
- Maintain readable type, clear focus states, sufficient contrast, semantic structure, and responsive layouts.
- The 30-second scan must remain effective on mobile and on slower connections.
- Validate portrait and landscape behavior, coarse and fine pointers, and safe-area insets. Hover may enhance the desktop experience but never carry required information or functionality.
