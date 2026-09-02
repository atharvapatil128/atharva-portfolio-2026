import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactSignal } from "@/components/contact-signal";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="contact-hero section-pad">
        <div><h1>Let&apos;s make the complicated feel inevitable.</h1><p>I&apos;m interested in product design roles and collaborations where careful thinking, strong interaction design, and real implementation all matter.</p></div>
        <ContactSignal />
        </section>
        <section className="contact-routes section-pad">
        <h2>Choose the fastest route.</h2>
        <div className="contact-row"><span className="mono">01</span><strong>EMAIL</strong><p>Best for roles, collaborations, and thoughtful introductions.</p><span>ADDRESS TO CONNECT</span></div>
        <div className="contact-row"><span className="mono">02</span><strong>LINKEDIN</strong><p>For professional context, shared connections, and a quick hello.</p><span>PROFILE TO CONNECT</span></div>
        <div className="contact-row"><span className="mono">03</span><strong>RÉSUMÉ</strong><p>A concise record of experience, education, and capabilities.</p><Link href="/resume">OPEN RÉSUMÉ</Link></div>
        <p className="connection-note">Email and LinkedIn destinations are intentionally marked for connection before launch rather than guessed.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
