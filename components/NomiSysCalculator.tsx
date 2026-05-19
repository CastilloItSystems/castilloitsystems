import React, { useMemo, useState } from 'react';
import { Calculator, Sparkles, ArrowRight } from 'lucide-react';
import Badge from './Badge';
import { AnimatePresence, MotionButton, m } from './Motion';

interface NomiSysCalculatorProps {
  onRequestDemo?: () => void;
}

const SYSTEM_OPTIONS = [
  { id: '5x2', label: '5×2 (Mon-Fri)', factor: 1.0 },
  { id: '7x7', label: '7×7 (rotativo)', factor: 1.18 },
  { id: '4x4', label: '4×4 (rotativo)', factor: 1.22 },
  { id: 'stob', label: 'STOB (sobretiempo)', factor: 1.35 },
  { id: 'contratistas', label: 'Contratistas FUTPV', factor: 1.15 },
] as const;

const formatBs = (n: number) =>
  n.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const NomiSysCalculator: React.FC<NomiSysCalculatorProps> = ({ onRequestDemo }) => {
  const [employees, setEmployees] = useState(50);
  const [salary, setSalary] = useState(35000);
  const [system, setSystem] = useState<typeof SYSTEM_OPTIONS[number]['id']>('7x7');
  const [periodType, setPeriodType] = useState<'mensual' | 'diaria'>('mensual');

  const result = useMemo(() => {
    const sys = SYSTEM_OPTIONS.find((s) => s.id === system)!;
    const base = employees * salary * sys.factor;
    const benefits = base * 0.28;
    const overtime = base * (system === 'stob' ? 0.18 : 0.08);
    const nightBonus = base * 0.06;
    const sundayBonus = system === '7x7' || system === '4x4' ? base * 0.05 : 0;
    const vacation = base * 0.09;
    const total = base + benefits + overtime + nightBonus + sundayBonus + vacation;
    const dailyTotal = total / 30;
    const hoursSaved = Math.round((employees / 50) * 40);
    return {
      base,
      benefits,
      overtime,
      nightBonus,
      sundayBonus,
      vacation,
      total: periodType === 'mensual' ? total : dailyTotal,
      hoursSaved,
    };
  }, [employees, salary, system, periodType]);

  return (
    <m.div layout className="bg-surface-1 border border-emphasis rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-DEFAULT flex items-center justify-between bg-surface-2/50">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded border border-emphasis flex items-center justify-center text-brand">
            <Calculator size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-text-1 leading-none mb-1">
              Calculadora NomiSys
            </h3>
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-3">
              Estimación CCP · marketing-grade
            </p>
          </div>
        </div>
        <Badge variant="ok" dot pulse>Live</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-DEFAULT">
        {/* Inputs */}
        <div className="bg-ink p-6 space-y-5">
          <div>
            <label htmlFor="calc-emp" className="block text-[10px] font-mono uppercase tracking-widest text-text-3 mb-2">
              Empleados: <span className="text-brand font-semibold">{employees}</span>
            </label>
            <input
              id="calc-emp"
              type="range"
              min={1}
              max={500}
              step={1}
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full accent-brand"
            />
            <div className="flex justify-between text-[10px] font-mono text-text-mute mt-1">
              <span>1</span>
              <span>250</span>
              <span>500</span>
            </div>
          </div>

          <div>
            <label htmlFor="calc-sal" className="block text-[10px] font-mono uppercase tracking-widest text-text-3 mb-2">
              Salario promedio mensual (Bs.)
            </label>
            <input
              id="calc-sal"
              type="number"
              min={0}
              step={1000}
              value={salary}
              onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2.5 bg-surface-2 text-text-1 border border-DEFAULT rounded focus:border-brand focus:ring-1 focus:ring-brand/40 outline-none transition-colors font-mono tabular-nums"
            />
          </div>

          <div>
            <label htmlFor="calc-sys" className="block text-[10px] font-mono uppercase tracking-widest text-text-3 mb-2">
              Sistema de trabajo
            </label>
            <select
              id="calc-sys"
              value={system}
              onChange={(e) => setSystem(e.target.value as typeof system)}
              className="w-full px-3 py-2.5 bg-surface-2 text-text-1 border border-DEFAULT rounded focus:border-brand focus:ring-1 focus:ring-brand/40 outline-none"
            >
              {SYSTEM_OPTIONS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-text-3 mb-2">
              Tipo de nómina
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(['mensual', 'diaria'] as const).map((t) => (
                <MotionButton
                  key={t}
                  type="button"
                  onClick={() => setPeriodType(t)}
                  className={`px-3 py-2 rounded text-xs font-semibold border transition-colors ${
                    periodType === t
                      ? 'bg-brand text-text-1 border-brand'
                      : 'bg-surface-2 text-text-2 border-DEFAULT hover:border-brand/50'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </MotionButton>
              ))}
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-surface-1 p-6 space-y-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-3 mb-1">
              Estimación {periodType}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={`${periodType}-${Math.round(result.total)}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="font-mono text-3xl md:text-4xl font-semibold text-text-1 tabular-nums leading-tight"
              >
                <span className="text-text-3 text-lg mr-1">Bs.</span>
                {formatBs(result.total)}
              </m.p>
            </AnimatePresence>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-DEFAULT">
            <AnimatePresence initial={false}>
              {periodType === 'mensual' && (
                <m.div
                  key="monthly-breakdown"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-1.5 overflow-hidden"
                >
                {[
                  { k: 'Salarios base', v: result.base },
                  { k: 'Prestaciones + ayuda vacacional', v: result.benefits },
                  { k: 'Tiempo extra estimado', v: result.overtime },
                  { k: 'Bono nocturno', v: result.nightBonus },
                  result.sundayBonus > 0 ? { k: 'Prima dominical', v: result.sundayBonus } : null,
                  { k: 'Vacaciones prorrateadas', v: result.vacation },
                ]
                  .filter((r): r is { k: string; v: number } => Boolean(r))
                  .map((row) => (
                    <m.div
                      key={row.k}
                      layout
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      className="flex justify-between items-center text-xs font-mono"
                    >
                      <span className="text-text-3">{row.k}</span>
                      <span className="text-text-2 tabular-nums">Bs. {formatBs(row.v)}</span>
                    </m.div>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-3 border-t border-DEFAULT bg-brand/5 -mx-6 -mb-6 px-6 py-4">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles size={16} className="text-brand mt-0.5 shrink-0" />
              <p className="text-xs text-text-2 leading-relaxed">
                Ahorro estimado vs Excel manual:{' '}
                <span className="text-text-1 font-semibold">{result.hoursSaved} h/mes</span>{' '}
                en cierre + cero errores humanos.
              </p>
            </div>
            <MotionButton
              onClick={onRequestDemo}
              className="w-full bg-brand hover:bg-brand-hi text-text-1 px-4 py-2.5 rounded font-semibold text-sm transition-colors inline-flex items-center justify-center gap-2 group"
            >
              Solicitar demo real
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </MotionButton>
          </div>
        </div>
      </div>

      <p className="px-6 py-3 border-t border-DEFAULT text-[10px] font-mono uppercase tracking-widest text-text-mute text-center bg-surface-2/30">
        Estimación marketing · cálculo real depende de variables completas del CCP
      </p>
    </m.div>
  );
};

export default NomiSysCalculator;
