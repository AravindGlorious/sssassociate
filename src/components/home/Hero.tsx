import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div>
          <p className="kick">Trust • Transparency • Professionalism</p>
          <h1 id="hero-title">Trusted Legal, Property &amp; Financial Services <em>in Coimbatore</em></h1>
          <p>Professional assistance for property documentation, legal opinions, registration support and financial settlement matters.</p>
          <div className="cta">
            <Link href="/services" className="btn">Explore Our Services <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link href="/contact" className="btn btn-outline"><Phone size={18} aria-hidden="true" />Contact Us</Link>
          </div>
        </div>
        <div className="pic">
          <Image src="/images/hero.jpg" alt="Modern house beside a gavel, law books and scales of justice" fill priority fetchPriority="high" sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
