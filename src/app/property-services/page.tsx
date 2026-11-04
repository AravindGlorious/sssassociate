import { CategoryPage } from '@/components/services/CategoryPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Property Services in Coimbatore | SSS Associate', description: 'Property registration, patta transfer, sale deed checks, Encumbrance Certificate and approval help in Irugur, Coimbatore. Requirements confirmed per case.', path: '/property-services', fullTitle: true });

export default function Page() {
  return <CategoryPage category="property" description="Property registration, patta transfer, sale deed checks, Encumbrance Certificate and approval help in Irugur, Coimbatore. Requirements confirmed per case." />;
}
