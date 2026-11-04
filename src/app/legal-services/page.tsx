import { CategoryPage } from '@/components/services/CategoryPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Legal Services in Coimbatore | SSS Associate', description: 'Legal opinions, old document verification, Tamil–English translation and property dispute support in Irugur, Coimbatore, with opinions by qualified advocates.', path: '/legal-services', fullTitle: true });

export default function Page() {
  return <CategoryPage category="legal" description="Legal opinions, old document verification, Tamil–English translation and property dispute support in Irugur, Coimbatore, with opinions by qualified advocates." />;
}
