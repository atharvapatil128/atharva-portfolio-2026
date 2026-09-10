import Image from "next/image";

type FigureProps = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
};

function ArticleFigure({ src, alt, caption, className = "" }: FigureProps) {
  return (
    <figure className={`note-figure ${className}`.trim()}>
      <a className="note-figure-link" href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size figure: ${caption}`}>
        <Image src={src} alt={alt} width={1320} height={1708} sizes="(max-width: 760px) 100vw, 1040px" />
        <span className="note-figure-zoom mono">Open full-size <span aria-hidden="true">↗</span></span>
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function PortfolioWorkflowNote() {
  return (
    <div className="note-story">
      <p className="note-lede">
        This portfolio did not begin with a component library. It began with a hiring problem:
        someone moving quickly should understand my role, strongest work, and way of thinking in
        about thirty seconds. AI helped me move from question to artifact faster. It did not decide
        which questions were worth answering.
      </p>

      <aside className="note-thesis">
        <span className="mono">What changed</span>
        <p>AI shortened the distance between a design decision and something I could test. Judgment still determined what stayed.</p>
      </aside>

      <section>
        <h2>The brief came before the interface</h2>
        <p>
          I wrote the product goal before pushing pixels: this site is for hiring managers and
          recruiters scanning many portfolios, usually on a laptop and often with very little time.
          That led to a durable rule—the role, strongest work, project meaning, résumé, and next step
          should be legible without waiting for an animation or learning an interaction.
        </p>
        <p>
          That constraint became more useful than any visual reference. It gave every exploration a
          test. A striking interaction could stay only if it made the work easier to understand. A
          polished sentence could stay only if the project evidence supported it.
        </p>
      </section>

      <section>
        <h2>I used AI as a second pair of hands, not an oracle</h2>
        <p>
          I used AI to inspect references, translate compositions into responsive code, inventory
          assets, compare implementation states, and keep a running record of decisions. That made
          trying a direction inexpensive. It also made it very easy to generate too much.
        </p>
        <p>
          The useful loop was not prompt, accept, ship. It was frame the problem, make the smallest
          convincing version, inspect it in the browser, name what failed, and revise the system—not
          just the isolated component.
        </p>

        <ul className="note-decision-ledger" aria-label="Three decisions from the build">
          <li>
            <span className="mono">Repeated the next section</span>
            <h3>The Clarity Stack looked useful but duplicated Selected Work.</h3>
            <p>I replaced it with one shipped-product artifact so real work appeared in the first viewport.</p>
          </li>
          <li>
            <span className="mono">Motion weakened the page</span>
            <h3>Per-element reveals made text flicker and scroll feel unstable.</h3>
            <p>I returned content to a visible default and kept motion short, local, and non-essential.</p>
          </li>
          <li>
            <span className="mono">Polish drifted</span>
            <h3>New sections introduced competing typography, shadows, and spacing.</h3>
            <p>I consolidated tokens and documented one light source, one type hierarchy, and one role for orange.</p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Version control became part of the design method</h2>
        <p>
          I explored with more than one AI coding agent, sometimes in parallel. That increased speed,
          but it also created a new design risk: a promising direction could overwrite the last stable
          one, or two agents could solve the same problem with different visual assumptions.
        </p>
        <p>
          I treated branches and worktrees like design variants. Before a major homepage change, I
          preserved the approved state. New directions lived separately until their commits could be
          reviewed against the same product and design contracts. Integration happened only after the
          branch history, overlapping files, production build, and browser behavior were checked.
        </p>
      </section>

      <blockquote className="note-pullquote">
        “The fastest workflow was not the one that avoided mistakes. It was the one that made mistakes cheap to see and safe to reverse.”
      </blockquote>

      <section>
        <h2>Evidence mattered more than confident copy</h2>
        <p>
          AI can make weak claims sound finished. For each case study, I went back to the source: the
          original research counts, pitch decks, prototypes, Power Apps package, screenshots, and the
          current working product. That changed the stories materially.
        </p>
        <p>
          Streaming Helper needed a visible boundary between the capstone concept and the browser-based
          beta. MEAD needed to say that it was a high-fidelity concept that had not been tested with
          caregivers. Field Maintenance needed to separate projected savings from measured outcomes.
          The portfolio became stronger when it became more precise about what had—and had not—happened.
        </p>
      </section>

      <section>
        <h2>Where AI was genuinely useful</h2>
        <ul className="note-list-block">
          <li><strong>Implementation:</strong> turning approved compositions into responsive React and CSS quickly enough to evaluate them in context.</li>
          <li><strong>Asset work:</strong> tracing soft exports, rebuilding the desk scene from sharper layers, compressing video, and producing responsive image sizes.</li>
          <li><strong>Consistency:</strong> finding duplicated styles, undersized labels, conflicting shadows, and route-specific patterns that had drifted away from the system.</li>
          <li><strong>Verification:</strong> running TypeScript, production builds, route checks, deployment diagnostics, and reduced-motion checks after changes.</li>
          <li><strong>Memory:</strong> maintaining a build log so later decisions could be judged against what had already been tried.</li>
        </ul>
      </section>

      <section>
        <h2>Where I kept taking the wheel</h2>
        <p>
          I rejected uppercase-heavy typography when it stopped feeling human. I asked for the original
          type system back when a new one made the site feel generic. I removed animation that looked
          impressive in isolation but made scrolling feel jittery. I kept pushing the hero objects,
          footer field, tonal sections, and note sheets until they felt like parts of one website.
        </p>
        <p>
          Those corrections were not cleanup after the “real” AI work. They were the design work. The
          model could widen the field of options and shorten implementation time; taste, evidence, and
          the willingness to say “this still does not feel right” shaped the result.
        </p>
      </section>

      <section>
        <h2>The system is the lasting output</h2>
        <p>
          The finished site is one outcome. The more reusable outcome is the operating system behind it:
          a product brief, a documented visual language, evidence boundaries for case studies, a branch
          strategy for experiments, and a QA record that makes future changes easier to evaluate.
        </p>
        <p>
          That is how I want to keep using AI: not to remove authorship, but to spend less time between
          a decision and the evidence that tells me whether it was a good one.
        </p>
      </section>
    </div>
  );
}

function PorscheDesignSystemNote() {
  return (
    <div className="note-story">
      <p className="note-lede">
        For an Interaction Design Methods assignment, I studied Porsche’s public web design system,
        rebuilt a homepage composition from its existing parts, and designed one new component. The
        interesting challenge was not making something that looked like Porsche. It was making something
        new that behaved as though it had always belonged there.
      </p>

      <aside className="note-thesis">
        <span className="mono">The extension test</span>
        <p>A new component earns its place when it solves a missing interaction and still speaks the system’s existing grammar.</p>
      </aside>

      <section>
        <h2>Deconstruct before remixing</h2>
        <p>
          I began by identifying five principles in Porsche’s design language: monochrome interfaces,
          gently rounded geometry, generous space, reduced information, and iconic brand assets. These
          principles appeared in the components, but also in the relationships between them—image scale,
          button hierarchy, spacing patterns, and how layouts changed across viewports.
        </p>
        <ul className="note-principles" aria-label="Porsche design principles examined">
          <li>Monochrome</li><li>Rounded</li><li>Space</li><li>Reduced</li><li>Iconic</li>
        </ul>
        <p>
          The system was strongest when those relationships stayed intact across the main site. It was
          weaker at the boundaries: moving between Porsche’s main, shopping, and motorsport experiences
          made location and the path back less clear, even though the navigation looked related.
        </p>
      </section>

      <section>
        <h2>Recompose with the system’s own parts</h2>
        <p>
          My first intervention was deliberately conservative. I rearranged the homepage using existing
          hero, spacer, carousel, teaser, text, heading, and footer patterns. The work was less about
          drawing new UI than choosing the right pattern for each content role.
        </p>
        <div className="note-figure-pair">
          <ArticleFigure
            src="/images/notes/porsche-design-system/porsche-current-home.webp"
            alt="Assignment page showing the first half of Porsche's existing homepage"
            caption="The existing homepage established the component vocabulary and density baseline."
          />
          <ArticleFigure
            src="/images/notes/porsche-design-system/porsche-recomposed-home.webp"
            alt="Assignment page showing Atharva's recomposed Porsche homepage"
            caption="The recomposed page changed the sequence while retaining Porsche components and media ratios."
          />
        </div>
        <p>
          Spacing was the decisive constraint. Before I used the system’s spacer patterns, the page felt
          compressed even though the individual components were correct. Once the vertical rhythm and
          image ratios followed the system, the new sequence felt considerably more coherent.
        </p>
      </section>

      <section>
        <h2>Extend only where a real gap exists</h2>
        <p>
          The existing site could describe a feature, but it did not have a compact way to preview how
          that feature felt. I designed the <strong>Experience Player</strong>: an interactive video
          component for moments such as acceleration, where motion carries information a still image cannot.
        </p>
        <ArticleFigure
          src="/images/notes/porsche-design-system/porsche-experience-player.webp"
          alt="Assignment page documenting large, medium, and small Experience Player variants"
          caption="Large, medium, and small variants use one interaction model across breakpoints."
          className="note-figure-wide"
        />
        <p>
          The component reused Porsche’s button and icon primitives, rounded corners, monochrome surfaces,
          and approved contrast colors. Its main interaction was hold to preview, with an expand action for
          a more immersive view. I defined large, medium, and small variants rather than shrinking one
          desktop composition until it broke.
        </p>
      </section>

      <section>
        <h2>Document the behavior, not only the pixels</h2>
        <p>
          Porsche’s system documented principles and patterns well, but I could not find a complete
          documentation template for an individual component. That absence became part of the exercise.
          I wrote the Experience Player’s purpose, breakpoints, usage guidance, do’s and don’ts, and its
          two interactions.
        </p>
        <div className="note-definition-grid">
          <div><span className="mono">Use it for</span><p>Features whose value becomes clearer through a short, focused motion preview.</p></div>
          <div><span className="mono">Do</span><p>Maintain contrast, use high-quality video, and give the player enough space to become the focus.</p></div>
          <div><span className="mono">Do not</span><p>Place it in a crowded region or use video where a still image communicates the same thing faster.</p></div>
        </div>
        <ArticleFigure
          src="/images/notes/porsche-design-system/porsche-experience-in-context.webp"
          alt="Assignment page placing the Experience Player inside a Porsche technical specification page"
          caption="Placed inside an existing accordion, the component adds capability without asking the page to learn a new visual language."
          className="note-figure-wide"
        />
      </section>

      <blockquote className="note-pullquote">
        “A design system is not a box of matching parts. It is an agreement about how new decisions should behave.”
      </blockquote>

      <section>
        <h2>What I carried forward</h2>
        <p>
          The exercise made the hidden labor of a mature design system visible. Variants that appear
          effortless in a final interface depend on detailed constraints, naming, responsive behavior,
          and documentation. When one footer variant would not switch cleanly in Figma, the problem was
          not simply the component—it was the absence of guidance for someone encountering it from outside.
        </p>
        <p>
          I left with a stricter standard for extensions: understand the system at multiple scales, reuse
          its primitives, add only the behavior that is missing, test the new piece inside a real page,
          and document enough that the next designer does not have to reverse-engineer the same decisions.
        </p>
      </section>

      <footer className="note-sources">
        <h2>Source material</h2>
        <p>Based on my INFO-I 543 Interaction Design Methods assignment from Spring 2025.</p>
        <ul>
          <li><a href="https://www.porsche.com/usa/" target="_blank" rel="noreferrer">Porsche USA <span aria-hidden="true">↗</span></a></li>
          <li><a href="https://designsystem.porsche.com/v3/" target="_blank" rel="noreferrer">Porsche Design System <span aria-hidden="true">↗</span></a></li>
        </ul>
      </footer>
    </div>
  );
}

export function NoteStory({ slug }: { slug: string }) {
  if (slug === "building-this-portfolio") return <PortfolioWorkflowNote />;
  if (slug === "extending-porsche-design-system") return <PorscheDesignSystemNote />;
  return null;
}
