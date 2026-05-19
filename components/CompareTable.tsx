import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import Badge from './Badge';
import { Reveal } from './Motion';

type Cell = 'yes' | 'no' | 'partial' | string;

export interface CompareRow {
  feature: string;
  product: Cell;
  alt1: Cell;
  alt2: Cell;
}

const NOMISYS_ROWS: CompareRow[] = [
  { feature: 'Cobertura CCP PDVSA 2017-2019 completa', product: 'yes', alt1: 'partial', alt2: 'no' },
  { feature: 'Sistemas de trabajo (5×2, 7×7, STOB, contratistas)', product: 'yes', alt1: 'partial', alt2: 'partial' },
  { feature: 'Régimen contratistas FUTPV', product: 'yes', alt1: 'no', alt2: 'no' },
  { feature: 'Multi-empresa con aislamiento de datos', product: 'yes', alt1: 'no', alt2: 'partial' },
  { feature: 'RBAC granular por usuario/empresa', product: 'yes', alt1: 'no', alt2: 'partial' },
  { feature: 'Audit log auditable SUNDDE/FUTPV', product: 'yes', alt1: 'no', alt2: 'partial' },
  { feature: 'Tiempo de cierre nómina (100 empleados)', product: '< 4 h', alt1: '2 sem', alt2: '1-2 días' },
  { feature: 'Soporte local Anzoátegui', product: 'yes', alt1: 'n/a', alt2: 'no' },
  { feature: 'Implementación', product: '6-10 sem', alt1: 'instant', alt2: '6+ meses' },
  { feature: 'Garantía funcional · presupuesto cerrado', product: 'yes', alt1: 'n/a', alt2: 'no' },
];

const AUTOSYS_ROWS: CompareRow[] = [
  { feature: 'Órdenes de trabajo digitales', product: 'yes', alt1: 'partial', alt2: 'yes' },
  { feature: 'Control de productividad por mecánico', product: 'yes', alt1: 'no', alt2: 'partial' },
  { feature: 'Inventario de repuestos integrado', product: 'yes', alt1: 'no', alt2: 'yes' },
  { feature: 'Facturación fiscal venezolana', product: 'yes', alt1: 'no', alt2: 'partial' },
  { feature: 'Histórico por vehículo y cliente', product: 'yes', alt1: 'partial', alt2: 'yes' },
  { feature: 'Trazabilidad ingreso → despacho', product: 'yes', alt1: 'no', alt2: 'partial' },
  { feature: 'Tiempo de facturación promedio', product: '< 5 min', alt1: '20 min', alt2: '10 min' },
  { feature: 'Soporte local Anzoátegui', product: 'yes', alt1: 'n/a', alt2: 'no' },
  { feature: 'Implementación', product: '6 sem', alt1: 'instant', alt2: '3-6 meses' },
  { feature: 'Garantía funcional · presupuesto cerrado', product: 'yes', alt1: 'n/a', alt2: 'no' },
];

export { NOMISYS_ROWS, AUTOSYS_ROWS };

const renderCell = (c: Cell, highlight = false) => {
  if (c === 'yes')
    return (
      <span className={`inline-flex items-center justify-center size-6 rounded-full ${highlight ? 'bg-ok/20 text-ok' : 'bg-ok/10 text-ok'}`}>
        <Check size={14} strokeWidth={3} />
      </span>
    );
  if (c === 'no')
    return (
      <span className="inline-flex items-center justify-center size-6 rounded-full bg-err/10 text-err">
        <X size={14} strokeWidth={2.5} />
      </span>
    );
  if (c === 'partial')
    return (
      <span className="inline-flex items-center justify-center size-6 rounded-full bg-warn/10 text-warn">
        <AlertTriangle size={12} strokeWidth={2.5} />
      </span>
    );
  return <span className={`font-mono text-xs ${highlight ? 'text-ok' : 'text-text-2'}`}>{c}</span>;
};

interface CompareTableProps {
  title?: string;
  subtitle?: string;
  productLabel?: string;
  alt1Label?: string;
  alt2Label?: string;
  rows?: CompareRow[];
}

const CompareTable: React.FC<CompareTableProps> = ({
  title = '¿Por qué NomiSys?',
  subtitle = 'Comparativa honesta frente a las alternativas reales del mercado venezolano.',
  productLabel = 'NomiSys',
  alt1Label = 'Excel manual',
  alt2Label = 'Sistemas genéricos',
  rows = NOMISYS_ROWS,
}) => {
  return (
    <section className="py-20 bg-ink border-b border-DEFAULT">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 reveal">
          <Badge variant="mono" className="mb-4">/ comparativa</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-text-1 tracking-tight mb-3">{title}</h2>
          <p className="text-text-3 max-w-2xl">{subtitle}</p>
        </Reveal>

        <Reveal className="reveal bg-surface-1 border border-DEFAULT rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-DEFAULT">
                  <th className="text-left px-5 py-4 text-[10px] font-mono uppercase tracking-widest text-text-3 font-semibold">
                    Característica
                  </th>
                  <th className="text-center px-5 py-4 bg-brand/10 border-x border-brand/30">
                    <Badge variant="brand" dot pulse>{productLabel}</Badge>
                  </th>
                  <th className="text-center px-5 py-4 text-text-3 font-mono text-xs uppercase tracking-widest font-medium">
                    {alt1Label}
                  </th>
                  <th className="text-center px-5 py-4 text-text-3 font-mono text-xs uppercase tracking-widest font-medium">
                    {alt2Label}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.feature} className={`border-b border-DEFAULT last:border-0 ${i % 2 === 0 ? 'bg-surface-2/30' : ''}`}>
                    <td className="px-5 py-4 text-text-2 align-middle">{r.feature}</td>
                    <td className="px-5 py-4 text-center align-middle bg-brand/5 border-x border-brand/20">
                      {renderCell(r.product, true)}
                    </td>
                    <td className="px-5 py-4 text-center align-middle">{renderCell(r.alt1)}</td>
                    <td className="px-5 py-4 text-center align-middle">{renderCell(r.alt2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-4 text-xs font-mono uppercase tracking-widest text-text-mute text-center">
          ● Sí · ▲ parcial · ✕ no
        </p>
      </div>
    </section>
  );
};

export default CompareTable;
