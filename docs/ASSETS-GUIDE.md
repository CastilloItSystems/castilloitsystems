# Guía de Assets · Castillo IT Systems

Cómo reemplazar los placeholders del sitio con imágenes reales.

## Estructura

```
public/img/
├── products/      # screenshots productos
├── cases/         # fotos casos de éxito
└── team/          # fotos equipo y oficina
```

## Productos (`public/img/products/`)

| Archivo | Página | Recomendado | Notas |
|---------|--------|-------------|-------|
| `nomisys-dashboard.webp` | Software, Home | 1600×1000 | Pantalla principal corrida de nómina |
| `nomisys-empleados.webp` | Software | 1600×1000 | Lista empleados con filtros |
| `nomisys-corrida.webp` | Software | 1600×1000 | Vista detalle de corrida con líneas |
| `refinery-scada.webp` | Software, Home | 1600×1000 | Visualización SCADA crudo |
| `autosys-orden-trabajo.webp` | Software, Home | 1600×1000 | Orden de servicio mecánico |
| `gym-biometria.webp` | Software, Home | 1600×1000 | Panel control acceso |

## Casos de éxito (`public/img/cases/`)

| Archivo | Página | Recomendado |
|---------|--------|-------------|
| `caso-nomisys-petrolera.webp` | Portfolio | 1200×800 |
| `caso-refinery-planta.webp` | Portfolio | 1200×800 |
| `caso-autosys-taller.webp` | Portfolio | 1200×800 |
| `caso-cimer-clinica.webp` | Portfolio | 1200×800 |
| `caso-gym-acceso.webp` | Portfolio | 1200×800 |
| `caso-maroil-rack.webp` | Portfolio | 1200×800 |
| `caso-banca-firewall.webp` | Portfolio | 1200×800 |
| `caso-maroil-bvc-antes.webp` | Portfolio (slider) | 1600×1000 |
| `caso-maroil-bvc-despues.webp` | Portfolio (slider) | 1600×1000 |
| `caso-control-antes.webp` | Portfolio (slider) | 1600×1000 |
| `caso-control-despues.webp` | Portfolio (slider) | 1600×1000 |

## Equipo (`public/img/team/`)

| Archivo | Página | Recomendado |
|---------|--------|-------------|
| `fundador.webp` | Home, Contact | 800×800 cuadrada |
| `oficina-anzoategui.webp` | Contact | 1600×1000 |
| `team-grupo.webp` | Home | 1600×1000 |

## Open Graph

| Archivo | Uso | Tamaño |
|---------|-----|--------|
| `public/og-image.jpg` | Compartir social/WhatsApp | 1200×630 obligatorio |

## Formato

- **Preferido: WebP** (50-70% más liviano que JPG con misma calidad)
- Generar con `cwebp -q 82 input.jpg -o output.webp`
- Logos: SVG si están disponibles; PNG transparente si no
- og-image: JPG 1200×630 (mejor compatibilidad WhatsApp/LinkedIn)

## Inyección

Cuando tengas la imagen real, simplemente pásala al `ImagePlaceholder` vía prop `src`:

```tsx
<ImagePlaceholder
  src="/img/products/nomisys-dashboard.webp"
  alt="NomiSys · Corrida de nómina mensual"
  fileName="nomisys-dashboard.webp"
  width={1600}
  height={1000}
/>
```

Sin `src` muestra placeholder visual con instrucciones.
