import { CategoryPage } from '@/components/services/CategoryPage';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Financial & Loan Assistance in Coimbatore | SSS Associate', description: 'Financial opinion, bank litigation and settlement support, One Time Settlement preparation and loan paperwork help in Coimbatore. Lenders decide approvals.', path: '/financial-services', fullTitle: true });

export default function Page() {
  return <CategoryPage category="financial" description="Financial opinion, bank litigation and settlement support, One Time Settlement preparation and loan paperwork help in Coimbatore. Lenders decide approvals." />;
}
