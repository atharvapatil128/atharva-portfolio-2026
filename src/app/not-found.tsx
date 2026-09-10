import Link from "next/link";
import { DotField } from "@/components/dot-field";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="not-found-stage section-pad" aria-labelledby="not-found-title">
          <DotField className="not-found-dot-field" variant="intro" seed={404} />

          <div className="not-found-content">
            <div className="not-found-graphic" aria-hidden="true">
              <svg className="not-found-route" viewBox="0 0 920 260" preserveAspectRatio="none">
                <path className="not-found-route-base" d="M18 185C166 185 168 46 330 70c148 22 146 142 302 132 116-8 130-105 270-105" />
                <path className="not-found-route-signal" d="M18 185C166 185 168 46 330 70c96 14 118 72 130 115" />
                <circle className="not-found-route-end" cx="460" cy="185" r="7" />
              </svg>
              <div className="not-found-code"><span>4</span><span className="not-found-zero">0</span><span>4</span></div>
            </div>

            <h1 id="not-found-title">This page took a wrong turn.</h1>
            <p>The address may have moved or never existed. The rest of the portfolio is right where you left it.</p>
            <Link className="button button-signal not-found-home" href="/">
              <span>Back to home</span>
              <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 9h10M9 4l5 5-5 5" /></svg>
            </Link>
            <span className="not-found-status mono">404 · Route not found</span>
          </div>
        </section>
      </main>
    </>
  );
}
