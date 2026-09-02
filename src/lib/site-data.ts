export type ProjectSlug = "streaming-helper" | "mead" | "field-maintenance";

export type Project = {
  slug: ProjectSlug;
  name: string;
  descriptor: string;
  category: string;
  role: string;
  period: string;
  summary: string;
  contribution: string;
  evidence: string[];
  decisions: { title: string; body: string }[];
  outcome: string;
  qualification?: string;
  next?: ProjectSlug;
};

export const projects: Project[] = [
  {
    slug: "streaming-helper",
    name: "Streaming Helper",
    descriptor: "Taking “what should we watch?” from a graduate capstone to a working product.",
    category: "Consumer product · Capstone and product",
    role: "Independent product designer",
    period: "Semester-long capstone · 2026",
    summary:
      "Streaming was not failing people with too little content. It was asking for too much decision-making at the end of the day.",
    contribution:
      "I led the research, reframing, interaction design, prototyping, and iterative testing. The capstone concept and later product are related but intentionally presented as distinct tracks.",
    evidence: ["30 survey responses", "7 interviews", "5+ iterative prototype tests"],
    decisions: [
      {
        title: "Intervene only when support is useful",
        body: "The helper stays quiet during ordinary browsing and becomes available when hesitation appears—or when someone asks for it.",
      },
      {
        title: "Separate choosing from stopping",
        body: "Friend recommendations support an informed choice. Comfort Pick supports the moment when making another choice is the problem.",
      },
      {
        title: "Limit choice on purpose",
        body: "Five recommendations provide variety without rebuilding the catalogue inside the helper.",
      },
    ],
    outcome:
      "The prototype established a clearer support model for low-energy viewing and a measurement plan for time-to-play, abandonment, and confidence.",
    qualification:
      "Hesitation detection and cross-platform integration were not technically validated in the capstone prototype.",
    next: "mead",
  },
  {
    slug: "mead",
    name: "MEAD",
    descriptor: "Exploring continuity, identity, and care for people living with advanced dementia.",
    category: "Care research · Six-day sprint",
    role: "Research, strategy, prototyping, and visual design",
    period: "May 2025",
    summary:
      "Caregivers often cannot tell whether a non-verbal person with advanced dementia is engaged. The existing research workflow collected evidence without giving caregivers enough guidance in return.",
    contribution:
      "I translated sponsor research and an Epicollect5 audit into the caregiver-facing experience, shaping the care-list, recording, and feedback flows while contributing across strategy, testing, and visual design.",
    evidence: ["6-day sponsor-led sprint", "Daily sponsor reviews", "Privacy and UK GDPR constraints"],
    decisions: [
      {
        title: "Return value to the caregiver",
        body: "The redesigned flow connects research capture to behavioral cues, an engagement reading, and suggestions for the next interaction.",
      },
      {
        title: "Make privacy operational",
        body: "Video is recorded only inside the app, uploaded through a controlled flow, and deleted after transfer.",
      },
      {
        title: "Design around a person, not a file",
        body: "A verified care list anchors recording and feedback so each session stays connected to the person and their history.",
      },
    ],
    outcome:
      "A streamlined caregiver-facing mobile prototype covering care-recipient setup, engagement recording, and personalized feedback.",
    qualification: "Clinical assessment and algorithm design were outside my scope.",
    next: "field-maintenance",
  },
  {
    slug: "field-maintenance",
    name: "Field Maintenance",
    descriptor: "Designing a clearer maintenance workflow with input from 40+ embassy stakeholders.",
    category: "Enterprise operations · U.S. Department of State",
    role: "UX strategist and design consultant",
    period: "February–June 2025",
    summary:
      "Embassy engineers recorded maintenance information on paper or from memory, then re-entered it later. The overlooked gap was secure, proactive field logging for non-assets such as batteries.",
    contribution:
      "I led discovery interviews and problem validation, helped identify standardization and battery tracking as the starting point, and co-designed the Power Apps MVP with a multidisciplinary cybersecurity team.",
    evidence: ["45 stakeholder interviews", "Power Apps and Dataverse MVP", "Active pilot planning"],
    decisions: [
      {
        title: "Invalidate the first concept",
        body: "Testing showed that a mobile work-order concept duplicated an existing system without solving the field-recording gap.",
      },
      {
        title: "Start with overlooked non-assets",
        body: "Battery checks created a concrete entry point for standardized field records and future maintenance planning.",
      },
      {
        title: "Work inside approved infrastructure",
        body: "Power Apps and Dataverse made the MVP viable under embassy security restrictions that ruled out most commercial tools.",
      },
    ],
    outcome:
      "A functional mobile-first checklist MVP that standardizes field data and creates a longitudinal maintenance record.",
    qualification:
      "Approximately 40% time savings and 30% cost savings are sponsor-derived projections, not measured production outcomes.",
    next: "streaming-helper",
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const notes = [
  {
    type: "Process note",
    date: "Aug 2026",
    title: "Building this portfolio with an AI-assisted workflow",
    description: "Decisions, misses, and the system behind the finished site.",
    slug: "building-this-portfolio",
  },
  {
    type: "Field note",
    date: "Planned",
    title: "What karting taught me about product feedback",
    description: "Fast loops, clean signals, and knowing when grip is gone.",
    slug: "karting-and-feedback",
  },
] as const;
