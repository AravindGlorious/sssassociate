'use client';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  return (
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold text-gold transition hover:bg-gold hover:text-navy">
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
