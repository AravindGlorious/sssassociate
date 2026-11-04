import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import './globals.css';
import { business } from '@/config/business';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: `${business.shortName} – ${business.tagline} in Coimbatore`, template: `%s | ${business.shortName}` },
  description: 'Professional assistance for property documentation, legal opinions, registration support and financial settlement matters in Irugur, Coimbatore.',
  formatDetection: { telephone: false },
  applicationName: business.shortName,
  robots: { index: true, follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  openGraph: { siteName: business.shortName, locale: 'en_IN', type: 'website' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#101D35' };

export default function RootLayout({ children }: { children: ReactNode }) {
  // One preload per font file (React de-duplicates and places these in <head>).
  preload('/fonts/inter-latin-wght-normal.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  preload('/fonts/playfair-display-latin-wght-normal.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  return (
    <html lang="en-IN">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">Skip to main content</a>
        <TopBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <aside aria-label="WhatsApp enquiry"><WhatsAppButton /></aside>
      </body>
    </html>
  );
}
