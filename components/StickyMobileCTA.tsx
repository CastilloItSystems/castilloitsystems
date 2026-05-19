import React, { useEffect, useState } from 'react';
import { usePathname } from '../lib/router';
import { Phone, MessageCircle } from 'lucide-react';
import { track, waLink } from '../lib/track';

const HIDE_ON = ['/contacto', '/404'];

const StickyMobileCTA: React.FC<{ onOpenDemo?: () => void }> = ({ onOpenDemo }) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (HIDE_ON.includes(pathname)) return null;

  const productPage = pathname.startsWith('/software/');
  const ctaLabel = productPage ? 'Solicitar demo' : 'Auditoría gratis';

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        scrolled ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-surface-1/95 backdrop-blur border-t border-emphasis px-3 py-2.5 flex items-center gap-2 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.5)]">
        <a
          href={waLink(pathname.split('/')[1] || 'home')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('sticky_cta_whatsapp', { page: pathname })}
          aria-label="WhatsApp directo"
          className="shrink-0 size-11 rounded bg-[#25D366] hover:bg-[#1ebe5d] flex items-center justify-center text-white transition-colors"
        >
          <MessageCircle size={18} />
        </a>
        <a
          href="tel:+584127705451"
          onClick={() => track('sticky_cta_call', { page: pathname })}
          aria-label="Llamar ahora"
          className="shrink-0 size-11 rounded border border-emphasis hover:border-brand flex items-center justify-center text-text-2 hover:text-brand transition-colors"
        >
          <Phone size={18} />
        </a>
        <button
          onClick={() => {
            track('sticky_cta_demo', { page: pathname });
            onOpenDemo?.();
          }}
          className="flex-1 bg-brand hover:bg-brand-hi text-text-1 px-4 py-2.5 rounded font-semibold text-sm transition-colors"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
