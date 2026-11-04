import { LegalDoc } from '@/components/layout/LegalDoc';
import { pageMetadata } from '@/lib/seo';
import { PageSchema } from '@/components/seo/PageSchema';

const description = 'Important limits on SSS Associate’s information and services: no guaranteed outcomes, opinions only through qualified advocates, requirements set case by case.';
export const metadata = pageMetadata({ title: 'Legal Disclaimer | SSS Associate', description, path: '/disclaimer', fullTitle: true });

export default function Page() {
  return (
    <LegalDoc title="Disclaimer" intro="Please read this before relying on any information on this website.">
      <PageSchema name="Disclaimer" description={description} path="/disclaimer" crumbs={[{ name: 'Disclaimer', path: '/disclaimer' }]} />
      <p>The content on this website is general information. It is not legal, financial or professional advice and does not create an advocate–client relationship.</p>
      <h2>Legal opinions and representation</h2>
      <p>Legal opinions and representation are provided by appropriately qualified advocates where applicable. SSS Associate assists with documents, coordination and communication around that work.</p>
      <h2>No guarantees</h2>
      <p>We do not guarantee any legal outcome, court decision, government approval, loan approval or settlement approval. These depend on the facts, the documents and the decisions of the relevant authorities and institutions.</p>
      <h2>Requirements vary</h2>
      <p>Document requirements, procedures, fees and timelines vary by property, office and case, and may change. They are confirmed individually before any work begins.</p>
      <h2>Independence</h2>
      <p>SSS Associate is not a government body and is not affiliated with any government department.</p>
    </LegalDoc>
  );
}
