import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../utils/motion.js';

/**
 * 3D tilt that follows the pointer.
 * Writes CSS variables (--rx, --ry for rotation, --gx, --gy for the glare
 * position) on the element; the transform itself is declared in CSS on the
 * `.tilt` class. Disabled on touch devices and with reduced motion.
 */
export default function useTilt({ max = 7 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined;

    let frame = 0;

    const handleMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width; // 0 to 1
        const y = (event.clientY - rect.top) / rect.height; // 0 to 1
        el.style.setProperty('--rx', `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
        el.style.setProperty('--gx', `${(event.clientX - rect.left).toFixed(0)}px`);
        el.style.setProperty('--gy', `${(event.clientY - rect.top).toFixed(0)}px`);
        el.classList.add('is-tilting');
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(frame);
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [max]);

  return ref;
}
