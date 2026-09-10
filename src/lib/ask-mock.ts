/**
 * Canned answers for design review, so the /ask interface can be used and
 * judged without spending API credit or holding a key.
 *
 * These are hand-written in the voice the system prompt asks for: third person,
 * no em dashes, limitations carried, unknowns admitted. They are a target to
 * design against, not a prediction of what the model will say.
 *
 * Only reachable when ASK_MOCK=1 and NODE_ENV is not production.
 */
type Mock = { match: RegExp; answer: string };

const MOCKS: Mock[] = [
  {
    match: /field maintenance|embassy|battery|batteries|state department/i,
    answer:
      "Atharva was the UX strategist and design consultant on Field Maintenance, a project with the U.S. Department of State between February and June 2025.\n\nHe led the discovery interviews and problem validation, running 45 stakeholder interviews, and helped identify standardisation and battery tracking as the starting point. The Power Apps and Dataverse MVP was co-designed with a multidisciplinary cybersecurity team, so the build was shared rather than his alone.\n\nOne thing worth being precise about: the roughly 40% time saving and 30% cost saving attached to this project are sponsor-derived projections, not measured production outcomes.\n\nThe full case study is at /work/field-maintenance.",
  },
  {
    match: /streaming helper|capstone|what should we watch/i,
    answer:
      "The Streaming Helper capstone reframed the problem rather than solving the one it started with. Streaming was not failing people by offering too little, it was asking for too much decision-making at the end of the day.\n\nAtharva led the research, reframing, interaction design, prototyping, and iterative testing, working from 30 survey responses, 7 interviews, and more than 5 rounds of prototype testing.\n\nOn what did not work: hesitation detection and cross-platform integration were never technically validated in the capstone prototype. They were designed for, not proven. The capstone concept and the later product are deliberately presented as separate tracks for that reason.",
  },
  {
    match: /mead|dementia|caregiver|care/i,
    answer:
      "MEAD was a six-day sponsor-led sprint in May 2025, looking at continuity and care for people living with advanced dementia.\n\nAtharva translated sponsor research and an Epicollect5 audit into the caregiver-facing experience, shaping the care-list, recording, and feedback flows, and contributing across strategy, testing, and visual design. Privacy was treated as an operational constraint rather than a policy note: video is recorded only inside the app, uploaded through a controlled flow, and deleted after transfer.\n\nClinical assessment and algorithm design were outside his scope, so he cannot speak to those parts of the system.",
  },
  {
    match: /salary|compensation|pay|rate|visa|sponsor|work authorisation|work authorization|notice period|available|availability/i,
    answer:
      "That one is best answered by Atharva directly rather than by me. You can reach him through /contact and he will come back to you.",
  },
  {
    match: /research|process|method|how does he work|how he works|enough/i,
    answer:
      "His pattern is to stay close to a problem from the first messy conversations through prototypes, feedback, and implementation, rather than handing off after a research phase.\n\nOn when research is enough: across these projects the trigger is having a reframe he can build against, not a fixed number of interviews. Field Maintenance took 45 interviews to find that the real gap was field logging for non-assets. Streaming Helper needed 30 survey responses and 7 interviews to reach the reframe that the problem was decision cost, not catalogue size.\n\nAs he puts it on the About page, a rationale helps but it does not make a design correct. The people using it get the final vote.",
  },
  {
    match: /python|code|script|weather|recipe|joke|capital of|translate/i,
    answer:
      "I only answer questions about Atharva and his work, so I am not the right tool for that. Happy to talk about any of the three projects, how he works, or his background.",
  },
];

const FALLBACK =
  "That is not something I have on record. This assistant only knows what is published on this site, so if it is not in the case studies or the About page, I would be guessing.\n\nAtharva can answer it directly through /contact.";

export const mockAnswer = (question: string) =>
  MOCKS.find((mock) => mock.match.test(question))?.answer ?? FALLBACK;

export const mockStream = (question: string) => {
  const answer = mockAnswer(question);
  const encoder = new TextEncoder();
  let index = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (index >= answer.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(answer.slice(index, index + 3)));
      index += 3;
      await new Promise((resolve) => setTimeout(resolve, 14));
    },
  });
};
