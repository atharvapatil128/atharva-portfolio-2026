/**
 * A record of what visitors ask and what the assistant answered.
 *
 * The point is not curiosity. The assistant has already been caught inventing
 * provenance for a number once, and without a record the next time that happens
 * it happens in front of a recruiter and nobody finds out. Storing the answer
 * alongside the question is what makes the record worth keeping.
 *
 * What is deliberately not stored: no IP address, no user agent, no cookie, no
 * identifier of any kind beyond a conversation id the browser makes up to keep
 * a thread together. The rate limiter hashes IPs and never persists them, and
 * that separation is the point.
 *
 * Writes go through PostgREST with plain fetch, the same way the contact route
 * talks to Resend, so this adds no dependency. The service role key is
 * server-only and must never be prefixed NEXT_PUBLIC_.
 */
export type AskLogEntry = {
  conversationId: string;
  question: string;
  answer: string;
  pagePath: string | null;
  finishReason: string | null;
  truncated: boolean;
};

const MAX_STORED_CHARS = 8000;

/**
 * Never throws and never rejects. A logging failure must not turn a working
 * answer into a broken one, so every path here ends quietly in the server log.
 */
export const logAsk = async (entry: AskLogEntry): Promise<void> => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // Absent config is a supported state, not an error: the assistant works
  // without it, and local development should not need a database.
  if (!url || !key) return;

  try {
    const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/ask_log`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        conversation_id: entry.conversationId,
        question: entry.question.slice(0, MAX_STORED_CHARS),
        answer: entry.answer.slice(0, MAX_STORED_CHARS),
        page_path: entry.pagePath,
        finish_reason: entry.finishReason,
        truncated: entry.truncated,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error(`[ask] log rejected: ${response.status} ${await response.text().catch(() => "")}`);
    }
  } catch (error) {
    console.error("[ask] log failed", error);
  }
};
