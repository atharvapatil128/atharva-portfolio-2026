export function PortfolioWorkflowNote() {
  return (
    <div className="note-story">
      <p className="note-lede">
        This site did not start in Figma. It started in a chat window, with me trying to explain
        what I wanted before I knew what it looked like.
      </p>

      <aside className="note-thesis">
        <span className="mono">What actually happened</span>
        <p>Five tools, in order. Each one handed something to the next, and the real decisions kept landing on me.</p>
      </aside>

      <section>
        <h2>Starting with words instead of screens</h2>
        <p>
          I opened ChatGPT and gave it everything I had. Sites I liked and why. What the portfolio
          needed to do for someone skimming it between meetings. Who I am, what I am drawn to, the
          kind of work I want next. Less of a prompt, more of a long brief written out loud.
        </p>
        <p>
          Writing it down was useful before anything visual existed. It forced me to say what the
          site was for, which later became the thing I measured every idea against.
        </p>
      </section>

      <section>
        <h2>Letting it go looking on Mobbin</h2>
        <p>
          Then I asked it to pull references from Mobbin and come back with directions rather than
          a single answer. That is where the first real theme appeared: the warm porcelain field,
          the soft-black type, the idea that the page should feel calm and instrumented instead of
          loud.
        </p>
        <p>
          I would not have landed there by browsing on my own. I would have picked whatever looked
          impressive that week.
        </p>
      </section>

      <section>
        <h2>Into Figma, with Codex wired in</h2>
        <p>
          With a theme to work from I moved into Figma and connected Codex through MCP. That
          combination built out the bones: the design system, the type and colour decisions, the
          layout logic, the tokens that everything else would inherit.
        </p>
        <p>
          It was fast in a way that still surprises me. It was also where I learned to be careful,
          because a system built that quickly can look finished long before it is actually
          considered.
        </p>
      </section>

      <section>
        <h2>Then into code, where most of it got decided</h2>
        <p>
          Once the basics were chalked out I moved into the codebase and kept designing there. Mobbin
          came back out constantly at this stage, not for whole layouts but for specific problems.
          How does a good index row handle its metadata. What does a confirmation state look like
          when it has to feel like a real answer. How much shadow is too much.
        </p>
        <p>
          I kept adjusting until the thing held together. Most of that was small: a border that was
          too hard, a label two pixels too small to read properly, motion that looked good in
          isolation and wrong in sequence.
        </p>
        <p>
          Some of it was not small. The desk in the homepage hero started life as one generated
          image, and it fell apart the moment it was scaled across the width of the page. I rebuilt
          it from five separately exported objects, lit to match, each one displayed well below its
          native size. That is the kind of problem you only find by putting the thing on a screen
          and looking at it properly.
        </p>

        <ul className="note-decision-ledger" aria-label="Three things I got wrong first">
          <li>
            <span className="mono">Repeated the next section</span>
            <h3>The homepage opened with an interactive stack that led to the same three projects listed right below it.</h3>
            <p>I swapped it for one shipped product, so actual work shows up before any scrolling.</p>
          </li>
          <li>
            <span className="mono">Motion got in the way</span>
            <h3>Per-element reveals made text flicker and the scroll feel unsteady.</h3>
            <p>Content now starts visible, and the motion that survived is short and skippable.</p>
          </li>
          <li>
            <span className="mono">Polish drifted</span>
            <h3>Each new section quietly invented its own type sizes, shadows and spacing.</h3>
            <p>I pulled it back into tokens and wrote down one light source, one type scale, one job for orange.</p>
          </li>
        </ul>
      </section>

      <blockquote className="note-pullquote">
        “The tools were quick at producing options. Deciding which ones were any good stayed slow, and stayed mine.”
      </blockquote>

      <section>
        <h2>What the tools were genuinely good at</h2>
        <ul className="note-list-block">
          <li><strong>Looking:</strong> surfacing references I would not have found, and explaining what made a composition work.</li>
          <li><strong>Building:</strong> turning an agreed layout into responsive code fast enough that I could judge it in a browser instead of in my head.</li>
          <li><strong>Catching drift:</strong> finding the duplicated styles, undersized labels and conflicting shadows that crept in as the site grew.</li>
          <li><strong>Checking:</strong> running builds, type checks and route checks after changes, so a visual tweak did not quietly break a page.</li>
          <li><strong>Remembering:</strong> keeping a build log, so I could tell later why something had been tried and dropped.</li>
        </ul>
      </section>

      <section>
        <h2>Where I kept taking the wheel</h2>
        <p>
          I asked for the original type system back when a new one made the site feel like everyone
          else&apos;s. I removed an underline treatment I had asked for two hours earlier because it
          was fussier than the page needed. I reverted a layout fix that solved the measurement and
          made the section worse.
        </p>
        <p>
          None of that was tidying up after the real work. That was the work. The tools widened the
          field and shortened the distance to something I could look at. Deciding what stayed was
          the part that took judgement, and it never moved.
        </p>
      </section>

      <section>
        <h2>What I would keep</h2>
        <p>
          The site is one output. The more useful one is the way of working: write the brief before
          the interface, look widely and early, build fast enough to test, and keep a record so
          today&apos;s decision can be argued with tomorrow.
        </p>
      </section>
    </div>
  );
}
