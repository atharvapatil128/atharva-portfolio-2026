import Link from "next/link";

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="detail-back mono" href={href}>
      <svg viewBox="0 0 18 18" aria-hidden="true">
        <path d="M15 9H3M8 4 3 9l5 5" />
      </svg>
      <span>{children}</span>
    </Link>
  );
}
