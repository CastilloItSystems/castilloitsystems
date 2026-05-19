export const DEFAULT_LEAD_INTEREST = 'Auditoría gratuita';

export const LEAD_INTERESTS = [
  { value: DEFAULT_LEAD_INTEREST, label: 'Auditoría gratuita' },
  { value: 'Software a medida', label: 'Software a medida' },
  { value: 'Apps mobile / desktop', label: 'Apps mobile / desktop' },
  { value: 'Automatización n8n / IA', label: 'Automatización n8n / IA' },
  {
    value: 'VPS / bases de datos / despliegues',
    label: 'VPS / bases de datos / despliegues',
  },
  { value: 'Infraestructura / redes', label: 'Infraestructura / redes' },
  {
    value: 'Seguridad / CCTV / ciberseguridad',
    label: 'Seguridad / CCTV / ciberseguridad',
  },
  { value: 'Consultoría digital / marca', label: 'Consultoría digital / marca' },
  {
    value: 'Productos Castillo (NomiSys / Autosys / Gym)',
    label: 'Productos Castillo (NomiSys / Autosys / Gym)',
  },
  { value: 'Otros', label: 'Otros' },
] as const;

const LEGACY_INTERESTS: Record<string, string> = {
  General: DEFAULT_LEAD_INTEREST,
  Auditoria: DEFAULT_LEAD_INTEREST,
  Infraestructura: 'Infraestructura / redes',
  Software: 'Productos Castillo (NomiSys / Autosys / Gym)',
  Seguridad: 'Seguridad / CCTV / ciberseguridad',
  'Desarrollo a medida': 'Software a medida',
};

const leadInterestValues = new Set<string>(LEAD_INTERESTS.map((interest) => interest.value));

export const resolveLeadInterest = (
  value?: string | null,
  fallback = DEFAULT_LEAD_INTEREST
) => {
  if (!value) return fallback;
  const normalized = LEGACY_INTERESTS[value] ?? value;
  return leadInterestValues.has(normalized) ? normalized : fallback;
};
