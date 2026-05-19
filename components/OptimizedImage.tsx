import React from 'react';

type PictureSource = {
  srcset: string;
  type: string;
};

interface PictureModule {
  sources: PictureSource[];
  img: { src: string; w?: number; h?: number };
}

interface OptimizedImageProps {
  picture?: PictureModule | { default: PictureModule };
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  sizes?: string;
}

/**
 * Wrapper para imágenes optimizadas con vite-imagetools.
 *
 * Uso:
 *   import heroImg from '@/public/img/hero.jpg?optimize'
 *   <OptimizedImage picture={heroImg} alt="..." />
 *
 * vite-imagetools genera AVIF + WebP + JPG automáticamente.
 *
 * Para imágenes que aún no existen, pasar src directo y el componente actúa como <img> normal.
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  picture,
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  fetchPriority = 'auto',
  className = '',
  sizes,
}) => {
  if (picture) {
    const pkg = 'default' in picture ? picture.default : picture;
    return (
      <picture>
        {pkg.sources.map((s) => (
          <source key={s.type} srcSet={s.srcset} type={s.type} sizes={sizes} />
        ))}
        <img
          src={pkg.img.src}
          alt={alt}
          width={width ?? pkg.img.w}
          height={height ?? pkg.img.h}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className={className}
        />
      </picture>
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={className}
      />
    );
  }

  return null;
};

export default OptimizedImage;
