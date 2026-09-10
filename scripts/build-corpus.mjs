// Generates the knowledge base the /ask assistant is grounded in.
// Run via `npm run corpus` (wired into prebuild) so the corpus can never drift
// from the site itself. Sources, in order of trust:
//   1. src/lib/site-data.ts   - structured project records (authoritative)
//   2. content/brain/*.md     - hand-written background, curated for publication
//   3. content/process/*.md   - process notes behind the case studies
//   4. src/app/**, src/components/** - prose that only exists inside JSX
import { readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const rel = (...parts) => path.join(root, ...parts);

const entities = {
  "&apos;": "’",
  "&quot;": '"',
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&nbsp;": " ",
  "&mdash;": "—",
  "&ndash;": "–",
};

/**
 * These components hold their copy in two places: string literals inside data
 * arrays, and text nodes inside JSX. We keep both, then drop anything that
 * looks like code, styling, or an asset path - a noisy corpus is what pushes a
 * smaller model into paraphrasing badly.
 */
const isProse = (text) => {
  const t = text.trim();
  if (t.length < 25) return false; // labels, not sentences
  if ((t.match(/ /g) || []).length < 3) return false; // needs to be a phrase
  if (/^[/.#]/.test(t)) return false; // paths, selectors
  if (/\/(images|fonts|videos|icons)\//.test(t)) return false;
  if (/var\(--|rgba?\(|[0-9]px|@media|className|aria-|viewBox|https?:/.test(t)) return false;
  if (/^[a-z0-9-]+(\s+[a-z0-9-]+)*$/.test(t)) return false; // class lists
  if (!/[a-z]{3}/.test(t)) return false;
  return /[.!?,;:]/.test(t) || /[a-z] [a-z]+ [a-z]/i.test(t);
};

const proseFromTsx = (source) => {
  const cleaned = source
    .replace(/^import[\s\S]*?from\s+["'][^"']+["'];?$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ");

  // Deliberately backslash-free: a quoted/backticked literal, or a JSX text node.
  const pattern = /"([^"]+)"|'([^']+)'|`([^`]+)`|>([^<>{}]+)</g;
  const found = [];
  let match;
  while ((match = pattern.exec(cleaned)) !== null) {
    const raw = match[1] ?? match[2] ?? match[3] ?? match[4] ?? "";
    const text = raw
      .replace(/&[a-z]+;/gi, (entity) => entities[entity] ?? entity)
      .replace(/\s+/g, " ")
      .trim();
    if (isProse(text)) found.push(text);
  }
  return [...new Set(found)].join("\n\n");
};

/**
 * Raw drafts are not publishable material. portfolio-build-log.md is 30KB of
 * working notes for an unwritten article, which is both half the corpus and
 * candid in a way the published note on the same subject is not. Delete the
 * entry to let the assistant use it.
 */
const EXCLUDED = new Set(["portfolio-build-log.md"]);

const readMarkdownDir = async (dir) => {
  if (!existsSync(rel(dir))) return [];
  const names = (await readdir(rel(dir))).filter(
    (name) => name.endsWith(".md") && name.toLowerCase() !== "readme.md" && !EXCLUDED.has(name),
  );
  return Promise.all(
    names.sort().map(async (name) => ({ name, body: (await readFile(rel(dir, name), "utf8")).trim() })),
  );
};

const section = (title, body) => (body && body.trim() ? `\n\n## ${title}\n\n${body.trim()}` : "");

const buildCorpus = async () => {
  // Node strips the TypeScript annotations natively; site-data.ts has no imports.
  const { projects, notes, resumeUrl } = await import(pathToFileURL(rel("src/lib/site-data.ts")).href);

  /*
   * A recruiter's first question is often "is there a CV", not a question about
   * the work at all. The map is generated from the same data the site renders
   * from, so a new project or note cannot leave the assistant describing a site
   * that no longer exists.
   */
  const siteMap = [
    "These are the pages of this site and what each one holds. Point visitors to the right one by path when it answers them better than you can.",
    "",
    "- `/` Home. Introduction, selected work, and a short set of highlights.",
    "- `/about` About. How Atharva works, his background, and what he is like to work with.",
    ...projects.map((project) => `- \`/work/${project.slug}\` ${project.name} case study. ${project.descriptor}`),
    "- `/notes` Notes. Written pieces on design and process.",
    ...notes
      .filter((note) => note.status === "published")
      .map((note) => `- \`/notes/${note.slug}\` "${note.title}" (${note.type}, ${note.date}).`),
    `- \`/resume\` Résumé. Always points at the current version, kept in Google Drive so it never goes stale. There is a view link and a PDF download. The document itself is at ${resumeUrl}`,
    "- `/contact` Contact. A form that reaches Atharva's inbox directly, and his email address. This is where to send anything you cannot answer.",
    "- `/ask` This assistant, on its own page.",
    "",
    "A visitor asking for a CV, résumé, or portfolio PDF wants `/resume`. A visitor who wants to reach Atharva wants `/contact`.",
  ].join("\n");

  const projectBlocks = projects.map((project) => {
    const decisions = project.decisions
      .map((decision) => `- **${decision.title}** - ${decision.body}`)
      .join("\n");
    return [
      `### ${project.name}`,
      project.descriptor,
      "",
      `- Category: ${project.category}`,
      `- Atharva's role: ${project.role}`,
      `- Period: ${project.period}`,
      `- Evidence base: ${project.evidence.join("; ")}`,
      `- Case study: /work/${project.slug}`,
      "",
      `**The problem.** ${project.summary}`,
      "",
      `**What Atharva did.** ${project.contribution}`,
      "",
      "**Key design decisions.**",
      decisions,
      "",
      `**Outcome.** ${project.outcome}`,
      project.qualification
        ? `\n**LIMITATION - state this whenever discussing this project's results or impact.** ${project.qualification}`
        : "",
    ]
      .filter((line) => line !== "" || true)
      .join("\n");
  });

  const noteList = notes
    .filter((note) => note.status === "published")
    .map(
      (note) =>
        `- "${note.title}" (${note.type}, ${note.date}) - ${note.description} [/notes/${note.slug}]`,
    )
    .join("\n");

  const tsxSources = [
    ["About page", "src/app/about/page.tsx"],
    ["About - personal journal", "src/components/personal-journal.tsx"],
    ["Streaming Helper - full case study", "src/components/streaming-helper-case-study.tsx"],
    ["MEAD - full case study", "src/components/mead-case-study.tsx"],
    ["Field Maintenance - full case study", "src/components/field-maintenance-case-study.tsx"],
  ];

  const tsxBlocks = [];
  for (const [label, file] of tsxSources) {
    if (!existsSync(rel(file))) continue;
    const prose = proseFromTsx(await readFile(rel(file), "utf8"));
    if (prose) tsxBlocks.push(`### ${label}\n\n${prose}`);
  }

  const brain = await readMarkdownDir("content/brain");
  const processNotes = await readMarkdownDir("content/process");

  const header = [
    "# Atharva Patil - knowledge base",
    "",
    "Generated from the portfolio source. Everything below is the complete set of facts available about Atharva. Nothing outside this document is known.",
  ].join("\n");

  return [
    header,
    section("Where things are on this site", siteMap),
    section("Projects", projectBlocks.join("\n\n---\n\n")),
    section("Published notes", noteList),
    section("Background and perspective", brain.map((file) => file.body).join("\n\n---\n\n")),
    section(
      "Process notes (behind the case studies)",
      processNotes.map((file) => `### ${file.name}\n\n${file.body}`).join("\n\n---\n\n"),
    ),
    section("Site prose", tsxBlocks.join("\n\n---\n\n")),
  ].join("");
};

const corpus = await buildCorpus();
const generated = [
  "// GENERATED FILE - do not edit. Run `npm run corpus` to regenerate.",
  "// Source: scripts/build-corpus.mjs",
  "",
  `export const CORPUS = ${JSON.stringify(corpus)};`,
  "",
].join("\n");
await writeFile(rel("src/lib/ask-corpus.generated.ts"), generated, "utf8");

const words = corpus.split(/\s+/).length;
console.log(
  `corpus: ${corpus.length.toLocaleString()} chars - ~${words.toLocaleString()} words - ~${Math.round(words * 1.35).toLocaleString()} tokens (rough)`,
);
