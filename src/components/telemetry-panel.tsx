"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  { label: "CS foundation", title: "Computer science", detail: "I learned how software works—and how a technically correct answer can still miss the person using it.", x: 78, y: 174 },
  { label: "HCI + design", title: "HCI + Design", detail: "I moved closer to the people, decisions, and contexts surrounding the system.", x: 309, y: 126 },
  { label: "Early career", title: "Early career", detail: "I’m building range across research, interaction design, visual design, and front-end implementation.", x: 542, y: 66 },
] as const;

type IconName = "build" | "location" | "focus" | "offTrack";

function ReadoutIcon({ name }: { name: IconName }) {
  if (name === "build") return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3.5h10v13H5zM7.8 7h4.4M7.8 10h4.4M7.8 13h2.6" /></svg>;
  if (name === "location") return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M15.5 8.1c0 4.2-5.5 8.4-5.5 8.4S4.5 12.3 4.5 8.1a5.5 5.5 0 0 1 11 0Z" /><circle cx="10" cy="8" r="1.7" /></svg>;
  if (name === "focus") return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="5.5" /><circle cx="10" cy="10" r="1.7" /><path d="M10 1.5v3M10 15.5v3M1.5 10h3M15.5 10h3" /></svg>;
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 14.5c2.7-6.7 5.8-9.7 9.2-9 2.4.5 3.8 2.7 4.8 6.5" /><path d="m12.7 11.5 1.7 1.7 3.1-3.1M2.5 16.5h15" /></svg>;
}

export function TelemetryPanel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const hasPositionedPill = useRef(false);
  const active = chapters[activeIndex];

  useEffect(() => {
    const bar = tabsRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;

    const moveToActive = (animate: boolean) => {
      const tab = bar.querySelector<HTMLButtonElement>(`[data-index="${activeIndex}"]`);
      if (!tab) return;
      if (!animate) {
        const previous = pill.style.transition;
        pill.style.transition = "none";
        pill.style.transform = `translateX(${tab.offsetLeft}px)`;
        pill.style.width = `${tab.offsetWidth}px`;
        void pill.offsetWidth;
        pill.style.transition = previous;
        return;
      }
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
      pill.style.width = `${tab.offsetWidth}px`;
    };

    moveToActive(hasPositionedPill.current);
    hasPositionedPill.current = true;
    const handleResize = () => moveToActive(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <aside className="telemetry-panel">
      <div className="telemetry-head">
        <h2>My career trajectory</h2>
        <span className="telemetry-live mono"><i aria-hidden="true" />EARLY CAREER</span>
      </div>

      <div className="telemetry-trace">
        <svg viewBox="0 0 620 230" role="img" aria-label={`Career trajectory with ${active.title} selected`}>
          <g className="trace-grid" aria-hidden="true">
            <path d="M0 46H620M0 92H620M0 138H620M0 184H620" />
            <path d="M103 0V230M206 0V230M309 0V230M412 0V230M515 0V230" />
          </g>
          <path className="career-path-back" d="M24 194C116 186 158 165 214 155S309 130 360 119 460 87 596 43" />
          <path className="career-path" d="M24 194C116 186 158 165 214 155S309 130 360 119 460 87 596 43" />
          {chapters.map((chapter, index) => <circle key={chapter.label} className={index <= activeIndex ? "career-stop is-reached" : "career-stop"} cx={chapter.x} cy={chapter.y} r="4" />)}
          <g className="career-marker" style={{ transform: `translate(${active.x}px, ${active.y}px)` }} aria-hidden="true">
            <circle r="9" />
            <circle className="career-marker-core" r="3" />
          </g>
        </svg>

        <div className="t-tabs career-tabs" ref={tabsRef} role="tablist" aria-label="Career chapters">
          <span className="t-tabs-pill" ref={pillRef} aria-hidden="true" />
          {chapters.map((chapter, index) => (
            <button className="t-tab mono" data-index={index} key={chapter.label} type="button" role="tab" aria-selected={activeIndex === index} onClick={() => setActiveIndex(index)}>
              {chapter.label}
            </button>
          ))}
        </div>
        <div className="career-chapter" aria-live="polite"><strong>{active.title}</strong><p>{active.detail}</p></div>
      </div>

      <div className="telemetry-readout">
        <div className="telemetry-primary">
          <div className="readout-label"><span className="readout-icon"><ReadoutIcon name="build" /></span><span className="mono">ACTIVE BUILD</span></div>
          <strong>Streaming Helper</strong>
          <p>Turning my graduate capstone into a working product—designing, building, testing, and iterating it myself.</p>
        </div>
        <dl>
          <div><span className="readout-icon"><ReadoutIcon name="location" /></span><dt>LOCATION</dt><dd>Indianapolis <small>Open to relocate for the right role</small></dd></div>
          <div><span className="readout-icon"><ReadoutIcon name="focus" /></span><dt>FOCUS</dt><dd>End-to-end product design <small>Research · interaction · prototyping · implementation</small></dd></div>
          <div><span className="readout-icon"><ReadoutIcon name="offTrack" /></span><dt>OFF TRACK</dt><dd>Karting, running, outdoors <small>Fast laps · longer trails · fresh air</small></dd></div>
        </dl>
      </div>
    </aside>
  );
}
