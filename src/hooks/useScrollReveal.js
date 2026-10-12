import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal for a whole section.
 * Attach the returned ref to a container; every descendant with a
 * `data-reveal` attribute gets the `is-visible` class the first time it
 * scrolls into view. The actual fade/slide/scale lives in global.css.
 * Stagger items by setting the `--d` CSS variable (see `stagger()`).
 */
export default function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const targets = root.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Tracks whether a single element has entered the viewport.
 * Returns [ref, inView]; `inView` stays true once triggered.
 */
export function useInView({ threshold = 0.4 } = {}) {
  const ref = useRef(null);
  // Browsers without IntersectionObserver simply start as visible
  const [inView, setInView] = useState(() => !('IntersectionObserver' in window));

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
