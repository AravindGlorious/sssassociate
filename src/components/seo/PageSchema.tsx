import { breadcrumbSchema, webPageSchema } from '@/lib/schema';
import { JsonLd } from './JsonLd';

interface Props {
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  name: string;
  description: string;
  path: string;
  /** Breadcrumb trail after "Home". Omit on the homepage. */
  crumbs?: { name: string; path: string }[];
}

/** WebPage-type + BreadcrumbList JSON-LD for a page. The business entity itself lives in the root layout. */
export function PageSchema({ type = 'WebPage', name, description, path, crumbs }: Props) {
  return (
    <>
      <JsonLd data={webPageSchema(type, name, description, path)} />
      {crumbs && <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs])} />}
    </>
  );
}
