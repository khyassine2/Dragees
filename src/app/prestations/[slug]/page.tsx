import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonLink } from '@/components/Button';
import { Media } from '@/components/Media';
import { PageShell } from '@/components/PageShell';
import { Reveal } from '@/components/Reveal';
import { SERVICES } from '@/data/services';
import { CallToAction } from '@/sections/CallToAction';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () =>
  SERVICES.map(service => ({ slug: service.slug }));

export const generateMetadata = async (
  props: ServicePageProps,
): Promise<Metadata> => {
  const { slug } = await props.params;
  const service = SERVICES.find(item => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.label,
    description: service.description,
  };
};

const ServiceDetailPage = async (props: ServicePageProps) => {
  const { slug } = await props.params;
  const service = SERVICES.find(item => item.slug === slug);

  if (!service) {
    notFound();
  }

  const others = SERVICES.filter(item => item.slug !== slug);

  return (
    <PageShell>
      <Reveal className="mx-auto max-w-[1600px] px-4 pt-28 pb-24 sm:px-6 md:pt-36 lg:px-10 lg:pb-32">
        <p className="label-micro text-taupe">Prestation</p>
        <h1
          data-reveal-text
          className="mt-6 max-w-[14ch] font-display text-editorial font-light opacity-0"
        >
          {service.label}
        </h1>
        <p className="mt-3 font-script text-[clamp(1.5rem,4vw,2.5rem)] leading-none text-rose">
          {service.tagline}
        </p>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div
            data-reveal-frame
            className="aspect-[4/5] overflow-hidden bg-ivory-dim lg:col-span-7"
          >
            <div data-reveal-inner className="size-full">
              <Media
                source={service.image}
                alt={service.label}
                sizes="(min-width: 1024px) 58vw, 92vw"
                priority
                className="size-full scale-105 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p
              data-reveal-fade
              className="text-base leading-relaxed text-cocoa opacity-0"
            >
              {service.description}
            </p>

            <ul
              data-reveal-fade
              className="mt-10 divide-y divide-line border-y border-line opacity-0"
            >
              {service.highlights.map(highlight => (
                <li key={highlight} className="flex gap-4 py-4">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-rose"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm text-cocoa">{highlight}</span>
                </li>
              ))}
            </ul>

            <div data-reveal-fade className="mt-10 opacity-0">
              <ButtonLink href="/rendez-vous">
                Demander un devis
              </ButtonLink>
            </div>

            <nav aria-label="Autres prestations" className="mt-16">
              <h2 className="label-micro text-taupe">Voir aussi</h2>
              <ul className="mt-5 space-y-3">
                {others.map(other => (
                  <li key={other.slug}>
                    <Link
                      href={`/prestations/${other.slug}`}
                      className="font-display text-2xl font-light transition-colors duration-300 hover:text-rose"
                    >
                      {other.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Reveal>

      <CallToAction />
    </PageShell>
  );
};

export default ServiceDetailPage;
