import React, { useEffect, useMemo, useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import ScadaBar from '../components/ScadaBar';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { submitLead } from '../lib/leads';
import { track } from '../lib/track';
import { AnimatePresence, MotionButton, MotionCard, Reveal, m } from '../components/Motion';
import { LEAD_INTERESTS, resolveLeadInterest } from '../lib/interests';


type Status = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
  const queryInterest = useMemo(
    () =>
      resolveLeadInterest(
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search).get('interest')
          : null
      ),
    []
  );
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: queryInterest,
    message: '',
  });

  useEffect(() => {
    setFormData((prev) =>
      prev.interest === queryInterest ? prev : { ...prev, interest: queryInterest }
    );
  }, [queryInterest]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Requerido';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errs.email = 'Email inválido';
    if (!/^[+\d\s().-]{7,}$/.test(formData.phone)) errs.phone = 'Teléfono inválido';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus('submitting');
    try {
      await submitLead({ ...formData, source: 'contact-page' });
      track('lead_form_submit', { interest: formData.interest, source: 'contact-page' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-3 py-2.5 bg-surface-2 text-text-1 border border-DEFAULT rounded focus:border-copper focus:ring-1 focus:ring-copper/40 outline-none transition-colors placeholder:text-text-mute';
  const labelClass =
    'block text-[10px] font-mono uppercase tracking-widest text-text-3 mb-1.5';

  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Contacto · Castillo IT Systems · Barcelona, Anzoátegui"
        description="Hable directo con ingenieros de Castillo IT en Barcelona, Anzoátegui. WhatsApp +58 412-770-5451 · email · auditoría técnica gratuita."
        path="/contacto"
        keywords={['contacto castillo it', 'soporte ti anzoátegui', 'whatsapp castillo it']}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Contacto', url: '/contacto' },
        ]}
      />
      <header className="relative bg-ink py-20 border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-50" />
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <ScadaBar
            label="Línea directa · ingeniería"
            leds={[{ state: 'ok', blink: true }]}
            className="justify-center mb-6 reveal"
          />
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight text-text-1 reveal reveal-delay-100">
            Hablemos de negocios
          </h1>
          <p className="text-lg text-text-2 max-w-2xl mx-auto leading-relaxed reveal reveal-delay-200">
            Sin vendedores insistentes. Hable directamente con ingenieros que entienden su problema.
          </p>
        </Reveal>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <MotionCard className="bg-surface-1 border border-DEFAULT rounded-md p-8 reveal">
            <ScadaBar label="Solicitar auditoría · cotización" code="REQ · 01" className="mb-6 pb-4 border-b border-DEFAULT" />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <m.div
                  key="success"
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  className="text-center py-10"
                  role="status"
                  aria-live="polite"
                >
                  <div className="inline-flex items-center justify-center size-12 rounded border border-emphasis text-scada-ok mb-4">
                    <CheckCircle2 size={24} />
                  </div>
                  <h2 className="text-xl font-semibold text-text-1 mb-2">Solicitud registrada</h2>
                  <p className="text-text-3 text-sm font-mono uppercase tracking-widest">
                    [●●●] Ingeniero asignado · respuesta &lt; 2 h
                  </p>
                </m.div>
              ) : (
              <m.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="c-name" className={labelClass}>Nombre completo</label>
                    <input
                      id="c-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'c-name-err' : undefined}
                      className={inputClass}
                      placeholder="Ej. Juan Pérez"
                      required
                    />
                    {errors.name && (
                      <p id="c-name-err" className="text-scada-err text-xs mt-1 font-mono">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="c-company" className={labelClass}>Empresa</label>
                    <input
                      id="c-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Ej. Industrias C.A."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="c-email" className={labelClass}>Email corporativo</label>
                    <input
                      id="c-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'c-email-err' : undefined}
                      className={inputClass}
                      placeholder="juan@empresa.com"
                      required
                    />
                    {errors.email && (
                      <p id="c-email-err" className="text-scada-err text-xs mt-1 font-mono">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="c-phone" className={labelClass}>Teléfono / WhatsApp</label>
                    <input
                      id="c-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'c-phone-err' : undefined}
                      className={inputClass}
                      placeholder="+58 412 000 0000"
                      required
                    />
                    {errors.phone && (
                      <p id="c-phone-err" className="text-scada-err text-xs mt-1 font-mono">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="c-interest" className={labelClass}>Interesado en</label>
                  <select
                    id="c-interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {LEAD_INTERESTS.map((interest) => (
                      <option key={interest.value} value={interest.value}>
                        {interest.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="c-message" className={labelClass}>Detalles del proyecto</label>
                  <textarea
                    id="c-message"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Describa brevemente su necesidad…"
                  />
                </div>

                <MotionButton
                  type="submit"
                  disabled={status === 'submitting'}
                  aria-busy={status === 'submitting'}
                  className="w-full bg-copper hover:bg-copper-hi text-ink font-semibold py-3 rounded disabled:opacity-40 inline-flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span className="font-mono uppercase tracking-widest text-xs">Transmitiendo</span>
                    </>
                  ) : (
                    'Enviar solicitud'
                  )}
                </MotionButton>

                {status === 'error' && (
                  <p className="flex items-center gap-2 text-scada-err text-xs font-mono" role="alert">
                    <AlertTriangle size={14} /> Error de transmisión. Reintente.
                  </p>
                )}
              </m.form>
              )}
            </AnimatePresence>
          </MotionCard>

          <div className="space-y-6">
            <MotionCard className="bg-surface-1 border border-DEFAULT rounded-md p-8 reveal reveal-delay-100">
              <ScadaBar label="Información directa" code="HQ · 01" className="mb-6 pb-4 border-b border-DEFAULT" />
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="size-10 border border-emphasis rounded flex items-center justify-center text-copper shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-1 text-sm mb-1">Oficina principal</p>
                    <p className="text-text-3 text-sm leading-relaxed">
                      Av. Raúl Leoni, Urb. Fundación Barcelona, Barcelona 6001, Anzoátegui.
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-mute mt-1">
                      10.1334°N · 64.6863°W
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="size-10 border border-emphasis rounded flex items-center justify-center text-copper shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-1 text-sm mb-1">Teléfono</p>
                    <a
                      href="tel:+584127705451"
                      className="text-text-2 font-mono tabular-nums hover:text-copper transition-colors"
                    >
                      +58 412-770-5451
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="size-10 border border-emphasis rounded flex items-center justify-center text-copper shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-1 text-sm mb-1">Correo</p>
                    <a
                      href="mailto:castilloitsystems@gmail.com"
                      className="text-text-2 hover:text-copper transition-colors"
                    >
                      castilloitsystems@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </MotionCard>

            <MotionCard className="bg-surface-1 border border-DEFAULT rounded-md p-8 reveal reveal-delay-200">
              <ScadaBar
                label="Agenda directa · videollamada"
                code="CAL · 02"
                leds={[{ state: 'ok', blink: true }, { state: 'idle' }, { state: 'idle' }]}
                className="mb-5"
              />
              <h3 className="text-lg font-semibold text-text-1 mb-2 inline-flex items-center gap-2">
                <Calendar size={18} className="text-copper" /> 15 min · evaluación
              </h3>
              <p className="text-text-3 text-sm mb-5">
                ¿Prefiere agendar una videollamada para evaluar viabilidad? Hable con un ingeniero.
              </p>
              <MotionButton className="w-full border border-emphasis hover:border-copper hover:bg-surface-2 text-text-1 font-semibold py-3 rounded text-sm">
                Ver disponibilidad
              </MotionButton>
            </MotionCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
