import { useEffect, useState } from 'react';

const FALLBACK_HEADER_HEIGHT_PX = 72;
const TOP_OFFSET_PX = 24;
const BOTTOM_MARGIN = '-60%';

function readHeaderHeight(): number {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height')
    .trim();
  const parsed = Number.parseFloat(raw);
  return Number.isNaN(parsed) ? FALLBACK_HEADER_HEIGHT_PX : parsed;
}

/**
 * Tracks which of the given section ids is currently in the upper part of
 * the viewport, so a table of contents can highlight it.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const visibleIds = new Set<string>();
    const topMargin = readHeaderHeight() + TOP_OFFSET_PX;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        }

        const firstVisible = ids.find((id) => visibleIds.has(id));
        if (firstVisible) {
          setActiveId(firstVisible);
        }
      },
      { rootMargin: `-${topMargin}px 0px ${BOTTOM_MARGIN} 0px` },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
