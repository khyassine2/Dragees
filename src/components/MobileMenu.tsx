'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/animations/gsap';
import { Media } from '@/components/Media';
import { GALLERY } from '@/data/services';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useUi } from '@/store/UiContext';

const MENU_LINKS = [
  { href: '/prestations/dragees', label: 'Dragées' },
  { href: '/prestations/buffet', label: 'Buffet' },
  { href: '/prestations/decoration', label: 'Décoration' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/a-propos', label: 'La maison' },
  { href: '/rendez-vous', label: 'Rendez-vous' },
];

const SECONDARY_LINKS = [
  { href: '/prestations', label: 'Toutes les prestations' },
  { href: '/rendez-vous', label: 'Demander un devis' },
];

const PREVIEWS = [GALLERY[0], GALLERY[2]];

export const MobileMenu = () => {
  const ui = useUi();
  const open = ui.overlay === 'menu';
  const rootRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        ui.close();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, ui]);

  useEffect(() => {
    const root = rootRef.current;

    if (!open || !root) {
      return;
    }

    if (prefersReducedMotion()) {
      gsap.set(root, { autoAlpha: 1 });
      gsap.set('[data-menu-item], [data-menu-preview]', {
        autoAlpha: 1,
        yPercent: 0,
      });
      return;
    }

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .fromTo(
          root,
          { autoAlpha: 0, clipPath: 'inset(0% 0% 100% 0%)' },
          { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7 },
        )
        .fromTo(
          '[data-menu-item] > span',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.85, stagger: 0.055 },
          0.18,
        )
        .fromTo(
          '[data-menu-secondary]',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.04 },
          0.4,
        )
        .fromTo(
          '[data-menu-preview]',
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, stagger: 0.08 },
          0.35,
        );
    }, root);

    return () => context.revert();
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-110 flex flex-col overflow-y-auto overscroll-contain bg-ivory opacity-0"
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          onClick={ui.close}
          className="font-display text-base tracking-[0.22em] uppercase"
        >
          Dragées
          <span className="text-rose">&nbsp;&amp;&nbsp;</span>
          Fiançailles
        </Link>
        <button
          type="button"
          onClick={ui.close}
          aria-label="Fermer le menu"
          className="grid size-10 place-items-center"
        >
          <X className="size-5" strokeWidth={1.25} />
        </button>
      </div>

      <nav aria-label="Menu principal" className="px-4 pt-8 sm:px-6">
        <ul>
          {MENU_LINKS.map(link => (
            <li key={link.href} className="border-b border-line">
              <Link
                href={link.href}
                onClick={ui.close}
                data-menu-item
                className="block overflow-hidden py-4"
              >
                <span className="block font-display text-[2.5rem] leading-[1.05] tracking-tight">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-2 gap-3 px-4 pt-10 sm:px-6">
        {PREVIEWS.map(item => (
          <Link key={item.id} href="/galerie" onClick={ui.close}>
            <div
              data-menu-preview
              className="aspect-[3/4] overflow-hidden bg-ivory-dim"
            >
              <Media
                source={item.image}
                alt={item.caption}
                sizes="45vw"
                className="size-full object-cover"
              />
            </div>
            <p className="mt-2 label-micro text-taupe">{item.caption}</p>
          </Link>
        ))}
      </div>

      <div className="mt-auto px-4 py-10 sm:px-6">
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {SECONDARY_LINKS.map(link => (
            <li key={link.href} data-menu-secondary>
              <Link
                href={link.href}
                onClick={ui.close}
                className="label-micro text-taupe"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p data-menu-secondary className="mt-6 text-[0.8125rem] text-taupe">
          Fès &amp; régions · Déplacement possible
        </p>
      </div>
    </div>
  );
};
