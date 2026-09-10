"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const contactEmail = "atharvapatil128@gmail.com";
const idleHint = "Your message goes directly to my inbox.";

export function ContactForm() {
  const [status, setStatus] = useState(idleHint);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const inFlight = useRef(false);
  const confirmation = useRef<HTMLDivElement>(null);

  // The confirmation replaces the form, so focus has to follow it or a keyboard
  // user is left on a button that no longer exists.
  useEffect(() => {
    if (sentTo) confirmation.current?.focus();
  }, [sentTo]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const replyEmail = String(data.get("email") ?? "").trim();
    const context = String(data.get("context") ?? "Product design opportunity");
    const message = String(data.get("message") ?? "").trim();
    inFlight.current = true;
    setSending(true);
    setFailed(false);
    setStatus("Sending your message…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: replyEmail, context, message, website: data.get("website") }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Your message could not be sent. Please try again.");
      form.reset();
      setSentTo(replyEmail);
    } catch (error) {
      setFailed(true);
      setStatus(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  const sendAnother = () => {
    setSentTo(null);
    setFailed(false);
    setStatus(idleHint);
  };

  if (sentTo) {
    return (
      <div
        className="contact-form contact-sent"
        role="status"
        aria-live="polite"
        tabIndex={-1}
        ref={confirmation}
      >
        <span className="contact-sent-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
        </span>
        <h2>Message sent.</h2>
        <p>
          It is in my inbox now. I will reply to <strong>{sentTo}</strong>, so if that address looks wrong,
          send it again or reach me directly.
        </p>
        <div className="contact-sent-actions">
          <button className="button button-quiet" type="button" onClick={sendAnother}>Send another</button>
          <a className="contact-sent-link" href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={sendMessage} aria-busy={sending}>
      <div className="contact-trap" aria-hidden="true"><label>Website<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
      <div className="contact-form-head">
        <div>
          <span className="mono">DIRECT LINE / AVAILABLE</span>
          <h2>Tell me what you&apos;re working through.</h2>
        </div>
        <span className="form-status mono"><i aria-hidden="true" />OPEN</span>
      </div>

      <div className="form-row">
        <label><span>Name</span><input name="name" autoComplete="name" placeholder="Your name" maxLength={100} required /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} required /></label>
      </div>
      <label>
        <span>What should we talk about?</span>
        <select name="context" defaultValue="Product design opportunity">
          <option>Product design opportunity</option>
          <option>Collaboration</option>
          <option>Portfolio conversation</option>
          <option>Something else</option>
        </select>
      </label>
      <label>
        <span>Context</span>
        <textarea name="message" placeholder="A little about the role, team, or problem…" rows={5} minLength={10} maxLength={5000} required />
      </label>

      {failed ? (
        <p className="contact-alert" role="alert">
          <span className="contact-alert-mark" aria-hidden="true">!</span>
          <span>
            {status} Your message is still here, so you can retry, or{" "}
            <a href={`mailto:${contactEmail}`}>email me directly</a>.
          </span>
        </p>
      ) : null}

      <div className="contact-form-foot">
        <p role="status" aria-live="polite">{failed ? "" : status}</p>
        <button className="button button-signal" type="submit" disabled={sending}>{sending ? "Sending…" : "Send it my way"} <span aria-hidden="true">↗︎</span></button>
      </div>
    </form>
  );
}
