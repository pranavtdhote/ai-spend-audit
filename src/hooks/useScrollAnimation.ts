import { useRef } from 'react';
import { useInView, type UseInViewOptions } from 'motion/react';

/**
 * Custom scroll-triggered animation hook.
 * Returns a ref and inView boolean for triggering Motion animations on scroll.
 */
export function useScrollAnimation(options?: UseInViewOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-80px 0px',
    ...options,
  });

  return { ref, isInView };
}
