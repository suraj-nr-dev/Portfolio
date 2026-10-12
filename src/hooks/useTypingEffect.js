import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../utils/motion.js';

/**
 * Types each word, pauses, deletes it, then moves to the next one.
 * `words` must be a stable array (e.g. from portfolioData).
 * With reduced motion enabled it simply shows the first word.
 */
export default function useTypingEffect(
  words,
  { typeSpeed = 70, deleteSpeed = 38, pause = 1600, enabled = true } = {},
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (!enabled || reduced || words.length === 0) return undefined;

    const word = words[wordIndex];
    const finishedTyping = !deleting && text === word;
    const finishedDeleting = deleting && text === '';

    let delay = deleting ? deleteSpeed : typeSpeed;
    if (finishedTyping) delay = pause;
    if (finishedDeleting) delay = 320;

    const timer = setTimeout(() => {
      if (finishedTyping) {
        setDeleting(true);
      } else if (finishedDeleting) {
        setDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [words, wordIndex, text, deleting, typeSpeed, deleteSpeed, pause, enabled, reduced]);

  return reduced ? (words[0] ?? '') : text;
}
