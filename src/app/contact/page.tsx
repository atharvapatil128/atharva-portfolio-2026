import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="contact-hero section-pad">
        <div><h1>Let&apos;s make the complicated feel inevitable.</h1><p>I&apos;m interested in product design roles and collaborations where careful thinking, strong interaction design, and real implementation all matter.</p></div>
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
