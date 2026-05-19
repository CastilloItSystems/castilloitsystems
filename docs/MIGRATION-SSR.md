# Plan de migración a SSR · Astro recomendado

Documento de planificación. **No ejecutar sin revisar primero.**

## Por qué SSR/SSG

React + Vite + BrowserRouter sigue siendo Client-Side Rendering (CSR). Google y otros crawlers ejecutan JavaScript, pero:

- **Latencia de indexación**: contenido tras JS tarda más en indexar
- **Crawlers no-Google** (Bing, redes sociales, LinkedIn preview) muchas veces no ejecutan JS
- **OG cards** no funcionan bien sin HTML pre-renderizado
- **LCP penalizado**: el HTML inicial no tiene contenido útil
- **Core Web Vitals** SEO-ranking: SSR/SSG mejora directamente FCP y LCP

Para una landing de marketing 100% pública, SSR/SSG es la decisión correcta. El sitio no tiene contenido dinámico per-user — todo puede pre-renderizarse en build.

## Opciones evaluadas

### Astro (RECOMENDADO)

**Pros:**
- Diseñado exactamente para sitios marketing/contenido
- Pre-renderiza todo a HTML estático por defecto (SSG)
- "Islands architecture": React solo donde lo necesitas (AIChat, ExitIntent, calculadoras), resto es HTML puro
- 10-30× menos JS al cliente que CSR
- Compatible 100% con componentes React existentes (los importas tal cual)
- Soporte nativo para sitemap, RSS, feeds
- Excelente DX, hot reload rápido

**Contras:**
- Stack adicional a aprender (sintaxis `.astro`)
- Para componentes interactivos sigues escribiendo React
- Imágenes optimizadas con sintaxis distinta (`<Image />` de Astro)

**Bundle típico para esta landing tras migración**: ~15-30KB JS gz (vs 70KB actual)

### Next.js 14 App Router

**Pros:**
- Mismo stack que NomiSys backend (Next.js 13)
- React Server Components (RSC) potentes
- Edge runtime opcional
- Más control si necesitas auth/cookies en SSR

**Contras:**
- Sobre-equipado para una landing pública
- Más boilerplate
- Imágenes con `next/image` (otro componente)
- Hidratación más pesada que Astro

**Cuándo elegirlo**: si planeas convertir el sitio en app autenticada (panel cliente, área miembros) más adelante.

### Veredicto

**Astro** para esta landing. NomiSys puede seguir en Next.js 13 (es app, no landing). Stack diferente entre marketing y producto es correcto.

---

## Plan de migración (Astro)

### Fase 0 · Decisión

- [ ] Confirmar Astro como destino
- [ ] Confirmar deploy target (Vercel/Netlify ambos soportan Astro)
- [ ] Crear branch `astro-migration`

### Fase 1 · Setup base

```bash
git checkout -b astro-migration
npm create astro@latest -- --template minimal --typescript strict --no-install astro-tmp
# Copiar configs de astro-tmp al proyecto y ajustar
npm install astro @astrojs/react @astrojs/tailwind @astrojs/sitemap
```

Mover:
- `src/styles/globals.css` → mantener
- `tailwind.config.ts` → mantener (Astro lo lee)
- `components/*` → mantener (React funciona en Astro)
- `lib/*` → mantener
- `hooks/*` → mantener
- `services/*` → mantener
- `public/*` → mantener (Astro sirve igual)

Crear `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://castilloitsystems.com',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }), // usamos globals.css custom
    sitemap(),
  ],
  output: 'static', // SSG
});
```

### Fase 2 · Layouts y páginas

Crear `src/layouts/Layout.astro` con todo lo que hoy hace `components/Layout.tsx`:

```astro
---
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
// ...

interface Props {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}
const { title, description, path, keywords = [] } = Astro.props;
const canonical = `https://castilloitsystems.com${path}`;
---

<!DOCTYPE html>
<html lang="es-VE">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <!-- todos los meta tags geo, OG, etc -->
    <link rel="canonical" href={canonical} />
    <!-- StructuredData JSON-LD -->
  </head>
  <body>
    <Navbar client:load />          {/* React island, hidrata al cargar */}
    <main>
      <slot />
    </main>
    <Footer client:visible />        {/* hidrata cuando es visible */}
    <WhatsAppButton client:idle />   {/* hidrata cuando el browser está idle */}
  </body>
</html>
```

Convertir cada page React a `.astro`:

- `pages/Home.tsx` → `src/pages/index.astro`
- `pages/Software.tsx` → `src/pages/software/index.astro`
- `pages/software/Nomisys.tsx` → `src/pages/software/nomisys.astro`
- `pages/software/Autosys.tsx` → `src/pages/software/autosys.astro`
- `pages/software/Refinery.tsx` → `src/pages/software/refinery.astro`
- `pages/software/Gym.tsx` → `src/pages/software/gym.astro`
- `pages/Infrastructure.tsx` → `src/pages/infraestructura.astro`
- `pages/Security.tsx` → `src/pages/seguridad.astro`
- `pages/Portfolio.tsx` → `src/pages/portfolio.astro`
- `pages/Contact.tsx` → `src/pages/contacto.astro`
- `pages/About.tsx` → `src/pages/sobre-nosotros.astro`
- `pages/Recursos.tsx` → `src/pages/recursos/index.astro`
- `pages/recursos/Article.tsx` → `src/pages/recursos/[slug].astro` (dynamic route)
- `pages/NotFound.tsx` → `src/pages/404.astro`

Patrón: en cada `.astro` envolver el contenido React existente:

```astro
---
import Layout from '@/layouts/Layout.astro';
import Hero from '@/components/Hero';
import NomiSysCalculator from '@/components/NomiSysCalculator';
---

<Layout
  title="NomiSys · Software de nómina petrolera CCP"
  description="..."
  path="/software/nomisys"
>
  <Hero />                                          {/* React, sin hydration = HTML puro */}
  <NomiSysCalculator client:visible />              {/* React, hidrata cuando visible */}
</Layout>
```

**Directivas client:**

| Directiva | Cuándo hidrata | Usar para |
|-----------|----------------|-----------|
| (ninguna) | nunca | Componentes de solo presentación |
| `client:load` | inmediato | Navbar (interacciones desde el inicio) |
| `client:idle` | tras requestIdleCallback | WhatsAppButton, footer |
| `client:visible` | al entrar viewport | Calculadoras, AIChat |
| `client:media` | si media query matches | Mobile-only o desktop-only |

### Fase 3 · Routing y links

`react-router-dom` se elimina. Astro usa file-system routing nativo. Reemplazar:

- `<Link to="/foo">` → `<a href="/foo">` (en .astro)
- `useLocation()` → `Astro.url.pathname` (en .astro) o `window.location` (en React island)
- `useNavigate()` → `<a>` normal o `window.location.href = ...`

Para componentes React que se mantienen y usan router: pasar location como prop desde Astro.

### Fase 4 · SEO mejorado

- `react-helmet-async` se elimina. SEO meta tags van en el `<head>` del Layout.astro
- Schema.org JSON-LD se inyecta directamente en HTML (no necesita hydration)
- `@astrojs/sitemap` genera sitemap.xml automático al build
- Eliminar `public/sitemap.xml` manual

### Fase 5 · Imágenes

Sustituir `vite-imagetools` por `@astrojs/image` o el built-in `Image` de Astro:

```astro
---
import { Image } from 'astro:assets';
import nomisysImg from '@/public/img/products/nomisys-dashboard.jpg';
---

<Image
  src={nomisysImg}
  alt="NomiSys dashboard"
  width={1600}
  height={1000}
  format="avif"
  loading="lazy"
/>
```

Astro genera AVIF/WebP automáticamente, similar al pipeline actual.

### Fase 6 · Eliminar lo que sobra

- `react-router-dom` → eliminar
- `react-helmet-async` → eliminar
- `vite-imagetools` → eliminar (Astro tiene su propio pipeline)
- `App.tsx`, `index.tsx` → eliminar (Astro maneja el entry)
- `HelmetProvider`, `MotionProvider` → ahora vive en Layout.astro
- `hooks/useRevealOnScroll` → puede quedar, ahora opera en React islands

### Fase 7 · Testing

- [ ] `npm run build` exitoso
- [ ] Cada ruta abre correctamente
- [ ] View source: HTML completo (no `<div id="root"></div>` vacío)
- [ ] Lighthouse SEO = 100, Performance ≥ 95
- [ ] Calculadoras NomiSys + Autosys funcionan (hidratación)
- [ ] AIChat carga y abre
- [ ] WhatsApp button funciona
- [ ] ExitIntent dispara
- [ ] CookieBanner funciona
- [ ] LeadForm submits a n8n
- [ ] Dropdown navbar funciona
- [ ] StickyMobileCTA aparece móvil
- [ ] 404 personalizada se sirve correctamente
- [ ] sitemap.xml generado
- [ ] robots.txt sigue funcionando

### Fase 8 · Deploy

- Vercel/Netlify detectan Astro automático
- Variables de entorno mismas (no cambia n8n/Plausible/Gemini)
- Eliminar `vercel.json` rewrites (no necesarios en SSG)

---

## Estimación de esfuerzo

- Setup base + layout: 2-3 horas
- Conversión 14 páginas: 6-10 horas
- Adaptar routing y links: 1-2 horas
- Imágenes y SEO: 2 horas
- Testing + ajustes: 2-3 horas

**Total: 1.5-2 días de trabajo dedicado**

## Riesgos

1. **react-router-dom dependencies en componentes React**: hay que pasar props o usar window.location. Refactor moderado.
2. **HelmetProvider context**: se elimina, SEO va al HTML directo. Cambio masivo de Helmet a `<head>` Astro.
3. **Motion (Framer Motion)**: funciona pero requiere `client:visible` o `client:load`. Verificar animaciones.
4. **AnimatePresence entre rutas**: en Astro las rutas son full page loads (a menos que actives view transitions). El efecto de transición entre rutas requiere [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/).

## Alternativa "lite": solo SSG con Vite

Si Astro se ve sobre-equipado, hay opción minimalista: usar `vite-plugin-ssg` para pre-renderizar las rutas actuales. Menos cambio, pero también menos beneficio (sigues enviando todo el JS de React).

**Recomendación**: ir directo con Astro. La ganancia de bundle size y SEO justifica el refactor único.

---

## Beneficio esperado tras migración

| Métrica | Antes (CSR) | Después (Astro SSG) |
|---------|------------|---------------------|
| JS inicial gz | ~130 KB | ~15-30 KB |
| FCP | ~1.2s | ~0.4s |
| LCP | ~1.8s | ~0.7s |
| Lighthouse Performance | 85-90 | 95-100 |
| Lighthouse SEO | 92 | 100 |
| Indexación Google | 1-2 sem | horas |
| OG cards LinkedIn/WhatsApp | quebradas a veces | perfectas siempre |
