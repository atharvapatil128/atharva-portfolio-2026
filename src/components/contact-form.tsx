"use client";

import { FormEvent, useState } from "react";

const contactEmail = "atharvapatil128@gmail.com";

export function ContactForm() {
  const [status, setStatus] = useState("Your message stays in your email app until you send it.");

  const composeEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const replyEmail = String(data.get("email") ?? "").trim();
    const context = String(data.get("context") ?? "Product design opportunity");
    const message = String(data.get("message") ?? "").trim();
    const subject = `${context} — ${name}`;
    const body = [`Hi Atharva,`, "", message, "", `— ${name}`, replyEmail].join("\n");

    setStatus("Opening a prefilled draft in your email app…");
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={composeEmail}>
      <div className="contact-form-head">
        <div>
          <span className="mono">DIRECT LINE / AVAILABLE</span>
          <h2>Start with the useful part.</h2>
        </div>
        <span className="form-status mono"><i aria-hidden="true" />OPEN</span>
      </div>

      <div className="form-row">
        <label><span>Name</span><input name="name" autoComplete="name" placeholder="Your name" required /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
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
        <textarea name="message" placeholder="A little about the role, team, or problem…" rows={5} required />
      </label>

      <div className="contact-form-foot">
        <p aria-live="polite">{status}</p>
        <button className="button button-signal" type="submit">Compose email <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  );
}
