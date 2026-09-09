import { createHash } from "node:crypto";

export const runtime = "nodejs";
const attempts = new Map<string, { count: number; expires: number }>();
const contexts = new Set(["Product design opportunity", "Collaboration", "Portfolio conversation", "Something else"]);
const error = (message: string, status: number) => Response.json({ error: message }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return error("Please send the form from this website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return error("Unsupported request.", 415);
  if (Number(request.headers.get("content-length")) > 16000) return error("Your message is too long.", 413);
  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return error("Your message is too long.", 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return error("Please check your message.", 400);
    data = parsed as Record<string, unknown>;
  } catch { return error("Please check your message.", 400); }
  const text = (key: string) => typeof data[key] === "string" ? (data[key] as string).trim() : "";
  const name = text("name"), email = text("email"), message = text("message"), context = text("context");
  if (text("website")) return error("Your message could not be sent.", 400);
  if (!name || name.length > 100 || /[\r\n]/.test(name)) return error("Enter a name under 100 characters.", 400);
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return error("Enter a valid email address.", 400);
  if (!contexts.has(context) || message.length < 10 || message.length > 5000) return error("Enter a message between 10 and 5,000 characters.", 400);
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) return error("Email delivery is temporarily unavailable. Please use the email link below.", 503);

  // Per-instance protection; use a shared Vercel Firewall limit before public launch.
  const now = Date.now();
  for (const [id, value] of attempts) if (value.expires <= now) attempts.delete(id);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const id = createHash("sha256").update(ip).digest("hex");
  const bucket = attempts.get(id) || { count: 0, expires: now + 600000 };
  if (bucket.count >= 5 || attempts.size >= 10000) return error("Please wait a few minutes before sending another message.", 429);
  bucket.count += 1;
  attempts.set(id, bucket);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact-${createHash("sha256").update(JSON.stringify([name, email, context, message])).digest("hex")}`,
      },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO_EMAIL || "atharvapatil128@gmail.com"],
        reply_to: email,
        subject: `${context} — ${name}`,
        text: `Portfolio message from ${name} <${email}>\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return error("Your message could not be sent. Please try again or use the email link below.", 502);
    const result = await response.json();
    if (!result.id) return error("Your message could not be confirmed. Please try again.", 502);
    return Response.json({ ok: true });
  } catch { return error("Your message could not be sent. Please try again or use the email link below.", 502); }
}
