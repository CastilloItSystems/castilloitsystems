import React from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  CheckCircle2,
  Cloud,
  Code,
  Database,
  FileDown,
  GitMerge,
  Monitor,
  Receipt,
  RefreshCw,
  Server,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";
import Badge from "../components/Badge";
import ImagePlaceholder from "../components/ImagePlaceholder";
import ScadaBar from "../components/ScadaBar";
import SEO from "../components/SEO";
import StructuredData, {
  softwareApplicationSchema,
} from "../components/StructuredData";
import { MotionCard, Reveal, Stagger } from "../components/Motion";

interface Product {
  id: "nomisys" | "autosys" | "refinery" | "gym";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  flagship?: boolean;
  tagline: string;
  category: string;
  status: string;
  href: string;
  bullets: string[];
  highlight: string;
}

interface SoftwareService {
  id: string;
  code: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  proof: string;
  interest: string;
  bullets: string[];
}

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

const PRODUCTS: Product[] = [
  {
    id: "nomisys",
    icon: Receipt,
    title: "NomiSys",
    flagship: true,
    tagline: "Plataforma integral de nómina petrolera CCP · PDVSA 2017-2019",
    category: "CCP · PDVSA · FUTPV",
    status: "Producto principal",
    href: "/software/nomisys",
    bullets: [
      "Sistemas 5×2 · 7×7 · STOB · contratistas",
      "Multi-empresa · RBAC · audit log",
      "Prestaciones · jubilaciones · indemnizaciones",
    ],
    highlight: "Cierre nómina en < 4 h · 100% auditable",
  },
  {
    id: "autosys",
    icon: Wrench,
    title: "Autosys",
    tagline: "Gestión integral para talleres mecánicos y flotas",
    category: "Talleres · flotas",
    status: "Implementación 6 sem",
    href: "/software/autosys",
    bullets: [
      "Órdenes de trabajo con trazabilidad completa",
      "Inventario + compras + facturación SENIAT",
      "Productividad por mecánico en tiempo real",
    ],
    highlight: "Factura OT en < 5 min · on-premise",
  },
  {
    id: "refinery",
    icon: BarChart3,
    title: "Refinery",
    tagline: "Software SCADA + simulación financiera para plantas",
    category: "Refinerías · plantas",
    status: "V1 · 3 meses",
    href: "/software/refinery",
    bullets: [
      "Visualización tipo SCADA",
      "Thinking Mode · simulación de mercados",
      "Alertas push multi-plataforma",
    ],
    highlight: "Decisiones data-driven · margen óptimo",
  },
  {
    id: "gym",
    icon: Smartphone,
    title: "Gym",
    tagline: "Control de acceso biométrico + analítica para gimnasios",
    category: "Gimnasios · centros",
    status: "Production-ready",
    href: "/software/gym",
    bullets: [
      "Biometría Hikvision · sin tarjetas",
      "Validación pago móvil instantánea",
      "Analítica demográfica · clases óptimas",
    ],
    highlight: "24/7 sin staff · app cliente",
  },
];

const DEV_SERVICES: SoftwareService[] = [
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

const Software: React.FC = () => {
  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Software a medida, apps, automatización n8n y VPS · Castillo IT"
        description="Desarrollo de software a medida: aplicaciones web, mobile y desktop, dashboards, APIs, automatización n8n/IA, VPS, bases de datos y productos Castillo listos para operar."
        path="/software"
        keywords={[
          "software a medida venezuela",
          "desarrollo apps móviles venezuela",
          "aplicaciones desktop venezuela",
          "automatización n8n venezuela",
          "vps n8n postgresql",
          "desarrollo de software anzoátegui",
          "nomisys nómina petrolera",
          "autosys taller mecánico",
          "castillo refinery",
          "castillo gym biometría",
          "software anzoátegui",
        ]}
      />
      <StructuredData
        breadcrumbs={[
          { name: "Inicio", url: "/" },
          { name: "Software", url: "/software" },
        ]}
        extra={PRODUCTS.map((p) =>
          softwareApplicationSchema({
            name: p.title === "NomiSys" ? "NomiSys" : `Castillo ${p.title}`,
            description: p.tagline,
          }),
        )}
      />

      <header className="relative bg-ink py-20 border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-50" />
        <div className="absolute inset-0 glow-brand opacity-60 pointer-events-none" />
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Badge variant="mono" className="mb-6">
            / software + automatización
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight text-text-1">
            Software a medida, automatización y productos{" "}
            <span className="text-brand">listos para operar</span>
          </h1>
          <p className="text-lg text-text-2 max-w-3xl leading-relaxed">
            Construimos aplicaciones web, mobile y desktop, dashboards, APIs,
            automatizaciones n8n e infraestructura VPS para empresas que
            necesitan dejar de operar con procesos manuales. Soporte local
            Anzoátegui · presupuesto cerrado.
          </p>
        </Reveal>
      </header>

      <section
        id="desarrollo"
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Reveal className="mb-12">
          <Badge variant="mono" className="mb-4">
            / desarrollo a medida
          </Badge>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-5xl font-semibold text-text-1 tracking-tight mb-4">
                Desarrollo a medida para operaciones reales
              </h2>
              <p className="text-text-2 leading-relaxed max-w-3xl">
                Si su equipo repite el mismo trabajo todos los días, usa hojas
                sueltas o depende de sistemas que no conversan entre sí, ahí hay
                una oportunidad clara de software. Diseñamos el flujo,
                construimos la herramienta y dejamos la operación medible.
              </p>
            </div>
            <div className="lg:col-span-4 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-DEFAULT bg-surface-2">
              {[
                { k: "WEB", v: "Apps internas" },
                { k: "API", v: "Integraciones" },
                { k: "VPS", v: "Operación propia" },
              ].map((metric) => (
                <div key={metric.k} className="bg-ink px-3 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brand">
                    {metric.k}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-text-1">
                    {metric.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {DEV_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <MotionCard
                key={service.id}
                className="group relative bg-surface-1 border border-DEFAULT hover:border-brand rounded-md p-6 overflow-hidden"
              >
                <a
                  href={contactLink(service.interest)}
                  className="absolute inset-0 z-10"
                  aria-label={`Solicitar auditoría para ${service.title}`}
                />
                <div className="relative z-0">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="size-11 border border-emphasis rounded flex items-center justify-center text-brand">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                      {service.code}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-1 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-3 text-sm leading-relaxed mb-5">
                    {service.desc}
                  </p>
                  <ul className="space-y-2 mb-5">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm text-text-2"
                      >
                        <span className="mt-2 size-1.5 rounded-full bg-brand shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto border-t border-DEFAULT pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-mute mb-3">
                      {service.proof}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2 transition-all">
                      Solicitar auditoría gratuita <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </MotionCard>
            );
          })}
        </Stagger>

        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="mono">/ cómo trabajamos</Badge>
            <p className="text-text-3 text-sm">
              Del diagnóstico al soporte en producción
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
                  <p className="font-semibold text-text-1 text-sm">{s.title}</p>
                </div>
                <p className="text-text-3 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="automatizacion" className="py-20 border-t border-DEFAULT">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12">
            <Badge variant="mono" className="mb-4">
              / automatización n8n · ia
            </Badge>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <h2 className="text-4xl md:text-5xl font-semibold text-text-1 tracking-tight mb-4">
                  Deje de hacer a mano lo que una máquina puede hacer mejor
                </h2>
                <p className="text-text-2 leading-relaxed max-w-3xl">
                  Flujos n8n, IA y RPA para validar información, emitir alertas,
                  generar reportes y mover datos entre sistemas. Menos trabajo
                  manual, menos errores, más control. Todo en infraestructura
                  propia — sin depender de terceros.
                </p>
              </div>
              <div className="lg:col-span-4 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-DEFAULT bg-surface-2">
                {[
                  { k: "24/7", v: "Sin parar" },
                  { k: "<1min", v: "Respuesta" },
                  { k: "0", v: "Error humano" },
                ].map((metric) => (
                  <div key={metric.k} className="bg-ink px-3 py-3">
                    <p className="font-mono text-lg font-bold text-brand tabular-nums leading-none">
                      {metric.k}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-text-1">
                      {metric.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
                    <div className="mt-auto border-t border-DEFAULT pt-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2 transition-all">
                        Solicitar evaluación <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </MotionCard>
              );
            })}
          </Stagger>

          <Reveal className="mb-12">
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

          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-surface-1 border border-brand/30 rounded-md p-8 items-center">
              <div>
                <ScadaBar
                  label="Implementación administrada"
                  code="VPS · N8N · DB"
                  className="mb-5 pb-4 border-b border-DEFAULT"
                />
                <h3 className="text-2xl md:text-3xl font-semibold text-text-1 tracking-tight mb-4">
                  Su automatización en infraestructura propia
                </h3>
                <p className="text-text-2 leading-relaxed mb-6">
                  Montamos el VPS, dejamos n8n operativo, conectamos base de
                  datos, dominio, SSL, backups y monitoreo. La automatización
                  sigue viva cuando el negocio lo necesita.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Linux",
                    "Docker",
                    "n8n",
                    "PostgreSQL",
                    "SSL",
                    "Backups",
                  ].map((item) => (
                    <Badge key={item} variant="mono">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={contactLink("Automatización n8n / IA")}
                  className="inline-flex w-full items-center justify-center gap-2 bg-brand hover:bg-brand-hi text-text-1 px-5 py-3 rounded font-semibold text-sm"
                >
                  Solicitar evaluación de automatización{" "}
                  <ArrowRight size={16} />
                </a>
                <a
                  href={contactLink("VPS / bases de datos / despliegues")}
                  className="inline-flex w-full items-center justify-center gap-2 bg-surface-2 hover:bg-surface-3 border border-DEFAULT text-text-1 px-5 py-3 rounded font-semibold text-sm"
                >
                  Evaluar VPS / n8n <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-DEFAULT">
        <Reveal className="mb-10">
          <Badge variant="mono" className="mb-4">
            / productos propios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-1 tracking-tight mb-3">
            Productos que prueban la capacidad
          </h2>
          <p className="text-text-3 max-w-3xl">
            NomiSys, Autosys, Refinery y Gym son evidencia de lo que
            construimos: sistemas con permisos, datos, operación diaria, soporte
            y despliegues reales.
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {PRODUCTS.map((p) => {
            const Icon = p.icon;
            return (
              <MotionCard
                key={p.id}
                className={`group relative flex flex-col bg-surface-1 border rounded-md overflow-hidden transition-colors ${
                  p.flagship
                    ? "border-brand/50 md:col-span-2 shadow-[0_0_60px_-20px_rgba(37,99,235,0.4)] hover:border-brand"
                    : "border-DEFAULT hover:border-brand"
                }`}
              >
                <a
                  href={p.href}
                  className="absolute inset-0 z-10"
                  aria-label={`Ver ${p.title}`}
                />
                <div className="p-7 md:p-8 flex flex-col h-full relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-12 border border-emphasis rounded flex items-center justify-center text-brand">
                      <Icon size={22} />
                    </div>
                    {p.flagship ? (
                      <Badge variant="brand" dot pulse>
                        <Sparkles size={10} className="mr-0.5" /> {p.status}
                      </Badge>
                    ) : (
                      <Badge variant="mono">{p.status}</Badge>
                    )}
                  </div>

                  <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-1 tracking-tight">
                      {p.id === "nomisys" ? (
                        <>
                          Nomi<span className="text-brand">Sys</span>
                        </>
                      ) : p.id === "autosys" ? (
                        <>
                          Auto<span className="text-brand">sys</span>
                        </>
                      ) : (
                        <>
                          Castillo <span className="text-brand">{p.title}</span>
                        </>
                      )}
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-3">
                      {p.category}
                    </span>
                  </div>

                  <p className="text-text-2 leading-relaxed mb-5">
                    {p.tagline}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start text-sm text-text-2"
                      >
                        <span className="size-1 rounded-full bg-brand mr-3 mt-2 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5 border-t border-DEFAULT flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-3">
                      <span className="text-ok mr-1.5">●</span> {p.highlight}
                    </span>
                    <span className="text-brand font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ver producto <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </MotionCard>
            );
          })}
        </Stagger>
      </section>

      <section className="border-t border-DEFAULT py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <Badge variant="mono" className="mb-5">
              / stack común
            </Badge>
            <h2 className="text-3xl md:text-4xl font-semibold text-text-1 mb-4 tracking-tight">
              Construimos con base operativa, no con promesas sueltas
            </h2>
            <p className="text-text-2 mb-8 leading-relaxed">
              Nuestros productos y desarrollos a medida comparten una misma
              filosofía: backend sólido, base de datos cuidada, permisos,
              bitácora, despliegue Docker, documentación mínima útil y soporte
              local. On-premise, VPS o cloud según el caso.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                "React",
                "Next.js",
                "Node.js",
                "Prisma",
                "PostgreSQL",
                "Docker",
                "n8n",
                "VPS / Cloud",
              ].map((t) => (
                <Badge key={t} variant="mono">
                  {t}
                </Badge>
              ))}
            </div>
            <a
              href={contactLink("Software a medida")}
              className="inline-flex items-center bg-brand hover:bg-brand-hi text-text-1 px-8 py-3 rounded font-semibold text-sm gap-2"
            >
              Solicitar auditoría gratuita <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Software;
