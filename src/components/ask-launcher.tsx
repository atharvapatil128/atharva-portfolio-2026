"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AskConsole } from "@/components/ask-console";
import { AskPet } from "@/components/ask-pet";
import { hasUnread, markAskSeen, readAsk, subscribeAsk } from "@/lib/ask-store";
import styles from "@/components/ask-launcher.module.css";

/**
 * The trigger appears in two places in the header, so open state lives in a
 * provider rather than in either trigger. The panel is portalled to the body:
 * the header is sticky with its own stacking context, and an overlay rendered
 * inside it would inherit that.
 */
type AskApi = { open: () => void; busy: boolean; unread: boolean };
const AskContext = createContext<AskApi | null>(null);

const useAsk = () => {
  const api = useContext(AskContext);
  if (!api) throw new Error("Ask triggers must be rendered inside <AskProvider>.");
  return api;
};

/** Opened while reading a case study, the openers should be about that work. */
const suggestionsFor = (pathname: string) => {
  if (pathname.startsWith("/work/streaming-helper"))
    return ["What did Atharva own on this project?", "Why five recommendations, not more?", "What was never validated here?"];
  if (pathname.startsWith("/work/mead"))
    return ["What did Atharva own on this project?", "How was privacy handled?", "What was outside his scope?"];
  if (pathname.startsWith("/work/field-maintenance"))
    return ["What did Atharva own on this project?", "Why start with batteries?", "How solid are the savings numbers?"];
  if (pathname.startsWith("/about"))
    return ["How does he decide when research is enough?", "How does he work with engineers?", "What is he like to work with?"];
  return [
    "What did Atharva actually own on Field Maintenance?",
    "What went wrong in the Streaming Helper capstone?",
    "How does he decide when research is enough?",
  ];
};

export function AskProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [unread, setUnread] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  // An answer that landed while the panel was shut is worth a quiet mark.
  useEffect(() => {
    const sync = () => setUnread(hasUnread(readAsk()));
    sync();
    return subscribeAsk(sync);
  }, []);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement;
    markAskSeen();
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    markAskSeen();
    setOpen(false);
    returnFocus.current?.focus();
  }, []);

  // Reading it counts as seeing it, including answers that arrive while open.
  useEffect(() => {
    if (open && !streaming) markAskSeen();
  }, [open, streaming]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) hide();
        else show();
        return;
      }
      if (event.key === "Escape" && open) hide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hide, show]);

  // Keep tabbing inside the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const onFocusIn = (event: FocusEvent) => {
      if (panel.current && !panel.current.contains(event.target as Node)) {
        panel.current.querySelector<HTMLElement>("textarea, button")?.focus();
      }
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [open]);

  return (
    <AskContext.Provider value={{ open: show, busy: streaming && !open, unread: unread && !open }}>
      {children}
      {mounted
        ? createPortal(
            /*
             * Rendered even while closed, and hidden with a class rather than
             * unmounted. An answer still being written keeps arriving if the
             * visitor shuts the panel, and is waiting for them when they come
             * back. `inert` keeps the closed panel out of the tab order.
             */
            <div className={`${styles.overlay} ${open ? "" : styles.closed}`} aria-hidden={!open}>
              <button className={styles.scrim} type="button" aria-label="Close" onClick={hide} tabIndex={open ? 0 : -1} />
              <div
                className={styles.panel}
                ref={panel}
                role="dialog"
                aria-modal="true"
                aria-label="Atharva's assistant"
                inert={!open}
              >
                <AskPet busy={streaming} />
                <div className={styles.panelHead}>
                  <span className={`${styles.panelTitle} mono`}>ATHARVA&apos;S ASSISTANT</span>
                  <button className={styles.close} type="button" onClick={hide} aria-label="Close">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="m6 6 8 8M14 6l-8 8" />
                    </svg>
                  </button>
                </div>
                <AskConsole
                  variant="panel"
                  suggestions={suggestionsFor(pathname)}
                  context={pathname}
                  autoFocus={open}
                  onStreamingChange={setStreaming}
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </AskContext.Provider>
  );
}

/**
 * Both triggers are real links to /ask. JavaScript upgrades them to the panel,
 * so the page stays shareable and indexable, and middle-click still works.
 */
const upgrade = (open: () => void) => (event: MouseEvent) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  open();
};

const statusLabel = (busy: boolean, unread: boolean) => {
  if (busy) return "Atharva's assistant is writing a reply";
  if (unread) return "Atharva's assistant has replied";
  return null;
};

export function AskNavTrigger() {
  const { open, busy, unread } = useAsk();
  const label = statusLabel(busy, unread);
  return (
    <a className={styles.navTrigger} href="/ask" onClick={upgrade(open)}>
      Ask
      {label ? (
        <>
          <i className={`${styles.mark} ${busy ? styles.markBusy : ""}`} aria-hidden="true" />
          <span className={styles.srOnly}>{label}</span>
        </>
      ) : null}
    </a>
  );
}

export function AskFieldTrigger() {
  const { open, busy, unread } = useAsk();
  const label = statusLabel(busy, unread);
  return (
    <a className={styles.fieldTrigger} href="/ask" onClick={upgrade(open)}>
      <svg className={styles.glyph} viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="8" cy="8" r="5.25" />
        <path d="m12 12 3.5 3.5" />
      </svg>
      <span>{busy ? "Writing a reply…" : unread ? "Reply ready" : "Ask about the work"}</span>
      {label ? (
        <>
          <i className={`${styles.mark} ${busy ? styles.markBusy : ""}`} aria-hidden="true" />
          <span className={styles.srOnly}>{label}</span>
        </>
      ) : (
        <kbd className={styles.kbd}>⌘K</kbd>
      )}
    </a>
  );
}
