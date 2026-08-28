'use client';

import { useRef } from 'react';
import { fadeUp, revealImage, revealText } from '@/animations';
import { useGsapContext } from '@/hooks/useGsapContext';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Scopes the site's three scroll reveals to a subtree, driven by data
 * attributes so server-rendered sections stay free of client code:
 * `data-reveal-text`, `data-reveal-frame` (with `data-reveal-inner`) and
 * `data-reveal-fade`.
 */
export const Reveal = (props: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGsapContext(ref, () => {
    const root = ref.current;

    if (!root) {
      return;
    }

    for (const heading of root.querySelectorAll<HTMLElement>(
      '[data-reveal-text]',
    )) {
      revealText(heading, { start: 'top 90%' });
    }

    for (const frame of root.querySelectorAll<HTMLElement>(
      '[data-reveal-frame]',
    )) {
      revealImage(frame, {
        inner: frame.querySelector('[data-reveal-inner]'),
        start: 'top 88%',
      });
    }

    if (root.querySelector('[data-reveal-fade]')) {
      fadeUp('[data-reveal-fade]', { start: 'top 92%', stagger: 0.08 });
    }
  });

  return (
    <div ref={ref} className={props.className}>
      {props.children}
    </div>
  );
};
