'use client';

import { Menu, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger } from '@/animations/gsap';
import { useGsapContext } from '@/hooks/useGsapContext';
import { useUi } from '@/store/UiContext';

const NAV_LINKS = [
  { href: '/prestations/dragees', label: 'Dragées' },
  { href: '/prestations/buffet', label: 'Buffet' },
  { href: '/prestations/decoration', label: 'Décoration' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/a-propos', label: 'La maison' },
];

const linkClass = (active: boolean) =>
  [
    'relative label-micro py-2 transition-opacity duration-300',
    // Underline grows from the left on hover and stays put when active.
    'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-current',
    'after:origin-left after:transition-transform after:duration-500',
    'after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100',
    active ? 'after:scale-x-100' : 'after:scale-x-0',
  ].join(' ');

export const Header = () => {
  const ui = useUi();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const isHome = pathname === '/';

  useGsapContext(
    headerRef,
    () => {
      const header = headerRef.current;

      if (!header) {
        return;
      }

      if (!prefersReducedMotion()) {
        gsap.fromTo(
          '[data-header-item]',
          { autoAlpha: 0, y: -14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.07,
            delay: isHome ? 0.25 : 0,
          },
        );
      }

      if (!isHome) {
        header.dataset.solid = 'true';
        return;
      }

      // Over the hero the bar is transparent; past it, it settles onto ivory.
      ScrollTrigger.create({
        start: 'top -70vh',
        end: 'max',
        onToggle: (self) => {
          header.dataset.solid = String(self.isActive);
        },
      });
    },
    [isHome],
  );

  return (
    <header
      ref={headerRef}
      data-solid={isHome ? 'false' : 'true'}
      className="fixed inset-x-0 top-0 z-90 border-b border-transparent text-ivory transition-colors duration-500 data-[solid=true]:border-line data-[solid=true]:bg-ivory/92 data-[solid=true]:text-plum data-[solid=true]:backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 sm:px-6 md:h-20 lg:gap-10 lg:px-10">
        <button
          type="button"
          data-header-item
          onClick={() => ui.open('menu')}
          aria-label="Ouvrir le menu"
          className="-ml-2 grid size-10 shrink-0 place-items-center lg:hidden"
        >
          <Menu className="size-5" strokeWidth={1.25} />
        </button>

        <Link
          href="/"
          data-header-item
          aria-label="Dragées et Fiançailles, accueil"
          className="min-w-0 shrink-0 font-display leading-none tracking-[0.14em] uppercase sm:tracking-[0.2em]"
        >
          {/* Small screens get the monogram so the bar never collides. */}
          <span className="text-base sm:hidden">
            D
            <span className="text-rose">&amp;</span>
            F
          </span>
          <span className="hidden text-base whitespace-nowrap sm:inline lg:text-lg">
            Dragées
            <span className="text-rose">&nbsp;&amp;&nbsp;</span>
            Fiançailles
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8"
        >
          {NAV_LINKS.map(link => (
            <span key={link.href} data-header-item>
              <Link
                href={link.href}
                className={linkClass(pathname === link.href)}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
          <span data-header-item className="hidden md:inline-block">
            <a
              href="tel:+212723919977"
              className="label-micro flex items-center gap-2 whitespace-nowrap transition-opacity duration-300 hover:opacity-70"
            >
              <Phone className="size-4" strokeWidth={1.25} />
              07 23 91 99 77
            </a>
          </span>
          <span data-header-item>
            <Link
              href="/rendez-vous"
              className="border border-current px-4 py-2.5 label-micro whitespace-nowrap transition-opacity duration-300 hover:opacity-70 sm:px-6"
            >
              Devis
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
};
