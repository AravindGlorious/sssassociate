
/**
 * Single source of truth for business information.
 * Only verified business details should be stored here.
 * Add social URLs only after they are confirmed.
 */

const address = {
  street: '9, Gandhi Nagar',
  locality: 'Irugur',
  city: 'Coimbatore',
  region: 'Tamil Nadu',
  postalCode: '64110',
  country: 'India',
  countryCode: 'IN',
};

const oneLineAddress =
  `${address.street}, ${address.locality}, ${address.city}, ${address.region} – ${address.postalCode}`;

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://sssassociate.org'
).replace(/\/+$/, '');

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
    facebook: '',
    instagram: '',
  },

  primaryArea: ['Coimbatore'],

  serviceAreas: [
    'Chennai',
    'Tiruchirappalli',
    'Madurai',
    'Salem',
    'Erode',
    'Tiruppur',
    'Vellore',
    'Tirunelveli',
    'Thoothukudi',
    'Dindigul',
    'Nagercoil',
    'Kanchipuram',
    'Thanjavur',
    'Karur',
    'Cuddalore',
    'Nagapattinam',
    'Ramanathapuram',
    'Sivaganga',
    'Virudhunagar',
  ],
} as const;

export const whatsappLink = (
  message: string = business.whatsapp.message
) =>
  `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const whatsappPlainLink =
  `https://wa.me/${business.whatsapp.number}`;
