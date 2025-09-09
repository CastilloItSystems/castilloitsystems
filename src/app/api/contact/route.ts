import type { NextRequest } from 'next/server';

// Minimal zod-like validation without external deps
function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, email, message, recaptchaToken } = body || {};

    // Basic validation
    if (!name || typeof name !== 'string' || name.length < 2) {
      return Response.json({ error: 'Nombre inválido' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return Response.json({ error: 'Email inválido' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.length < 10) {
      return Response.json({ error: 'Mensaje demasiado corto' }, { status: 400 });
    }

    // Verify reCAPTCHA v3/Enterprise or hCaptcha (generic Google v3 example)
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const enabled = process.env.RECAPTCHA_ENABLED === 'true';
    if (enabled) {
      if (!recaptchaToken) {
        return Response.json({ error: 'Falta recaptcha' }, { status: 400 });
      }
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: secret || '',
          response: recaptchaToken,
        }),
      });
      const verifyJson = (await verifyRes.json()) as { success?: boolean; score?: number };
      if (!verifyJson.success || (typeof verifyJson.score === 'number' && verifyJson.score < 0.5)) {
        return Response.json({ error: 'Falló verificación reCAPTCHA' }, { status: 400 });
      }
    }

    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
    if (!webhookUrl) {
      return Response.json({ error: 'Webhook no configurado' }, { status: 500 });
    }

    const payload = { id, name, email, message };
    const forward = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Avoid leaking cookies
      cache: 'no-store',
    });

    if (!forward.ok) {
      const text = await forward.text();
      return Response.json({ error: 'Error al enviar', detail: text }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Error inesperado' }, { status: 500 });
  }
}
