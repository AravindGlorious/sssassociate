
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
      'Get assistance with legal documentation, record checks, translation and dispute-related processes. Legal advice and court representation are handled by appropriately qualified advocates.',
  },

  property: {
    key: 'property',
    title: 'Land & Registration Services',
    path: '/property-services',
    intro:
      'Support with buying, selling and registering land or buildings, including deed checks, patta updates, EC requests and related paperwork.',
  },

  financial: {
    key: 'financial',
    title: 'Financial Services',
    path: '/financial-services',
    intro:
      'Assistance with bank documentation, loan-related matters and settlement discussions. All decisions and approvals remain with the relevant lender.',
  },
};

export const services: Service[] = [
  // Legal Services
  {
    slug: 'legal-opinion',
    title: 'Legal Opinion',
    category: 'legal',
    summary:
      'Understand the legal position of a document or land-related matter through an assessment prepared by an appropriately qualified advocate.',
  },
  {
    slug: 'panel-advocate-opinion',
    title: 'Panel Advocate Opinion',
    category: 'legal',
    summary:
      'Assistance in coordinating an opinion from a panel advocate when a bank or financial institution requests one.',
  },
  {
    slug: 'english-tamil-legal-opinion',
    title: 'English & Tamil Legal Opinion',
    category: 'legal',
    summary:
      'Understand legal findings more clearly with opinions explained in English or Tamil by an appropriately qualified advocate.',
  },
  {
    slug: 'agricultural-land-legal-opinion',
    title: 'Agricultural Land Legal Opinion',
    category: 'legal',
    summary:
      'Review relevant land records before an agricultural land purchase, sale, mortgage or inheritance.',
  },
  {
    slug: 'house-site-legal-opinion',
    title: 'House Site Legal Opinion',
    category: 'legal',
    summary:
      'Have relevant records reviewed for a house site or plot before proceeding with a transaction.',
  },
  {
    slug: 'property-litigation',
    title: 'Property Litigation',
    category: 'legal',
    summary:
      'Documentation and coordination support for land-related disputes, with court representation handled by qualified advocates.',
  },
  {
    slug: 'litigation-resolution',
    title: 'Litigation Resolution',
    category: 'legal',
    summary:
      'Explore possible ways to resolve a dispute, including settlement discussions and other appropriate legal steps.',
  },
  {
    slug: 'old-document-verification',
    title: 'Old Document Verification',
    category: 'legal',
    summary:
      'Review older deeds and records to identify missing details, inconsistencies and gaps in ownership history.',
  },
  {
    slug: 'legal-document-translation',
    title: 'Legal Document Translation',
    category: 'legal',
    summary:
      'Translation assistance for legal and official documents between Tamil and English.',
  },
  {
    slug: 'english-to-tamil-translation',
    title: 'English to Tamil Translation',
    category: 'legal',
    summary:
      'Translate relevant English documents into Tamil to make their contents easier to understand.',
  },
  {
    slug: 'tamil-to-english-translation',
    title: 'Tamil to English Translation',
    category: 'legal',
    summary:
      'Translate Tamil deeds and records into English for review by banks, advocates and other relevant parties.',
  },

  // Land and Registration Services
  {
    slug: 'property-opinion',
    title: 'Property Opinion',
    category: 'property',
    summary:
      'Arrange a document-based assessment before buying, selling or using land or a building as loan security.',
  },
  {
    slug: 'property-registration',
    title: 'Property Registration',
    category: 'property',
    summary:
      'Guidance and coordination for the paperwork and procedures involved in registering a transaction.',
  },
  {
    slug: 'patta-transfer-registration',
    title: 'Patta Transfer & Registration',
    category: 'property',
    summary:
      'Assistance with applications to update patta records following a sale, transfer or inheritance.',
  },
  {
    slug: 'sale-deed-preparation-verification',
    title: 'Sale Deed Preparation & Verification',
    category: 'property',
    summary:
      'Support with preparing and reviewing sale deed details before the document is signed.',
  },
  {
    slug: 'encumbrance-certificate',
    title: 'Encumbrance Certificate (EC)',
    category: 'property',
    summary:
      'Assistance with obtaining and understanding an Encumbrance Certificate and the transaction details it contains.',
  },
  {
    slug: 'patta-chitta-services',
    title: 'Patta & Chitta Services',
    category: 'property',
    summary:
      'Help obtaining and reviewing patta and chitta records to understand the recorded land details.',
  },
  {
    slug: 'property-approval-assistance',
    title: 'Approval Documentation Assistance',
    category: 'property',
    summary:
      'Guidance with collecting and organising paperwork related to applicable land or building approvals.',
  },
  {
    slug: 'survey-number-issues',
    title: 'Survey Number Issues',
    category: 'property',
    summary:
      'Assistance in understanding differences or inconsistencies in survey numbers across land records.',
  },

  // Financial Services
  {
    slug: 'financial-opinion',
    title: 'Financial Opinion',
    category: 'financial',
    summary:
      'Review the financial aspects of a loan or transaction to better understand the available information and next steps.',
  },
  {
    slug: 'bank-litigation-settlement',
    title: 'Bank Litigation & Settlement',
    category: 'financial',
    summary:
      'Documentation and coordination assistance for bank-related disputes and settlement discussions.',
  },
  {
    slug: 'one-time-settlement',
    title: 'One Time Settlement (OTS)',
    category: 'financial',
    summary:
      'Help organise documents and approach a lender about a possible one-time settlement. The lender decides whether to approve it.',
  },
  {
    slug: 'private-bank-loan-assistance',
    title: 'Private & Bank Loan Assistance',
    category: 'financial',
    summary:
      'Assistance with organising paperwork and understanding the steps involved in bank or private loan matters.',
  },
];

export const byCategory = (key: CategoryKey) =>
  services.filter((service) => service.category === key);

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

/** Central place to change links when individual service pages are added. */
export const serviceHref = (service: Service) =>
  `/services/${service.slug}`;