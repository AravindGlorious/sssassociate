import { LegalDoc } from '@/components/layout/LegalDoc';
import { business } from '@/config/business';
import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/seo/PageSchema';

const description = 'How SSS Associate collects, uses and protects the name, mobile number, email and message you share through our enquiry form, phone and WhatsApp.';
export const metadata = pageMetadata({ title: 'Privacy Policy | SSS Associate', description, path: '/privacy-policy', fullTitle: true });

export default function Page() {
  return (
    <LegalDoc title="Privacy Policy" intro="How we handle the information you share with us.">
      <PageSchema name="Privacy Policy" description={description} path="/privacy-policy" crumbs={[{ name: 'Privacy Policy', path: '/privacy-policy' }]} />
      <h2>What we collect</h2>
      <p>When you use the enquiry form we collect your name, phone number, optional email address, the service you are interested in and your message. If you contact us by phone, email or WhatsApp, we receive the details you choose to share.</p>
      <h2>How we use it</h2>
      <p>We use these details only to respond to your enquiry and to provide the services you ask about. We do not sell your information.</p>
      <h2>Sharing</h2>
      <p>Enquiries are delivered to us by an email delivery provider. We may share information with qualified advocates or other professionals only as needed for the work you request.</p>
      <h2>Third parties</h2>
      <p>Website fonts are served from this site. If you choose WhatsApp, Google Maps directions or a social link, you leave this site and that service&rsquo;s own privacy policy applies.</p>
      <h2>Your choices</h2>
      <p>You can ask us to correct or delete the details you sent us by writing to <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
    </LegalDoc>
  );
}
