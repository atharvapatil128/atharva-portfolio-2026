import { createHash } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/ask-prompt";
import { mockStream } from "@/lib/ask-mock";
import { projects } from "@/lib/site-data";

/**
 * Opened from a case study, a visitor asks "what did he own on this project".
 * The model needs to know which project that is.
 *
 * Two constraints shape how: the label is looked up from a fixed table rather
 * than interpolated from the client, so a crafted path cannot inject prompt
 * text; and it is prepended to the first user message rather than added to the
 * system prompt, because the system prompt is the cached prefix and varying it
 * per page would throw the cache away on every navigation.
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

export const runtime = "nodejs";

// Haiku 4.5 keeps a public, unauthenticated endpoint affordable. Swap this one
// constant for "claude-sonnet-5" if answers ever need more nuance.
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 1024;

const MAX_MESSAGES = 12; // six exchanges, then the visitor is asked to email
const MAX_MESSAGE_CHARS = 1000;
const RATE_LIMIT = 20; // messages per IP per window
const RATE_WINDOW_MS = 600000;

const attempts = new Map<string, { count: number; expires: number }>();
const error = (message: string, status: number) => Response.json({ error: message }, { status });

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

  const messages: Anthropic.MessageParam[] = [];
  for (const message of incoming) {
    if (!message || typeof message !== "object") return error("Please check your message.", 400);
    if (message.role !== "user" && message.role !== "assistant") return error("Please check your message.", 400);
    if (typeof message.content !== "string") return error("Please check your message.", 400);
    const content = message.content.trim();
    if (!content) return error("Please ask a question.", 400);
    if (content.length > MAX_MESSAGE_CHARS) return error("Please keep questions under 1,000 characters.", 400);
    messages.push({ role: message.role, content });
  }
  if (messages[0].role !== "user") return error("Please check your message.", 400);
  if (messages[messages.length - 1].role !== "user") return error("Please check your message.", 400);

  const label = labelFor(data.path);
  if (label) {
    messages[0] = {
      role: "user",
      content: `(Context: the visitor is reading ${label}. Resolve "this project" and similar references accordingly.)\n\n${messages[0].content as string}`,
    };
  }

  // Design-review mode: canned answers, no API call, no key. Double-gated so a
  // production build cannot serve mock content even if the flag leaks into env.
  if (process.env.NODE_ENV !== "production" && process.env.ASK_MOCK === "1") {
    const question = String(messages[messages.length - 1].content);
    const mockPath = typeof data.path === "string" ? data.path : "";
    return new Response(mockStream(question, mockPath), {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const key = process.env.ANTHROPIC_API_KEY;
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

  const client = new Anthropic({ apiKey: key });

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      // The corpus is identical on every request, so cache it: within a single
      // conversation every turn after the first reads it at a fraction of cost.
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages,
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          const final = await stream.finalMessage();
          const { cache_read_input_tokens, cache_creation_input_tokens, output_tokens } = final.usage;
          console.log(
            `[ask] cache_read=${cache_read_input_tokens ?? 0} cache_write=${cache_creation_input_tokens ?? 0} output=${output_tokens}`,
          );
        } catch (streamError) {
          console.error("[ask] stream failed", streamError);
          controller.enqueue(encoder.encode("\n\nSomething went wrong. Please try again, or use the contact page."));
        } finally {
          controller.close();
        }
      },
      cancel() {
        stream.abort();
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
    if (requestError instanceof Anthropic.RateLimitError) {
      return error("The assistant is busy right now. Please try again shortly.", 429);
    }
    if (requestError instanceof Anthropic.AuthenticationError) {
      console.error("[ask] auth failed", requestError);
      return error("The assistant is temporarily unavailable. Please use the contact page.", 503);
    }
    console.error("[ask] request failed", requestError);
    return error("The assistant could not answer. Please try again, or use the contact page.", 502);
  }
}
