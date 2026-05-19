import React from 'react';
import { ImageIcon, Camera, LayoutDashboard, Users } from 'lucide-react';

type Kind = 'dashboard' | 'photo' | 'logo' | 'team' | 'case';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  kind?: Kind;
  fileName: string;
  path?: string;
  width?: number;
  height?: number;
  recommendedDims?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

const ICON: Record<Kind, React.ComponentType<{ size?: number; className?: string }>> = {
  dashboard: LayoutDashboard,
  photo: Camera,
  logo: ImageIcon,
  team: Users,
  case: ImageIcon,
};

const KIND_LABEL: Record<Kind, string> = {
  dashboard: 'SCREENSHOT · DASHBOARD',
  photo: 'FOTO REAL',
  logo: 'LOGO',
  team: 'FOTO EQUIPO',
  case: 'CASO DE ÉXITO',
};

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  kind = 'dashboard',
  fileName,
  path = 'public/img/products/',
  width,
  height,
  recommendedDims,
  className = '',
  imgClassName = '',
  priority = false,
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={imgClassName || className}
      />
    );
  }

  const Icon = ICON[kind];
  const aspect = width && height ? `${width}/${height}` : '16/10';

  return (
    <div
      role="img"
      aria-label={`Placeholder · ${alt}`}
      style={{ aspectRatio: aspect }}
      className={`relative w-full overflow-hidden rounded-md border border-dashed border-brand/40 bg-surface-2 flex flex-col items-center justify-center p-6 text-center ${className}`}
    >
      <div className="absolute inset-0 bg-grid-tech opacity-40 pointer-events-none" />
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand">
          {KIND_LABEL[kind]}
        </span>
        <span className="font-mono text-[10px] text-text-mute">{recommendedDims || `${width}×${height}`}</span>
      </div>

      <div className="relative size-12 rounded border border-emphasis flex items-center justify-center text-brand mb-4">
        <Icon size={22} />
      </div>
      <p className="relative text-sm text-text-1 font-semibold mb-1.5 max-w-xs">{alt}</p>
      <p className="relative font-mono text-[11px] text-text-3 mb-3">{fileName}</p>
      <p className="relative font-mono text-[10px] text-text-mute uppercase tracking-widest">
        → {path}
      </p>
    </div>
  );
};

export default ImagePlaceholder;
