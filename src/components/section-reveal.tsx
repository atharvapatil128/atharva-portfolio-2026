/** Editorial content stays visible during hydration and scrolling. */
export function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
