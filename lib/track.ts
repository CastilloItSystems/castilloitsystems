declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const track = (event: string, props?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
    window.gtag?.('event', event, props || {});
  } catch {
    // swallow — analytics must never break UX
  }
};

export const PHONE = '584127705451';

export const waLink = (page: string) => {
  const msgs: Record<string, string> = {
    home: 'Hola, vengo de la web de Castillo IT. Quisiera información.',
    software:
      'Hola, me interesa software a medida, automatización n8n o la suite Castillo. ¿Pueden contarme más?',
    nomisys: 'Hola, vengo de la página de NomiSys (nómina petrolera CCP). Quisiera una demo.',
    infraestructura: 'Hola, necesito información sobre infraestructura y cableado.',
    seguridad: 'Hola, me interesa el servicio de ciberseguridad / CCTV.',
    portfolio: 'Hola, vi sus casos de éxito y quiero algo similar.',
    contacto: 'Hola, quisiera agendar una visita técnica.',
    default: 'Hola, vengo de la web de Castillo IT Systems.',
  };
  const text = msgs[page] || msgs.default;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
};
