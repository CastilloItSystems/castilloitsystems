# Pipeline de optimización de imágenes

`vite-imagetools` genera automáticamente AVIF + WebP + JPG fallback con compresión calidad 82 cuando importas una imagen con el query `?optimize`.

## Uso básico

```tsx
import OptimizedImage from '@/components/OptimizedImage';

// Importar imagen con sufijo ?optimize
import nomisysImg from '@/public/img/products/nomisys-dashboard.jpg?optimize';

// En el JSX
<OptimizedImage
  picture={nomisysImg}
  alt="NomiSys · dashboard"
  width={1600}
  height={1000}
  loading="lazy"
/>
```

El plugin genera:

```html
<picture>
  <source srcset="...avif" type="image/avif">
  <source srcset="...webp" type="image/webp">
  <img src="...jpg" alt="..." width="1600" height="1000" loading="lazy">
</picture>
```

El navegador elige el formato soportado (AVIF preferido, 50% más liviano que JPG · WebP fallback · JPG último recurso).

## Para LCP (above-the-fold)

```tsx
<OptimizedImage
  picture={heroImg}
  alt="Hero"
  loading="eager"
  fetchPriority="high"
/>
```

## Imágenes que aún no existen

`ImagePlaceholder` (sistema existente) sigue funcionando. Cuando subas la imagen real:

1. Pon el JPG/PNG en `public/img/products/`
2. Importa con `?optimize`
3. Reemplaza `ImagePlaceholder` por `OptimizedImage`

## Recomendaciones de origen

- Fotos: subir JPG calidad alta (90+) — el plugin baja a 82 y comprime mejor que entrada baja
- Screenshots de software: PNG si tiene mucho texto, JPG si es foto/visual
- Logos: SVG (no necesita pipeline)
- Dimensiones recomendadas: 1600×1000 para hero, 800×800 para fotos cuadradas (equipo)

## Sizes responsive (opcional avanzado)

Si quieres srcset con múltiples tamaños:

```tsx
import img from '@/public/img/foo.jpg?w=800;1200;1600&format=avif;webp;jpg&as=picture';
```

Luego en `<OptimizedImage>` pasa `sizes="(max-width: 768px) 100vw, 1200px"`.

## Build time

vite-imagetools corre durante `npm run build`. Tiempo extra: ~200ms por imagen optimizada. Acepable para 10-30 imágenes.
