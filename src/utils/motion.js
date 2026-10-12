import portfolioData from '../data/portfolioData.js';

/** True when the visitor asked the OS for less motion. */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True for mouse/trackpad devices; false for touch screens. */
export const hasFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Inline style that delays an element's scroll reveal by its list index. */
export const stagger = (index, step = portfolioData.animation.staggerStep) => ({
  '--d': `${index * step}ms`,
});

/**
 * Runs `callback` at most once per animation frame while the page scrolls or
 * resizes (and once immediately). Returns an unsubscribe function.
 * Callbacks should write to refs / CSS variables, never to React state.
 */
export function onScrollFrame(callback) {
  let frame = 0;

  const handle = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      callback();
    });
  };

  window.addEventListener('scroll', handle, { passive: true });
  window.addEventListener('resize', handle);
  handle();

  return () => {
    window.removeEventListener('scroll', handle);
    window.removeEventListener('resize', handle);
    cancelAnimationFrame(frame);
  };
}
