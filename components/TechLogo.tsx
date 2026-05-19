import React, { useState } from 'react';

interface TechLogoProps {
  name: string;
  slug?: string;
  logoUrl?: string;
  brandColor?: string;
  wordmark?: boolean;
}

const MONO = 'a1a1aa';
const BRAND_WORDMARKS: Record<string, string> = {
  Axis: 'AXIS',
  Hikvision: 'HIKVISION',
  Panduit: 'PANDUIT',
};

const BrandWordmark: React.FC<{ name: string; color: string }> = ({ name, color }) => {
  const commonProps = {
    role: 'img',
    'aria-label': name,
    style: { ['--brand-color' as string]: color },
    className:
      'h-full w-36 text-text-2 opacity-60 grayscale transition-all duration-300 group-hover:text-[var(--brand-color)] group-hover:opacity-100 group-hover:grayscale-0',
  };

  if (name === 'Panduit') {
    return (
      <svg viewBox="0 0 180 56" {...commonProps}>
        <rect x="8" y="8" width="164" height="40" rx="0" fill="currentColor" />
        <text
          x="90"
          y="35"
          textAnchor="middle"
          fill="#fff"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="20"
          fontWeight="800"
          letterSpacing="2"
        >
          PANDUIT
        </text>
      </svg>
    );
  }

  if (name === 'Hikvision') {
    return (
      <svg viewBox="0 0 210 56" {...commonProps}>
        <text
          x="105"
          y="35"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="25"
          fontWeight="900"
          letterSpacing="0"
        >
          HIKVISION
        </text>
        <rect x="25" y="41" width="160" height="3" fill="currentColor" opacity="0.8" />
      </svg>
    );
  }

  if (name === 'Axis') {
    return (
      <svg viewBox="0 0 170 56" {...commonProps}>
        <text
          x="76"
          y="37"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="32"
          fontWeight="900"
          letterSpacing="1"
        >
          AXIS
        </text>
        <path d="M118 16 L143 40 H128 L112 24 Z" fill="currentColor" opacity="0.9" />
      </svg>
    );
  }

  return null;
};

const TechLogo: React.FC<TechLogoProps> = ({ name, slug, logoUrl, brandColor, wordmark }) => {
  // Source priority: simpleicons (if slug) → logoUrl → text fallback
  const [siFailed, setSiFailed] = useState(false);
  const [urlFailed, setUrlFailed] = useState(false);

  const forceWordmark = Boolean(wordmark || BRAND_WORDMARKS[name]);
  const useSimpleicons = !forceWordmark && Boolean(slug) && !siFailed;
  const useLogoUrl = !forceWordmark && !useSimpleicons && Boolean(logoUrl) && !urlFailed;
  const useText = !useSimpleicons && !useLogoUrl;

  const bg = brandColor || '#2563eb';
  const label = BRAND_WORDMARKS[name] || name;

  return (
    <div className="group relative h-12 flex items-center justify-center">
      {useSimpleicons && slug && (
        <div className="relative w-24 h-full flex items-center justify-center">
          <img
            src={`https://cdn.simpleicons.org/${slug}/${MONO}`}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="absolute inset-0 w-full h-full object-contain opacity-55 group-hover:opacity-0 transition-opacity duration-300"
            onError={() => setSiFailed(true)}
          />
          <img
            src={`https://cdn.simpleicons.org/${slug}`}
            alt={name}
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="relative w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onError={() => setSiFailed(true)}
          />
        </div>
      )}

      {useLogoUrl && logoUrl && (
        <div className="relative w-24 h-full flex items-center justify-center">
          <img
            src={logoUrl}
            alt={name}
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-contain opacity-55 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
            onError={() => setUrlFailed(true)}
          />
        </div>
      )}

      {forceWordmark && (
        <div className="relative flex h-full w-36 items-center justify-center">
          <BrandWordmark name={name} color={bg} />
        </div>
      )}

      {useText && !forceWordmark && (
        <span
          aria-label={name}
          style={{ ['--brand-bg' as string]: bg }}
          className="inline-flex min-w-[96px] items-center justify-center border border-emphasis bg-surface-2 px-3 py-2 text-center font-mono text-[12px] font-semibold uppercase tracking-wider text-text-2 transition-colors duration-200 group-hover:border-[var(--brand-bg)] group-hover:bg-[var(--brand-bg)] group-hover:text-white"
        >
          {label}
        </span>
      )}

      <span
        role="tooltip"
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-text-1 bg-surface-2 border border-emphasis px-2 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
      >
        {name}
      </span>
    </div>
  );
};

export default TechLogo;
