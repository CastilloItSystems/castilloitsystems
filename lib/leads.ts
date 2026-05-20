const WEBHOOK = process.env.N8N_WEBHOOK_URL;
const TOKEN = process.env.N8N_WEBHOOK_TOKEN;

export interface LeadPayload {
  source: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  metadata?: Record<string, unknown>;
}

export const submitLead = async (
  data: LeadPayload,
  signal?: AbortSignal,
): Promise<void> => {
  if (!WEBHOOK) {
    // dev fallback: simula latencia para no romper UX en local sin .env
    await new Promise((r) => setTimeout(r, 700));
    return;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (TOKEN) headers["X-Webhook-Token"] = TOKEN;

  const body = {
    ...data,
    received_at: new Date().toISOString(),
    page: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };

  const res = await fetch(WEBHOOK, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    throw new Error(`n8n webhook responded ${res.status}`);
  }
};
