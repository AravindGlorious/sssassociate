import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Coins, FileText, House, Scale } from 'lucide-react';
import { categories } from '@/data/services';

const core = [
  { Icon: Scale, label: ['Legal', 'Services'], href: categories.legal.path },
  { Icon: House, label: ['Property', 'Services'], href: categories.property.path },
  { Icon: Coins, label: ['Financial', 'Services'], href: categories.financial.path },
  { Icon: FileText, label: ['Documentation &', 'Translation'], href: '/services/legal-document-translation' },
];

export function AboutCore() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="photo">
          <Image src="/images/about.jpg" alt="Advocate signing a property document beside a model house and scales" fill sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
        <div>
          <p className="kick">About SSS Associate</p>
          <h2 id="about-title">Your Trusted Partner for Legal, Property &amp; <em>Financial Assistance</em></h2>
          <p>At SSS Associate, we provide professional support for all your legal, property and financial needs. From property documentation to litigation support, our team is committed to delivering reliable and customer-focused services in Coimbatore and Irugur.</p>
          <Link href="/about" className="btn btn-sm">Know More About Us <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="cs">
          <h2>Our Core Services</h2>
          <div className="g">
            {core.map(({ Icon, label, href }) => (
              <Link key={label[0]} href={href}><Icon strokeWidth={1.8} aria-hidden="true" />{label[0]}<br />{label[1]}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
