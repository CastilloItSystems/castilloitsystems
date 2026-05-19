import React from 'react';

type LedState = 'ok' | 'warn' | 'err' | 'idle';

interface Led {
  state?: LedState;
  blink?: boolean;
}

interface ScadaBarProps {
  label: string;
  code?: string;
  leds?: Led[];
  className?: string;
  align?: 'start' | 'between';
}

const STATE_COLOR: Record<LedState, string> = {
  ok: 'bg-scada-ok',
  warn: 'bg-scada-warn',
  err: 'bg-scada-err',
  idle: 'bg-text-mute',
};

const DEFAULT_LEDS: Led[] = [
  { state: 'ok', blink: true },
  { state: 'warn' },
  { state: 'idle' },
];

const ScadaBar: React.FC<ScadaBarProps> = ({
  label,
  code,
  leds = DEFAULT_LEDS,
  className = '',
  align = 'start',
}) => {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-text-3 ${
        align === 'between' ? 'justify-between' : ''
      } ${className}`}
    >
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {leds.map((led, i) => (
          <span
            key={i}
            className={`size-1.5 rounded-full ${STATE_COLOR[led.state ?? 'idle']} ${
              led.blink ? 'animate-scada-blink' : ''
            }`}
          />
        ))}
      </div>
      <span className="text-text-3">{label}</span>
      {code && <span className="text-text-mute tabular-nums">{code}</span>}
    </div>
  );
};

export default ScadaBar;
