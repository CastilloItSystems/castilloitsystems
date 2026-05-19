import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Badge from './Badge';
import { AnimatePresence, Stagger, m, staggerItem } from './Motion';

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  injectSchema?: boolean;
}

const FAQ: React.FC<FAQProps> = ({
  title = 'Preguntas frecuentes',
  subtitle = 'Lo que clientes nos preguntan antes de contratar.',
  items,
  injectSchema = true,
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());

  const toggleItem = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  // injectSchema kept as no-op prop · schema FAQPage va en src/layouts/Layout.astro
  void injectSchema;

  return (
    <section className="py-20 bg-ink border-b border-DEFAULT">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 reveal">
          <Badge variant="mono" className="mb-4">/ faq</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-text-1 tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-text-3">{subtitle}</p>
        </div>

        <Stagger className="space-y-2 reveal">
          {items.map((item, i) => (
            <m.article
              key={i}
              variants={staggerItem}
              layout
              className="group bg-surface-1 border border-DEFAULT hover:border-brand/50 rounded-md overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleItem(i)}
                aria-expanded={openItems.has(i)}
                aria-controls={`faq-answer-${i}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm md:text-base font-semibold text-text-1">{item.q}</span>
                <m.span
                  animate={{ rotate: openItems.has(i) ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  className="text-text-3 shrink-0"
                >
                  <ChevronDown size={18} />
                </m.span>
              </button>
              <AnimatePresence initial={false}>
                {openItems.has(i) && (
                  <m.div
                    id={`faq-answer-${i}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-text-2 text-sm leading-relaxed border-t border-DEFAULT">
                      {item.a}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default FAQ;

export const AUTOSYS_FAQ: FAQItem[] = [
  {
    q: '¿Para qué tipo de taller funciona Autosys?',
    a: 'Talleres mecánicos automotrices, talleres de servicio pesado, lubricentros, talleres de electricidad automotriz, talleres de carrocería y pintura, y flotas corporativas que dan mantenimiento a sus propios vehículos.',
  },
  {
    q: '¿Cuánto cuesta Castillo Autosys?',
    a: 'Presupuesto cerrado tras una auditoría operativa gratuita. Incluye implementación + capacitación + soporte primer año. Sin licencias por usuario ocultas.',
  },
  {
    q: '¿En cuánto tiempo lo implementan?',
    a: 'Implementación típica en 6 semanas: setup + migración de datos + capacitación al equipo. Casos pequeños (1-3 mecánicos) en 3-4 semanas.',
  },
  {
    q: '¿Incluye facturación fiscal venezolana?',
    a: 'Sí. Facturación fiscal integrada cumpliendo regulación SENIAT. Soporta impresoras fiscales comunes del mercado venezolano.',
  },
  {
    q: '¿Puedo controlar la productividad de mis mecánicos?',
    a: 'Sí. Cada orden de trabajo registra el mecánico asignado y los tiempos por etapa. Reportes de productividad por mecánico, por puesto de servicio y por período.',
  },
  {
    q: '¿Maneja inventario de repuestos?',
    a: 'Sí. Inventario completo: ingresos, salidas, mínimos, máximos, alertas de stock bajo, costos promedio ponderado, vinculación automática a órdenes de trabajo.',
  },
  {
    q: '¿Cómo se integra con mi proveedor de repuestos?',
    a: 'Manejamos órdenes de compra a proveedores con seguimiento de status, costos históricos y reposición automática basada en mínimos.',
  },
  {
    q: '¿Funciona offline si se cae internet?',
    a: 'Modo on-premise disponible: el sistema corre en servidor local de su taller. Sin dependencia de internet para operación diaria.',
  },
  {
    q: '¿Lleva historial por vehículo y cliente?',
    a: 'Sí. Cada vehículo tiene historial completo de servicios realizados, repuestos cambiados, mecánicos que lo atendieron y costos acumulados. Útil para garantías y diagnóstico de reincidencias.',
  },
  {
    q: '¿Tienen garantía si no funciona?',
    a: 'Sí. Garantía funcional con criterios de aceptación firmados al inicio. Si Autosys no cumple, no paga el saldo final.',
  },
];

export const NOMISYS_FAQ: FAQItem[] = [
  {
    q: '¿Cuánto cuesta NomiSys?',
    a: 'No vendemos licencias genéricas. Hacemos una auditoría técnica gratuita de su operación y entregamos un presupuesto cerrado por implementación + mantenimiento mensual. Sin sorpresas.',
  },
  {
    q: '¿En cuánto tiempo lo implementan?',
    a: 'Implementación típica: 6-10 semanas dependiendo del volumen de empleados, sistemas de trabajo activos y migración de datos desde su sistema actual.',
  },
  {
    q: '¿Cubre el régimen de contratistas FUTPV?',
    a: 'Sí. NomiSys incluye el régimen completo de contratistas FUTPV con todas sus reglas de cálculo, primas y reportes específicos.',
  },
  {
    q: '¿Cubre cálculo de jubilaciones e indemnizaciones?',
    a: 'Sí. Cubre jubilaciones, indemnizaciones por terminación, prestaciones sociales prorrateadas, ayuda vacacional, utilidades y todas las prestaciones del CCP PDVSA 2017-2019.',
  },
  {
    q: '¿Es on-premise o cloud?',
    a: 'Ambas. NomiSys es Dockerizable: puede instalarse en su propio servidor (on-premise) por requisitos de soberanía de datos, o en nube privada que mantenemos nosotros.',
  },
  {
    q: '¿Cómo migran datos desde Excel o sistema actual?',
    a: 'Tenemos importadores para Excel, CSV y conexión directa a bases de datos comunes (SQL Server, MySQL, PostgreSQL). La migración inicial está incluida en la implementación.',
  },
  {
    q: '¿Cubre todos los sistemas de trabajo (5×2, 7×7, STOB)?',
    a: 'Sí: 5×2, 7×7, 4×4, 5-5-5-6, 21×7, STOB, 2×4, 3×6 y 5×10. Nómina diaria y mensual. Cambios de sistema histórico por empleado.',
  },
  {
    q: '¿Qué soporte ofrecen post-implementación?',
    a: 'Soporte local en Anzoátegui · respuesta en sitio en menos de 2 horas para emergencias. Soporte remoto 8x5 incluido. Atención por WhatsApp directa con ingenieros.',
  },
  {
    q: '¿Tienen garantía si no funciona?',
    a: 'Presupuesto cerrado con garantía funcional: si NomiSys no cumple los criterios de aceptación que firmemos al inicio del proyecto, no paga el saldo final.',
  },
  {
    q: '¿Cómo manejan auditoría y cumplimiento?',
    a: 'Audit log completo de cada operación crítica: quién, cuándo, qué cambió. RBAC granular con permisos por usuario y empresa. Exportable para auditorías SUNDDE/FUTPV.',
  },
];
