import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../utils/motion.js';

/**
 * Magnetic hover: the element drifts toward the pointer while hovered.
 * Writes --mx / --my CSS variables; the transform is declared in CSS
 * (see .btn in MagneticButton.css). Disabled on touch and reduced motion.
 */
export default function useMagnetic({ strength = 0.28 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined;

    const handleMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
      el.style.setProperty('--mx', `${x.toFixed(1)}px`);
      el.style.setProperty('--my', `${y.toFixed(1)}px`);
    };

    const handleLeave = () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return ref;
}
