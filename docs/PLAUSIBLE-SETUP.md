# Analytics Setup · Plausible + GA4

## Variables de entorno

Crear `.env.local` con:

```
GEMINI_API_KEY=tu_key_gemini
PLAUSIBLE_DOMAIN=castilloitsystems.com
GA_MEASUREMENT_ID=G-XXXXXXXXXX
FORMSPREE_LEAD_FORM=abcdwxyz
FORMSPREE_CONTACT_FORM=efghijkl
```

Vite las expone vía `process.env.*` en build.

## Plausible Analytics

1. Cuenta en https://plausible.io ($9/mes single domain). Alternativa self-host: https://plausible.io/docs/self-hosting
2. Agregar dominio `castilloitsystems.com`
3. El sitio ya inyecta el script via `hooks/useAnalytics.ts` cuando `PLAUSIBLE_DOMAIN` está definido
4. Sin cookies → sin banner GDPR requerido (Plausible es privacy-friendly por defecto)
5. Configurar goals en dashboard:
   - `lead_form_submit` (visita objetivo)
   - `whatsapp_click`
   - `nomisys_calculator_use`
   - `nomisys_demo_request`

## Google Analytics 4 (opcional, solo si necesitas integración Google Ads)

1. Crear propiedad GA4 en https://analytics.google.com
2. Copiar Measurement ID (formato `G-XXXXXXXXXX`)
3. Ponerlo en `.env.local` como `GA_MEASUREMENT_ID`
4. GA solo carga si el usuario acepta en el CookieBanner

## Formspree

1. Cuenta en https://formspree.io (gratis hasta 50 envíos/mes; $10/mes ilimitado)
2. Crear dos formularios:
   - "Lead Form Modal" → notificar a `castilloitsystems@gmail.com`
   - "Contact Page" → notificar a `castilloitsystems@gmail.com`
3. Copiar los form IDs (parte después de `/f/` en la URL)
4. Si `FORMSPREE_LEAD_FORM` está vacío, el form sigue funcionando en modo simulado (no envía)

Alternativas si prefieres no Formspree:
- **EmailJS**: cliente-side, envía directo a Gmail/Outlook con tu cuenta
- **n8n webhook**: si ya tienes n8n self-hosted, expón un webhook
- **Backend Express en NomiSys**: agregar endpoint `/api/leads` con mailer SendGrid/Resend

## Verificación

1. Visitar el sitio en producción
2. Plausible dashboard: ver pageviews en tiempo real
3. Enviar lead form de prueba: recibir email Formspree + ver evento `lead_form_submit` en Plausible
4. Click WhatsApp flotante: ver evento `whatsapp_click` con prop `page`
