import { business } from '@/config/business';

export function FacebookIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.900 11.900v-8.400H7.100V12h3V9.400c0-3 1.800-4.700 4.500-4.700 1.300 0 2.700.2 2.700.2v3h-1.500c-1.500 0-2 .9-2 1.900V12h3.400l-.5 3.500h-2.900v8.400A12 12 0 0 0 24 12z" />
    </svg>
  );
}

export function InstagramIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset=".25" stopColor="#FA7E1E" />
          <stop offset=".5" stopColor="#D62976" />
          <stop offset=".75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#ig-grad)" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5.500" />
        <circle cx="12" cy="12" r="4.200" />
      </g>
      <circle cx="17.400" cy="6.600" r="1.300" fill="url(#ig-grad)" />
    </svg>
  );
}

export function WhatsAppGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm0 18.200c-1.500 0-3-.4-4.200-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.200-.3.200-.5.100-1.300-.6-2.200-1.200-3-2.700-.2-.4.200-.4.600-1.200.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.100-.7.300-.8.800-1.100 1.700-.8 2.900.3 1.100 1.100 2.100 2.600 3.400 1.800 1.600 3.100 2 4 2.200.9.200 1.800 0 2.400-.5.400-.4.600-1 .5-1.500 0-.2-.2-.3-.4-.4z" />
    </svg>
  );
}

/** Renders only the profiles that have a URL configured in config/business.ts. */
export function SocialLinks({ className = '' }: { className?: string }) {
  const { facebook, instagram } = business.social;
  const badge = 'inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow transition hover:-translate-y-0.5 hover:shadow-lg';
  if (!facebook && !instagram) return null;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {facebook && (
        <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="SSS Associate on Facebook (opens in a new tab)" className={badge}>
          <FacebookIcon />
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="SSS Associate on Instagram (opens in a new tab)" className={badge}>
          <InstagramIcon />
        </a>
      )}
    </div>
  );
}
