
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

const siteUrl = business.url.replace(/\/+$/, '');

const seoTitle =
  'Legal & Documentation Services in Coimbatore | SSS Associate';

const seoDescription =
  'Get assistance with property document checks, land records, registration procedures and financial documentation from SSS Associate in Coimbatore.';

const socialImage = `${siteUrl}/images/og-sss-associate.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),

  title: {
    default: seoTitle,
    template: `%s | ${business.shortName}`,
  },

  description: seoDescription,

  alternates: {
    canonical: '/',
  },

  formatDetection: {
    telephone: false,
  },

  applicationName: business.shortName,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),

  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: siteUrl,
    siteName: business.shortName,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'SSS Associate Services',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    images: [socialImage],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101D35',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Preload local fonts for better loading performance.
  preload('/fonts/inter-latin-wght-normal.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  });

  preload('/fonts/playfair-display-latin-wght-normal.woff2', {
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  });

  return (
    <html lang="en-IN">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>

      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to main content
        </a>

        <TopBar />
        <Header />

        <main id="main">{children}</main>

        <Footer />

        <aside aria-label="WhatsApp enquiry">
          <WhatsAppButton />
        </aside>
      </body>
    </html>
  );
}