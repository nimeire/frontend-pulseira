import type { ComponentType } from 'react';
import { ArrowRightIcon, type IconProps } from '../icons';
import styles from './FlowDiagram.module.css';

export type FlowTone = 'primary' | 'alert';

export interface FlowStage {
  icon: ComponentType<IconProps>;
  label: string;
  tone?: FlowTone;
}

interface FlowDiagramProps {
  stages: FlowStage[];
  ariaLabel: string;
}

export function FlowDiagram({ stages, ariaLabel }: FlowDiagramProps) {
  return (
    <ol className={styles.flow} aria-label={ariaLabel}>
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        const isLast = index === stages.length - 1;
        const stageClass = [
          styles.stage,
          stage.tone === 'alert' ? styles.alert : styles.primary,
        ].join(' ');

        return (
          <li key={stage.label} className={styles.item}>
            <div className={stageClass}>
              <span className={styles.iconWrapper}>
                <Icon />
              </span>
              <span className={styles.label}>{stage.label}</span>
            </div>
            {!isLast && (
              <ArrowRightIcon className={styles.arrow} aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
