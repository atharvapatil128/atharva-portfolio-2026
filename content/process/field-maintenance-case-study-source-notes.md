# Field Maintenance case-study source notes

Working evidence map for the portfolio case study. This is not polished public copy.

## Sources reviewed

- Portfolio composition: Figma frame `71:181`, “Field Maintenance — Desktop / Baseline.”
- Original challenge brief: `DS-54 Enhancing Field Maintenance Efficiency: A Mobile Solution for Diplomatic Security Operations`, two pages.
- Final pitch deck: `IFI PPT.pdf`, 24 pages.
- Functional product source: local `Power Maintenance.msapp` and packaged Power Apps solution.
- Existing product mockup: `Innovation For Impact_ DS 54.png`.
- Previous public case study: `https://atharvapatil.net/project3/`.
- Final media set supplied September 6, 2026: context video, iteration sheet, final end-to-end flow, individual Power Apps screens, mission/value canvases, and supporting cover artwork.

## Claims supported by the challenge brief

- The sponsoring organization was the U.S. Department of State Bureau of Diplomatic Security.
- Security Engineering Officers and technicians relied on memory or handwritten notes before entering maintenance data later.
- The operating environment required secure storage, role-based access, compatibility with approved devices, and support for constrained connectivity.
- IBM Maximo was the existing asset and maintenance system named in the brief.
- Standardized digital forms and accessible technical guidance were proposed directions, not measured outcomes.

## Claims supported by the pitch deck, portfolio Figma frame, and local product source

- The pitch deck reports 45 stakeholder interviews and identifies standardization as the most important issue in the process.
- Battery tracking stood out as a common pain point; batteries were often not tracked because they fell below the $500 asset threshold.
- Technicians could identify problems late and submit work orders or order parts only after arriving at a post.
- The product scope focused on post and location selection, on-site asset visibility, and structured maintenance data including voltage, serial numbers, and comments.
- The team produced a functional mobile MVP using Power Apps and Dataverse.
- The app source contains post and location selection, asset search, battery status flags, voltage and date fields, comments, save behavior, and a work-order handoff action.
- Validation with the primary beneficiary and multiple SEOs led to active interest in a pilot and continued rollout conversations.
- Approved public feedback: “I really hope we can get this done and continue development of more apps based on the refined interface.” — Officer-in-Charge, Engineering Services Office, U.S. Embassy Vienna.

## Evidence boundaries used in the page

- Use “45 stakeholder interviews,” as reported in the final pitch deck.
- Describe the product as a functional MVP, not a deployed global system.
- Do not claim IBM Maximo integration was completed at production scale.
- Treat offline synchronization, adoption, longitudinal data quality, and pilot performance as future validation work.
- Label the deck's approximately 40% time reduction and 30% cost reduction as estimates, not measured production results.
- Treat the requested $12,000, 1–2 software developers, integration, and pilot rollout as the proposed next phase, not completed work.
- Do not expose operationally sensitive locations, system details, or real maintenance records beyond the already approved public artifacts.

## Final media placement

- Hero: layered post-selection, attention-state, and maintenance-entry screens.
- Field context: eight-second `Outdated_Tools_Hinder_Security_Maintenance.mp4` loop.
- Iteration evidence: early screens, paper sketch, and revised attention-state list.
- Final product: full end-to-end flow with expandable full-resolution inspection.
- The Mission Model and Value Proposition canvases remain source evidence rather than additional public sections; the older page became repetitive when both frameworks interrupted the product story.
