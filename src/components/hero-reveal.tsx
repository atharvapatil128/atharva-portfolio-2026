import { SectionReveal } from "./section-reveal";

export function HeroReveal({ children }: { children: React.ReactNode }) {
  return <SectionReveal className="t-stagger">{children}</SectionReveal>;
}
