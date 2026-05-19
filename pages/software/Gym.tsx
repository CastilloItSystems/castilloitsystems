import React, { useState } from 'react';
import { Smartphone, Fingerprint, CreditCard, BarChart3, Users, Clock, DoorOpen, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import Modal from '../../components/Modal';
import LeadForm from '../../components/LeadForm';
import Badge from '../../components/Badge';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import SEO from '../../components/SEO';
import StructuredData, { softwareApplicationSchema } from '../../components/StructuredData';
import { MotionCard, Reveal, Stagger } from '../../components/Motion';

const Gym: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Castillo Gym · Control de acceso biométrico + analítica para gimnasios"
        description="Sistema integral para gimnasios: biometría Hikvision, validación de pago móvil inmediata, analítica demográfica (género/edad) para decisiones de negocio."
        path="/software/gym"
        keywords={['castillo gym', 'control acceso gimnasio venezuela', 'biometría hikvision', 'pago móvil gimnasio', 'analítica clientes']}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Software', url: '/software' },
          { name: 'Gym', url: '/software/gym' },
        ]}
        extra={softwareApplicationSchema({
          name: 'Castillo Gym',
          description: 'Plataforma de gestión y control de acceso para gimnasios con biometría Hikvision, pago móvil y analítica demográfica.',
        })}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-mono text-[11px] uppercase tracking-widest text-text-3 flex items-center gap-2">
        <a href="/software" className="hover:text-brand">Software</a>
        <ChevronRight size={12} />
        <span className="text-text-1">Gym</span>
      </nav>

      <section className="relative border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-40" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-brand pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Badge variant="brand" dot pulse>Gimnasios · centros</Badge>
                <Badge variant="mono">BIOMETRÍA + IA</Badge>
                <Badge variant="ok">Production-ready</Badge>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-1 tracking-tight mb-5">
                Castillo <span className="text-brand">Gym</span>
              </h1>
              <p className="text-xl text-text-2 leading-relaxed mb-6">
                Control de acceso integrado con biométricos Hikvision. No solo abre puertas:
                registra métricas de género y edad para tomar decisiones reales de negocio.
                Validación de pago móvil inmediata.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-surface-2 border border-DEFAULT rounded-md overflow-hidden mb-8">
                {[
                  { k: 'Hikvision', v: 'Biometría' },
                  { k: '< 1 s', v: 'Validación pago' },
                  { k: 'IA', v: 'Demografía' },
                  { k: '24/7', v: 'Sin staff' },
                ].map((m) => (
                  <div key={m.v} className="bg-ink p-4">
                    <p className="font-mono text-xl text-brand tabular-nums leading-none mb-1">{m.k}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-3">{m.v}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setIsModalOpen(true)} className="bg-brand hover:bg-brand-hi text-text-1 px-6 py-3 rounded font-semibold text-sm transition-colors">
                  Solicitar demo Gym
                </button>
                <a href="#gym-features" className="inline-flex items-center justify-center text-text-1 px-6 py-3 rounded font-semibold text-sm border border-emphasis hover:border-brand transition-colors">
                  Ver capacidades
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ImagePlaceholder
                kind="dashboard"
                alt="Castillo Gym · panel de control de acceso"
                fileName="gym-biometria.webp"
                path="public/img/products/"
                width={1600}
                height={1000}
                recommendedDims="1600×1000"
              />
            </div>
          </Reveal>

          <Reveal id="gym-features" className="mt-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="mono">/ capacidades</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { icon: Fingerprint, t: 'Biometría Hikvision', d: 'Huella + rostro 3D. Acceso sin tarjetas. Soporte para torniquetes y puertas comunes.' },
                { icon: CreditCard, t: 'Pago móvil instantáneo', d: 'Validación automática con bancos venezolanos. Acceso solo si pago verificado.' },
                { icon: BarChart3, t: 'Analítica demográfica', d: 'Flujo de personas por edad y género. Decide horarios de clases (ej. spinning).' },
                { icon: Users, t: 'Membresías', d: 'Planes, congelaciones, renovaciones automáticas. Alertas de vencimiento por WhatsApp/SMS.' },
                { icon: Clock, t: 'Histórico de visitas', d: 'Quién entró, cuándo, frecuencia. Identifica clientes en riesgo de churn.' },
                { icon: DoorOpen, t: 'Multi-acceso', d: 'Áreas restringidas: sala VIP, vestidores, piscina. Permisos por membresía.' },
                { icon: Calendar, t: 'Reservas de clases', d: 'Cupos por instructor y horario. Lista de espera automática.' },
                { icon: Smartphone, t: 'App móvil', d: 'El cliente ve su plan, paga, agenda. Reduce carga de recepción 70%.' },
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
                { f: 'gym-acceso-live.webp', a: 'Panel de acceso en tiempo real' },
                { f: 'gym-membresias.webp', a: 'Gestión de membresías y planes' },
                { f: 'gym-analitica.webp', a: 'Analítica demográfica · clases óptimas' },
                { f: 'gym-app-cliente.webp', a: 'App cliente · reservas y pagos' },
              ].map((s) => (
                <ImagePlaceholder
                  key={s.f}
                  kind="dashboard"
                  alt={`Gym · ${s.a}`}
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
              ¿Quieres automatizar el acceso y entender tus clientes?
            </h2>
            <p className="text-text-3 mb-6 max-w-2xl mx-auto">
              Demo en sitio: instalamos un quiosco de prueba en tu gimnasio por 7 días.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="bg-brand hover:bg-brand-hi text-text-1 px-8 py-3 rounded font-semibold text-sm inline-flex items-center gap-2">
              Solicitar demo <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Solicitar demo · Gym">
        <p className="text-text-3 mb-4 text-sm">Déjenos sus datos y agendamos visita técnica.</p>
        <LeadForm defaultInterest="Gym" onSuccess={() => setTimeout(() => setIsModalOpen(false), 1800)} />
      </Modal>
    </div>
  );
};

export default Gym;
