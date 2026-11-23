import {
  House,
  Handshake,
  Scale,
  ShieldCheck,
} from 'lucide-react';

const items = [
  { Icon: Scale, label: 'Document Checks & Guidance' },
  { Icon: House, label: 'Property & Registration Help' },
  { Icon: Handshake, label: 'Bank & Loan Paperwork' },
  { Icon: ShieldCheck, label: 'Clear & Honest Support' },
];

export function Highlights() {
  return (
    <section className="strip" aria-label="Our service highlights">
      <ul className="wrap">
        {items.map(({ Icon, label }) => (
          <li key={label} className="cell">
            <Icon strokeWidth={1.5} aria-hidden="true" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}