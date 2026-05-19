# Pendientes · pasos para producción

Lista verificable de lo que falta antes de publicar el sitio.

---

## 1. Variables de entorno

Copia `.env.example` → `.env.local` y completa:

```bash
cp .env.example .env.local
```

Variables a llenar:

- [ ] `GEMINI_API_KEY` — chatbot AIChat. Obtener en https://aistudio.google.com/app/apikey
- [ ] `PLAUSIBLE_DOMAIN` — dominio real (`castilloitsystems.com`). Crear cuenta en https://plausible.io
- [ ] `GA_MEASUREMENT_ID` — opcional. Solo si usas Google Ads
- [ ] `N8N_WEBHOOK_URL` — URL del webhook n8n que recibe leads
- [ ] `N8N_WEBHOOK_TOKEN` — token de validación (header X-Webhook-Token)

Setup n8n en `docs/N8N-WEBHOOK.md`.

---

## 2. Assets gráficos

### Logo (alta prioridad)
- [ ] `public/img/logo.svg` ← ya hay placeholder `cit`. Reemplazar con logo final cuando lo tengas
- [ ] `public/favicon.svg` ← placeholder
- [ ] `public/og-image.jpg` (1200×630, ≤ 200KB) ← falta crear

### Screenshots productos (`public/img/products/`)
- [ ] `nomisys-dashboard.webp` · `nomisys-empleados.webp` · `nomisys-corrida.webp`
- [ ] `autosys-orden-trabajo.webp` · `autosys-inventario.webp` · `autosys-productividad.webp`
- [ ] `refinery-scada.webp` · `refinery-scada-detalle.webp` · `refinery-laboratorio.webp` · `refinery-thinking.webp` · `refinery-despacho.webp`
- [ ] `gym-biometria.webp` · `gym-acceso-live.webp` · `gym-membresias.webp` · `gym-analitica.webp` · `gym-app-cliente.webp`

### Casos de éxito (`public/img/cases/`)
- [ ] `caso-nomisys-petrolera.webp` · `caso-refinery-planta.webp` · `caso-autosys-taller.webp`
- [ ] `caso-cimer-clinica.webp` · `caso-gym-acceso.webp` · `caso-maroil-rack.webp` · `caso-banca-firewall.webp`
- [ ] Before/After: `caso-maroil-bvc-antes.webp` + `caso-maroil-bvc-despues.webp` · `caso-control-antes.webp` + `caso-control-despues.webp`

### Equipo / oficina (`public/img/team/`)
- [ ] `fundador.webp` (800×800) · `oficina-anzoategui.webp` (1600×1000)
- [ ] Fotos de testimonios reales: `testimonio-1.webp`, `testimonio-2.webp`, `testimonio-3.webp`, `testimonio-autosys-1.webp`, `testimonio-autosys-2.webp`, `testimonio-autosys-3.webp`

Ver `docs/ASSETS-GUIDE.md` para dimensiones exactas. Sin assets reales, los placeholders muestran instrucciones visualmente.

---

## 3. Testimonios reales

Componentes `Testimonials` traen `[TESTIMONIO PENDIENTE]` como nombre por defecto. Editar en:

- `components/Testimonials.tsx` → `DEFAULT_TESTIMONIALS` (NomiSys + generales)
- `pages/software/Autosys.tsx` → `AUTOSYS_TESTIMONIALS`

Reemplazar quote, name, role, company y photoFile por datos reales con autorización del cliente.

---

## 4. SEO externo (Google Business Profile)

Ver `docs/SEO-SETUP.md` para checklist completa:

- [ ] Registrar Google Business Profile (https://business.google.com)
- [ ] Verificar dominio en Google Search Console
- [ ] Subir `sitemap.xml` en Search Console
- [ ] Registrar Bing Webmaster Tools
- [ ] Solicitar 5-10 reviews iniciales

---

## 5. Deploy

Recomendado:
- **Vercel**: deploy estático directo desde GitHub. Variables de entorno en dashboard
- **Netlify**: igual
- **Self-hosted**: `npm run build` → servir `dist/` con nginx

Nota: HashRouter (URL con `#/`) no requiere config de servidor para rutas. Si quieres URLs limpias (`/software/nomisys` sin `#`), cambiar a `BrowserRouter` y agregar fallback `index.html` en el servidor.

---

## 6. Analytics

Ver `docs/PLAUSIBLE-SETUP.md`:

- [ ] Configurar goals en Plausible dashboard: `lead_form_submit`, `whatsapp_click`, `nomisys_calculator_use`, `nomisys_demo_request`
- [ ] (Opcional) Configurar GA4 si vas a usar Google Ads

---

## Resumen prioridad

**Bloqueante para publicar:**
1. Variables `.env.local` (mínimo Gemini para chat)
2. Logo real + og-image
3. Deploy

**Bloqueante para captar leads:**
4. n8n webhook URL + token (ver `docs/N8N-WEBHOOK.md`)
5. PDF lead magnet · `public/guia-ccp-2026.pdf` (entregable que ExitIntent ofrece) · 30-50 páginas con cálculos CCP. Mientras no existe, n8n recibe el lead pero no hay descarga real — agregar nodo en n8n para enviar PDF por email cuando `source: exit-intent-lead-magnet`.

**Importante para conversión:**
5. Screenshots reales productos
6. Testimonios reales
7. Google Business Profile

**Mejora continua:**
8. Plausible/GA4
9. Resto de imágenes
