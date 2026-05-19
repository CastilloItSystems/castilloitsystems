import React, { useEffect, useState } from 'react';
import { X, Download, Sparkles } from 'lucide-react';
import { AnimatePresence, m } from './Motion';
import Badge from './Badge';
import { track } from '../lib/track';
import { submitLead } from '../lib/leads';

const STORAGE_KEY = 'cit-exit-intent-shown';

const ExitIntent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let triggered = false;
    const onLeave = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 0) {
        triggered = true;
        sessionStorage.setItem(STORAGE_KEY, '1');
        setOpen(true);
        track('exit_intent_shown');
      }
    };

    const armTimer = window.setTimeout(() => {
      document.addEventListener('mouseleave', onLeave);
    }, 8000); // armado tras 8s de navegación

    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const close = () => {
    setOpen(false);
    track('exit_intent_close');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Email inválido');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await submitLead({
        source: 'exit-intent-lead-magnet',
        email,
        interest: 'Guía CCP 2026',
        metadata: { magnet: 'guia-ccp-2026' },
      });
      track('exit_intent_submit', { email });
      setSubmitted(true);
    } catch {
      setError('Error de envío. Reintenta.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="exit-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-ink/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={close}
        >
          <m.div
            key="exit-card"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Antes de irte"
            className="relative w-full max-w-md bg-surface-1 border border-emphasis rounded-lg overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
          >
            <button
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-3 right-3 text-text-3 hover:text-text-1 transition-colors z-10 p-1"
            >
              <X size={18} />
            </button>

            <div className="absolute inset-x-0 top-0 h-40 glow-brand pointer-events-none" />

            <div className="relative p-7">
              {submitted ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center size-12 rounded border border-emphasis text-ok mb-4">
                    <Download size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-1 mb-2">¡Gracias!</h3>
                  <p className="text-sm text-text-2 mb-4">
                    Te enviamos la guía a <span className="text-text-1 font-mono">{email}</span>.
                  </p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-mute">
                    Revisa tu spam si no llega en 5 min
                  </p>
                </div>
              ) : (
                <>
                  <Badge variant="brand" className="mb-4">
                    <Sparkles size={10} className="mr-0.5" /> Antes de irte
                  </Badge>
                  <h3 className="text-2xl font-bold text-text-1 mb-2 tracking-tight">
                    Llévate la guía <span className="text-brand">CCP 2026</span> gratis
                  </h3>
                  <p className="text-sm text-text-2 mb-5 leading-relaxed">
                    PDF con cálculos paso a paso de todos los sistemas de trabajo petroleros,
                    primas, jubilaciones y régimen contratistas FUTPV. 32 páginas.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        placeholder="tu@empresa.com"
                        required
                        aria-invalid={!!error}
                        className="w-full px-3 py-2.5 bg-surface-2 text-text-1 border border-DEFAULT rounded focus:border-brand focus:ring-1 focus:ring-brand/40 outline-none transition-colors"
                      />
                      {error && (
                        <p className="text-err text-xs mt-1 font-mono">{error}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-brand hover:bg-brand-hi text-text-1 font-semibold py-3 rounded transition-colors disabled:opacity-40 inline-flex items-center justify-center gap-2"
                    >
                      <Download size={16} /> Descargar gratis
                    </button>
                  </form>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-text-mute text-center mt-4">
                    Sin spam · puedes darte de baja cuando quieras
                  </p>
                </>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntent;
