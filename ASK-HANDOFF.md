# Handoff: the /ask assistant

An assistant that answers recruiters' questions about Atharva using only what is
published on this site. It refuses when the site does not cover something,
carries each project's stated limitations into any answer about results, and
routes compensation and work-authorisation questions to the contact page.

Branch: `feat/ask-atharva`, cut from `main` at `3fe6566`.
Nothing has been pushed. `main` is untouched.

---

## 1. What is in the branch

| File | Purpose |
| --- | --- |
| `scripts/build-corpus.mjs` | Generates the knowledge base from site data, markdown, and JSX prose |
| `src/lib/ask-corpus.generated.ts` | Generated output, committed so a clean checkout typechecks |
| `src/lib/ask-prompt.ts` | System prompt: grounding rules, voice, redirects |
| `src/lib/ask-store.ts` | Conversation persistence in `sessionStorage` |
| `src/lib/ask-mock.ts` | Canned answers for local design review, dev only |
| `src/app/api/chat/route.ts` | Streaming endpoint, Gemini, validation, rate limiting |
| `src/app/ask/page.tsx` | The `/ask` page |
| `src/components/ask-console.*` | Transcript, composer, streaming |
| `src/components/ask-launcher.*` | Header triggers, panel, ⌘K, status marks |
| `src/components/ask-pet.*` | Decorative creature on the panel |
| `content/brain/` | Hand-written background, curated for publication |
| `src/components/site-header.tsx` | **Modified.** Triggers added in three places |
| `package.json` | **Modified.** `@google/genai`, `corpus` and `prebuild` scripts |
| `.env.example` | **Modified.** Documents `GEMINI_API_KEY` |

`prebuild` regenerates the corpus, so `next build` always ships a current one.
No manual step.

---

## 2. Deploy

### 2.1 Environment variable

In Vercel, add to the project:

```
GEMINI_API_KEY = <key from aistudio.google.com/apikey>
```

**Scope it to Production only.** Preview deployments are publicly reachable by
default, and a key scoped to all environments turns every preview URL into a
spendable endpoint. Without a key the route returns 503 and the UI shows a
graceful message, which is the correct behaviour for previews.

`GEMINI_MODEL` is optional and should normally be left unset. It defaults to the
`gemini-flash-latest` alias. Do not pin a version: `gemini-2.5-flash` and
`gemini-2.5-flash-lite` both return 404 "no longer available" on this account.

**Do not set `ASK_MOCK` in Vercel.** It serves canned answers instead of calling
the model. It is double-gated on `NODE_ENV !== "production"` so it cannot take
effect in a production build, but it should not be there at all.

### 2.2 Firewall rate limit

The per-IP limiter in `route.ts` is an in-memory `Map`, which on serverless is
per instance and therefore weaker than it looks. Add a Vercel Firewall rule as
the real protection:

- Path `/api/chat`, action **Rate Limit**
- 12 requests per 60 seconds, keyed by IP
- Deny for 15 minutes when exceeded

Or via CLI:

```bash
vercel firewall rules add "Ask endpoint rate limit" \
  --condition '{"type":"path","op":"pre","value":"/api/chat"}' \
  --action rate_limit --rate-limit-window 60 --rate-limit-requests 12 \
  --rate-limit-keys ip --rate-limit-algo fixed_window \
  --rate-limit-action deny --duration 15m
```

### 2.3 Spend

Credits are prepaid. **Confirm auto-recharge is off**, which makes the balance a
hard ceiling. Set a budget alert at roughly half the balance, not to prevent
overspend but so the assistant does not run out silently mid-search.

Roughly $0.03 per conversation at ~7.9K input tokens and ~300 output.

### 2.4 Merge

Standard merge of `feat/ask-atharva` into `main`. The only modified existing
files are `site-header.tsx`, `package.json`, `package-lock.json`, and
`.env.example`; everything else is new.

---

## 3. Verify after deploy

1. `/ask` returns 200 and renders.
2. The header trigger appears: a field-shaped pill above 1050px, an "Ask
   Atharva" nav item between 761 and 1050, and inside the hamburger below 760.
3. Ask "What did Atharva own on Field Maintenance, and how solid are the savings
   numbers?" The answer must state that the 40% and 30% figures are
   sponsor-derived projections, not measured outcomes. **If it omits that, stop
   and investigate before announcing the feature.**
4. Ask "How many years of professional experience does he have?" It must say
   this is not established rather than give a number.
5. Ask about salary. It must decline and point to `/contact`.
6. Open the panel, ask something, close it mid-answer. The trigger should read
   "Writing a reply…", then "Reply ready".
7. Navigate to another page and reopen. The conversation should still be there.

---

## 4. Known limits

**Grounding is mitigated, not solved.** During testing the model invented
provenance for a figure, describing projections as based on work the corpus
never mentions. The prompt now forbids explaining where a number came from, and
re-tests were clean, but this is the feature's standing risk. Spot-check answers
about results periodically rather than assuming it is fixed.

**Google returns 503 intermittently.** This is their capacity, not the quota,
and it is handled separately with a "busy for a moment" message. Expect it
occasionally; it clears on its own.

**No prompt caching.** Gemini has no equivalent of the cached prefix, so the
whole corpus is re-sent every turn. That is priced in above.

**The corpus is public by definition.** Everything in `content/brain/` and
`content/process/` is sent to the model and can be repeated to any visitor.
`portfolio-build-log.md` is excluded deliberately via `EXCLUDED` in
`scripts/build-corpus.mjs`. Anything added there should pass the test in
`content/brain/README.md`.

**Editing content requires a rebuild.** Change any case study, note, or brain
file and run `npm run corpus`, or just deploy, since `prebuild` handles it.

---

## 5. Rollback

The feature is additive. To disable it without reverting code, remove
`GEMINI_API_KEY` from Vercel: the endpoint returns 503 and the UI shows "The
assistant is temporarily unavailable. Please use the contact page." The triggers
remain visible, so to remove it from the interface as well, revert the
`site-header.tsx` changes.
