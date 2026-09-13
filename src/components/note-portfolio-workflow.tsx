export function PortfolioWorkflowNote() {
  return (
    <div className="note-story">
      <p className="note-lede">
        This site did not start in Figma. It started in a chat window, with me trying to explain
        what I wanted before I knew what it looked like. A little over a week later it was live.
      </p>

      <aside className="note-thesis">
        <span className="mono">The hard part, named</span>
        <p>The tools get you moving quickly. Then they start pulling toward the average of everything they have seen, and the further in you are, the more reasonable each nudge sounds.</p>
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
        <h2>Into Figma, with the models wired in</h2>
        <p>
          With a theme to work from I moved into Figma and connected it through MCP. That built out
          the bones: the design system, the type and colour decisions, the layout logic, the tokens
          that everything else would inherit.
        </p>
        <p>
          It was fast in a way that still surprises me. It was also where I learned to be careful,
          because a system built that quickly can look finished long before it is actually
          considered.
        </p>
      </section>

      <section>
        <h2>Two models, marking each other&apos;s work</h2>
        <p>
          In code I ran Codex and Claude Code together, and the useful part was not having two
          assistants. It was having each one audit what the other had written. Whichever model had
          not produced the code was better at finding what was wrong with it, because it had no
          investment in the approach.
        </p>
        <p>
          That loop caught a lot before it ever reached me: dead styles, a canvas animation that
          silently stopped after a few minutes, labels that had drifted below a readable size,
          accessible names that no longer matched their visible text. Less broken code arrived at
          my end, so the attention I had left went to whether the thing was any good rather than
          whether it worked.
        </p>
        <p>
          Skills are the part I would not skip. They package a standard into something a model runs
          against its own output, so accessibility, motion performance, metadata, SEO and
          performance all got audited as a matter of course rather than whenever I remembered to
          ask. The same habit applied to the site as a whole, with Lighthouse and SEO passes run
          against real builds instead of assumed.
        </p>
      </section>

      <section>
        <h2>Then into code, where most of it got decided</h2>
        <p>
          Once the basics were chalked out I kept designing in the codebase. Mobbin came back out
          constantly at this stage, not for whole layouts but for specific problems. How does a good
          index row handle its metadata. What does a confirmation state look like when it has to feel
          like a real answer. How much shadow is too much.
        </p>
        <p>
          Most of the work was small: a border that was too hard, a label two pixels too small to
          read properly, motion that looked good in isolation and wrong in sequence.
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
        <h2>The pull toward the middle</h2>
        <p>
          This is the part nobody warned me about, and the part I would tell anyone starting now.
          However sharp the early output is, keep going and the suggestions begin drifting toward
          the safe centre. A cleaner type scale that happens to be the one everywhere else. A hero
          arrangement you have already seen this month. Nothing arrives looking like a mistake,
          which is exactly why it works on you.
        </p>
        <p>
          I think this is where most people give up on the approach or start over by hand, and
          conclude the tools cannot do taste. What actually happened is that the tools were doing
          what they do, and there was nothing firm enough on the other side to push back.
        </p>
        <p>
          So it demanded something I did not expect: a clearer idea of what I wanted than I would
          have needed building this by hand, and the willingness to keep saying no to reasonable
          suggestions. I asked for the original type system back when a replacement made the site
          feel like everyone else&apos;s. I removed an underline treatment I had requested two hours
          earlier because it was fussier than the page needed. I reverted a layout fix that solved
          the measurement and made the section worse.
        </p>
        <p>
          None of that was tidying up after the real work. That was the work.
        </p>
      </section>

      <section>
        <h2>What the tools were genuinely good at</h2>
        <ul className="note-list-block">
          <li><strong>Looking:</strong> surfacing references I would not have found, and explaining what made a composition work.</li>
          <li><strong>Building:</strong> turning an agreed layout into responsive code fast enough that I could judge it in a browser instead of in my head.</li>
          <li><strong>Auditing:</strong> checking each other&apos;s output, then running accessibility, performance and SEO passes against real builds, so a visual tweak did not quietly break a page.</li>
          <li><strong>Remembering:</strong> keeping a build log, so I could tell later why something had been tried and dropped.</li>
        </ul>
      </section>

      <section>
        <h2>What I would keep</h2>
        <p>
          Just over a week from a blank chat window to a live site, and the slowest stretches were
          usage limits rather than anything about the work. The speed is real. It is also the least
          interesting thing here.
        </p>
        <p>
          The part worth keeping is the way of working: write the brief before the interface, look
          widely and early, build fast enough to test, have the models check each other, and hold a
          clear enough picture of what you are making to notice when you are being walked toward
          someone else&apos;s version of it.
        </p>
      </section>
    </div>
  );
}
