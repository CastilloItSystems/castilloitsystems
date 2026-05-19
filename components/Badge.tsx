import React from 'react';

type Variant = 'default' | 'brand' | 'ok' | 'warn' | 'mono';

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

const STYLES: Record<Variant, string> = {
  default: 'border-DEFAULT text-text-2 bg-surface-1',
  brand: 'border-brand/40 text-brand bg-brand/10',
  ok: 'border-ok/40 text-ok bg-ok/10',
  warn: 'border-warn/40 text-warn bg-warn/10',
  mono: 'border-DEFAULT text-text-3 bg-transparent font-mono',
};

const DOT_COLOR: Record<Variant, string> = {
  default: 'bg-text-3',
  brand: 'bg-brand',
  ok: 'bg-ok',
  warn: 'bg-warn',
  mono: 'bg-ok',
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  dot = false,
  pulse = false,
  className = '',
}) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border text-[11px] font-medium tracking-wide ${STYLES[variant]} ${className}`}
  >
    {dot && (
      <span className={`size-1.5 rounded-full ${DOT_COLOR[variant]} ${pulse ? 'animate-pulse' : ''}`} />
    )}
    {children}
  </span>
);

export default Badge;
