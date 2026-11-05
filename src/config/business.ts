/**
 * Single source of truth for business information.
 * Only verified details belong here. Leave social URLs empty until the owner supplies them;
 * icons for empty profiles are not rendered.
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

const oneLineAddress = `${address.street}, ${address.city}, ${address.locality}, ${address.region} – ${address.postalCode}`;

export const business = {
  name: 'SSS ASSOCIATE',
  shortName: 'SSS Associate',
  tagline: 'Legal, Property & Financial Services',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sss-associate.vercel.app').replace(/\/$/, ''),
  email: 'sssassociateservices@gmail.com',
  phones: [
    { display: '+91 93859 54338', tel: '+919385954338' },
    { display: '+91 90878 53733', tel: '+919087853733' },
  ],
  whatsapp: {
    number: '919385954338',
    message: 'Hello SSS Associate, I would like to enquire about your services.',
  },
  address,
  oneLineAddress,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `SSS Associate, ${address.street}, ${address.locality}, ${address.city}, ${address.region} ${address.postalCode}`,
  )}`,
  /** Set these to the real profile URLs supplied by the business owner. */
  social: { facebook: '', instagram: '' },
  primaryArea: ['Coi'],
  serviceAreas: ['Chennai', 'Tiruchirappalli', 'Madurai', 'Salem', 'Erode', 'Tiruppur', 'Vellore', 'Tirunelveli', 'Thoothukudi', 'Dindigul', 'Nagercoil', 'Kanchipuram', 'Thanjavur', 'Karur', 'Cuddalore', 'Nagapattinam', 'Ramanathapuram', 'Sivaganga', 'Virudhunagar'],
} as const;

export const whatsappLink = (message: string = business.whatsapp.message) =>
  `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;
export const whatsappPlainLink = `https://wa.me/${business.whatsapp.number}`;
