import type { Metadata } from 'next';
import { Media } from '@/components/Media';
import { PageShell } from '@/components/PageShell';
import { Reveal } from '@/components/Reveal';
import { SHOWROOMS } from '@/data/booking';
import { CallToAction } from '@/sections/CallToAction';

export const metadata: Metadata = {
  title: 'La maison',
  description:
    'Un atelier de dragées, de buffet et de décoration fondé à Fès. Une équipe qui compose, installe et démonte elle-même.',
};

const ATELIER_IMAGE
  = 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3';

const FIGURES = [
  { value: '12 ans', label: 'D\'ateliers et de réceptions' },
  { value: '400 +', label: 'Fêtes accompagnées' },
  { value: 'Fès', label: 'Et toute la région' },
] as const;

const AboutPage = () => (
  <PageShell>
    <Reveal className="mx-auto max-w-[1600px] px-4 pt-28 pb-24 sm:px-6 md:pt-36 lg:px-10 lg:pb-32">
      <p className="label-micro text-taupe">La maison</p>
      <h1
        data-reveal-text
        className="mt-6 max-w-[16ch] font-display text-editorial font-light opacity-0"
      >
        Un atelier, pas une agence
      </h1>

      <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
        <div
          data-reveal-frame
          className="aspect-[4/5] overflow-hidden bg-ivory-dim lg:col-span-6"
        >
          <div data-reveal-inner className="size-full">
            <Media
              source={ATELIER_IMAGE}
              alt="Notre atelier, préparation d'une table sucrée"
              sizes="(min-width: 1024px) 50vw, 92vw"
              priority
              className="size-full scale-105 object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <p
            data-reveal-fade
            className="text-base leading-relaxed text-cocoa opacity-0"
          >
            Nous enrobons les amandes, plions les ballotins et montons les
            arches nous-mêmes. Rien n&apos;est sous-traité : la personne qui
            vous reçoit au showroom est celle qui dressera votre table.
          </p>
          <p
            data-reveal-fade
            className="mt-6 text-base leading-relaxed text-cocoa opacity-0"
          >
            Nous travaillons avec des pâtissiers et des fleuristes marocains,
            en circuit court. C&apos;est ce qui nous permet de goûter et de
            corriger jusqu&apos;au dernier moment.
          </p>

          <dl className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-3">
            {FIGURES.map(figure => (
              <div
                key={figure.value}
                data-reveal-fade
                className="bg-ivory p-6 opacity-0"
              >
                <dt className="font-display text-3xl font-light">
                  {figure.value}
                </dt>
                <dd className="mt-2 label-micro text-taupe">{figure.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="mt-24 lg:mt-32">
        <h2
          data-reveal-text
          className="max-w-[14ch] font-display text-section font-light opacity-0"
        >
          Où nous rencontrer
        </h2>
        <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          {SHOWROOMS.map(showroom => (
            <li
              key={showroom.id}
              data-reveal-fade
              className="bg-ivory p-8 opacity-0"
            >
              <h3 className="font-display text-2xl font-light">
                {showroom.city}
              </h3>
              <p className="mt-3 text-sm text-taupe">{showroom.address}</p>
              <p className="mt-1 text-sm text-taupe">{showroom.hours}</p>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>

    <CallToAction />
  </PageShell>
);

export default AboutPage;
