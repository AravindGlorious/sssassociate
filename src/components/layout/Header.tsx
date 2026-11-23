'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { business } from '@/config/business';
import { mainNav } from '@/config/navigation';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="wrap">
        <Link
          href="/"
          className="brand"
          aria-label={`${business.shortName} home`}
        >
          <Image
            src="/images/sss-associate-services-logo.jpg"
            alt="SSS Associate Services logo"
            width={100}
            height={94}
            priority
          />
          <span>
            <strong>{business.name}</strong>
            <small>{business.tagline}</small>
          </span>
        </Link>

        <button
          type="button"
          className="menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav aria-label="Main">
          <ul id="main-nav" className={`nav${open ? ' open' : ''}`}>
            {mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={active ? 'on' : undefined}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>

                  {item.children && item.children.length > 0 && (
                    <ul className="dropdown">
                      {item.children.map((c) => (
                        <li key={c.href + c.label}>
                          <Link href={c.href}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/contact" className="btn btn-sm hdr-cta">
          Get in Touch →
        </Link>
      </div>
    </header>
  );
}