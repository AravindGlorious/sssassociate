import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div>
          <p className="kick">
            Trust • Transparency • Professionalism
          </p>

          <h1 id="hero-title">
            Property &amp; Document Help{' '}
            <em>Across Tamil Nadu</em>
          </h1>

          <p>
            Check property papers, plan land registration, and organize
            bank loan files. We guide you through each step in simple words.
          </p>

          <div className="cta">
            <Link href="/services" className="btn">
              Explore Our Services →
            </Link>

            <Link href="/contact" className="btn btn-outline">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
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