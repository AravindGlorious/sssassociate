
import { House, Handshake, Scale, ShieldCheck } from 'lucide-react';

const items = [
  { Icon: Scale, text: ['Document Review', '& Process Guidance'] },
  { Icon: House, text: ['Property Checks', '& Registration'] },
  { Icon: Handshake, text: ['Bank & Loan', 'Settlement Support'] },
  { Icon: ShieldCheck, text: ['Clear & Reliable', 'Customer Care'] },
];

export function Highlights() {
  return (
    <section className="strip" aria-label="Key highlights">
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
