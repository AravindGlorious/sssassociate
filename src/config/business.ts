
/**
 * Single source of truth for business information.
 * Only verified business details should be stored here.
 */

const address = {
  street: '9, Gandhi Nagar',
  locality: 'Irugur',
  city: 'Coimbatore',
  region: 'Tamil Nadu',
  postalCode: '641103',
  country: 'India',
  countryCode: 'IN',
};

const oneLineAddress =
  `${address.street}, ${address.locality}, ${address.city}, ${address.region} – ${address.postalCode}`;

// Primary website domain. Use this consistently for SEO and canonical URLs.
const siteUrl = 'https://www.sssassociate.org';

export const business = {
  name: 'SSS ASSOCIATE',
  shortName: 'SSS Associate',
  tagline: 'Legal, Documentation & Financial Services',

  url: siteUrl,

  email: 'sssassociateservices@gmail.com',

  phones: [
    { display: '+91 93859 54338', tel: '+919385954338' },
    { display: '+91 90878 53733', tel: '+919087853733' },
  ],

  whatsapp: {
    number: '919385954338',
    message:
      'Hello SSS Associate, I would like to enquire about your services.',
  },

  address,
  oneLineAddress,

  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `SSS Associate, ${address.street}, ${address.locality}, ${address.city}, ${address.region} ${address.postalCode}, India`
  )}`,

  social: {
    facebook: 'https://www.facebook.com/sundaramsuresh.sundaramsuresh',
    instagram: 'https://www.instagram.com/sssassociatecbe/',
  },

  // Physical business location.
  primaryArea: ['Coimbatore'],

  // Service coverage across the entire state.
  serviceAreas: ['Tamil Nadu'],
} as const;

export const whatsappLink = (
  message: string = business.whatsapp.message
) =>
  `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const whatsappPlainLink =
  `https://wa.me/${business.whatsapp.number}`;