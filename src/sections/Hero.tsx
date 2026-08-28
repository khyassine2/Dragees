'use client';

import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/animations/gsap';
import { splitText } from '@/animations/splitText';
import { ButtonLink } from '@/components/Button';
import { Magnetic } from '@/components/Magnetic';
import { useGsapContext } from '@/hooks/useGsapContext';
import { imageSrcSet, imageUrl } from '@/utils/format';

const HERO_IMAGE
  = 'https://images.unsplash.com/photo-1519741497674-611481863552';

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGsapContext(sectionRef, () => {
    const headline = headlineRef.current;

    if (prefersReducedMotion()) {
      gsap.set(
        ['[data-hero-frame]', '[data-hero-fade]', headline],
        { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' },
      );
      return;
    }

    const split = headline ? splitText(headline, { by: 'lines' }) : null;
    gsap.set(headline, { autoAlpha: 1 });

    const timeline = gsap.timeline({
      defaults: { ease: 'expo.out' },
      // Let the header's own logo/nav intro land first.
      delay: 0.35,
    });

    timeline
      .fromTo(
        '[data-hero-frame]',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5 },
      )
      .fromTo(
        '[data-hero-image]',
        { scale: 1.08 },
        { scale: 1, duration: 2, ease: 'power2.out' },
        0,
      )
      .fromTo(
        '[data-hero-eyebrow]',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.9 },
        0.55,
      );

    if (split) {
      timeline.fromTo(
        split.targets,
        { yPercent: 118 },
        { yPercent: 0, duration: 1.25, stagger: 0.09 },
        0.7,
      );
    }

    timeline
      .fromTo(
        '[data-hero-script]',
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 1 },
        0.95,
      )
      .fromTo(
        '[data-hero-statement]',
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.9 },
        1.1,
      )
      .fromTo(
        '[data-hero-cta]',
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 },
        1.25,
      )
      .fromTo(
        '[data-hero-scroll]',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.7 },
        1.55,
      );

    // The photograph drifts up slowly as the hero leaves the viewport.
    gsap.to('[data-hero-image]', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh min-h-[36rem] flex-col overflow-hidden bg-cocoa"
    >
      <div data-hero-frame className="absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-hero-image
          src={imageUrl(HERO_IMAGE, 1920)}
          srcSet={imageSrcSet(HERO_IMAGE)}
          sizes="100vw"
          alt="Table de fiançailles dressée, arche florale en tons poudrés"
          fetchPriority="high"
          decoding="async"
          className="size-full scale-[1.08] object-cover object-[50%_45%] will-change-transform"
        />
        {/* Gradient keeps the type legible without washing the photograph. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-plum/80 via-plum/25 to-plum/40"
        />
      </div>

      {/*
        pt clears the fixed header (h-16, h-20 from md) plus breathing room, so
        the eyebrow stays below the bar even when tall content pushes upward.
      */}
      <div className="relative mx-auto mt-auto w-full max-w-[1600px] px-4 pt-28 pb-24 text-ivory sm:px-6 sm:pb-20 md:pt-32 lg:px-10">
        <p data-hero-eyebrow className="label-micro opacity-0">
          Fiançailles · Buffet · Décoration — Fès
        </p>

        <h1
          ref={headlineRef}
          className="mt-5 font-display text-display font-light opacity-0 sm:max-w-[14ch]"
        >
          Fiançailles &amp; Dragées
        </h1>

        <p
          data-hero-script
          className="mt-2 font-script text-[clamp(1.75rem,5vw,3.5rem)] leading-none text-blush opacity-0"
        >
          Élégance, raffinement &amp; détails parfaits
        </p>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            data-hero-statement
            className="max-w-[46ch] text-sm leading-relaxed text-ivory/75 opacity-0 md:text-base"
          >
            Nous composons vos dragées, dressons votre buffet et habillons votre
            salle. Une seule maison, du premier rendez-vous au démontage.
          </p>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <span data-hero-cta className="opacity-0">
              <Magnetic strength={0.25} className="block sm:inline-block">
                <ButtonLink
                  href="/rendez-vous"
                  variant="inverse"
                  full
                  className="sm:w-auto"
                >
                  Demander un devis
                </ButtonLink>
              </Magnetic>
            </span>
            <span data-hero-cta className="opacity-0">
              <Magnetic strength={0.25} className="block sm:inline-block">
                <ButtonLink
                  href="/galerie"
                  variant="inverse-outline"
                  full
                  className="sm:w-auto"
                >
                  Voir la galerie
                </ButtonLink>
              </Magnetic>
            </span>
          </div>
        </div>
      </div>

      <div
        data-hero-scroll
        aria-hidden
        className="absolute right-4 bottom-14 hidden items-center gap-3 text-ivory/70 opacity-0 md:flex lg:right-10 lg:bottom-20"
      >
        <span className="label-micro [writing-mode:vertical-rl]">Défiler</span>
        <ArrowDown className="size-4 animate-bounce" strokeWidth={1.25} />
      </div>
    </section>
  );
};
