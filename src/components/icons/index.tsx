import type { SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function SunIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M20.5 14.2a8.5 8.5 0 1 1-9.7-11 7 7 0 0 0 9.7 11Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function LocationPinIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

export function MotionIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 12a9 9 0 1 1 9 9" />
      <path d="M3 12v5.5H8.5" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 9.5v4.2" />
      <circle cx="12" cy="16.8" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HistoryIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.7-6.2" />
      <path d="M3.5 4.5v4.3h4.3" />
      <path d="M12 7.8V12l3 2" />
    </svg>
  );
}

export function HeartPulseIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3.5 12.5h4l1.7-3.4 2.3 6 1.8-4.6h3.2" />
      <path d="M20.5 12.5c0 3.7-4.3 6.6-8.5 8.5-4.2-1.9-8.5-4.8-8.5-8.5a4.6 4.6 0 0 1 8.5-2.4 4.6 4.6 0 0 1 8.5 2.4Z" />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6 10.5a6 6 0 0 1 12 0c0 3.4 1 5 2 6.2H4c1-1.2 2-2.8 2-6.2Z" />
      <path d="M9.8 19.5a2.3 2.3 0 0 0 4.4 0" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.2 19.5 6v6c0 5-3.2 7.8-7.5 9-4.3-1.2-7.5-4-7.5-9V6Z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3.1" />
    </svg>
  );
}

export function WristbandIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="5.2" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <path d="M9.5 3.2h5l.6 3.6h-6.2ZM9.5 20.8h5l.6-3.6h-6.2Z" />
    </svg>
  );
}

export function ChipIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 3.2v2.3M12 3.2v2.3M15 3.2v2.3M9 18.5v2.3M12 18.5v2.3M15 18.5v2.3M3.2 9h2.3M3.2 12h2.3M3.2 15h2.3M18.5 9h2.3M18.5 12h2.3M18.5 15h2.3" />
    </svg>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <ellipse cx="12" cy="5.8" rx="7.5" ry="2.6" />
      <path d="M4.5 5.8v5.2c0 1.4 3.4 2.6 7.5 2.6s7.5-1.2 7.5-2.6V5.8" />
      <path d="M4.5 11v6.4c0 1.4 3.4 2.6 7.5 2.6s7.5-1.2 7.5-2.6V11" />
    </svg>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.8" />
      <path d="M8.5 20.5h7M12 16.5v4" />
      <path d="M6.5 8.2h5.5M6.5 11.2h3.2" />
    </svg>
  );
}

export function ServerIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3.5" y="4" width="17" height="6.5" rx="1.6" />
      <rect x="3.5" y="13.5" width="17" height="6.5" rx="1.6" />
      <circle cx="7" cy="7.25" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="7" cy="16.75" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PulseSpikeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2.5 13h4l2-7 3 13 2.5-9.5 1.5 3.5h6" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.2 12.3l2.5 2.5 5-5.4" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 19.5v-15M6 10.5l6-6 6 6" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M9 19.5c-4.2 1.35-4.2-2.1-6-2.55M17 22v-3.09c0-.86.3-1.42.63-1.71-2.2-.25-4.5-1.1-4.5-4.9 0-1.08.38-1.97 1.02-2.66-.1-.25-.44-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.54 1.37.2 2.39.1 2.64.64.7 1.02 1.58 1.02 2.66 0 3.81-2.31 4.65-4.51 4.9.35.31.67.91.67 1.85V22" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M7.5 10.2v6.3M7.5 7.6v.02" />
      <path d="M11.5 16.5v-3.6c0-1.3.9-2.2 2.1-2.2s2.1.9 2.1 2.2v3.6M11.5 10.2v6.3" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="m4 6.5 8 6 8-6" />
    </svg>
  );
}
