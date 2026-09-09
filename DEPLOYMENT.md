# Portfolio launch

## Email configuration

The contact form posts to `/api/contact`, which sends a plain-text message through Resend to `atharvapatil128@gmail.com`. Replies go to the visitor's address. Set these server-only variables in `.env.local` and in the Vercel project:

- `RESEND_API_KEY`: a sending key from Resend.
- `CONTACT_FROM_EMAIL`: an address on a domain verified in Resend.
- `CONTACT_TO_EMAIL`: optional override; defaults to Atharva's address above.

The Resend test sender can only deliver to the account owner's email. Use a verified sender for launch. Never put secrets into Git or a `NEXT_PUBLIC_` variable. Missing configuration returns an honest error and a direct email link; it never simulates delivery.

Run `node scripts/test-contact.mjs` for mocked email checks, `npm run check`, and `npm run build` before deployment. Confirm an actual message arrives after configuring the provider.

The endpoint validates input, restricts same-origin requests, uses a honeypot, deduplicates identical provider sends for 24 hours, and has a best-effort per-instance rate limit. Add a shared Vercel Firewall rate limit on `/api/contact` before public launch; the in-memory limit does not span serverless instances.

## Preview and domain

Create a Vercel project for `atharvapatil128/atharva-portfolio-2026` using Next.js and this repository root. Review the preview and email delivery first. Keep the existing Readymag DNS records until the new site has been approved for the domain switch. Do not alter mail MX records during the website migration.

## Previous design

The complete previous main working state is preserved on `codex/backup-main-before-redesign-2026-09-09` at `dee44bb`. To inspect it safely, create another worktree from that branch. The redesign remains on `codex/home-notes-swap` as well as the merged main branch.
