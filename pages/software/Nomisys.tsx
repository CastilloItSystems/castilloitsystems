import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Calculator,
  CalendarDays,
  Coins,
  FileText,
  Clock,
  Users as UsersIcon,
  Receipt,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import Modal from '../../components/Modal';
import LeadForm from '../../components/LeadForm';
import Badge from '../../components/Badge';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import SEO from '../../components/SEO';
import StructuredData, { softwareApplicationSchema } from '../../components/StructuredData';
import NomiSysCalculator from '../../components/NomiSysCalculator';
import CompareTable from '../../components/CompareTable';
import FAQ, { NOMISYS_FAQ } from '../../components/FAQ';
import Testimonials from '../../components/Testimonials';
import { MotionCard, Reveal, Stagger, m, staggerItem } from '../../components/Motion';

const Nomisys: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="NomiSys · Software de Nómina Petrolera CCP PDVSA · Castillo IT Anzoátegui"
        description="NomiSys: plataforma integral de nómina bajo el Contrato Colectivo Petrolero (CCP) PDVSA 2017-2019. Multi-empresa, RBAC, audit log, todos los sistemas de trabajo y régimen contratistas FUTPV."
        path="/software/nomisys"
        keywords={[
          'nomisys',
          'nómina petrolera venezuela',
          'software ccp pdvsa',
          'cálculo nómina contrato colectivo petrolero',
          'sistemas trabajo 7x7 stob',
          'futpv nómina contratistas',
        ]}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Software', url: '/software' },
          { name: 'NomiSys', url: '/software/nomisys' },
        ]}
        extra={softwareApplicationSchema({
          name: 'NomiSys',
          description:
            'Plataforma integral de nómina petrolera bajo el Contrato Colectivo Petrolero (CCP) PDVSA 2017-2019. Multi-empresa, RBAC granular, audit log, cobertura completa de sistemas de trabajo, prestaciones, jubilaciones y régimen contratistas FUTPV.',
        })}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-mono text-[11px] uppercase tracking-widest text-text-3 flex items-center gap-2">
        <a href="/software" className="hover:text-brand">Software</a>
        <ChevronRight size={12} />
        <span className="text-text-1">NomiSys</span>
      </nav>

      <section className="relative border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-40" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-brand pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Badge variant="brand" dot pulse>Producto principal</Badge>
                <Badge variant="mono">CCP · PDVSA 2017-2019</Badge>
                <Badge variant="ok">Production-ready</Badge>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-text-1 tracking-tight mb-5">
                Nomi<span className="text-brand">Sys</span>
              </h1>
              <p className="text-xl text-text-2 leading-relaxed mb-6">
                La plataforma integral de nómina petrolera de Venezuela. Cubre el Contrato Colectivo
                Petrolero completo · multi-empresa · RBAC granular · auditoría total.
              </p>
              <p className="text-text-3 leading-relaxed mb-8">
                Monorepo Next.js 13 + Express + Prisma + PostgreSQL. Pensado para operadoras,
                contratistas, talleres y proveedores del sector hidrocarburos que requieren cumplir
                con FUTPV y reglas del tabulador petrolero.
              </p>

              <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-surface-2 border border-DEFAULT rounded-md overflow-hidden mb-8">
                {[
                  { k: '50+', v: 'Conceptos CCP' },
                  { k: '9', v: 'Sistemas de trabajo' },
                  { k: 'Multi', v: 'Empresa · RBAC' },
                  { k: '100%', v: 'Auditable' },
                ].map((metric) => (
                  <m.div key={metric.v} variants={staggerItem} className="bg-ink p-4">
                    <p className="font-mono text-2xl text-brand tabular-nums leading-none mb-1">{metric.k}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-3">{metric.v}</p>
                  </m.div>
                ))}
              </Stagger>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setIsModalOpen(true)} className="bg-brand hover:bg-brand-hi text-text-1 px-6 py-3 rounded font-semibold text-sm transition-colors">
                  Solicitar demo NomiSys
                </button>
                <a href="#nomisys-features" className="inline-flex items-center justify-center text-text-1 px-6 py-3 rounded font-semibold text-sm border border-emphasis hover:border-brand transition-colors">
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
                  <span className="font-mono text-[10px] text-text-3">nomisys / corrida-2026.05</span>
                  <span className="font-mono text-[10px] text-text-mute">PRD</span>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-[11px] text-text-3 font-mono mb-1">Período · 2026.05 · Mensual</p>
                    <p className="text-3xl font-semibold text-text-1 tracking-tight font-mono tabular-nums">
                      Bs. 12.847.392<span className="text-text-3 text-base">,18</span>
                    </p>
                    <p className="text-xs text-text-3 mt-1">142 empleados · 9 sistemas · 1 empresa</p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-DEFAULT">
                    {[
                      { k: 'Salario básico', v: '8.124.500,00', t: 'ok' },
                      { k: 'Tiempo extra', v: '1.284.092,18', t: 'ok' },
                      { k: 'Prima dominical', v: '942.800,00', t: 'ok' },
                      { k: 'Bono nocturno', v: '514.200,00', t: 'ok' },
                      { k: 'Ayuda vacacional', v: '1.981.800,00', t: 'warn' },
                    ].map((row) => (
                      <div key={row.k} className="flex justify-between items-center text-xs font-mono py-1">
                        <span className="text-text-2">{row.k}</span>
                        <span className="flex items-center gap-2">
                          <span className={`size-1 rounded-full ${row.t === 'ok' ? 'bg-ok' : 'bg-warn'}`} />
                          <span className="tabular-nums text-text-1">{row.v}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Capabilities */}
          <Reveal id="nomisys-features" className="mt-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="mono">/ capacidades</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { icon: Calculator, t: 'Cálculo CCP completo', d: 'Salarios, primas, bonos, prestaciones, vacaciones, ayuda vacacional, utilidades, jubilaciones e indemnizaciones.' },
                { icon: Clock, t: 'Sistemas de trabajo', d: '5×2 · 7×7 · 4×4 · 5-5-5-6 · 21×7 · STOB · 2×4 · 3×6 · 5×10. Nómina diaria y mensual.' },
                { icon: Building2, t: 'Multi-empresa', d: 'Tenant aislado por empresa con catálogo de roles y permisos sincronizados al arranque.' },
                { icon: ShieldCheck, t: 'RBAC granular', d: 'Permisos por membership. Catálogo extensible. Audit log de cada operación crítica.' },
                { icon: UsersIcon, t: 'Empleados y RR.HH.', d: 'Cargos, departamentos, historial salarial, historial de status, contratos, vacaciones.' },
                { icon: Receipt, t: 'Corridas auditables', d: 'Períodos · runs · líneas · inputs. Cada cálculo trazable con conceptos configurables.' },
                { icon: Coins, t: 'Préstamos y deducciones', d: 'Cuotas automáticas, retenciones legales, conceptos configurables por empresa.' },
                { icon: CalendarDays, t: 'Asistencia · horas extras', d: 'Tiempo de viaje, bono nocturno, prima dominical, primas especiales (buceo, altura).' },
                { icon: FileText, t: 'Régimen contratistas', d: 'Soporte específico para empresas contratistas del sector petrolero según FUTPV.' },
              ].map(({ icon: Icon, t, d }) => (
                <MotionCard key={t} className="bg-surface-1 border border-DEFAULT hover:border-brand rounded-md p-5">
                  <Icon className="text-brand mb-4" size={20} />
                  <h3 className="text-sm font-semibold text-text-1 mb-2">{t}</h3>
                  <p className="text-text-3 text-xs leading-relaxed">{d}</p>
                </MotionCard>
              ))}
            </Stagger>
            <div className="mt-8 flex flex-wrap gap-2">
              {['Next.js 13', 'App Router', 'Express', 'Prisma', 'PostgreSQL', 'Docker', 'GHCR', 'JWT', 'Socket.io'].map((tech) => (
                <Badge key={tech} variant="mono">{tech}</Badge>
              ))}
            </div>
          </Reveal>

          {/* Calculator */}
          <Reveal id="calculadora-nomina" className="mt-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="brand" dot pulse>/ calculadora</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold text-text-1 tracking-tight mb-2">
              Estima tu nómina petrolera en segundos
            </h3>
            <p className="text-text-3 mb-6 max-w-2xl">
              Ajusta empleados, salario y sistema de trabajo. NomiSys aplica las fórmulas del CCP en tiempo real.
            </p>
            <NomiSysCalculator onRequestDemo={() => setIsModalOpen(true)} />
          </Reveal>

          {/* Screenshots */}
          <Reveal className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <Badge variant="mono">/ pantallas</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { f: 'nomisys-dashboard.webp', a: 'Dashboard general · resumen corridas' },
                { f: 'nomisys-empleados.webp', a: 'Listado de empleados con filtros' },
                { f: 'nomisys-corrida.webp', a: 'Detalle de corrida · líneas y conceptos' },
              ].map((s) => (
                <ImagePlaceholder
                  key={s.f}
                  kind="dashboard"
                  alt={`NomiSys · ${s.a}`}
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

      <CompareTable />
      <Testimonials />
      <FAQ items={NOMISYS_FAQ} title="Preguntas frecuentes · NomiSys" />

      <section className="py-16 bg-ink">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-text-1 mb-3 tracking-tight">
            ¿Listo para cerrar nómina en 4 horas?
          </h2>
          <p className="text-text-3 mb-6">Agenda demo con un ingeniero. Caso real con sus datos.</p>
          <button onClick={() => setIsModalOpen(true)} className="bg-brand hover:bg-brand-hi text-text-1 px-8 py-3 rounded font-semibold text-sm inline-flex items-center gap-2">
            Solicitar demo NomiSys <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Solicitar demo · NomiSys">
        <p className="text-text-3 mb-4 text-sm">Déjenos sus datos. Coordinamos una demo con un caso real de su empresa.</p>
        <LeadForm defaultInterest="NomiSys" onSuccess={() => setTimeout(() => setIsModalOpen(false), 1800)} />
      </Modal>
    </div>
  );
};

export default Nomisys;
