
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div>
          <p className="kick">
            Trust | Transparency | Professionalism
          </p>

          <h1 id="hero-title">
            Property &amp; Document Services{' '}
            <em>Across Tamil Nadu</em>
          </h1>

          <p>
            Need help checking property papers, preparing documents,
            or understanding registration steps? We explain the process
            in simple words and help you plan your next steps.
            We also assist with bank and loan paperwork.
          </p>

          <div className="cta">
            <Link href="/services" className="btn">
              Explore Our Services
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link href="/contact" className="btn btn-outline">
              <Phone size={18} aria-hidden="true" />
              Contact Us
            </Link>
          </div>
        </div>

        <div className="pic">
          <Image
            src="/images/property-document-services-tamil-nadu.jpg"
            alt="House with legal books, a gavel and scales of justice"
            width={1600}
            height={900}
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 50vw"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}