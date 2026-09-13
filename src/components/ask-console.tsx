"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "@/components/ask-console.module.css";
import { clearAsk, hasUnread, markAskSeen, readAsk, subscribeAsk, writeAsk, type Turn } from "@/lib/ask-store";

const MAX_CHARS = 1000;
const fallbackError = "The assistant could not answer. Please try again, or use the contact page.";

const defaultSuggestions = [
  "What did Atharva actually own on Field Maintenance?",
  "What went wrong in the Streaming Helper capstone?",
  "How does he decide when research is enough?",
];

type Props = {
  /** "panel" scrolls the transcript inside a fixed height instead of the page. */
  variant?: "page" | "panel";
  /** Opened from a case study, the openers should be about that project. */
  suggestions?: string[];
  autoFocus?: boolean;
  /** Current path, so the assistant can resolve "this project". */
  context?: string;
  /** Lets the launcher badge the trigger while the panel is closed. */
  onStreamingChange?: (streaming: boolean) => void;
};

/** Paragraph breaks are the only formatting an answer needs. */
const paragraphs = (text: string) => text.split(/\n{2,}/).filter(Boolean);

/**
 * How much of the conversation the model is shown. The transcript on screen
 * keeps everything; only the window travels, so a long conversation loses its
 * oldest context instead of hitting a wall and telling the visitor to go away.
 *
 * The slice has to start on a user turn, because the API rejects a history
 * that opens with an assistant reply.
 */
const SEND_WINDOW = 20;

const windowed = (turns: Turn[]) => {
  if (turns.length <= SEND_WINDOW) return turns;
  const cut = turns.length - SEND_WINDOW;
  return turns.slice(turns[cut].role === "user" ? cut : cut + 1);
};

export function AskConsole({
  variant = "page",
  suggestions = defaultSuggestions,
  autoFocus = false,
  context,
  onStreamingChange,
}: Props) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  // The page and the panel can both be mounted at once on /ask.
  const fieldId = useId();
  const inFlight = useRef(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const tail = useRef<HTMLDivElement>(null);

  // Pick up whatever the visitor already said, here or on an earlier page.
  useEffect(() => {
    setTurns(readAsk().turns);
    return subscribeAsk(() => {
      if (!inFlight.current) setTurns(readAsk().turns);
    });
  }, []);

  useEffect(() => onStreamingChange?.(streaming), [streaming, onStreamingChange]);

  // On the page there is no panel to open, so reading it here is what counts
  // as having seen the reply. Without this the trigger's mark never clears for
  // anyone who arrived by navigating rather than by opening the panel.
  //
  // The hasUnread guard is load-bearing: marking seen notifies subscribers,
  // which sets turns, which re-runs this effect. Writing only when there is
  // something to clear makes the second pass a no-op instead of a loop.
  useEffect(() => {
    if (variant === "page" && !streaming && hasUnread(readAsk())) markAskSeen();
  }, [variant, streaming, turns]);

  // The textarea grows with its content rather than scrolling internally.
  // Measuring against "auto" matters: measuring against a fixed height lets
  // scrollHeight feed back on itself, and the field sticks at its max.
  const resize = useCallback(() => {
    const field = input.current;
    if (!field) return;
    // An empty field is always one row. Measuring it on mount is unreliable,
    // because styles may not have settled, and a bad first measurement sticks.
    if (!field.value) {
      field.style.height = "";
      return;
    }
    field.style.height = "auto";
    field.style.height = `${Math.min(field.scrollHeight, 160)}px`;
  }, []);

  useEffect(resize, [draft, resize]);

  useEffect(() => {
    tail.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns]);

  useEffect(() => {
    if (autoFocus) input.current?.focus();
  }, [autoFocus]);

  const ask = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || inFlight.current) return;

      const history: Turn[] = [...readAsk().turns, { role: "user", content: trimmed }];
      inFlight.current = true;
      setTurns([...history, { role: "assistant", content: "" }]);
      setDraft("");
      setFailed(null);
      setStreaming(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: windowed(history), path: context }),
        });

        if (!response.ok || !response.body) {
          const result = await response.json().catch(() => ({}));
          throw new Error(result.error || fallbackError);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setTurns([...history, { role: "assistant", content: answer }]);
        }
        if (!answer.trim()) throw new Error(fallbackError);

        inFlight.current = false;
        // answeredAt is what badges the trigger if the panel is closed by now.
        writeAsk({ turns: [...history, { role: "assistant", content: answer }], answeredAt: Date.now() });
      } catch (error) {
        // Drop the empty assistant turn so the transcript stays coherent.
        inFlight.current = false;
        setTurns(history);
        writeAsk({ turns: history });
        setFailed(error instanceof Error ? error.message : fallbackError);
      } finally {
        inFlight.current = false;
        setStreaming(false);
        input.current?.focus();
      }
    },
    [context],
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void ask(draft);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void ask(draft);
    }
  };

  const reset = () => {
    if (streaming) return;
    clearAsk();
    setTurns([]);
    setFailed(null);
    input.current?.focus();
  };

  const started = turns.length > 0;

  return (
    <div className={`${styles.console} ${variant === "panel" ? styles.inPanel : ""}`}>
      {started ? (
        <div className={styles.transcript} role="log" aria-live="polite" aria-busy={streaming}>
          {turns.map((turn, index) => {
            const isAnswer = turn.role === "assistant";
            const isLast = index === turns.length - 1;
            const pending = isAnswer && isLast && streaming;
            return (
              <article
                key={index}
                className={[styles.turn, isAnswer ? styles.answer : styles.question, isAnswer ? styles.assistant : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className={`${styles.speaker} mono`}>
                  <i className={styles.speakerMark} aria-hidden="true" />
                  {isAnswer ? "Atharva’s assistant" : "You"}
                </span>
                <div className={styles.body}>
                  {turn.content ? (
                    paragraphs(turn.content).map((paragraph, key, all) => {
                      const writing = pending && key === all.length - 1;
                      return (
                        <p key={key} className={writing ? styles.pending : undefined}>
                          {paragraph}
                          {writing ? <span className={styles.caret} aria-hidden="true" /> : null}
                        </p>
                      );
                    })
                  ) : (
                    <span className={styles.thinking} aria-label="Thinking">
                      <i /><i /><i />
                    </span>
                  )}
                </div>
              </article>
            );
          })}
          <div ref={tail} />
        </div>
      ) : (
        <div className={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className={styles.suggestion}
              type="button"
              onClick={() => void ask(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {failed ? (
        <p className={styles.alert} role="alert">
          {failed} You can also <a href="/contact">reach Atharva directly</a>.
        </p>
      ) : null}

      <form className={styles.composer} onSubmit={submit}>
        <label className={styles.srOnly} htmlFor={fieldId}>
          Ask a question about Atharva&apos;s work
        </label>
        <textarea
          id={fieldId}
          ref={input}
          className={styles.input}
          value={draft}
          onChange={(event) => setDraft(event.target.value.slice(0, MAX_CHARS))}
          onKeyDown={onKeyDown}
          placeholder="Ask about his work…"
          rows={1}
          maxLength={MAX_CHARS}
          disabled={streaming}
        />
        <button className={styles.send} type="submit" disabled={streaming || !draft.trim()} aria-label="Send question">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 16V4M5 9l5-5 5 5" />
          </svg>
        </button>
      </form>

      <div className={`${styles.foot} mono`}>
        <span>Answers come only from this site. It will say when it does not know.</span>
        {started && !streaming ? (
          <button className={styles.reset} type="button" onClick={reset}>
            Start over
          </button>
        ) : null}
      </div>
    </div>
  );
}
