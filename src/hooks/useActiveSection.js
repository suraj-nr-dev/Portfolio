import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing the middle of the
 * viewport, used for the navbar's active-link highlight.
 * `ids` must be a stable array.
 */
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // A thin band around the vertical centre of the screen
      { rootMargin: '-45% 0px -50% 0px' },
    );

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
