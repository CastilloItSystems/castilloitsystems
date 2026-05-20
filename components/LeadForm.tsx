import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';
import { track } from '../lib/track';
import { submitLead } from '../lib/leads';
import { DEFAULT_LEAD_INTEREST, LEAD_INTERESTS, resolveLeadInterest } from '../lib/interests';

interface LeadFormProps {
  onSuccess?: () => void;
  defaultInterest?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const VALID_PREFIXES = ['412', '414', '416', '422', '424', '426'];

const LeadForm: React.FC<LeadFormProps> = ({
  onSuccess,
  defaultInterest = DEFAULT_LEAD_INTEREST,
}) => {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '+58 ',
    interest: resolveLeadInterest(defaultInterest),
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      interest: resolveLeadInterest(defaultInterest, prev.interest),
    }));
  }, [defaultInterest]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const PREFIX = '+58 ';
    let val = e.target.value;
    if (!val.startsWith(PREFIX)) {
      const digits = val.replace(/\D/g, '').replace(/^58/, '');
      val = PREFIX + digits;
    }
    const raw = val.slice(PREFIX.length).replace(/\D/g, '').slice(0, 10);
    let formatted = PREFIX;
    if (raw.length > 0) formatted += raw.slice(0, 3);
    if (raw.length > 3) formatted += '-' + raw.slice(3, 6);
    if (raw.length > 6) formatted += '-' + raw.slice(6, 10);
    setFormData((p) => ({ ...p, phone: formatted }));
    if (raw.length >= 3 && !VALID_PREFIXES.includes(raw.slice(0, 3))) {
      setErrors((p) => ({
        ...p,
        phone: 'Prefijo inválido · válidos: 412 · 414 · 416 · 422 · 424 · 426',
      }));
    } else {
      setErrors((p) => ({ ...p, phone: '' }));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Requerido';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errs.email = 'Email inválido';
    const phoneDigits = formData.phone.replace(/\D/g, '');
    const phonePrefix = phoneDigits.slice(2, 5);
    if (phoneDigits.length < 12 || !phoneDigits.startsWith('58')) {
      errs.phone = 'Número incompleto · ej. +58 412-770-5451';
    } else if (!VALID_PREFIXES.includes(phonePrefix)) {
      errs.phone = 'Prefijo inválido · válidos: 412 · 414 · 416 · 422 · 424 · 426';
    }
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
      await submitLead({ ...formData, source: 'lead-form' });
      track('lead_form_submit', { interest: formData.interest, source: 'lead-form' });
      setStatus('success');
      onSuccess?.();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <div className="inline-flex items-center justify-center size-12 rounded border border-emphasis text-scada-ok mb-4">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-lg font-semibold text-text-1 mb-2">Solicitud registrada</h3>
        <p className="text-text-3 text-sm font-mono uppercase tracking-widest">
          [●●●] Ingeniero asignado · respuesta &lt; 2 h
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full px-3 py-2.5 bg-surface-2 text-text-1 border border-DEFAULT rounded focus:border-copper focus:ring-1 focus:ring-copper/40 outline-none transition-colors placeholder:text-text-mute';
  const labelClass =
    'block text-[10px] font-mono uppercase tracking-widest text-text-3 mb-1.5';

  const busy = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="lf-name" className={labelClass}>
          Nombre completo
        </label>
        <input
          id="lf-name"
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'lf-name-err' : undefined}
          className={inputClass}
          placeholder="Ej. María Rodríguez"
        />
        {errors.name && (
          <p id="lf-name-err" className="text-scada-err text-xs mt-1 font-mono">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lf-company" className={labelClass}>
          Empresa
        </label>
        <input
          id="lf-company"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={inputClass}
          placeholder="Ej. Constructora C.A."
        />
      </div>

      <div>
        <label htmlFor="lf-email" className={labelClass}>
          Correo electrónico
        </label>
        <input
          id="lf-email"
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'lf-email-err' : undefined}
          className={inputClass}
          placeholder="juan@empresa.com"
          autoComplete="email"
          inputMode="email"
        />
        {errors.email && (
          <p id="lf-email-err" className="text-scada-err text-xs mt-1 font-mono">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lf-phone" className={labelClass}>
          WhatsApp / Teléfono
        </label>
        <input
          id="lf-phone"
          required
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'lf-phone-err' : 'lf-phone-hint'}
          className={inputClass}
          placeholder="+58 412-770-5451"
          inputMode="tel"
          autoComplete="tel"
        />
        {errors.phone ? (
          <p id="lf-phone-err" className="text-scada-err text-xs mt-1 font-mono">
            {errors.phone}
          </p>
        ) : (
          <p id="lf-phone-hint" className="text-text-mute text-[10px] mt-1 font-mono">
            Movistar 414/424 · Digitel 412 · Movilnet 416/422/426
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lf-interest" className={labelClass}>
          Interés principal
        </label>
        <select
          id="lf-interest"
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

      <button
        type="submit"
        disabled={busy}
        aria-busy={busy}
        className="w-full bg-copper text-ink font-semibold py-3 rounded transition-colors hover:bg-copper-hi disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {busy ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span className="font-mono uppercase tracking-widest text-xs">Transmitiendo</span>
          </>
        ) : (
          'Solicitar contacto inmediato'
        )}
      </button>

      {status === 'error' && (
        <p className="flex items-center gap-2 text-scada-err text-xs font-mono" role="alert">
          <AlertTriangle size={14} /> Error de transmisión. Reintente.
        </p>
      )}

      <p className="text-[10px] text-text-mute text-center font-mono uppercase tracking-widest">
        Datos confidenciales · sin spam
      </p>
    </form>
  );
};

export default LeadForm;
