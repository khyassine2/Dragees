import { Reveal } from '@/components/Reveal';
import { STEPS } from '@/data/services';

export const Process = () => (
  <section className="border-y border-line bg-ivory-dim">
    <Reveal className="mx-auto max-w-[1600px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <p className="label-micro text-taupe">Comment ça se passe</p>
      <h2
        data-reveal-text
        className="mt-6 max-w-[18ch] font-display text-editorial font-light opacity-0"
      >
        De la première tasse de thé au démontage
      </h2>

      <ol className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
        {STEPS.map(step => (
          <li
            key={step.number}
            data-reveal-fade
            className="bg-ivory p-8 opacity-0 lg:p-10"
          >
            <span className="font-display text-3xl text-rose">
              {step.number}
            </span>
            <h3 className="mt-6 font-display text-2xl font-light">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-taupe">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </Reveal>
  </section>
);
