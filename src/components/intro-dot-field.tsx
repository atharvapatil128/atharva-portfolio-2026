import { DotField } from "./dot-field";

export function IntroDotField({ variant }: { variant: "about" | "contact" | "notes" | "resume" }) {
  return <DotField className={`intro-dot-field intro-dot-field--${variant}`} variant="intro" seed={37} />;
}
