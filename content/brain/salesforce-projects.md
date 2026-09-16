# The two Salesforce studio projects

Two separate HCI/d studio projects done with Salesforce as the sponsor. They are
not on the portfolio site as case studies, so this note is the only record of
them. Neither is a shipped product: both are concept and prototype work done in
a university studio, and answers must not imply otherwise.

Do not confuse them with each other, and do not confuse either with Streaming
Helper, MEAD, or Field Maintenance.

## Salesforce Marketing Cloud, "BrainForce", Fall 2024

An IUB HCI/d studio team project of eight students. The team asked how small and
medium businesses could capture an idea and turn it into a marketing campaign
without a marketing department, since the processes that make a campaign work in
a large enterprise assume a creative team, a content team, and a communications
team that a small business does not have.

The concept was BrainForce, an app built around capturing inspiration and
turning it into an email campaign. Its parts were capturing notes, an AI scan
that could pull content from something the user photographed, saving trending
inspirations, and generating the assembled email. The team worked from a persona
called Ram, the owner of a newly opened ice cream shop with no marketing team, a
small budget, and no clear line from a business goal to a campaign.

The process ran from competitor analysis through early sketches to concept
testing with Salesforce experts, who critiqued the work for relevance and
usability, and the feedback shaped the features.

**Limits.** It is a concept, not a released product. The prototype covered
planning a campaign. Creating campaigns alongside planning, team collaboration
features, and desktop support were all named as future scope, which means they
were not built.

## Salesforce Sustainability, "Clover", INFO I590 HCI/d Studio Practice

A six-person team: Anvesha Gawade, Arathi Pallath, Arjun Raghavan
Venkatraghavan, Atharva Patil, Effy Banach, Samiksha Pawar.

The question was how to get Salesforce employees taking sustainable actions
inside their daily workflow without interrupting it. The team grounded this in
behavioural science, using the BJ Fogg Behavior Model, COM-B, and
self-determination theory, then narrowed from a wider set of ideas to energy
consumption in digital work practices, meaning the energy behind emails, video
calls, and cloud storage rather than office lighting.

Primary research was a survey that drew 21 responses from Salesforce and other
corporate employees, and semi-structured interviews with corporate
professionals, of which the documentation records two. The finding that shaped
the design was that people treat sustainability as a mindset rather than a
measurable practice, that time pressure reliably overrides it, and that
employees were unaware their everyday digital actions carried any environmental
cost at all.

The result was Clover, a translucent widget that sits in the corner of the
screen and stays silent until it detects a trigger. It turns green when there is
an action worth taking and blue when a weekly impact summary is ready. Every
notification category is switchable, so a manager can turn off nudges during
meetings while a junior engineer leaves them on. Rather than force an action, it
shows the impact the action would have.

The team defined six reusable design patterns rather than a single feature:
embedded nudges woven into existing interfaces, passive nudges during an action,
active nudges before a high-power decision, and impact framing, which translates
kilowatt-hours into everyday equivalents like minutes of projector time, because
the research showed people do not relate to energy units.

**Limits, and state these when discussing what Clover proved.**

- User testing was informal, and the documentation is explicit that the goal was
  not to validate a final solution but to check whether the interaction model
  read as understandable and non-disruptive.
- Clover is a design framework and pattern system, not a single one-stop
  feature. The team said so directly.
- Whether nudges change behaviour over the long term is an open question the
  project did not answer.
- Some capabilities, such as hooks that fire before a file upload, could only
  realistically be built by the platform vendors themselves.
- The dashboard was designed at the employee level. Team-level views were future
  scope.
- The team deliberately kept AI out of the core system, reasoning that AI
  consumes significant energy while optimising for saving it. That was a
  decision, not an oversight, and faculty and sponsors suggested AI as a future
  extension rather than a gap.

## Not established

Say these are not established rather than inferring an answer:

- **What Atharva personally did on either project.** Both documents credit the
  team without breaking down individual contributions. This is the most
  important gap in this note: a recruiter asking what he owned must be told it
  is not recorded here and pointed to /contact, never given a guess based on
  what he did on other projects.
- The dates of the Sustainability project, and whether the two ran in the same
  academic year.
- Any outcome after the studio ended: whether Salesforce adopted, built, or
  piloted anything from either project.
- The names or roles of the Salesforce experts and sponsors involved.
- Any metric of effect. Neither project measured emissions saved, campaigns
  created, or behaviour changed.
