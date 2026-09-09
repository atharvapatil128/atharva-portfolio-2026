"use client";

import { FormEvent, useRef, useState } from "react";

const contactEmail = "atharvapatil128@gmail.com";

export function ContactForm() {
  const [status, setStatus] = useState("Your message goes directly to my inbox.");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const inFlight = useRef(false);

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
      setStatus("Message sent. Thanks for reaching out!");
      form.reset();
    } catch (error) {
      setFailed(true);
      setStatus(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

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

      <div className="contact-form-foot">
        <p role="status" aria-live="polite">{status}{failed && <> <a href={`mailto:${contactEmail}`}>Email me directly</a>.</>}</p>
        <button className="button button-signal" type="submit" disabled={sending}>{sending ? "Sending…" : "Send it my way"} <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  );
}
