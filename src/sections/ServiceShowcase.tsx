import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Media } from '@/components/Media';
import { Reveal } from '@/components/Reveal';
import { SERVICES } from '@/data/services';

export const ServiceShowcase = () => (
  <Reveal className="mx-auto max-w-[1600px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="label-micro text-taupe">Nos prestations</p>
        <h2
          data-reveal-text
          className="mt-6 max-w-[16ch] font-display text-editorial font-light opacity-0"
        >
          Trois métiers, une seule maison
        </h2>
      </div>
      <p
        data-reveal-fade
        className="max-w-[38ch] text-sm leading-relaxed text-taupe opacity-0"
      >
        Vous pouvez nous confier une partie de votre réception ou la totalité.
        Le devis reste le même : détaillé, ligne par ligne.
      </p>
    </div>

    <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-20 lg:gap-8">
      {SERVICES.map(service => (
        <Link
          key={service.slug}
          href={`/prestations/${service.slug}`}
          data-cursor="Voir"
          className="group block"
        >
          <div
            data-reveal-frame
            className="aspect-[4/5] overflow-hidden bg-ivory-dim"
          >
            <div data-reveal-inner className="size-full">
              <Media
                source={service.image}
                alt={service.label}
                sizes="(min-width: 768px) 32vw, 92vw"
                className="size-full scale-105 object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
              />
            </div>
          </div>

          <div data-reveal-fade className="mt-6 opacity-0">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-section font-light">
                {service.label}
              </h3>
              <ArrowUpRight
                className="size-5 shrink-0 text-rose transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.25}
              />
            </div>
            <p className="mt-2 font-script text-2xl leading-none text-rose">
              {service.tagline}
            </p>
            <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-taupe">
              {service.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </Reveal>
);
