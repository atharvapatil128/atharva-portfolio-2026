export function LocationPin({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M15.2 8.1c0 4-5.2 8.2-5.2 8.2S4.8 12.1 4.8 8.1a5.2 5.2 0 1 1 10.4 0Z" />
      <circle cx="10" cy="8" r="1.65" />
    </svg>
  );
}
