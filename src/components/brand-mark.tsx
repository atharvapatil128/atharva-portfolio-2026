export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 24 12.2 8h4.1L9.2 24H5Z" fill="currentColor" />
      <path d="M15.2 8h5.6C25.3 8 28 10.5 28 14.4S25.2 21 20.6 21h-4.1l1.7-3.7h2.5c2 0 3.2-1 3.2-2.8 0-1.7-1.1-2.7-3.1-2.7h-7.2L15.2 8Z" fill="currentColor" />
      <circle cx="25.4" cy="24.1" r="2.1" fill="var(--signal)" />
    </svg>
  );
}
