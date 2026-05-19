import React, { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { getAnalyticsConsent, grantAnalyticsConsent, denyAnalyticsConsent } from '../hooks/useAnalytics';
import { AnimatePresence, MotionButton, m } from './Motion';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getAnalyticsConsent() === null) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    grantAnalyticsConsent();
    setVisible(false);
  };
  const deny = () => {
    denyAnalyticsConsent();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 md:left-6 md:translate-x-0 z-[90] w-[calc(100%-2rem)] md:w-96 bg-surface-1 border border-emphasis rounded-md p-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-start gap-3">
            <Cookie size={18} className="text-brand mt-0.5 shrink-0" />
            <div className="flex-1 text-sm text-text-2 leading-relaxed">
              Usamos analytics anónimos (Plausible) y opcionalmente Google Analytics para mejorar la
              web. Su decisión se recuerda 6 meses.
            </div>
            <MotionButton
              aria-label="Cerrar aviso"
              onClick={deny}
              className="text-text-3 hover:text-text-1 -mt-1 -mr-1 p-1"
            >
              <X size={16} />
            </MotionButton>
          </div>
          <div className="flex gap-2 mt-3">
            <MotionButton
              onClick={accept}
              className="flex-1 bg-brand hover:bg-brand-hi text-text-1 px-3 py-2 rounded text-sm font-semibold"
            >
              Aceptar
            </MotionButton>
            <MotionButton
              onClick={deny}
              className="px-3 py-2 rounded text-sm font-medium text-text-2 border border-DEFAULT hover:border-brand"
            >
              Solo esenciales
            </MotionButton>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
