'use client';

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold text-base font-semibold text-gold transition hover:bg-gold hover:text-navy"
    >
      ↑
    </button>
  );
}