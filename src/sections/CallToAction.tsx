import { ButtonLink } from '@/components/Button';
import { Media } from '@/components/Media';
import { Reveal } from '@/components/Reveal';

const CTA_IMAGE
  = 'https://images.unsplash.com/photo-1522767131594-6b7e96848fba';

export const CallToAction = () => (
  <Reveal className="relative isolate overflow-hidden bg-plum text-ivory">
    <div data-reveal-frame className="absolute inset-0 -z-10">
      <div data-reveal-inner className="size-full">
        <Media
          source={CTA_IMAGE}
          alt="Ballotins de dragées et ruban satin"
          sizes="100vw"
          className="size-full scale-110 object-cover opacity-30"
        />
      </div>
    </div>

    <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-10 lg:py-40">
      <p className="label-micro text-ivory/60">Devis gratuit sous 48 h</p>
      <h2
        data-reveal-text
        className="mx-auto mt-6 max-w-[18ch] font-display text-editorial font-light opacity-0"
      >
        Parlons de votre date
      </h2>
      <p
        data-reveal-fade
        className="mx-auto mt-3 max-w-[30ch] font-script text-[clamp(1.5rem,4vw,2.75rem)] leading-none text-blush opacity-0"
      >
        Élégance, raffinement &amp; détails parfaits
      </p>

      <div
        data-reveal-fade
        className="mt-12 flex flex-wrap justify-center gap-3 opacity-0"
      >
        <ButtonLink
          href="/rendez-vous"
          variant="inverse"
        >
          Prendre rendez-vous
        </ButtonLink>
        <ButtonLink
          href="/prestations"
          variant="inverse-outline"
        >
          Voir les prestations
        </ButtonLink>
      </div>
    </div>
  </Reveal>
);
