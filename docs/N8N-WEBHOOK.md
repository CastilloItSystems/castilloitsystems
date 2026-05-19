# n8n Webhook · captura de leads

El sitio envía leads (auditoría, demos, contacto) a un solo webhook de n8n. El campo `source` indica de qué formulario viene.

## Variables

```env
N8N_WEBHOOK_URL=https://n8n.tudominio.com/webhook/castillo-leads
N8N_WEBHOOK_TOKEN=algun-secret-largo-aleatorio
```

Si `N8N_WEBHOOK_URL` está vacío, los forms muestran success simulado (no se envía nada). Útil en dev.

## Payload que recibe n8n

```jsonc
{
  "source": "lead-form" | "contact-page",
  "name": "Juan Pérez",
  "company": "Industrias C.A.",
  "email": "juan@empresa.com",        // solo contact-page
  "phone": "+58412...",
  "interest": "NomiSys" | "Autosys" | "Refinery" | "Gym" | "Infraestructura" | "Software" | "Seguridad" | "Auditoria" | "Otros",
  "message": "Texto libre",             // solo contact-page
  "received_at": "2026-05-19T14:32:11.000Z",
  "page": "https://castilloitsystems.com/#/software/nomisys",
  "referrer": "https://google.com/...",
  "user_agent": "Mozilla/5.0 ..."
}
```

Headers incluidos:
- `Content-Type: application/json`
- `Accept: application/json`
- `X-Webhook-Token: <N8N_WEBHOOK_TOKEN>` (si está configurado)

## Setup en n8n

### 1. Crear workflow nuevo

Nodo **Webhook**:
- HTTP Method: `POST`
- Path: `castillo-leads` (o lo que prefieras)
- Authentication: `Header Auth` (recomendado)
  - Header Name: `X-Webhook-Token`
  - Header Value: el mismo valor que `N8N_WEBHOOK_TOKEN`
- Response Mode: `Immediately`
- Response Code: `200`
- Response Data: `{"ok":true}`

### 2. Ramificar por `source`

Nodo **Switch** con dos outputs:
- `{{ $json.source }} === "contact-page"` → flujo contacto general
- `{{ $json.source }} === "lead-form"` → flujo demo/auditoría

### 3. Acciones recomendadas

Para cada rama:

**A. Notificación instantánea**
- **Telegram** o **WhatsApp Business Cloud API**: enviar mensaje al equipo comercial con resumen del lead. Ej:
  ```
  🔥 Nuevo lead · {{ $json.interest }}
  {{ $json.name }} · {{ $json.company }}
  📞 {{ $json.phone }}
  💬 {{ $json.message || '—' }}
  Página: {{ $json.page }}
  ```

**B. Email al comercial**
- Nodo **Email Send (SMTP)** o **Gmail OAuth2**
- To: `castilloitsystems@gmail.com`
- Subject: `[Lead · {{ $json.source }}] {{ $json.name }} · {{ $json.interest }}`

**C. Persistir en CRM / Spreadsheet**
- **Google Sheets**: append row
- O **HubSpot / Pipedrive**: create contact + deal
- O **Notion**: append to database

**D. Confirmación al cliente (opcional)**
- Solo si `email` existe (contact-page). Email automático "Recibimos tu solicitud, te contactamos en menos de 2 horas".

### 4. Anti-spam

En el nodo Webhook:
- **Rate limiting** via reverse proxy (nginx/Caddy) sobre el path
- Validar `X-Webhook-Token` (n8n lo hace si configuras Header Auth)
- (Opcional) Validar honeypot field si lo agregas al form

## Testing local

1. Crear webhook en n8n con modo `test` (Activate workflow en test mode)
2. Copiar URL de test (ej: `https://n8n.tudominio.com/webhook-test/castillo-leads`)
3. Pegarla en `.env.local`
4. Llenar form en el sitio → ver ejecución en n8n

Cuando todo funcione, activar workflow producción y cambiar URL a `/webhook/` (sin `-test`).

## Producción

- [ ] Activar workflow en n8n
- [ ] Cambiar URL de `/webhook-test/` a `/webhook/`
- [ ] Configurar reverse proxy con HTTPS
- [ ] Setear `N8N_WEBHOOK_TOKEN` largo aleatorio (32+ chars)
- [ ] Configurar nodos downstream (Telegram + Sheets + email)
- [ ] Probar con form real
