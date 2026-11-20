
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div>
          <p className="kick">
            Trust • Transparency • Professionalism
          </p>

          <h1 id="hero-title">
            Property &amp; Document Services{' '}
            <em>Across Tamil Nadu</em>
          </h1>

          <p>
            Need help with property records, document checks,
            registration or bank paperwork? We explain the
            process, help you understand your options and guide
            you through the next steps.
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
            src="/images/hero.jpg"
            alt="House with legal books, a gavel and scales of justice"
            fill
            preload
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}