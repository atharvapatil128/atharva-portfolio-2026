export function TelemetryPanel() {
  return (
    <aside className="telemetry-panel">
      <div className="telemetry-head">
        <div><span className="mono">FEEDBACK LOOP / LIVE</span><h2>Current telemetry</h2></div>
        <span className="telemetry-live mono"><i aria-hidden="true" />NOMINAL</span>
      </div>

      <div className="telemetry-trace">
        <div className="trace-key mono"><span><i />RESEARCH</span><span><i />DESIGN</span><span><i />BUILD</span></div>
        <svg viewBox="0 0 620 230" role="img" aria-label="An illustrative feedback loop moving from research through design and building">
          <g className="trace-grid" aria-hidden="true">
            <path d="M0 46H620M0 92H620M0 138H620M0 184H620" />
            <path d="M103 0V230M206 0V230M309 0V230M412 0V230M515 0V230" />
          </g>
          <path className="trace-line trace-research" d="M0 177C46 173 61 148 96 150S149 187 190 166 237 103 281 119 324 169 364 144 410 63 459 76 516 155 620 62" />
          <path className="trace-line trace-design" d="M0 194C45 194 66 171 102 174S154 208 197 185 244 135 283 146 330 182 372 159 418 101 463 112 526 175 620 98" />
          <path className="trace-line trace-build" d="M0 207C50 201 65 187 103 189S155 217 198 200 245 164 287 173 333 202 376 181 420 139 466 144 525 196 620 129" />
          <circle className="trace-marker" cx="459" cy="76" r="5" />
        </svg>
        <div className="trace-stages mono"><span>DISCOVER</span><span>FRAME</span><span>MAKE</span><span>TEST</span></div>
      </div>

      <div className="telemetry-readout">
        <div className="telemetry-primary">
          <span className="mono">ACTIVE BUILD</span>
          <strong>Streaming Helper</strong>
          <p>Research signals moving through product decisions and a shipped beta.</p>
        </div>
        <dl>
          <div><dt>BASE</dt><dd>Indianapolis <small>Relocation open</small></dd></div>
          <div><dt>FOCUS</dt><dd>Product systems <small>Research · interaction · build</small></dd></div>
          <div><dt>OFF TRACK</dt><dd>Karting + trails <small>Fast laps · long runs</small></dd></div>
        </dl>
      </div>
    </aside>
  );
}
