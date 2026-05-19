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

const LeadForm: React.FC<LeadFormProps> = ({
  onSuccess,
  defaultInterest = DEFAULT_LEAD_INTEREST,
}) => {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Requerido';
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
        <label htmlFor="lf-phone" className={labelClass}>
          WhatsApp / Teléfono
        </label>
        <input
          id="lf-phone"
          required
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'lf-phone-err' : undefined}
          className={inputClass}
          placeholder="+58 412..."
        />
        {errors.phone && (
          <p id="lf-phone-err" className="text-scada-err text-xs mt-1 font-mono">
            {errors.phone}
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
