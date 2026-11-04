import Image from 'next/image';
import { PageHero } from '@/components/layout/PageHero';
import { WhyChoose } from '@/components/home/HomeSections';
import { ContactCta } from '@/components/contact/ContactCta';
import { business } from '@/config/business';
import { PageSchema } from '@/components/seo/PageSchema';
import { pageMetadata } from '@/lib/seo';

const description = 'Learn about SSS Associate in Irugur, Coimbatore: practical help with property documentation, legal opinions through qualified advocates and financial matters.';
export const metadata = pageMetadata({ title: 'About SSS Associate | Legal & Property Services, Irugur', description, path: '/about', fullTitle: true });

export default function AboutPage() {
  return (
    <>
      <PageSchema type="AboutPage" name="About SSS Associate" description={description} path="/about" crumbs={[{ name: 'About Us', path: '/about' }]} />
      <PageHero title="About SSS Associate" intro="Practical help with the legal, property and financial paperwork that matters most to you." crumbs={[{ label: 'About Us' }]} />
      <section className="wrap grid items-center gap-10 py-16 md:grid-cols-2" aria-labelledby="who">
        <div className="relative aspect-[800/404] overflow-hidden rounded-2xl shadow-xl"><Image src="/images/about.jpg" alt="Signing a property document beside a model house and scales" fill sizes="(max-width: 768px) 100vw, 50vw" /></div>
        <div className="space-y-4 leading-relaxed">
          <h2 id="who" className="text-3xl font-bold text-navy">Who we are</h2>
          <p>SSS Associate is based in {business.address.locality}, {business.address.city}. We assist with property documentation, legal opinions, registration support and financial settlement matters, from first review to follow-through.</p>
          <p>Property and finance problems rarely arrive neatly separated. A land purchase raises title questions; a title question can affect a loan; a loan dispute can lead to litigation. We help you handle these connected pieces in one place.</p>
          <p>Legal opinions and court representation are provided by appropriately qualified advocates where applicable. Our role is to help you prepare, understand and coordinate. We do not promise outcomes, and we confirm requirements for each case individually.</p>
        </div>
      </section>
      <WhyChoose />
      <ContactCta />
    </>
  );
}
