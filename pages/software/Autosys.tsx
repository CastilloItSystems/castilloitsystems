import React, { useState } from 'react';
import {
  Wrench,
  Package,
  ShoppingCart,
  Car,
  Receipt,
  BarChart3,
  ShieldCheck,
  FileText,
  Users as UsersIcon,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import Modal from '../../components/Modal';
import LeadForm from '../../components/LeadForm';
import Badge from '../../components/Badge';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import SEO from '../../components/SEO';
import StructuredData, { softwareApplicationSchema } from '../../components/StructuredData';
import AutosysCalculator from '../../components/AutosysCalculator';
import CompareTable, { AUTOSYS_ROWS } from '../../components/CompareTable';
import FAQ, { AUTOSYS_FAQ } from '../../components/FAQ';
import Testimonials from '../../components/Testimonials';
import { MotionCard, Reveal, Stagger } from '../../components/Motion';

const AUTOSYS_TESTIMONIALS = [
  {
    quote:
      'Pasamos de cerrar mes con 2 semanas de papeleo a tener el reporte listo el 1ro. Los mecánicos saben exactamente qué OT tienen y nosotros qué facturamos.',
    name: '[TESTIMONIO PENDIENTE]',
    role: 'Gerente de operaciones',
    company: 'Taller automotriz · Anzoátegui',
    photoFile: 'testimonio-autosys-1.webp',
    project: 'Autosys',
  },
  {
    quote:
      'El inventario de repuestos era un agujero negro. Con Autosys redujimos pérdidas un 14% el primer trimestre y la facturación pasó a 5 minutos por OT.',
    name: '[TESTIMONIO PENDIENTE]',
    role: 'Dueño',
    company: 'Taller multimarca · Lechería',
    photoFile: 'testimonio-autosys-2.webp',
    project: 'Autosys',
  },
  {
    quote:
      'Lo implementaron en 6 semanas como prometieron. Garantía cerrada · pagamos contra entrega funcional. Cero sorpresas.',
    name: '[TESTIMONIO PENDIENTE]',
    role: 'CFO',
    company: 'Flota corporativa · Oriente',
    photoFile: 'testimonio-autosys-3.webp',
    project: 'Autosys',
  },
];

const Autosys: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Castillo Autosys · Software de gestión para talleres mecánicos en Venezuela"
        description="Autosys: órdenes de trabajo, inventario de repuestos, productividad por mecánico, facturación fiscal SENIAT. Implementación en 6 semanas, on-premise."
        path="/software/autosys"
        keywords={['castillo autosys', 'software taller mecánico venezuela', 'orden de trabajo automotriz', 'inventario repuestos', 'facturación fiscal seniat', 'productividad mecánicos']}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Software', url: '/software' },
          { name: 'Autosys', url: '/software/autosys' },
        ]}
        extra={softwareApplicationSchema({
          name: 'Castillo Autosys',
          description: 'Sistema integral para talleres mecánicos: órdenes de trabajo, inventario, mecánicos, facturación fiscal SENIAT.',
        })}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-mono text-[11px] uppercase tracking-widest text-text-3 flex items-center gap-2">
        <a href="/software" className="hover:text-brand">Software</a>
        <ChevronRight size={12} />
        <span className="text-text-1">Autosys</span>
      </nav>

      <section className="relative border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-40" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-brand pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Badge variant="brand" dot pulse>Producto destacado</Badge>
                <Badge variant="mono">TALLERES · FLOTAS</Badge>
                <Badge variant="ok">Implementación 6 semanas</Badge>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-1 tracking-tight mb-5">
                Auto<span className="text-brand">sys</span>
              </h1>
              <p className="text-xl text-text-2 leading-relaxed mb-6">
                Gestión integral para talleres mecánicos, flotas y centros de servicio.
                Trazabilidad ingreso → despacho, productividad por mecánico, inventario vinculado y
                facturación fiscal en menos de 5 minutos.
              </p>
              <p className="text-text-3 leading-relaxed mb-8">
                Construido para realidad operativa venezolana: funciona offline en servidor local,
                impresoras fiscales SENIAT integradas, soporte local Anzoátegui con respuesta en
                sitio menor a 2 horas.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-surface-2 border border-DEFAULT rounded-md overflow-hidden mb-8">
                {[
                  { k: '< 5 min', v: 'Facturar OT' },
                  { k: '6 sem', v: 'Implementación' },
                  { k: '+18%', v: 'Throughput' },
                  { k: 'Offline', v: 'On-premise' },
                ].map((metric) => (
                  <div key={metric.v} className="bg-ink p-4">
                    <p className="font-mono text-2xl text-brand tabular-nums leading-none mb-1">{metric.k}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-3">{metric.v}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setIsModalOpen(true)} className="bg-brand hover:bg-brand-hi text-text-1 px-6 py-3 rounded font-semibold text-sm transition-colors">
                  Solicitar demo Autosys
                </button>
                <a href="#autosys-features" className="inline-flex items-center justify-center text-text-1 px-6 py-3 rounded font-semibold text-sm border border-emphasis hover:border-brand transition-colors">
                  Ver capacidades
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative bg-surface-1 border border-emphasis rounded-lg overflow-hidden shadow-[0_0_60px_-15px_rgba(37,99,235,0.4)]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-DEFAULT bg-surface-2/50">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-err/70" />
                    <span className="size-2.5 rounded-full bg-warn/70" />
                    <span className="size-2.5 rounded-full bg-ok/70" />
                  </div>
                  <span className="font-mono text-[10px] text-text-3">autosys / ot-actual</span>
                  <span className="font-mono text-[10px] text-text-mute">v3.1</span>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-[11px] text-text-3 font-mono mb-1">OT · 2026-00428 · Toyota Hilux</p>
                    <p className="text-2xl font-semibold text-text-1 tracking-tight font-mono tabular-nums">
                      $ 1.245<span className="text-text-3 text-base">,80</span>
                      <span className="ml-2 text-xs text-warn font-mono">EN PROCESO</span>
                    </p>
                    <p className="text-xs text-text-3 mt-1">Cliente · Constructora C.A. · Placa AC123BD</p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-DEFAULT">
                    {[
                      { k: 'Cambio aceite + filtros', v: '180,00', s: 'ok' },
                      { k: 'Pastillas freno (4)', v: '425,00', s: 'ok' },
                      { k: 'Alineación + balanceo', v: '120,00', s: 'ok' },
                      { k: 'Mano de obra · 4.5 h', v: '320,80', s: 'warn' },
                      { k: 'Diagnóstico ABS', v: '200,00', s: 'idle' },
                    ].map((row) => (
                      <div key={row.k} className="flex justify-between items-center text-xs font-mono">
                        <span className="flex items-center gap-2 text-text-2 min-w-0 truncate">
                          <span className={`size-1.5 rounded-full shrink-0 ${row.s === 'ok' ? 'bg-ok' : row.s === 'warn' ? 'bg-warn' : 'bg-text-mute'}`} />
                          <span className="truncate">{row.k}</span>
                        </span>
                        <span className="tabular-nums text-text-1 shrink-0 ml-2">{row.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Capabilities */}
          <Reveal id="autosys-features" className="mt-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="mono">/ capacidades</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { icon: FileText, t: 'Órdenes de trabajo', d: 'Ciclo completo desde recepción hasta despacho. Trazable por estado, mecánico y puesto.' },
                { icon: Wrench, t: 'Mecánicos y puestos', d: 'Asignación de OT por mecánico y puesto. Productividad por hora y eficiencia en tiempo real.' },
                { icon: Package, t: 'Inventario de repuestos', d: 'Stock mínimo · máximo · costo promedio ponderado. Vinculación automática repuesto-OT.' },
                { icon: ShoppingCart, t: 'Compras a proveedores', d: 'Órdenes de compra con seguimiento, historial de precios, reposición automática.' },
                { icon: Car, t: 'Histórico por vehículo', d: 'Cada vehículo conserva su historial: servicios, repuestos, mecánicos y costos.' },
                { icon: UsersIcon, t: 'Clientes y CRM', d: 'Ficha cliente con vehículos, OT pendientes y facturas. Notificaciones WhatsApp.' },
                { icon: Receipt, t: 'Facturación fiscal SENIAT', d: 'Facturas integradas a impresoras fiscales. Cumplimiento normativo automático.' },
                { icon: BarChart3, t: 'Reportes operativos', d: 'Productividad, rentabilidad, repuestos rotados, mecánicos top, comparativos.' },
                { icon: ShieldCheck, t: 'Multi-usuario · roles', d: 'Acceso por rol: recepcionista, mecánico, supervisor, contabilidad. Permisos finos.' },
              ].map(({ icon: Icon, t, d }) => (
                <MotionCard key={t} className="bg-surface-1 border border-DEFAULT hover:border-brand rounded-md p-5">
                  <Icon className="text-brand mb-4" size={20} />
                  <h3 className="text-sm font-semibold text-text-1 mb-2">{t}</h3>
                  <p className="text-text-3 text-xs leading-relaxed">{d}</p>
                </MotionCard>
              ))}
            </Stagger>
            <div className="mt-8 flex flex-wrap gap-2">
              {['On-premise', 'Cloud opcional', 'SENIAT', 'PostgreSQL', 'Docker', 'API REST', 'Multi-usuario', 'Backups'].map((tech) => (
                <Badge key={tech} variant="mono">{tech}</Badge>
              ))}
            </div>
          </Reveal>

          {/* Calculator */}
          <Reveal id="calculadora-autosys" className="mt-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="brand" dot pulse>/ calculadora ROI</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-text-1 tracking-tight mb-2">
              ¿Cuánto puede recuperar tu taller con Autosys?
            </h3>
            <p className="text-text-3 mb-6 max-w-2xl">
              Ajusta volumen de vehículos, ticket promedio y mecánicos. Estimación de ganancia recuperada.
            </p>
            <AutosysCalculator onRequestDemo={() => setIsModalOpen(true)} />
          </Reveal>

          {/* Screenshots */}
          <Reveal className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="mono">/ pantallas</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { f: 'autosys-orden-trabajo.webp', a: 'Orden de trabajo · detalle' },
                { f: 'autosys-inventario.webp', a: 'Inventario de repuestos' },
                { f: 'autosys-productividad.webp', a: 'Reporte productividad mecánicos' },
              ].map((s) => (
                <ImagePlaceholder
                  key={s.f}
                  kind="dashboard"
                  alt={`Autosys · ${s.a}`}
                  fileName={s.f}
                  path="public/img/products/"
                  width={1600}
                  height={1000}
                  recommendedDims="1600×1000"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CompareTable
        title="¿Por qué Autosys?"
        subtitle="Comparativa honesta frente a Excel manual y sistemas genéricos de talleres."
        productLabel="Autosys"
        alt1Label="Excel + papel"
        alt2Label="Software genérico talleres"
        rows={AUTOSYS_ROWS}
      />
      <Testimonials
        items={AUTOSYS_TESTIMONIALS}
        title="Talleres que ya lo usan"
        subtitle="Operadores reales reportando el impacto en facturación y productividad."
      />
      <FAQ items={AUTOSYS_FAQ} title="Preguntas frecuentes · Autosys" />

      <section className="py-16 bg-ink">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-text-1 mb-3 tracking-tight">
            ¿Listo para facturar OT en 5 minutos?
          </h2>
          <p className="text-text-3 mb-6">Demo presencial. Te mostramos Autosys con un caso de un taller similar al tuyo.</p>
          <button onClick={() => setIsModalOpen(true)} className="bg-brand hover:bg-brand-hi text-text-1 px-8 py-3 rounded font-semibold text-sm inline-flex items-center gap-2">
            Solicitar demo Autosys <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Solicitar demo · Autosys">
        <p className="text-text-3 mb-4 text-sm">Déjenos sus datos. Agendamos visita técnica o videollamada.</p>
        <LeadForm defaultInterest="Autosys" onSuccess={() => setTimeout(() => setIsModalOpen(false), 1800)} />
      </Modal>
    </div>
  );
};

export default Autosys;
