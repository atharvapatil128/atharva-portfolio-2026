"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLink } from "./arrow-link";
import { SectionReveal } from "./section-reveal";
import styles from "./personal-journal.module.css";

const photos = {
  trail: { alt: "A walker following a stone path across a green hillside", caption: "Taking the longer route." },
  running: { alt: "Atharva after a run, wearing a race bib and medal", caption: "After the run." },
  boat: { alt: "The decorated bow of a wooden boat facing turquoise water and distant cliffs", caption: "A different view from the water." },
  sunset: { alt: "The last light of sunset reflected in still water between wooded banks", caption: "Last light on the water." },
  gallery: { alt: "A visitor taking in large paintings in an art gallery", caption: "Time in the galleries." },
  graduation: { alt: "Atharva in graduation robes holding an Indiana University diploma cover", caption: "Graduation day." },
  presentation: { alt: "Atharva beside his research poster about decision fatigue in streaming", caption: "Presenting Streaming Helper." },
};

function Photo({ name, className = "" }: { name: keyof typeof photos; className?: string }) {
  const photo = photos[name];
  return <figure className={`${styles.photo} ${className}`}>
    <div className={styles.frame} data-reveal="photo">
      <Image src={`/images/personal/${name}.jpg`} alt={photo.alt} fill sizes="(max-width: 600px) 85vw, (max-width: 1000px) 45vw, 35vw" className={styles[name]} />
    </div>
    <figcaption data-reveal>{photo.caption}</figcaption>
  </figure>;
}

export function PersonalJournal() {
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 600px)");
    const update = () => setScrollable(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return <section className={`${styles.journal} section-pad`} id="beyond-work" aria-labelledby="journal-title">
    <SectionReveal className={styles.collage}>
      <div className={styles.intro}>
        <h2 id="journal-title" data-reveal>A little further<br />from the desk.</h2>
        <p data-reveal>A few places, milestones, and things I keep coming back to.</p>
        <ArrowLink className={styles.aboutLink} href="/about">Explore the full story</ArrowLink>
      </div>
      <Photo name="trail" className={styles.lead} />
      <div className={styles.fragments} aria-label="A few moments outside work" tabIndex={scrollable ? 0 : -1}>
        <Photo name="running" className={styles.runMoment} />
        <Photo name="sunset" className={styles.sunMoment} />
        <Photo name="boat" className={styles.boatMoment} />
      </div>
      <p className={styles.closing} data-reveal>Always something<br />else to discover.</p>
    </SectionReveal>
  </section>;
}

const beliefs = [
  ["Find the real question.", "Research is useful when it changes what gets built."],
  ["Make it tangible early.", "A prototype creates a better conversation than a polished explanation."],
  ["Stay for the messy part.", "Edge cases, content, and implementation are part of the design."],
  ["Let feedback change it.", "Change one thing. Pay attention. Let what happens next inform the work."],
];

export function PersonalAbout() {
  return <>
    <section className={`${styles.beliefs} section-pad`} aria-labelledby="beliefs-title">
      <svg className={styles.filterDefs} aria-hidden="true"><defs><filter id="values-signal" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 -1 -1 2 0" result="inkMask" />
        <feFlood floodColor="var(--signal)" />
        <feComposite in2="inkMask" operator="in" />
      </filter></defs></svg>
      <SectionReveal>
      <div className={styles.valuesHeading}><h2 id="beliefs-title" data-reveal>Values<span>.</span></h2></div>
      <div className={styles.beliefGrid}>
        {beliefs.map(([title, copy], index) => <article key={title}>
          <div className={styles.symbolReveal} data-reveal><div className={styles.symbol} style={{ backgroundPosition: `${index * 100 / 3}% center` }} aria-hidden="true" /></div>
          <h3 data-reveal>{title}</h3><p data-reveal>{copy}</p>
        </article>)}
      </div>
      </SectionReveal>
    </section>
    <section className={`${styles.personalStorySection} section-pad`} aria-labelledby="personal-story-title">
      <SectionReveal className={styles.personalStory}>
      <Photo name="gallery" className={styles.galleryMoment} />
      <div className={styles.storyCopy}>
        <h2 id="personal-story-title" data-reveal>Room to <br />be curious.</h2>
        <p data-reveal>Fast laps, long runs, open air. And time to stop and look a little closer.</p>
        <p data-reveal>Karting taught me to read a system through feedback: brake later, change one thing, and let the next lap tell you whether it worked.</p>
        <ArrowLink className={styles.aboutLink} href="/notes">Read what I’m thinking about</ArrowLink>
      </div>
      <div className={styles.milestones}>
        <div className={styles.milestoneIntro}><h3 data-reveal>A couple of <br />moments along the way.</h3><p data-reveal>From making the work<br />to sharing it.</p></div>
        <Photo name="graduation" />
        <Photo name="presentation" />
      </div>
      </SectionReveal>
    </section>
  </>;
}
