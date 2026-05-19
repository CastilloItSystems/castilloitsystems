import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code,
  Database,
  Monitor,
  Smartphone,
} from "lucide-react";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import LeadForm from "../../components/LeadForm";
import ScadaBar from "../../components/ScadaBar";
import SEO from "../../components/SEO";
import {
  MotionCard,
  Reveal,
  Stagger,
  m,
  staggerItem,
} from "../../components/Motion";

interface DevService {
  id: string;
  code: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  proof: string;
  interest: string;
  bullets: string[];
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

const DEV_SERVICES: DevService[] = [
  {
    id: "web",
    code: "SW-01",
    icon: Code,
    title: "Aplicaciones web empresariales",
    desc: "Sistemas internos, portales de clientes y dashboards para operar con permisos, trazabilidad y reportes.",
    proof: "Ideal para administración, ventas, operaciones y gerencia",
    interest: "Software a medida",
    bullets: [
      "Módulos por rol y permisos",
      "Reportes exportables",
      "Auditoría de cambios",
    ],
  },
  {
    id: "mobile",
    code: "APP-02",
    icon: Smartphone,
    title: "Apps móviles Android/iOS",
    desc: "Aplicaciones para clientes, técnicos de campo, supervisores o equipos comerciales que necesitan capturar datos rápido.",
    proof: "Flujos de campo, formularios, notificaciones y geolocalización",
    interest: "Apps mobile / desktop",
    bullets: [
      "Android, iOS o PWA según caso",
      "Modo offline si el proceso lo exige",
      "Sincronización con APIs y bases de datos",
    ],
  },
  {
    id: "desktop",
    code: "OPS-03",
    icon: Monitor,
    title: "Aplicaciones desktop / paneles internos",
    desc: "Herramientas instalables o paneles operativos para puestos de atención, supervisión, almacén o backoffice.",
    proof: "Enfoque en velocidad, estabilidad y uso diario",
    interest: "Apps mobile / desktop",
    bullets: [
      "Interfaces densas para operación",
      "Lectores, periféricos e impresoras",
      "Roles, bitácora y respaldo",
    ],
  },
  {
    id: "dashboards",
    code: "API-04",
    icon: Database,
    title: "Dashboards, APIs e integraciones",
    desc: "Conectamos sistemas existentes para eliminar doble carga y convertir datos dispersos en decisiones.",
    proof: "APIs, PostgreSQL, reportes y conexión con terceros",
    interest: "Software a medida",
    bullets: [
      "APIs REST y webhooks",
      "Migración y limpieza de datos",
      "Reportes gerenciales en tiempo real",
    ],
  },
];

const DEV_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Levantamiento",
    desc: "Roles, flujos, datos y puntos de dolor. Sin asumir nada.",
  },
  {
    step: "02",
    title: "Prototipo funcional",
    desc: "Pantallas reales para validar antes de construir. El cliente aprueba.",
  },
  {
    step: "03",
    title: "Desarrollo iterativo",
    desc: "Entregas incrementales. No se pagan módulos que no existan.",
  },
  {
    step: "04",
    title: "Despliegue y capacitación",
    desc: "Deploy en VPS propio, Docker, respaldo y entrenamiento in situ.",
  },
  {
    step: "05",
    title: "Soporte post-entrega",
    desc: "Soporte local Anzoátegui. Respuesta en horas, no días.",
  },
];

const contactLink = (interest: string) =>
  `/contacto?interest=${encodeURIComponent(interest)}`;

const Desarrollo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Software a medida · Aplicaciones web, mobile y desktop · Castillo IT Anzoátegui"
        description="Desarrollo de software a medida en Anzoátegui: aplicaciones web empresariales, apps Android/iOS, paneles desktop, dashboards y APIs. Presupuesto cerrado, soporte local."
        path="/software/desarrollo"
        keywords={[
          "software a medida venezuela",
          "desarrollo aplicaciones web venezuela",
          "apps móviles anzoátegui",
          "sistemas internos empresariales",
          "dashboards apis venezuela",
          "desarrollo software anzoátegui",
        ]}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-mono text-[11px] uppercase tracking-widest text-text-3 flex items-center gap-2">
        <a href="/software" className="hover:text-brand">
          Software
        </a>
        <ChevronRight size={12} />
        <span className="text-text-1">Desarrollo a medida</span>
      </nav>

      {/* Hero */}
      <section className="relative border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-40" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] glow-brand pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <Reveal>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <Badge variant="brand" dot>
                Servicio
              </Badge>
              <Badge variant="mono">Presupuesto cerrado</Badge>
              <Badge variant="ok">Soporte local</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-text-1 tracking-tight mb-5 max-w-4xl">
              Desarrollo a medida para{" "}
              <span className="text-brand">operaciones reales</span>
            </h1>
            <p className="text-xl text-text-2 leading-relaxed mb-6 max-w-3xl">
              Construimos el sistema que su empresa necesita — web, mobile o
              desktop — sin plantillas genéricas ni costos ocultos. Desde el
              levantamiento hasta el soporte post-entrega.
            </p>
            <p className="text-text-3 leading-relaxed mb-8 max-w-3xl">
              React · Next.js · Node · PostgreSQL · Docker. Desplegado en
              infraestructura propia del cliente o en nuestros VPS
              administrados. Garantía de funcionamiento con presupuesto 100%
              cerrado.
            </p>

            <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-surface-2 border border-DEFAULT rounded-md overflow-hidden mb-8">
              {[
                { k: "4", v: "Tipos de solución" },
                { k: "100%", v: "Presupuesto cerrado" },
                { k: "Local", v: "Soporte Anzoátegui" },
                { k: "5", v: "Pasos al deploy" },
              ].map((metric) => (
                <m.div
                  key={metric.v}
                  variants={staggerItem}
                  className="bg-ink p-4"
                >
                  <p className="font-mono text-2xl text-brand tabular-nums leading-none mb-1">
                    {metric.k}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-3">
                    {metric.v}
                  </p>
                </m.div>
              ))}
            </Stagger>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-brand hover:bg-brand-hi text-text-1 px-6 py-3 rounded font-semibold text-sm transition-colors"
              >
                Solicitar evaluación gratuita
              </button>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center text-text-1 px-6 py-3 rounded font-semibold text-sm border border-emphasis hover:border-brand transition-colors"
              >
                Ver servicios
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="mono">/ servicios de desarrollo</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-text-1 tracking-tight mb-4">
              Cuatro tipos de solución, un mismo estándar
            </h2>
            <p className="text-text-2 max-w-2xl">
              Cada proyecto empieza con un levantamiento real. No asumimos nada
              hasta entender su operación.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {DEV_SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <MotionCard
                  key={svc.id}
                  className="group relative bg-surface-1 border border-DEFAULT hover:border-brand rounded-md p-6 overflow-hidden"
                >
                  <a
                    href={contactLink(svc.interest)}
                    className="absolute inset-0 z-10"
                    aria-label={`Solicitar: ${svc.title}`}
                  />
                  <div className="relative z-0">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="size-11 border border-emphasis rounded flex items-center justify-center text-brand">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                        {svc.code}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-text-1 mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-text-3 text-sm leading-relaxed mb-3">
                      {svc.desc}
                    </p>
                    <p className="text-[11px] font-mono text-brand mb-4">
                      {svc.proof}
                    </p>
                    <ul className="space-y-2 mb-5">
                      {svc.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-sm text-text-2"
                        >
                          <span className="mt-2 size-1.5 rounded-full bg-brand shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-DEFAULT pt-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2 transition-all">
                        Solicitar evaluación <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </MotionCard>
              );
            })}
          </Stagger>

          {/* Proceso */}
          <Reveal id="proceso" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="mono">/ cómo trabajamos</Badge>
              <p className="text-text-3 text-sm">
                Del levantamiento al deploy en producción
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-surface-2 border border-DEFAULT rounded-md overflow-hidden">
              {DEV_STEPS.map((s) => (
                <div key={s.step} className="bg-ink p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brand mb-3">
                    {s.step}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={13} className="text-brand shrink-0" />
                    <p className="font-semibold text-text-1 text-sm">
                      {s.title}
                    </p>
                  </div>
                  <p className="text-text-3 text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Por qué Castillo IT */}
      <section className="py-16 border-t border-DEFAULT">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="mono" className="mb-4">
                  / por qué nosotros
                </Badge>
                <h2 className="text-3xl md:text-4xl font-semibold text-text-1 tracking-tight mb-6">
                  Software construido en Anzoátegui, para el contexto venezolano
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      t: "Presupuesto cerrado",
                      d: "El precio acordado es el precio final. Sin sorpresas ni adicionales no discutidos.",
                    },
                    {
                      t: "Soporte local",
                      d: "Equipo en Anzoátegui. Podemos ir a su empresa. Respuesta en horas, no días.",
                    },
                    {
                      t: "Código propio del cliente",
                      d: "El código fuente es del cliente. Sin vendor lock-in ni licencias anuales.",
                    },
                    {
                      t: "Entregamos lo que acordamos",
                      d: "Prototipo validado antes de construir. Entrega incremental. Sin sorpresas de alcance.",
                    },
                  ].map((item) => (
                    <div key={item.t} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-brand mt-1 shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-text-1 text-sm">
                          {item.t}
                        </p>
                        <p className="text-text-3 text-sm">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-surface-1 border border-brand/30 rounded-md p-8">
                <ScadaBar
                  label="Stack de desarrollo"
                  code="REACT · NODE · POSTGRES"
                  className="mb-6 pb-5 border-b border-DEFAULT"
                />
                <h3 className="text-xl font-semibold text-text-1 mb-4">
                  Tecnología probada en producción
                </h3>
                <p className="text-text-2 text-sm leading-relaxed mb-6">
                  No experimentamos con su proyecto. Usamos el stack con el que
                  ya tenemos sistemas corriendo en producción: NomiSys, Autosys,
                  Refinery y Gym.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "React",
                    "Next.js",
                    "Node.js",
                    "PostgreSQL",
                    "Docker",
                    "VPS",
                    "REST API",
                  ].map((t) => (
                    <Badge key={t} variant="mono">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex w-full items-center justify-center gap-2 bg-brand hover:bg-brand-hi text-text-1 px-5 py-3 rounded font-semibold text-sm"
                  >
                    Solicitar evaluación gratuita <ArrowRight size={16} />
                  </button>
                  <a
                    href="/software"
                    className="inline-flex w-full items-center justify-center gap-2 bg-surface-2 hover:bg-surface-3 border border-DEFAULT text-text-1 px-5 py-3 rounded font-semibold text-sm"
                  >
                    Ver productos listos para usar <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Solicitar evaluación"
      >
        <LeadForm
          defaultInterest="Software a medida"
          onSuccess={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Desarrollo;
