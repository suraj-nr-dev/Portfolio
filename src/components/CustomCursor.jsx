import { useEffect, useRef, useState } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../utils/motion.js';
import '../styles/CustomCursor.css';

// Elements that make the follower ring grow
const HOVER_TARGETS = 'a, button, label, [data-cursor="hover"]';
const TEXT_TARGETS = 'input, textarea';

/**
 * A small dot that tracks the pointer plus a ring that trails behind it.
 * Only mounts on mouse/trackpad devices without reduced motion, so touch
 * devices and keyboard users keep the native behaviour.
 * Positions are written straight to the DOM (no React state per frame).
 */
export default function CustomCursor() {
  const [enabled] = useState(() => hasFinePointer() && !prefersReducedMotion());
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const root = document.documentElement;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trail = { ...target };
    let frame = 0;

    root.classList.add('has-custom-cursor');

    const render = () => {
      // Ease the ring toward the pointer for the trailing effect
      trail.x += (target.x - trail.x) * 0.18;
      trail.y += (target.y - trail.y) * 0.18;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      ring.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const handleMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      root.classList.add('cursor-visible');
    };

    const handleOver = (event) => {
      const el = event.target instanceof Element ? event.target : null;
      root.classList.toggle('cursor-hover', Boolean(el?.closest(HOVER_TARGETS)));
      root.classList.toggle('cursor-text', Boolean(el?.closest(TEXT_TARGETS)));
    };

    const handleDown = () => root.classList.add('cursor-down');
    const handleUp = () => root.classList.remove('cursor-down');
    const handleLeave = () => root.classList.remove('cursor-visible');

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    root.addEventListener('mouseleave', handleLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      root.removeEventListener('mouseleave', handleLeave);
      root.classList.remove(
        'has-custom-cursor',
        'cursor-visible',
        'cursor-hover',
        'cursor-text',
        'cursor-down',
      );
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor__ring">
        <span />
      </div>
      <div ref={dotRef} className="cursor__dot">
        <span />
      </div>
    </div>
  );
}
