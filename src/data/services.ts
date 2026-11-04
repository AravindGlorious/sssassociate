export type CategoryKey = 'legal' | 'property' | 'financial';

export interface Service {
  slug: string;
  title: string;
  category: CategoryKey;
  summary: string;
}

export interface Category {
  key: CategoryKey;
  title: string;
  path: string;
  intro: string;
}

export const categories: Record<CategoryKey, Category> = {
  legal: {
    key: 'legal',
    title: 'Legal Services',
    path: '/legal-services',
    intro:
      'Legal opinions, document verification, translation and dispute support for property and land matters. Opinions and court representation are provided by appropriately qualified advocates.',
  },
  property: {
    key: 'property',
    title: 'Property Services',
    path: '/property-services',
    intro:
      'Help with the paperwork around buying, selling, registering and regularising property, from document checks to patta, EC and approval-related work.',
  },
  financial: {
    key: 'financial',
    title: 'Financial Services',
    path: '/financial-services',
    intro:
      'Assistance with bank-related disputes, settlement discussions and loan paperwork. Outcomes depend on the lender and the facts of each case.',
  },
};

export const services: Service[] = [
  // Legal
  { slug: 'legal-opinion', title: 'Legal Opinion', category: 'legal', summary: 'A written assessment of a property or document matter, prepared through an appropriately qualified advocate.' },
  { slug: 'panel-advocate-opinion', title: 'Panel Advocate Opinion', category: 'legal', summary: 'Help arranging an opinion from a panel advocate where a bank or institution asks for one.' },
  { slug: 'english-tamil-legal-opinion', title: 'English & Tamil Legal Opinion', category: 'legal', summary: 'Opinions explained in English and Tamil so you can follow the findings in your own language.' },
  { slug: 'agricultural-land-legal-opinion', title: 'Agricultural Land Legal Opinion', category: 'legal', summary: 'Review of the records behind agricultural land before you buy, sell, mortgage or inherit it.' },
  { slug: 'house-site-legal-opinion', title: 'House Site Legal Opinion', category: 'legal', summary: 'Document review for house sites and plots, so title questions surface before a purchase.' },
  { slug: 'property-litigation', title: 'Property Litigation', category: 'legal', summary: 'Coordination and support for property disputes, with court representation by qualified advocates.' },
  { slug: 'litigation-resolution', title: 'Litigation Resolution', category: 'legal', summary: 'Support in exploring ways to settle a dispute, alongside or instead of continuing a case.' },
  { slug: 'old-document-verification', title: 'Old Document Verification', category: 'legal', summary: 'Checking older deeds and records for gaps, mismatches and missing links in the chain of ownership.' },
  { slug: 'legal-document-translation', title: 'Legal Document Translation', category: 'legal', summary: 'Translation of legal and property documents between English and Tamil.' },
  { slug: 'english-to-tamil-translation', title: 'English to Tamil Translation', category: 'legal', summary: 'English legal and property documents rendered into Tamil for easier understanding.' },
  { slug: 'tamil-to-english-translation', title: 'Tamil to English Translation', category: 'legal', summary: 'Tamil deeds and records rendered into English for banks, advocates and other parties.' },
  // Property
  { slug: 'property-opinion', title: 'Property Opinion', category: 'property', summary: 'A document-based review of a property before you commit to buying, selling or lending against it.' },
  { slug: 'property-registration', title: 'Property Registration', category: 'property', summary: 'Guidance and coordination for registering a property transaction.' },
  { slug: 'patta-transfer-registration', title: 'Patta Transfer & Patta Registration', category: 'property', summary: 'Help with applying to update patta records after a transaction or inheritance.' },
  { slug: 'sale-deed-preparation-verification', title: 'Sale Deed Preparation & Verification', category: 'property', summary: 'Drafting support and careful checking of sale deeds before they are signed.' },
  { slug: 'encumbrance-certificate', title: 'Encumbrance Certificate (EC)', category: 'property', summary: 'Help obtaining and reading an Encumbrance Certificate for a property.' },
  { slug: 'patta-chitta-services', title: 'Patta & Chitta Services', category: 'property', summary: 'Help obtaining and checking patta and chitta extracts for land.' },
  { slug: 'property-approval-assistance', title: 'Property Approval Assistance', category: 'property', summary: 'Support with approval-related paperwork for a property or plot.' },
  { slug: 'survey-number-issues', title: 'Survey Number Issues & Solutions', category: 'property', summary: 'Help understanding and resolving survey-number mismatches in land records.' },
  // Financial
  { slug: 'financial-opinion', title: 'Financial Opinion', category: 'financial', summary: 'A considered view of the financial side of a property or loan matter.' },
  { slug: 'bank-litigation-settlement', title: 'Bank Litigation & Settlement', category: 'financial', summary: 'Support when a dispute with a bank has reached, or may reach, legal proceedings.' },
  { slug: 'one-time-settlement', title: 'One Time Settlement (OTS)', category: 'financial', summary: 'Help preparing for and approaching a lender about a one time settlement. Approval rests with the lender.' },
  { slug: 'private-bank-loan-assistance', title: 'Private Loan & Bank Loan Assistance', category: 'financial', summary: 'Help organising documents and understanding the process for bank and private loans.' },
];

export const byCategory = (key: CategoryKey) => services.filter((s) => s.category === key);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
/** Central place to change links when individual service pages are added. */
export const serviceHref = (s: Service) => `/services/${s.slug}`;
