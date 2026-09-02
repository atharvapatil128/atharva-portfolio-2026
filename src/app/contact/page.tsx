import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";
import { IntroDotField } from "@/components/intro-dot-field";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="contact-hero top-stage section-pad">
        <IntroDotField variant="contact" />
        <div><h1>Have something interesting—or slightly complicated?</h1><p>Tell me what you&apos;re working through. I&apos;m always happy to compare notes, talk product, or hear about a good team.</p></div>
        <ContactForm />
        </section>
        <section className="contact-routes section-pad">
        <h2>Choose the fastest route.</h2>
        <div className="contact-row"><span className="mono">01</span><strong>EMAIL</strong><p>Best for roles, collaborations, and thoughtful introductions.</p><a href="mailto:atharvapatil128@gmail.com">SEND DIRECTLY</a></div>
        <div className="contact-row"><span className="mono">02</span><strong>LINKEDIN</strong><p>For professional context, shared connections, and a quick hello.</p><a href="https://www.linkedin.com/in/atharvahpatil" target="_blank" rel="noreferrer">VIEW PROFILE</a></div>
        <div className="contact-row"><span className="mono">03</span><strong>RÉSUMÉ</strong><p>A concise record of experience, education, and capabilities.</p><Link href="/resume">OPEN RÉSUMÉ</Link></div>
        <p className="connection-note">The form prepares a message in your email app, so nothing is sent without your review.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
