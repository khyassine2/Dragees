'use client';

import type Lenis from 'lenis';
import type { RefObject } from 'react';
import { createContext, use } from 'react';

type SmoothScrollValue = {
  lenis: RefObject<Lenis | null>;
};

export const SmoothScrollContext = createContext<SmoothScrollValue | null>(
  null,
);

/** The shared Lenis instance, or null outside the layout provider. */
export const useLenis = () => use(SmoothScrollContext)?.lenis ?? null;
