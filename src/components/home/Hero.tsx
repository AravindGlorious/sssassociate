
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
            Reliable Legal &amp; Documentation Support{' '}
            <em>Across Tamil Nadu</em>
          </h1>

          <p>
            Get practical assistance with document verification,
            registration procedures, legal documentation and
            financial matters. Our team is here to help you
            understand the process and take the next step.
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
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
