import type { Faq } from '@/data/faqs';

export interface ServiceContent {
  slug: string;
  /** Appended with " | SSS Associate" by the root title template. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  imageAlt: string;
  intro: string[];
  meaning: string;
  why: string[];
  who: string[];
  situations: string[];
  steps: { title: string; text: string }[];
  documents: string[];
  considerations: string[];
  faqs: Faq[];
  related: string[];
}
