import React, { useMemo, useState } from 'react';
import { Wrench, Sparkles, ArrowRight } from 'lucide-react';
import Badge from './Badge';

interface AutosysCalculatorProps {
  onRequestDemo?: () => void;
}

const formatBs = (n: number) =>
  n.toLocaleString('es-VE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const AutosysCalculator: React.FC<AutosysCalculatorProps> = ({ onRequestDemo }) => {
  const [vehicles, setVehicles] = useState(80);
  const [ticket, setTicket] = useState(180);
  const [mechanics, setMechanics] = useState(5);

  const result = useMemo(() => {
    const monthlyRevenue = vehicles * ticket;
    // Estimaciones de mejora (marketing-grade):
    // +18% throughput por trazabilidad y eliminación de re-trabajo
    const throughputGain = monthlyRevenue * 0.18;
    // Pérdidas típicas de taller sin sistema: 8% inventario, 6% repuestos no facturados
    const lossRecovery = monthlyRevenue * 0.08 + monthlyRevenue * 0.06;
    // Horas administrativas ahorradas: ~6h/mecánico/mes en papeleo
    const hoursSaved = mechanics * 6;
    // Tiempo facturación de 20min → 5min: ahorro por OT
    const billingMinSaved = vehicles * 15;
    return {
      monthlyRevenue,
      throughputGain,
      lossRecovery,
      hoursSaved,
      billingMinSaved,
      totalGain: throughputGain + lossRecovery,
    };
  }, [vehicles, ticket, mechanics]);

  return (
    <div className="bg-surface-1 border border-emphasis rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-DEFAULT flex items-center justify-between bg-surface-2/50">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded border border-emphasis flex items-center justify-center text-brand">
            <Wrench size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-text-1 leading-none mb-1">
              Calculadora Autosys
            </h3>
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-3">
              Estimación ROI · marketing-grade
            </p>
          </div>
        </div>
        <Badge variant="ok" dot pulse>Live</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-DEFAULT">
        {/* Inputs */}
        <div className="bg-ink p-6 space-y-5">
          <div>
            <label htmlFor="auto-veh" className="block text-[10px] font-mono uppercase tracking-widest text-text-3 mb-2">
              Vehículos atendidos / mes: <span className="text-brand font-semibold">{vehicles}</span>
            </label>
            <input
              id="auto-veh"
              type="range"
              min={10}
              max={400}
              step={5}
              value={vehicles}
              onChange={(e) => setVehicles(Number(e.target.value))}
              className="w-full accent-brand"
            />
            <div className="flex justify-between text-[10px] font-mono text-text-mute mt-1">
              <span>10</span>
              <span>200</span>
              <span>400</span>
            </div>
          </div>

          <div>
            <label htmlFor="auto-tic" className="block text-[10px] font-mono uppercase tracking-widest text-text-3 mb-2">
              Ticket promedio por OT ($)
            </label>
            <input
              id="auto-tic"
              type="number"
              min={0}
              step={10}
              value={ticket}
              onChange={(e) => setTicket(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2.5 bg-surface-2 text-text-1 border border-DEFAULT rounded focus:border-brand focus:ring-1 focus:ring-brand/40 outline-none transition-colors font-mono tabular-nums"
            />
          </div>

          <div>
            <label htmlFor="auto-mec" className="block text-[10px] font-mono uppercase tracking-widest text-text-3 mb-2">
              Mecánicos / técnicos: <span className="text-brand font-semibold">{mechanics}</span>
            </label>
            <input
              id="auto-mec"
              type="range"
              min={1}
              max={40}
              step={1}
              value={mechanics}
              onChange={(e) => setMechanics(Number(e.target.value))}
              className="w-full accent-brand"
            />
            <div className="flex justify-between text-[10px] font-mono text-text-mute mt-1">
              <span>1</span>
              <span>20</span>
              <span>40</span>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-surface-1 p-6 space-y-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-3 mb-1">
              Facturación mensual actual
            </p>
            <p className="font-mono text-3xl md:text-4xl font-semibold text-text-1 tabular-nums leading-tight">
              <span className="text-text-3 text-lg mr-1">$</span>
              {formatBs(result.monthlyRevenue)}
            </p>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-DEFAULT">
            {[
              { k: '+ Throughput recuperado (18%)', v: result.throughputGain, color: 'text-ok' },
              { k: '+ Pérdidas de inventario evitadas', v: result.lossRecovery, color: 'text-ok' },
            ].map((row) => (
              <div key={row.k} className="flex justify-between items-center text-xs font-mono">
                <span className="text-text-3">{row.k}</span>
                <span className={`${row.color} tabular-nums`}>$ {formatBs(row.v)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center text-sm font-mono pt-2 border-t border-DEFAULT mt-2">
              <span className="text-text-1 font-semibold">Ganancia potencial / mes</span>
              <span className="text-brand font-bold tabular-nums">$ {formatBs(result.totalGain)}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-DEFAULT bg-brand/5 -mx-6 -mb-6 px-6 py-4">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles size={16} className="text-brand mt-0.5 shrink-0" />
              <p className="text-xs text-text-2 leading-relaxed">
                Ahorro administrativo:{' '}
                <span className="text-text-1 font-semibold">{result.hoursSaved} h/mes</span> en
                papeleo +{' '}
                <span className="text-text-1 font-semibold">
                  {Math.round(result.billingMinSaved / 60)} h/mes
                </span>{' '}
                en facturación.
              </p>
            </div>
            <button
              onClick={onRequestDemo}
              className="w-full bg-brand hover:bg-brand-hi text-text-1 px-4 py-2.5 rounded font-semibold text-sm transition-colors inline-flex items-center justify-center gap-2 group"
            >
              Solicitar demo Autosys
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      <p className="px-6 py-3 border-t border-DEFAULT text-[10px] font-mono uppercase tracking-widest text-text-mute text-center bg-surface-2/30">
        Estimación marketing · ROI real depende de operación y volumen
      </p>
    </div>
  );
};

export default AutosysCalculator;
