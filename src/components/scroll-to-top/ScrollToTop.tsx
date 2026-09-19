import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getScrollBehavior } from '../../utils/scroll';

/**
 * Resets scroll position on every route change. When the new URL carries a
 * hash (e.g. a footer link to `/sobre#beneficios`), scrolls that section
 * into view instead of jumping to the top. Hash changes within the same page
 * scroll smoothly (unless the user prefers reduced motion).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    const isSamePage = previousPathname.current === pathname;
    previousPathname.current = pathname;

    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({
          block: 'start',
          behavior: isSamePage ? getScrollBehavior() : 'auto',
        });
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
