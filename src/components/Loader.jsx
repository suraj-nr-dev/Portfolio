import { useEffect, useState } from 'react';
import portfolioData from '../data/portfolioData.js';
import { prefersReducedMotion } from '../utils/motion.js';
import '../styles/Loader.css';

const { personal, animation } = portfolioData;

/**
 * Short intro screen. Holds, fades out, then asks App to unmount it.
 * Total time (hold + exit) is under 2 seconds; near-instant with reduced motion.
 */
export default function Loader({ onExitStart, onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const hold = reduced ? 150 : animation.loaderHold;
    const exit = reduced ? 0 : animation.loaderExit;

    document.documentElement.classList.add('is-loading');

    const exitTimer = setTimeout(() => {
      setLeaving(true);
      onExitStart();
    }, hold);
    const doneTimer = setTimeout(onDone, hold + exit);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.documentElement.classList.remove('is-loading');
    };
  }, [onExitStart, onDone]);

  return (
    <div
      className={`loader${leaving ? ' is-leaving' : ''}`}
      role="status"
      style={{
        '--loader-hold': `${animation.loaderHold}ms`,
        '--loader-exit': `${animation.loaderExit}ms`,
      }}
    >
      <span className="sr-only">Loading portfolio</span>
      <div className="loader__mark" aria-hidden="true">
        <span className="loader__ring" />
        <span className="loader__initials">{personal.initials}</span>
      </div>
      <p className="loader__text" aria-hidden="true">
        Welcome
      </p>
      <span className="loader__bar" aria-hidden="true">
        <span className="loader__bar-fill" />
      </span>
    </div>
  );
}
