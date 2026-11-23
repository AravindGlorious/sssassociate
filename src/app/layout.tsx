import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

import { business } from '@/config/business';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

const siteUrl = business.url.replace(/\/+$/, '');
const gaId = process.env.NEXT_PUBLIC_GA_ID;

const seoTitle =
  'Property Document Support in Tamil Nadu | SSS Associate';

const seoDescription =
  'Property document checks, land records and registration support in Coimbatore and across Tamil Nadu. Contact SSS Associate Services.';

const socialImage = `${siteUrl}/images/og-sss-associate.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),

  title: {
    default: seoTitle,
    template: `%s | ${business.shortName}`,
  },

  description: seoDescription,

  // Each page defines its own canonical URL using pageMetadata().

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
    url: `${siteUrl}/`,
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

  preload('/images/property-document-services-tamil-nadu.jpg', {
    as: 'image',
  });

  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
      </head>

      <body id="top">
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

        <WhatsAppButton />

        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}