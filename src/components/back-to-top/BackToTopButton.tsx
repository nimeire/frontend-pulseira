import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '../icons';
import { getScrollBehavior } from '../../utils/scroll';
import styles from './BackToTopButton.module.css';

const SHOW_AFTER_PX = 600;

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const update = () => setIsVisible(window.scrollY > SHOW_AFTER_PX);

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Voltar ao topo da página"
      onClick={() => window.scrollTo({ top: 0, behavior: getScrollBehavior() })}
    >
      <ArrowUpIcon />
    </button>
  );
}
