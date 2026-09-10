import Image from "next/image";
import { PortfolioWorkflowNote } from "@/components/note-portfolio-workflow";

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



function PorscheDesignSystemNote() {
  return (
    <div className="note-story">
      <p className="note-lede">
        For an Interaction Design Methods assignment, I studied Porsche’s public web design system,
        rebuilt a homepage composition from its existing parts, and designed one new component.
        Making something that looks like Porsche is the easy half. The harder half is making
        something new that behaves as though it had been there all along.
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
          principles appeared in the components, but also in the relationships between them: image scale,
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
        “A design system is less a box of matching parts than an agreement about how the next decision should behave.”
      </blockquote>

      <section>
        <h2>What I carried forward</h2>
        <p>
          The exercise made the hidden labor of a mature design system visible. Variants that appear
          effortless in a final interface depend on detailed constraints, naming, responsive behavior,
          and documentation. When one footer variant would not switch cleanly in Figma, the component
          itself was fine. What was missing was any guidance for someone meeting it from the outside.
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
