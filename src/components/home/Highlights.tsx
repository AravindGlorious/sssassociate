
import {
  House,
  Handshake,
  Scale,
  ShieldCheck,
} from 'lucide-react';

const items = [
  {
    Icon: Scale,
    text: ['Document Checks', '& Process Guidance'],
  },
  {
    Icon: House,
    text: ['Property Records', '& Registration Support'],
  },
  {
    Icon: Handshake,
    text: ['Bank & Loan', 'Paperwork Assistance'],
  },
  {
    Icon: ShieldCheck,
    text: ['Clear Communication', '& Customer Support'],
  },
];

export function Highlights() {
  return (
    <section className="strip" aria-label="Our service highlights">
      <ul className="wrap">
        {items.map(({ Icon, text }) => (
          <li key={text[0]} className="cell">
            <Icon strokeWidth={1.5} aria-hidden="true" />
            <span>
              {text[0]}
              <br />
              {text[1]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
