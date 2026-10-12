import { useEffect, useRef } from 'react';
import { onScrollFrame } from '../utils/motion.js';
import '../styles/ScrollProgress.css';

/** Thin bar at the top of the page that fills as you scroll. */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;

    return onScrollFrame(() => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;
    });
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={barRef} className="scroll-progress__bar" />
    </div>
  );
}
