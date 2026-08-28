import Link from 'next/link';
import { Media } from '@/components/Media';
import { Reveal } from '@/components/Reveal';
import { GALLERY } from '@/data/services';

export const GalleryStrip = () => (
  <section className="border-t border-line bg-ivory-dim">
    <Reveal className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-micro text-taupe">Réalisations</p>
            <h2
              data-reveal-text
              className="mt-6 max-w-[14ch] font-display text-editorial font-light opacity-0"
            >
              Ce que nous avons dressé
            </h2>
          </div>
          <Link
            href="/galerie"
            data-reveal-fade
            className="label-micro opacity-0 underline underline-offset-[6px] transition-colors duration-300 hover:text-rose"
          >
            Toute la galerie
          </Link>
        </div>
      </div>

      <div className="no-scrollbar mt-14 flex gap-4 overflow-x-auto px-4 sm:px-6 lg:mt-20 lg:px-10">
        {GALLERY.map(item => (
          <figure key={item.id} className="w-[72vw] shrink-0 sm:w-[42vw] lg:w-[28vw]">
            <div
              data-reveal-frame
              className="aspect-[4/5] overflow-hidden bg-ivory"
            >
              <div data-reveal-inner className="size-full">
                <Media
                  source={item.image}
                  alt={item.caption}
                  sizes="(min-width: 1024px) 28vw, 72vw"
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
  </section>
);
