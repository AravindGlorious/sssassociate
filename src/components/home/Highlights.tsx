import { House, Handshake, Scale, ShieldCheck } from 'lucide-react';

const items = [
  { Icon: Scale, text: ['Legal Documentation', 'Assistance'] },
  { Icon: House, text: ['Property Verification', '& Registration'] },
  { Icon: Handshake, text: ['Financial Settlement', 'Support'] },
  { Icon: ShieldCheck, text: ['Reliable & Professional', 'Service'] },
];

export function Highlights() {
  return (
    <section className="strip" aria-label="Key highlights">
      <ul className="wrap">
        {items.map(({ Icon, text }) => (
          <li key={text[0]} className="cell">
            <Icon strokeWidth={1.5} aria-hidden="true" />
            <span>{text[0]}<br />{text[1]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
