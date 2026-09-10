/**
 * Conversation state that outlives the panel.
 *
 * Three things have to survive: closing and reopening the panel, navigating to
 * another page (each page renders its own SiteHeader, so the provider
 * remounts), and a reload. That rules out React state on its own.
 *
 * sessionStorage is the right scope: per tab, gone when the tab closes, never
 * sent anywhere. It can throw or be empty in a private window, so every access
 * is guarded and an in-memory copy is the fallback.
 */
export type Turn = { role: "user" | "assistant"; content: string };

export type AskState = {
  turns: Turn[];
  /** When the last answer finished, so an unread badge can be derived. */
  answeredAt: number;
  /** When the visitor last had the panel open. */
  seenAt: number;
};

const KEY = "ask.conversation.v1";
const EMPTY: AskState = { turns: [], answeredAt: 0, seenAt: 0 };

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
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return memory;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return memory;
    const state = parsed as Partial<AskState>;
    memory = {
      turns: Array.isArray(state.turns) ? state.turns.filter(isTurn) : [],
      answeredAt: typeof state.answeredAt === "number" ? state.answeredAt : 0,
      seenAt: typeof state.seenAt === "number" ? state.seenAt : 0,
    };
    return memory;
  } catch {
    return memory;
  }
};

export const writeAsk = (next: Partial<AskState>) => {
  memory = { ...readAsk(), ...next };
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(memory));
  } catch {
    // Private window, or storage disabled. The in-memory copy still works for
    // this page view, which is the case that matters most.
  }
  for (const listener of listeners) listener();
};

export const clearAsk = () => writeAsk({ turns: [], answeredAt: 0, seenAt: Date.now() });

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
