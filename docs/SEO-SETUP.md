# SEO Setup · Checklist externa

Tareas que viven fuera del código y requieren acción manual en plataformas externas.

## Google Business Profile (PRIORIDAD ALTA)

Local SEO #1 — aparecer en Google Maps y "ingenieros TI cerca de mí" en Anzoátegui.

1. Crear cuenta en https://business.google.com
2. Datos NAP (Name · Address · Phone) — usar exactamente como en el sitio:
   - **Nombre**: Castillo IT Systems
   - **Dirección**: Av. Raúl Leoni, Urb. Fundación Barcelona, Barcelona 6001, Anzoátegui, Venezuela
   - **Teléfono**: +58 412-770-5451
3. Categoría principal: **Software Company**. Secundarias: Computer Networking Service, Computer Security Service, Information Technology Company
4. Horario: Lun-Vie 08:00-17:00
5. Verificar por postal o teléfono
6. Subir 8-15 fotos: oficina, equipo, racks (caso Maroil), screenshots productos
7. Servicios listados: NomiSys, Castillo Refinery, Cableado Estructurado, CCTV, Firewall Fortinet
8. Solicitar reviews a 5-10 clientes existentes (Maroil, Cimer, etc.)

## Google Search Console

1. Acceder https://search.google.com/search-console
2. Agregar propiedad de dominio `castilloitsystems.com`
3. Verificar via DNS TXT record (más estable que HTML tag)
4. Subir sitemap: `https://castilloitsystems.com/sitemap.xml`
5. Inspeccionar URL principal, solicitar indexación
6. Revisar Core Web Vitals semanalmente

## Bing Webmaster Tools

1. Acceder https://www.bing.com/webmasters
2. Importar desde Search Console (rápido) o verificar dominio
3. Subir mismo sitemap

## Citations NAP

Listar en directorios para refuerzo local SEO. Usar NAP idéntico:

- [ ] Páginas Amarillas Venezuela (paginasamarillas.com.ve)
- [ ] Guía Empresas Venezuela
- [ ] LinkedIn Company Page
- [ ] Facebook Business
- [ ] Instagram Business (vincular a perfil personal)

## OG Image

Crear `public/og-image.jpg` · 1200×630 px · ≤ 200KB · contiene:
- Logo Castillo IT
- Texto principal: "Software a medida · Infraestructura Tier-1"
- Subtexto: "Anzoátegui · Venezuela"
- Paleta sitio (negro + azul brand)

Esta imagen aparece en compartidos WhatsApp, Telegram, LinkedIn, Twitter.

## Verificación rich snippets

Después del deploy, validar schema.org:
- https://search.google.com/test/rich-results — pegar URL
- https://validator.schema.org

Buscar warnings sobre LocalBusiness, SoftwareApplication, FAQPage.

## Google Ads (opcional)

Si vas a hacer campañas pagas:
1. Vincular Google Ads con Search Console
2. Vincular con Google Business Profile
3. Configurar conversiones (lead form submit, WhatsApp click) vía Google Tag

## Métricas a monitorear (mensual)

- Posición promedio para keywords: "nómina petrolera venezuela", "software ccp pdvsa", "infraestructura ti anzoátegui"
- Impresiones y CTR en Search Console
- Reseñas Google Business (objetivo: 4.8+ con 20+ reviews en 6 meses)
- Tráfico orgánico vs directo (Plausible)
