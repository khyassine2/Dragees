import type { Metadata } from 'next';
import { Media } from '@/components/Media';
import { PageShell } from '@/components/PageShell';
import { Reveal } from '@/components/Reveal';
import { GALLERY } from '@/data/services';
import { CallToAction } from '@/sections/CallToAction';

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    'Fiançailles et mariages dressés par nos soins : ballotins, tables sucrées, arches florales et salles décorées à Fès et dans la région.',
};

const GalleryPage = () => (
  <PageShell>
    <Reveal className="mx-auto max-w-[1600px] px-4 pt-28 pb-24 sm:px-6 md:pt-36 lg:px-10 lg:pb-32">
      <p className="label-micro text-taupe">Galerie</p>
      <h1
        data-reveal-text
        className="mt-6 max-w-[16ch] font-display text-editorial font-light opacity-0"
      >
        Des fêtes que nous avons dressées
      </h1>
      <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-taupe md:text-base">
        Chaque réception est composée avec les familles. Voici quelques tables,
        décors et coffrets sortis de notre atelier.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
        {GALLERY.map((item, index) => (
          <figure
            key={item.id}
            className={index % 5 === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}
          >
            <div
              data-reveal-frame
              className={`overflow-hidden bg-ivory-dim ${
                index % 5 === 0 ? 'aspect-[16/11]' : 'aspect-[4/5]'
              }`}
            >
              <div data-reveal-inner className="size-full">
                <Media
                  source={item.image}
                  alt={item.caption}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                  priority={index < 2}
                  className="size-full scale-105 object-cover"
                />
              </div>
            </div>
            <figcaption className="mt-4 label-micro text-taupe">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Reveal>

    <CallToAction />
  </PageShell>
);

export default GalleryPage;
