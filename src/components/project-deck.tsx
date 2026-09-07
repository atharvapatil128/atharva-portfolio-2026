"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { projects } from "@/lib/site-data";

function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "streaming-helper") {
    return (
      <div className="streaming-mini" aria-hidden="true">
        <Image className="streaming-mini-context" src="/images/streaming-helper/extension-ready-hd.png" alt="" fill loading="eager" sizes="(max-width: 760px) 140px, 50vw" />
        <span className="streaming-mini-scrim" />
        <span className="streaming-mini-dashboard">
          <Image src="/images/streaming-helper/dashboard-recommendations-hd.png" alt="" fill loading="eager" sizes="(max-width: 760px) 104px, 32vw" />
        </span>
        <span className="streaming-mini-brand">
          <Image src="/images/streaming-helper/product-icon.png" alt="" width={28} height={28} />
          <b>Streaming Helper</b>
        </span>
      </div>
    );
  }
  if (slug === "mead") {
    return (
      <div className="mead-mini" aria-hidden="true">
        <span className="mead-mini-orbit" />
        <span className="mead-mini-phone mead-mini-phone-capture">
          <Image src="/images/mead/entry-ready-upload.png" alt="" fill sizes="110px" />
        </span>
        <span className="mead-mini-phone mead-mini-phone-return">
          <Image src="/images/mead/engagement-screen-final.png" alt="" fill sizes="150px" />
        </span>
      </div>
    );
  }
  return (
    <div className="field-mini" aria-hidden="true">
      <span className="field-condensed-mark">
        <Image src="/images/field-maintenance/state-department-seal.png" alt="" width={1280} height={1281} sizes="70px" />
      </span>
      <Image className="field-cover field-cover-expanded" src="/images/field-maintenance/cover-standard-direct.png" alt="" fill sizes="(max-width: 760px) 180px, 50vw" />
    </div>
  );
}

export function ProjectDeck() {
  const [active, setActive] = useState(0);

  return (
    <div className="project-deck-shell">
      <div className="deck-controls mono">
        <span>SELECTED WORK / PROJECT INDEX</span>
        <span>HOVER, FOCUS, OR SWIPE</span>
      </div>
      <div className="project-deck" data-active={active}>
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className={`project-card project-${project.slug}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <Link href={`/work/${project.slug}`} className="project-card-main" aria-label={`Read the ${project.name} case study`}>
              <span className="project-meta mono">0{index + 1} / {index === 0 ? "FEATURED" : project.category.split(" · ")[0].toUpperCase()}</span>
              <div className="project-copy">
                <h3>{project.name}</h3>
                <p>{project.descriptor}</p>
              </div>
              <ProjectVisual slug={project.slug} />
            </Link>
            {project.slug === "streaming-helper" ? <a href="https://streaminghelper.net/" target="_blank" rel="noreferrer" className="project-live-link mono" aria-label="Open the live Streaming Helper website">OPEN LIVE <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg></a> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
