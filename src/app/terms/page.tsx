import Link from 'next/link';
import { LegalDoc } from '@/components/layout/LegalDoc';
import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/seo/PageSchema';

const description = 'Terms for using the SSS Associate website in Coimbatore and enquiring about our legal, property and financial assistance services. No outcomes are guaranteed.';
export const metadata = pageMetadata({ title: 'Terms & Conditions | SSS Associate', description, path: '/terms', fullTitle: true });

export default function Page() {
  return (
    <LegalDoc title="Terms & Conditions" intro="Terms for using this website.">
      <PageSchema name="Terms & Conditions" description={description} path="/terms" crumbs={[{ name: 'Terms & Conditions', path: '/terms' }]} />
      <h2>Use of this website</h2>
      <p>The information here is provided for general guidance. Please read our <Link href="/disclaimer">Disclaimer</Link>. Using this website or sending an enquiry does not create an advocate–client relationship or a commitment to provide services.</p>
      <h2>Services</h2>
      <p>The scope, fees and timelines for any service are agreed with you individually before work begins. We do not guarantee outcomes or approvals.</p>
      <h2>Accuracy</h2>
      <p>We take care to keep content accurate, but laws, procedures and fees change. Please confirm current requirements with us before acting.</p>
      <h2>Intellectual property</h2>
      <p>Website content and branding belong to SSS Associate and may not be copied without permission.</p>
      <p><em>These terms should be reviewed by the business owner and a qualified advisor before launch.</em></p>
    </LegalDoc>
  );
}
