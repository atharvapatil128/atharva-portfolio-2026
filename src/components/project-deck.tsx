"use client";

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/lib/site-data";

function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "streaming-helper") {
    return (
      <div className="streaming-mini" aria-hidden="true">
        <i /><i /><i />
        <span>3 OPTIONS · 1 DECISION</span>
      </div>
    );
  }
  if (slug === "mead") {
    return (
      <div className="mead-mini" aria-hidden="true">
        <span className="waveform"><i /><i /><i /><i /><i /><i /><i /></span>
        <span className="mead-readout">ENGAGEMENT<br /><b>VISIBLE</b></span>
      </div>
    );
  }
  return (
    <div className="field-mini" aria-hidden="true">
      <span><i /> BATTERY CHECK</span>
      <span><i /> VOLTAGE LOG</span>
      <span><i /> FIELD NOTE</span>
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
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className={`project-card project-${project.slug}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            aria-label={`Read the ${project.name} case study`}
          >
            <span className="project-meta mono">0{index + 1} / {index === 0 ? "FEATURED" : project.category.split(" · ")[0].toUpperCase()}</span>
            <div className="project-copy">
              <h3>{project.name}</h3>
              <p>{project.descriptor}</p>
            </div>
            <ProjectVisual slug={project.slug} />
          </Link>
        ))}
      </div>
    </div>
  );
}
