import { createHash } from "node:crypto";
import { ApiError, GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/lib/ask-prompt";
import { mockStream } from "@/lib/ask-mock";
import { projects } from "@/lib/site-data";

export const runtime = "nodejs";

// "gemini-flash-latest" is a moving alias, so a model retirement does not take
// the assistant down with it. Override with GEMINI_MODEL to pin a version.
const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const MAX_TOKENS = 1024;

const MAX_MESSAGES = 12; // six exchanges, then the visitor is asked to email
const MAX_MESSAGE_CHARS = 1000;
const RATE_LIMIT = 20; // messages per IP per window
const RATE_WINDOW_MS = 600000;

const attempts = new Map<string, { count: number; expires: number }>();
const error = (message: string, status: number) => Response.json({ error: message }, { status });

/**
 * Opened from a case study, a visitor asks "what did he own on this project".
 * The model needs to know which project that is. The label is looked up from a
 * fixed table rather than interpolated from the client, so a crafted path
 * cannot inject prompt text.
 */
const PAGE_LABELS = new Map<string, string>([
  ...projects.map((project) => [`/work/${project.slug}`, `the ${project.name} case study`] as const),
  ["/about", "the About page"],
  ["/resume", "the résumé page"],
  ["/notes", "the Notes index"],
]);

const labelFor = (path: unknown) => {
  if (typeof path !== "string" || path.length > 120) return null;
  return PAGE_LABELS.get(path) ?? (path.startsWith("/notes/") ? "a published note" : null);
};

type Incoming = { role: string; content: string };

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return error("Please send this from the website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return error("Unsupported request.", 415);
  if (Number(request.headers.get("content-length")) > 32000) return error("Your message is too long.", 413);

  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 32000) return error("Your message is too long.", 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return error("Please check your message.", 400);
    data = parsed as Record<string, unknown>;
  } catch {
    return error("Please check your message.", 400);
  }

  if (!Array.isArray(data.messages)) return error("Please check your message.", 400);
  const incoming = data.messages as Incoming[];
  if (incoming.length === 0) return error("Please ask a question.", 400);
  if (incoming.length > MAX_MESSAGES) {
    return error("This conversation has run long. Please start a new one, or email Atharva directly.", 400);
  }

  // Gemini calls the assistant turn "model" rather than "assistant".
  const contents: { role: "user" | "model"; parts: { text: string }[] }[] = [];
  for (const message of incoming) {
    if (!message || typeof message !== "object") return error("Please check your message.", 400);
    if (message.role !== "user" && message.role !== "assistant") return error("Please check your message.", 400);
    if (typeof message.content !== "string") return error("Please check your message.", 400);
    const content = message.content.trim();
    if (!content) return error("Please ask a question.", 400);
    if (content.length > MAX_MESSAGE_CHARS) return error("Please keep questions under 1,000 characters.", 400);
    contents.push({ role: message.role === "assistant" ? "model" : "user", parts: [{ text: content }] });
  }
  if (contents[0].role !== "user") return error("Please check your message.", 400);
  if (contents[contents.length - 1].role !== "user") return error("Please check your message.", 400);

  const label = labelFor(data.path);
  if (label) {
    contents[0] = {
      role: "user",
      parts: [
        {
          text: `(Context: the visitor is reading ${label}. Resolve "this project" and similar references accordingly.)\n\n${contents[0].parts[0].text}`,
        },
      ],
    };
  }

  // Design-review mode: canned answers, no API call, no key. Double-gated so a
  // production build cannot serve mock content even if the flag leaks into env.
  if (process.env.NODE_ENV !== "production" && process.env.ASK_MOCK === "1") {
    const question = contents[contents.length - 1].parts[0].text;
    const mockPath = typeof data.path === "string" ? data.path : "";
    return new Response(mockStream(question, mockPath), {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) return error("The assistant is temporarily unavailable. Please use the contact page.", 503);

  // Per-instance protection only; pair with a Vercel Firewall rule in production.
  const now = Date.now();
  for (const [id, value] of attempts) if (value.expires <= now) attempts.delete(id);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const id = createHash("sha256").update(ip).digest("hex");
  const bucket = attempts.get(id) || { count: 0, expires: now + RATE_WINDOW_MS };
  if (bucket.count >= RATE_LIMIT || attempts.size >= 10000) {
    return error("You have reached the question limit for now. Please email Atharva through the contact page.", 429);
  }
  bucket.count += 1;
  attempts.set(id, bucket);

  const ai = new GoogleGenAI({ apiKey: key });

  try {
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: MAX_TOKENS,
      },
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (streamError) {
          console.error("[ask] stream failed", streamError);
          controller.enqueue(
            encoder.encode("\n\nSomething went wrong partway through. Please try again, or use the contact page."),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (requestError) {
    // 429 covers both the per-minute rate limit and the daily free-tier quota.
    // The visitor does not need that distinction, only that it is not their
    // fault and that there is another way to reach Atharva.
    if (requestError instanceof ApiError && requestError.status === 429) {
      console.warn("[ask] quota or rate limit reached");
      return error(
        "The assistant has had a lot of questions today and has reached its limit. It will be back tomorrow. In the meantime, Atharva can answer directly through the contact page.",
        429,
      );
    }
    if (requestError instanceof ApiError && (requestError.status === 401 || requestError.status === 403)) {
      console.error("[ask] auth failed", requestError);
      return error("The assistant is temporarily unavailable. Please use the contact page.", 503);
    }
    console.error("[ask] request failed", requestError);
    return error("The assistant could not answer. Please try again, or use the contact page.", 502);
  }
}
