'use client';

import { useEffect, useRef } from 'react';
import { isFinePointer } from '@/animations/gsap';
import { magneticButton } from '@/animations';

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

/** Wraps an interactive element so it drifts toward the pointer on hover. */
export const Magnetic = (props: MagneticProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || !isFinePointer()) {
      return;
    }

    return magneticButton(element, { strength: props.strength });
  }, [props.strength]);

  return (
    <span ref={ref} className={`inline-block ${props.className ?? ''}`}>
      {props.children}
    </span>
  );
};
