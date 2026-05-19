import React, { useState } from "react";
import {
  ArrowRight,
  Bell,
  Bot,
  CheckCircle2,
  ChevronRight,
  FileDown,
  GitMerge,
  RefreshCw,
  Server,
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

interface AutoCase {
  code: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  bullets: string[];
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

const AUTO_CASES: AutoCase[] = [
  {
    code: "AUT-01",
    icon: Bell,
    title: "Alertas y validaciones",
    desc: "Facturas vencidas, stock bajo, pagos pendientes. El sistema avisa en tiempo real por WhatsApp, email o Telegram.",
    bullets: [
      "Facturas y cobros",
      "Inventario mínimo",
      "Aprobaciones pendientes",
    ],
  },
  {
    code: "AUT-02",
    icon: FileDown,
    title: "Reportes automáticos",
    desc: "Genera, formatea y envía reportes diarios, semanales o mensuales sin intervención humana.",
    bullets: [
      "PDF y Excel programados",
      "Envío por email o mensajería",
      "Gerencia recibe sin pedirlo",
    ],
  },
  {
    code: "AUT-03",
    icon: RefreshCw,
    title: "Sincronización de sistemas",
    desc: "Ventas, CRM y contabilidad que no conversan. Los conectamos para eliminar doble carga de datos.",
    bullets: [
      "Webhooks y APIs REST",
      "PostgreSQL ↔ apps externas",
      "Logs de cada operación",
    ],
  },
  {
    code: "AUT-04",
    icon: GitMerge,
    title: "Flujos de aprobación",
    desc: "Solicitudes de compra, vacaciones o crédito que fluyen digitalmente sin depender de correos perdidos.",
    bullets: [
      "Multi-nivel y multi-rol",
      "Escalado si no responde",
      "Historial auditable",
    ],
  },
  {
    code: "AUT-05",
    icon: Bot,
    title: "Bots e IA interna",
    desc: "Asistentes que responden preguntas, clasifican solicitudes o extraen datos de documentos automáticamente.",
    bullets: [
      "WhatsApp Business",
      "Procesamiento de PDFs",
      "Integración Gemini / GPT",
    ],
  },
  {
    code: "AUT-06",
    icon: Server,
    title: "VPS administrado con n8n",
    desc: "Servidor propio con n8n, base de datos, SSL y backups. Su automatización no depende de terceros.",
    bullets: [
      "Linux + Docker + n8n",
      "SSL, dominio y monitoreo",
      "Backups y restauración documentada",
    ],
  },
];

const AUTO_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Diagnóstico del proceso",
    desc: "Mapeamos el flujo manual: quién hace qué, cuánto tarda y dónde falla.",
  },
  {
    step: "02",
    title: "Diseño del flujo n8n",
    desc: "Diagramamos la automatización: nodos, condiciones, integraciones y puntos de control.",
  },
  {
    step: "03",
    title: "Construcción y pruebas",
    desc: "Construimos el flujo con datos reales del cliente y validamos cada rama.",
  },
  {
    step: "04",
    title: "VPS y despliegue",
    desc: "Montamos el servidor propio con n8n, bases de datos, SSL y backups automatizados.",
  },
  {
    step: "05",
    title: "Documentación y entrega",
    desc: "Manual de operación, credenciales y sesión de traspaso con el equipo responsable.",
  },
];

const contactLink = (interest: string) =>
  `/contacto?interest=${encodeURIComponent(interest)}`;

const Automatizacion: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Automatización n8n · IA y RPA para empresas · Castillo IT Anzoátegui"
        description="Automatización de procesos con n8n, IA y RPA en Anzoátegui: alertas, reportes, sincronización de datos, flujos de aprobación, bots y VPS administrado. Sin vendor lock-in."
        path="/software/automatizacion"
        keywords={[
          "automatización n8n venezuela",
          "rpa inteligencia artificial venezuela",
          "flujos n8n anzoátegui",
          "bots whatsapp empresas venezuela",
          "automatización procesos anzoátegui",
          "vps n8n postgresql venezuela",
        ]}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-mono text-[11px] uppercase tracking-widest text-text-3 flex items-center gap-2">
        <a href="/software" className="hover:text-brand">
          Software
        </a>
        <ChevronRight size={12} />
        <span className="text-text-1">Automatización n8n / IA</span>
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
              <Badge variant="mono">n8n · IA · RPA</Badge>
              <Badge variant="ok">VPS propio</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-text-1 tracking-tight mb-5 max-w-4xl">
              Deje de hacer a mano lo que una{" "}
              <span className="text-brand">máquina puede hacer mejor</span>
            </h1>
            <p className="text-xl text-text-2 leading-relaxed mb-6 max-w-3xl">
              Flujos n8n, IA y RPA para validar información, emitir alertas,
              generar reportes y mover datos entre sistemas. Menos trabajo
              manual, menos errores, más control.
            </p>
            <p className="text-text-3 leading-relaxed mb-8 max-w-3xl">
              Todo en infraestructura propia — sin depender de plataformas de
              terceros que pueden subir precios o desaparecer. Su
              automatización, en su servidor, bajo su control.
            </p>

            <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-surface-2 border border-DEFAULT rounded-md overflow-hidden mb-8">
              {[
                { k: "24/7", v: "Sin parar" },
                { k: "<1min", v: "Respuesta" },
                { k: "0", v: "Error humano" },
                { k: "VPS", v: "Infraestructura propia" },
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
                Solicitar evaluación de automatización
              </button>
              <a
                href="#casos"
                className="inline-flex items-center justify-center text-text-1 px-6 py-3 rounded font-semibold text-sm border border-emphasis hover:border-brand transition-colors"
              >
                Ver casos de uso
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Casos de uso */}
      <section id="casos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="mono">/ casos de uso</Badge>
              <div className="h-px flex-1 bg-DEFAULT" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-text-1 tracking-tight mb-4">
              Qué automatizamos para empresas como la suya
            </h2>
            <p className="text-text-2 max-w-2xl">
              Cada caso empieza diagnosticando el proceso manual actual. Solo
              automatizamos lo que vale la pena.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {AUTO_CASES.map((c) => {
              const Icon = c.icon;
              return (
                <MotionCard
                  key={c.code}
                  className="group relative bg-surface-1 border border-DEFAULT hover:border-brand rounded-md p-6 overflow-hidden"
                >
                  <a
                    href={contactLink("Automatización n8n / IA")}
                    className="absolute inset-0 z-10"
                    aria-label={`Solicitar automatización: ${c.title}`}
                  />
                  <div className="relative z-0">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="size-11 border border-emphasis rounded flex items-center justify-center text-brand">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                        {c.code}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-text-1 mb-3">
                      {c.title}
                    </h3>
                    <p className="text-text-3 text-sm leading-relaxed mb-5">
                      {c.desc}
                    </p>
                    <ul className="space-y-2 mb-5">
                      {c.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm text-text-2"
                        >
                          <span className="mt-2 size-1.5 rounded-full bg-brand shrink-0" />
                          <span>{bullet}</span>
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
              <Badge variant="mono">/ cómo automatizamos</Badge>
              <p className="text-text-3 text-sm">
                Del proceso manual al flujo autónomo en producción
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-surface-2 border border-DEFAULT rounded-md overflow-hidden">
              {AUTO_STEPS.map((s) => (
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

      {/* VPS + n8n CTA */}
      <section className="py-16 border-t border-DEFAULT">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="mono" className="mb-4">
                  / infraestructura propia
                </Badge>
                <h2 className="text-3xl md:text-4xl font-semibold text-text-1 tracking-tight mb-6">
                  Su automatización en un servidor que usted controla
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      t: "Sin vendor lock-in",
                      d: "n8n es open source. Si algún día decide salir, el código es suyo.",
                    },
                    {
                      t: "VPS administrado",
                      d: "Montamos Linux, Docker, n8n, base de datos, SSL, dominio, backups y monitoreo.",
                    },
                    {
                      t: "Documentación completa",
                      d: "Manual de operación, credenciales seguras y sesión de traspaso con su equipo.",
                    },
                    {
                      t: "Soporte continuo",
                      d: "Mantenimiento mensual o por incidente. Equipo local en Anzoátegui.",
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
                  label="Implementación administrada"
                  code="VPS · N8N · DB"
                  className="mb-6 pb-5 border-b border-DEFAULT"
                />
                <h3 className="text-xl font-semibold text-text-1 mb-4">
                  Stack de automatización
                </h3>
                <p className="text-text-2 text-sm leading-relaxed mb-6">
                  Linux · Docker · n8n · PostgreSQL · SSL · Backups automáticos
                  · Monitoreo. Listo para conectar cualquier sistema con
                  webhooks, APIs o bases de datos.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "Linux",
                    "Docker",
                    "n8n",
                    "PostgreSQL",
                    "SSL",
                    "Backups",
                    "Webhooks",
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
                    Solicitar evaluación de automatización{" "}
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href={contactLink("VPS / bases de datos / despliegues")}
                    className="inline-flex w-full items-center justify-center gap-2 bg-surface-2 hover:bg-surface-3 border border-DEFAULT text-text-1 px-5 py-3 rounded font-semibold text-sm"
                  >
                    Evaluar VPS / n8n <ArrowRight size={16} />
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
        title="Solicitar evaluación de automatización"
      >
        <LeadForm
          defaultInterest="Automatización n8n / IA"
          onSuccess={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Automatizacion;
