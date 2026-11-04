import { financialContent } from './financial';
import { legalContent } from './legal';
import { propertyContent } from './property';
import type { ServiceContent } from './types';

export const allServiceContent: ServiceContent[] = [...legalContent, ...propertyContent, ...financialContent];
export const getServiceContent = (slug: string) => allServiceContent.find((c) => c.slug === slug);
export type { ServiceContent };
