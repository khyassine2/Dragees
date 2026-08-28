'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ScrollTrigger } from '@/animations/gsap';
import { Cursor } from '@/components/Cursor';
import { Header } from '@/components/Header';
import { MobileMenu } from '@/components/MobileMenu';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SmoothScrollContext } from '@/store/SmoothScrollContext';
import { UiProvider } from '@/store/UiContext';

/**
 * Owns everything that must live on the client: smooth scroll, the custom
 * cursor, the header and the overlays. Pages stay server components.
 */
export const SiteChrome = (props: { children: React.ReactNode }) => {
  const lenis = useSmoothScroll();
  const pathname = usePathname();

  useEffect(() => {
    // Land at the top of each new route without a smooth animated crawl.
    lenis.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    // Layout differs per route, so measurements must be rebuilt.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => cancelAnimationFrame(frame);
  }, [pathname, lenis]);

  return (
    <UiProvider>
      <SmoothScrollContext value={{ lenis }}>
        <Cursor />
        <Header />

        <main id="main" className="min-h-screen">
          {props.children}
        </main>

        <WhatsAppButton />
        <MobileMenu />
      </SmoothScrollContext>
    </UiProvider>
  );
};
