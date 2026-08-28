import Link from 'next/link';
import { SERVICES } from '@/data/services';
import { SHOWROOMS } from '@/data/booking';

const MAISON_LINKS = [
  { href: '/a-propos', label: 'La maison' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/prestations', label: 'Prestations' },
  { href: '/rendez-vous', label: 'Rendez-vous' },
];

export const Footer = () => (
  <footer className="border-t border-line bg-ivory">
    <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-2xl tracking-[0.18em] uppercase">
            Dragées
            <span className="text-rose">&nbsp;&amp;&nbsp;</span>
            Fiançailles
          </p>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-taupe">
            Dragées, buffet et décoration pour les fiançailles et les mariages,
            au Maroc. Élégance, raffinement et détails parfaits.
          </p>
        </div>

        <nav aria-label="Prestations">
          <h2 className="label-micro text-taupe">Prestations</h2>
          <ul className="mt-5 space-y-3">
            {SERVICES.map(service => (
              <li key={service.slug}>
                <Link
                  href={`/prestations/${service.slug}`}
                  className="text-sm text-cocoa transition-colors duration-300 hover:text-rose"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Maison">
          <h2 className="label-micro text-taupe">Maison</h2>
          <ul className="mt-5 space-y-3">
            {MAISON_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cocoa transition-colors duration-300 hover:text-rose"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label-micro text-taupe">Showrooms</h2>
          <ul className="mt-5 space-y-3 text-sm text-cocoa">
            {SHOWROOMS.map(showroom => (
              <li key={showroom.id}>
                {showroom.city}
                {' — '}
                {showroom.address}
              </li>
            ))}
            <li>
              <a
                href="https://wa.me/212723919977"
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors duration-300 hover:text-rose"
              >
                +212 7 23 91 99 77
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="label-micro text-taupe">
          © {new Date().getFullYear()} Dragées & Fiançailles — Fès
        </p>
        <p className="label-micro text-taupe">
          Devis gratuit · Déplacement partout au Maroc
        </p>
      </div>
    </div>
  </footer>
);
