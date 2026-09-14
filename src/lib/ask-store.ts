/**
 * Conversation state that outlives the panel.
 *
 * Three things have to survive: closing and reopening the panel, navigating to
 * another page (each page renders its own SiteHeader, so the provider
 * remounts), and a reload. That rules out React state on its own.
 *
 * localStorage, not sessionStorage: a recruiter who asks three questions and
 * closes the tab should find the thread still there tomorrow, and per-tab
 * storage read as the assistant having forgotten them.
 *
 * It expires after a week, which is the compromise. Keeping a conversation
 * forever means a months-old thread greets someone on return, and on a shared
 * machine the next person reads what the last one asked. A week covers coming
 * back to finish a thought and little else.
 *
 * Nothing here is ever sent anywhere. Storage can throw or be empty in a
 * private window, so every access is guarded and an in-memory copy is the
 * fallback.
 */
export type Turn = { role: "user" | "assistant"; content: string };

export type AskState = {
  turns: Turn[];
  /** When the last answer finished, so an unread badge can be derived. */
  answeredAt: number;
  /** When the visitor last had the panel open. */
  seenAt: number;
  /** Last write, so a stale conversation can expire itself. */
  updatedAt: number;
  /**
   * Groups the turns of one thread together in the server-side record. Made up
   * by the browser, not a cookie, not tied to anything, and replaced whenever
   * the visitor starts over.
   */
  conversationId: string;
};

// v2: the key changes with the storage area, so anything left in sessionStorage
// from the previous version is simply ignored rather than half-read.
const KEY = "ask.conversation.v2";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const EMPTY: AskState = { turns: [], answeredAt: 0, seenAt: 0, updatedAt: 0, conversationId: "" };

const newConversationId = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
};

let memory: AskState = EMPTY;
/**
 * Parse once, then serve the cached object. Re-parsing on every read handed
 * back a new `turns` array each time, so a subscriber calling setState with it
 * always saw a changed reference and re-rendered forever.
 */
let hydrated = false;
const listeners = new Set<() => void>();

const isTurn = (value: unknown): value is Turn => {
  if (!value || typeof value !== "object") return false;
  const turn = value as Partial<Turn>;
  return (turn.role === "user" || turn.role === "assistant") && typeof turn.content === "string";
};

export const readAsk = (): AskState => {
  if (typeof window === "undefined") return EMPTY;
  if (hydrated) return memory;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return memory;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return memory;
    const state = parsed as Partial<AskState>;
    const updatedAt = typeof state.updatedAt === "number" ? state.updatedAt : 0;
    // Past its week, drop it rather than greeting someone with a stale thread.
    if (updatedAt && Date.now() - updatedAt > MAX_AGE_MS) {
      window.localStorage.removeItem(KEY);
      return memory;
    }
    memory = {
      turns: Array.isArray(state.turns) ? state.turns.filter(isTurn) : [],
      answeredAt: typeof state.answeredAt === "number" ? state.answeredAt : 0,
      seenAt: typeof state.seenAt === "number" ? state.seenAt : 0,
      updatedAt,
      conversationId: typeof state.conversationId === "string" ? state.conversationId : "",
    };
    return memory;
  } catch {
    return memory;
  }
};

export const writeAsk = (next: Partial<AskState>) => {
  const current = readAsk();
  memory = {
    ...current,
    ...next,
    updatedAt: Date.now(),
    conversationId: next.conversationId ?? (current.conversationId || newConversationId()),
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(memory));
  } catch {
    // Private window, or storage disabled. The in-memory copy still works for
    // this page view, which is the case that matters most.
  }
  for (const listener of listeners) listener();
};

// Starting over starts a new thread in the record too, rather than appending
// an unrelated conversation to the previous one.
export const clearAsk = () =>
  writeAsk({ turns: [], answeredAt: 0, seenAt: Date.now(), conversationId: newConversationId() });

export const markAskSeen = () => writeAsk({ seenAt: Date.now() });

export const subscribeAsk = (listener: () => void) => {
  listeners.add(listener);
  // Braces matter: Set.delete returns a boolean, and an effect cleanup is void.
  return () => {
    listeners.delete(listener);
  };
};

/** An answer arrived that the visitor has not had open in front of them. */
export const hasUnread = (state: AskState) => state.answeredAt > state.seenAt;
