import { Check } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { FORMULAS } from '@/data/services';
import { formatPrice } from '@/utils/format';

export const Formulas = () => (
  <Reveal className="mx-auto max-w-[1600px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="label-micro text-taupe">Formules</p>
        <h2
          data-reveal-text
          className="mt-6 max-w-[16ch] font-display text-editorial font-light opacity-0"
        >
          Un point de départ, jamais une limite
        </h2>
      </div>
      <p
        data-reveal-fade
        className="max-w-[38ch] text-sm leading-relaxed text-taupe opacity-0"
      >
        Ces formules servent de repère. Tout se compose à la carte selon la
        salle, la saison et le nombre d&apos;invités.
      </p>
    </div>

    <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-8">
      {FORMULAS.map((formula, index) => (
        <article
          key={formula.id}
          data-reveal-fade
          className={`flex flex-col border p-8 opacity-0 lg:p-10 ${
            index === 1
              ? 'border-plum bg-plum text-ivory'
              : 'border-line bg-ivory'
          }`}
        >
          <h3 className="font-display text-section font-light">
            {formula.label}
          </h3>
          <p
            className={`mt-2 label-micro ${
              index === 1 ? 'text-ivory/60' : 'text-taupe'
            }`}
          >
            {formula.guests}
          </p>

          <p className="mt-8 font-display text-4xl">
            <span
              className={`label-micro align-middle ${
                index === 1 ? 'text-ivory/60' : 'text-taupe'
              }`}
            >
              dès&nbsp;
            </span>
            {formatPrice(formula.from)}
          </p>

          <ul
            className={`mt-8 flex-1 space-y-3 border-t pt-8 text-sm leading-relaxed ${
              index === 1 ? 'border-ivory/20' : 'border-line'
            }`}
          >
            {formula.includes.map(item => (
              <li key={item} className="flex gap-3">
                <Check
                  className={`mt-0.5 size-4 shrink-0 ${
                    index === 1 ? 'text-blush' : 'text-rose'
                  }`}
                  strokeWidth={1.5}
                />
                <span className={index === 1 ? 'text-ivory/85' : 'text-cocoa'}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <ButtonLink
            href="/rendez-vous"
            full
            className="mt-10"
            variant={index === 1 ? 'inverse' : 'outline'}
          >
            Demander ce devis
          </ButtonLink>
        </article>
      ))}
    </div>
  </Reveal>
);
