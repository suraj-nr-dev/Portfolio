import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../utils/motion.js';

/**
 * Counts from 0 to `target` with an ease-out curve once `start` is true.
 * Returns the current value formatted to `decimals` places.
 */
export default function useCountUp(target, { duration = 1600, decimals = 0, start = true } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    // With reduced motion the first frame jumps straight to the final value
    const total = prefersReducedMotion() ? 0 : duration;
    let frame = 0;
    let startTime;

    const tick = (now) => {
      if (startTime === undefined) startTime = now;
      const progress = total > 0 ? Math.min((now - startTime) / total, 1) : 1;
      const eased = 1 - (1 - progress) ** 3;
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return value.toFixed(decimals);
}
