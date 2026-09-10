"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AskConsole } from "@/components/ask-console";
import styles from "@/components/ask-launcher.module.css";

/**
 * The trigger appears in two places in the header, so open state lives in a
 * provider rather than in either trigger. The panel itself is portalled to the
 * body: the header is sticky with its own stacking context, and an overlay
 * rendered inside it inherits that.
 */
const AskContext = createContext<(() => void) | null>(null);

const useAsk = () => {
  const open = useContext(AskContext);
  if (!open) throw new Error("Ask triggers must be rendered inside <AskProvider>.");
  return open;
};

/** Opened while reading a case study, the openers should be about that work. */
const suggestionsFor = (pathname: string) => {
  if (pathname.startsWith("/work/streaming-helper"))
    return [
      "What did Atharva own on this project?",
      "Why five recommendations, not more?",
      "What was never validated here?",
    ];
  if (pathname.startsWith("/work/mead"))
    return [
      "What did Atharva own on this project?",
      "How was privacy handled?",
      "What was outside his scope?",
    ];
  if (pathname.startsWith("/work/field-maintenance"))
    return [
      "What did Atharva own on this project?",
      "Why start with batteries?",
      "How solid are the savings numbers?",
    ];
  if (pathname.startsWith("/about"))
    return [
      "How does he decide when research is enough?",
      "How does he work with engineers?",
      "What is he like to work with?",
    ];
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
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus();
  }, []);

  // Navigating away should not leave the panel hanging over the new page.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }
      if (event.key === "Escape" && open) hide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hide]);

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
    <AskContext.Provider value={show}>
      {children}
      {mounted && open
        ? createPortal(
            <div className={styles.overlay}>
              <button className={styles.scrim} type="button" aria-label="Close" onClick={hide} />
              <div
                className={styles.panel}
                ref={panel}
                role="dialog"
                aria-modal="true"
                aria-label="Ask about Atharva's work"
              >
                <div className={styles.panelHead}>
                  <span className={`${styles.panelTitle} mono`}>ASK / ANSWERED FROM THIS SITE</span>
                  <button className={styles.close} type="button" onClick={hide} aria-label="Close">
                    <svg viewBox="0 0 20 20" aria-hidden="true">
                      <path d="m6 6 8 8M14 6l-8 8" />
                    </svg>
                  </button>
                </div>
                <AskConsole variant="panel" suggestions={suggestionsFor(pathname)} context={pathname} autoFocus />
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
const upgrade = (open: () => void) => (event: React.MouseEvent) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  open();
};

export function AskNavTrigger() {
  const open = useAsk();
  return (
    <a className={styles.navTrigger} href="/ask" onClick={upgrade(open)}>
      Ask
    </a>
  );
}

export function AskFieldTrigger() {
  const open = useAsk();
  return (
    <a className={styles.fieldTrigger} href="/ask" onClick={upgrade(open)}>
      <svg className={styles.glyph} viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="8" cy="8" r="5.25" />
        <path d="m12 12 3.5 3.5" />
      </svg>
      <span>Ask about the work</span>
      <kbd className={styles.kbd}>⌘K</kbd>
    </a>
  );
}
