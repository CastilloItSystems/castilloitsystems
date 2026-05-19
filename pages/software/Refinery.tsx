import React, { useState } from 'react';
import { BarChart3, Bell, LineChart, Truck, Beaker, AlertCircle, Boxes, Activity, ArrowRight, ChevronRight } from 'lucide-react';
import Modal from '../../components/Modal';
import LeadForm from '../../components/LeadForm';
import Badge from '../../components/Badge';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import SEO from '../../components/SEO';
import StructuredData, { softwareApplicationSchema } from '../../components/StructuredData';
import { MotionCard, Reveal, Stagger } from '../../components/Motion';

const Refinery: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Castillo Refinery · Software SCADA para plantas de procesamiento"
        description="Gestión integral para refinerías y plantas: control de crudo, laboratorio, despacho y simulaciones financieras. Implementación V1 en 3 meses."
        path="/software/refinery"
        keywords={['castillo refinery', 'software scada refinería', 'gestión planta crudo', 'thinking mode']}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Software', url: '/software' },
          { name: 'Refinery', url: '/software/refinery' },
        ]}
        extra={softwareApplicationSchema({
          name: 'Castillo Refinery',
          description: 'Gestión SCADA para refinerías y plantas. Control de crudo, laboratorio, despacho, simulaciones financieras Thinking Mode.',
        })}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-mono text-[11px] uppercase tracking-widest text-text-3 flex items-center gap-2">
        <a href="/software" className="hover:text-brand">Software</a>
        <ChevronRight size={12} />
        <span className="text-text-1">Refinery</span>
      </nav>

      <section className="relative border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-40" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-brand pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Badge variant="brand" dot pulse>Refinerías · plantas</Badge>
                <Badge variant="mono">SCADA + Finanzas</Badge>
                <Badge variant="ok">V1 · 3 meses</Badge>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-1 tracking-tight mb-5">
                Castillo <span className="text-brand">Refinery</span>
              </h1>
              <p className="text-xl text-text-2 leading-relaxed mb-6">
                Administración integral de refinerías y plantas de procesamiento. Controla entrada
                de gandolas, verificación de crudo, laboratorio y simulaciones financieras
                <span className="text-text-1 font-semibold"> (Thinking Mode)</span> para decidir cuándo vender.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-surface-2 border border-DEFAULT rounded-md overflow-hidden mb-8">
                {[
                  { k: '3 meses', v: 'V1 entregada' },
                  { k: 'SCADA', v: 'Visualización' },
                  { k: 'Push', v: 'Alertas multi-OS' },
                  { k: 'Sim', v: 'Thinking Mode' },
                ].map((m) => (
                  <div key={m.v} className="bg-ink p-4">
                    <p className="font-mono text-2xl text-brand tabular-nums leading-none mb-1">{m.k}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-3">{m.v}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setIsModalOpen(true)} className="bg-brand hover:bg-brand-hi text-text-1 px-6 py-3 rounded font-semibold text-sm transition-colors">
                  Solicitar demo Refinery
                </button>
                <a href="#refinery-features" className="inline-flex items-center justify-center text-text-1 px-6 py-3 rounded font-semibold text-sm border border-emphasis hover:border-brand transition-colors">
                  Ver capacidades
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ImagePlaceholder
                kind="dashboard"
                alt="Castillo Refinery · visualización SCADA"
                fileName="refinery-scada.webp"
                path="public/img/products/"
                width={1600}
                height={1000}
                recommendedDims="1600×1000"
              />
            </div>
          </Reveal>

          <Reveal id="refinery-features" className="mt-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="mono">/ capacidades</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { icon: Truck, t: 'Entrada de gandolas', d: 'Registro completo de cada despacho · placa, transportista, volumen, hora, foto del precinto.' },
                { icon: Beaker, t: 'Laboratorio', d: 'API, BSW, viscosidad. Resultados vinculados a la gandola y al lote. Histórico por proveedor.' },
                { icon: Activity, t: 'Visual tipo SCADA', d: 'Diagrama vivo del proceso: tanques, líneas, válvulas, niveles. Estados en tiempo real.' },
                { icon: LineChart, t: 'Thinking Mode', d: 'Simulación financiera: precio mercado, margen, momento óptimo de venta. Decisiones data-driven.' },
                { icon: Bell, t: 'Alertas push', d: 'Notificaciones Windows · Mac · App móvil · correo. Contratos próximos a vencer, mermas, anomalías.' },
                { icon: Boxes, t: 'Inventario y despacho', d: 'Stock por tanque, mezclas, despachos a clientes. Trazabilidad de cada barril.' },
                { icon: AlertCircle, t: 'Mermas y anomalías', d: 'Detección automática de pérdidas operativas. Reportes por turno y por lote.' },
                { icon: BarChart3, t: 'Reportes ejecutivos', d: 'Producción, ventas, márgenes, comparativos. Exportables para directorio.' },
              ].map(({ icon: Icon, t, d }) => (
                <MotionCard key={t} className="bg-surface-1 border border-DEFAULT hover:border-brand rounded-md p-5">
                  <Icon className="text-brand mb-4" size={20} />
                  <h3 className="text-sm font-semibold text-text-1 mb-2">{t}</h3>
                  <p className="text-text-3 text-xs leading-relaxed">{d}</p>
                </MotionCard>
              ))}
            </Stagger>
          </Reveal>

          <Reveal className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="mono">/ pantallas</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { f: 'refinery-scada-detalle.webp', a: 'Visualización SCADA · tanques y líneas' },
                { f: 'refinery-laboratorio.webp', a: 'Laboratorio · análisis API/BSW' },
                { f: 'refinery-thinking.webp', a: 'Thinking Mode · simulación financiera' },
                { f: 'refinery-despacho.webp', a: 'Despacho de gandolas' },
              ].map((s) => (
                <ImagePlaceholder
                  key={s.f}
                  kind="dashboard"
                  alt={`Refinery · ${s.a}`}
                  fileName={s.f}
                  path="public/img/products/"
                  width={1600}
                  height={1000}
                  recommendedDims="1600×1000"
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-16 bg-surface-1 border border-DEFAULT rounded-md p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-text-1 mb-3 tracking-tight">
              ¿Operas una planta y quieres SCADA + simulación financiera?
            </h2>
            <p className="text-text-3 mb-6 max-w-2xl mx-auto">
              Agenda una demo de 30 minutos. Te mostramos el Thinking Mode con datos reales del mercado.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="bg-brand hover:bg-brand-hi text-text-1 px-8 py-3 rounded font-semibold text-sm inline-flex items-center gap-2">
              Solicitar demo <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Solicitar demo · Refinery">
        <p className="text-text-3 mb-4 text-sm">Déjenos sus datos y le mostraremos Refinery con un caso real.</p>
        <LeadForm defaultInterest="Refinery" onSuccess={() => setTimeout(() => setIsModalOpen(false), 1800)} />
      </Modal>
    </div>
  );
};

export default Refinery;
