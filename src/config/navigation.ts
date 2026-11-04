import { byCategory, categories, serviceHref } from '@/data/services';

export interface NavItem { label: string; href: string; children?: { label: string; href: string }[] }

const serviceLinks = (key: 'legal' | 'property' | 'financial') =>
  byCategory(key).map((s) => ({ label: s.title, href: serviceHref(s) }));

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Our Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: categories.legal.title, href: categories.legal.path },
      { label: categories.property.title, href: categories.property.path },
      { label: categories.financial.title, href: categories.financial.path },
    ],
  },
  { label: 'Property Services', href: categories.property.path, children: serviceLinks('property') },
  { label: 'Legal Services', href: categories.legal.path, children: serviceLinks('legal') },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

export const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Contact Us', href: '/contact' },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

/** Footer "Our Services" column. */
export const footerServices = [
  { label: 'Legal Opinion', slug: 'legal-opinion' },
  { label: 'Property Opinion', slug: 'property-opinion' },
  { label: 'Property Registration', slug: 'property-registration' },
  { label: 'Patta & Chitta Services', slug: 'patta-chitta-services' },
  { label: 'Sale Deed Verification', slug: 'sale-deed-preparation-verification' },
  { label: 'EC Services', slug: 'encumbrance-certificate' },
  { label: 'Financial Assistance', slug: 'financial-opinion' },
  { label: 'Bank Settlement & OTS', slug: 'one-time-settlement' },
];
