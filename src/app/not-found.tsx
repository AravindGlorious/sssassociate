import Link from 'next/link';
import type { Metadata } from 'next';

// Overrides the site-wide "index, follow" so the 404 page never carries a conflicting directive.
export const metadata: Metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="wrap py-24 text-center">
      <p className="font-semibold text-gold">404</p>
      <h1 className="mt-2 text-4xl font-bold text-navy">We couldn&rsquo;t find that page</h1>
      <p className="mt-4 text-muted">The page may have moved. Try the homepage or our services.</p>
      <div className="mt-8 flex justify-center gap-4"><Link href="/" className="btn">Go to Home</Link><Link href="/services" className="btn btn-dark">Our Services</Link></div>
    </section>
  );
}
