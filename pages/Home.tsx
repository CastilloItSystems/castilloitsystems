import React, { useCallback, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Cloud,
  Clock,
  Camera,
  ShieldAlert,
  Code,
  Briefcase,
  Bot,
  LayoutGrid,
  Shield,
  Wifi,
  Smartphone,
} from 'lucide-react';
import Modal from '../components/Modal';
import LeadForm from '../components/LeadForm';
import ScadaBar from '../components/ScadaBar';
import Badge from '../components/Badge';
import SEO from '../components/SEO';
import TechLogo from '../components/TechLogo';
import ClientLogos from '../components/ClientLogos';
import { DEFAULT_LEAD_INTEREST } from '../lib/interests';
import {
  AnimatePresence,
  MotionButton,
  MotionCard,
  Reveal,
  Stagger,
  m,
  staggerItem,
} from '../components/Motion';

type Tech = {
  name: string;
  slug?: string;
  logoUrl?: string;
  brandColor?: string;
  wordmark?: boolean;
};

const VL = (s: string) => `https://www.vectorlogo.zone/logos/${s}/${s}-icon.svg`;

const technologies: Tech[] = [
  // Redes y seguridad
  { name: 'Fortinet', slug: 'fortinet', logoUrl: VL('fortinet'), brandColor: '#EE3124' },
  { name: 'Cisco', slug: 'cisco', logoUrl: VL('cisco'), brandColor: '#1BA0D7' },
  { name: 'MikroTik', slug: 'mikrotik', logoUrl: VL('mikrotik'), brandColor: '#293239' },
  { name: 'Ubiquiti', slug: 'ubiquiti', logoUrl: VL('ubnt'), brandColor: '#0559C9' },
  { name: 'Panduit', brandColor: '#003B71', wordmark: true },
  { name: 'Asterisk', slug: 'asterisk', logoUrl: VL('asterisk'), brandColor: '#C12126' },

  // Vigilancia y seguridad física
  { name: 'Hikvision', brandColor: '#DA251D', wordmark: true },
  { name: 'Axis', brandColor: '#FF4F00', wordmark: true },

  // Cloud & backend
  { name: 'AWS', slug: 'amazonwebservices', logoUrl: VL('amazon_aws'), brandColor: '#FF9900' },
  { name: 'Docker', slug: 'docker', brandColor: '#2496ED' },
  { name: 'Linux', slug: 'linux', brandColor: '#FCC624' },
  { name: 'nginx', slug: 'nginx', brandColor: '#009639' },
  { name: 'PostgreSQL', slug: 'postgresql', brandColor: '#4169E1' },
  { name: 'MongoDB', slug: 'mongodb', brandColor: '#47A248' },
  { name: 'Prisma', slug: 'prisma', brandColor: '#2D3748' },
  { name: 'Node.js', slug: 'nodedotjs', brandColor: '#5FA04E' },
  { name: 'Python', slug: 'python', brandColor: '#3776AB' },
  { name: 'Firebase', slug: 'firebase', brandColor: '#FFCA28' },

  // Frontend
  { name: 'React', slug: 'react', brandColor: '#61DAFB' },
  { name: 'Next.js', slug: 'nextdotjs', brandColor: '#000000' },
  { name: 'Angular', slug: 'angular', brandColor: '#DD0031' },
  { name: 'TypeScript', slug: 'typescript', brandColor: '#3178C6' },
  { name: 'Tailwind', slug: 'tailwindcss', brandColor: '#06B6D4' },

  // Móvil
  { name: 'Android', slug: 'android', brandColor: '#3DDC84' },
  { name: 'iOS', slug: 'ios', brandColor: '#000000' },

  // Automatización
  { name: 'n8n', slug: 'n8n', brandColor: '#EA4B71' },
];

const capabilitySignals = [
  { label: 'Diagnóstico', value: 'Auditoría gratuita' },
  { label: 'Diseño', value: 'Plan por fases' },
  { label: 'Operación', value: 'Soporte local' },
];

const capabilityGroups = [
  {
    code: 'NET',
    title: 'Infraestructura & redes',
    desc: 'Cableado, WiFi, racks y enlaces diseñados para crecer sin caos.',
    problem: 'Redes lentas, racks desordenados y sedes desconectadas frenan ventas, soporte y operación.',
    icon: Wifi,
    link: '/infraestructura',
    routeCta: 'Ver infraestructura',
    interest: 'Infraestructura / redes',
    proof: 'Maroil · Torre BVC · 5 semanas',
    tech: ['Panduit', 'Cisco', 'Ubiquiti', 'Fibra'],
    services: [
      'Cableado estructurado Cat6/Cat6A',
      'WiFi corporativo con mapas de calor',
      'Fibra óptica, enlaces PTP y VLANs',
      'Racks, UPS, gabinetes y documentación técnica',
    ],
  },
  {
    code: 'VPS',
    title: 'VPS, servidores & bases de datos',
    desc: 'Infraestructura administrada para apps, n8n, datos y servicios críticos.',
    problem: 'Aplicaciones sin respaldo, automatizaciones caídas y bases de datos sin monitoreo cuestan demasiado.',
    icon: Cloud,
    link: '/infraestructura',
    routeCta: 'Ver infraestructura',
    interest: 'VPS / bases de datos / despliegues',
    proof: 'Docker · PostgreSQL · SSL · backups',
    tech: ['Linux', 'Docker', 'PostgreSQL', 'n8n'],
    services: [
      'VPS Linux con hardening básico',
      'Despliegue de apps, APIs y workers',
      'PostgreSQL, backups y restauración',
      'Dominio, SSL, monitoreo y bitácora',
    ],
  },
  {
    code: 'PHY',
    title: 'Seguridad física',
    desc: 'CCTV, acceso, biometría e IoT conectados al control operativo.',
    problem: 'Entradas sin trazabilidad y cámaras aisladas dejan puntos ciegos en seguridad y nómina.',
    icon: Camera,
    link: '/seguridad',
    routeCta: 'Ver seguridad física',
    interest: 'Seguridad / CCTV / ciberseguridad',
    proof: 'Hikvision · biometría · control de acceso',
    tech: ['Hikvision', 'Axis', 'LPR', 'IoT'],
    services: [
      'CCTV inteligente y analítica',
      'Control biométrico de acceso',
      'Torniquetes y barreras vehiculares',
      'Telemetría de cuartos críticos',
    ],
  },
  {
    code: 'CYB',
    title: 'Ciberseguridad',
    desc: 'Defensa digital con prevención, detección, respuesta y recuperación.',
    problem: 'Un ransomware o una VPN mal configurada puede detener facturación, correo y operación completa.',
    icon: ShieldAlert,
    link: '/seguridad',
    routeCta: 'Ver ciberseguridad',
    interest: 'Seguridad / CCTV / ciberseguridad',
    proof: 'Fortinet · anti-ransomware · pentesting',
    tech: ['Fortinet', 'VPN', 'EDR', 'Backups'],
    services: [
      'Firewalls next-gen',
      'VPN y segmentación segura',
      'Pentesting y hardening',
      'Backup inmutable y recuperación',
    ],
  },
  {
    code: 'SW',
    title: 'Software a medida',
    desc: 'Sistemas web, dashboards, APIs y flujos hechos para su operación.',
    problem: 'Excel, WhatsApp y sistemas genéricos no sostienen procesos que ya necesitan control real.',
    icon: Code,
    link: '/software',
    routeCta: 'Ver software',
    interest: 'Software a medida',
    proof: 'NomiSys · Autosys · Refinery · Gym',
    tech: ['React', 'Node.js', 'Prisma', 'PostgreSQL'],
    services: [
      'Sistemas empresariales a medida',
      'Dashboards, permisos, reportes y auditoría',
      'APIs, integraciones y migración de datos',
      'Integración con equipos y bases de datos',
    ],
  },
  {
    code: 'APP',
    title: 'Apps mobile & desktop',
    desc: 'Aplicaciones para campo, oficina y operación interna sin depender del navegador.',
    problem: 'Equipos de calle, supervisores y operadores necesitan capturar datos rápido aunque el proceso sea complejo.',
    icon: Smartphone,
    link: '/software',
    routeCta: 'Ver apps a medida',
    interest: 'Apps mobile / desktop',
    proof: 'Android · iOS · paneles internos · PWA',
    tech: ['Android', 'iOS', 'React', 'APIs'],
    services: [
      'Apps móviles para clientes o equipos internos',
      'Aplicaciones desktop e instalables según viabilidad',
      'Modo offline, sincronización y notificaciones',
      'Paneles operativos para supervisión diaria',
    ],
  },
  {
    code: 'RPA',
    title: 'Automatización IA/n8n/RPA',
    desc: 'Procesos repetitivos convertidos en flujos medibles y auditables.',
    problem: 'Copiar datos, validar correos, emitir reportes y perseguir aprobaciones consume horas todos los días.',
    icon: Bot,
    link: '/software',
    routeCta: 'Ver automatización',
    interest: 'Automatización n8n / IA',
    proof: 'n8n · IA · webhooks · notificaciones',
    tech: ['n8n', 'IA', 'APIs', 'Webhooks'],
    services: [
      'Flujos n8n para procesos repetitivos',
      'Integraciones entre ERP, CRM, correo y hojas',
      'Chatbots y asistentes técnicos',
      'Alertas, reportes y validaciones',
    ],
  },
  {
    code: 'ADV',
    title: 'Consultoría digital & marca',
    desc: 'Diagnóstico, estrategia, presencia digital y acompañamiento ejecutivo.',
    problem: 'La tecnología no vende sola si el cliente no entiende la oferta, el proceso y el valor.',
    icon: Briefcase,
    link: '/contacto',
    routeCta: 'Contactar',
    interest: 'Consultoría digital / marca',
    proof: 'Presupuesto cerrado · garantía funcional',
    tech: ['Auditoría', 'SEO', 'Branding', 'Soporte'],
    services: [
      'Auditoría tecnológica integral',
      'Roadmap de modernización',
      'Identidad visual y sitio web',
      'Acompañamiento técnico local',
    ],
  },
];

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadInterest, setLeadInterest] = useState(DEFAULT_LEAD_INTEREST);
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0);
  const [openCapabilityIndex, setOpenCapabilityIndex] = useState(0);
  const activeCapability = capabilityGroups[activeCapabilityIndex];
  const ActiveCapabilityIcon = activeCapability.icon;

  const openAudit = useCallback((interest = DEFAULT_LEAD_INTEREST) => {
    setLeadInterest(interest);
    setIsModalOpen(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const x = e.clientX;
    const y = e.clientY;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${x - rect.left}px`);
      el.style.setProperty('--mouse-y', `${y - rect.top}px`);
    });
  }, []);

  return (
    <div className="flex flex-col w-full bg-ink overflow-hidden">
      <SEO
        title="Castillo IT Systems · Software, automatización, VPS e infraestructura en Anzoátegui"
        description="Soluciones tecnológicas 360°: software a medida, apps mobile y desktop, automatización n8n/IA, VPS, bases de datos, infraestructura, redes y seguridad. Auditoría gratuita · soporte local."
        path="/"
        keywords={[
          'castillo it systems',
          'software anzoátegui',
          'software a medida venezuela',
          'apps móviles venezuela',
          'automatización n8n venezuela',
          'vps bases de datos venezuela',
          'nómina petrolera ccp',
          'nomisys',
          'infraestructura ti venezuela',
          'ingenieros it barcelona anzoátegui',
        ]}
      />
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center pt-20 pb-16 overflow-hidden border-b border-DEFAULT">
        <div className="absolute inset-0 bg-grid-refinery opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="reveal">
              <Badge variant="brand" dot pulse className="mb-6">
                Ingeniería local · Anzoátegui
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold text-text-1 tracking-tight mb-6 leading-[1.05]">
                Construimos<br />
                <span className="bg-gradient-to-r from-text-1 via-brand-glow to-brand bg-clip-text text-transparent">
                  tecnología crítica.
                </span>
              </h1>
              <p className="text-lg text-text-2 mb-10 max-w-xl leading-relaxed">
                Software a medida, apps, automatización n8n, VPS, infraestructura y seguridad.
                Implementamos en <span className="text-text-1 font-semibold">semanas</span> lo que
                otros cotizan en años. Presupuesto cerrado.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <MotionButton
                  onClick={() => openAudit()}
                  className="group bg-copper hover:bg-copper-hi text-ink px-6 py-3 rounded font-semibold text-sm inline-flex items-center justify-center gap-2"
                >
                  Auditoría gratuita
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={16} />
                </MotionButton>
                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center text-text-1 px-6 py-3 rounded font-semibold text-sm border border-emphasis hover:border-copper transition-colors"
                >
                  Ver casos reales
                </a>
              </div>

              <m.dl
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                className="mt-14 grid grid-cols-3 gap-px bg-surface-2 border border-DEFAULT rounded overflow-hidden"
              >
                {[
                  { k: '5 sem', v: 'Torre BVC' },
                  { k: '3 mes', v: 'Refinery v1' },
                  { k: '< 2 h', v: 'Respuesta on-site' },
                ].map((metric) => (
                  <m.div
                    key={metric.v}
                    variants={staggerItem}
                    className="bg-ink px-4 py-4"
                  >
                    <dt className="font-mono text-2xl md:text-3xl text-copper tabular-nums leading-none mb-1">
                      {metric.k}
                    </dt>
                    <dd className="font-mono text-[10px] uppercase tracking-widest text-text-3">
                      {metric.v}
                    </dd>
                  </m.div>
                ))}
              </m.dl>
            </Reveal>

            <Reveal delay={0.12} className="hidden lg:block reveal reveal-delay-200">
              <div className="relative">
                <div className="absolute -inset-x-12 -inset-y-12 glow-brand pointer-events-none" />

                <div className="relative bg-surface-1 border border-emphasis rounded-lg overflow-hidden shadow-[0_0_60px_-15px_rgba(37,99,235,0.3)]">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-DEFAULT bg-surface-2/50">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full bg-err/70" />
                      <span className="size-2.5 rounded-full bg-warn/70" />
                      <span className="size-2.5 rounded-full bg-ok/70" />
                    </div>
                    <div className="font-mono text-[10px] text-text-3 tracking-wide">
                      castillo-it / dashboard
                    </div>
                    <span className="font-mono text-[10px] text-text-mute">v2.1</span>
                  </div>

                  <div className="p-5 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-text-3 font-mono mb-1">Production</p>
                        <p className="text-2xl font-semibold text-text-1 tracking-tight">
                          99.98<span className="text-text-3 text-base">%</span>
                          <span className="ml-2 text-xs text-ok font-mono">↑ 0.04</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-sm border border-ok/40 bg-ok/10">
                        <span className="size-1.5 rounded-full bg-ok animate-pulse" />
                        <span className="font-mono text-[10px] text-ok tracking-wide">UPTIME</span>
                      </div>
                    </div>

                    <div className="flex items-end gap-1 h-20">
                      {[35, 52, 41, 68, 58, 78, 64, 88, 72, 92, 84, 96].map((h, i) => (
                        <m.div
                          key={i}
                          initial={{ height: '12%' }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.035, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="flex-1 bg-gradient-to-t from-brand/30 to-brand rounded-sm"
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2 border-t border-DEFAULT">
                      {[
                        { k: 'Deploys', v: '142' },
                        { k: 'Latency', v: '38ms' },
                        { k: 'Builds', v: '2.4k' },
                      ].map((m) => (
                        <div key={m.k}>
                          <p className="text-[10px] text-text-3 font-mono mb-0.5">{m.k}</p>
                          <p className="text-sm font-semibold text-text-1 font-mono tabular-nums">
                            {m.v}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-DEFAULT">
                      {[
                        { id: 'castillo-refinery', branch: 'main', state: 'ok', t: '2m' },
                        { id: 'castillo-autosys', branch: 'release/v3.1', state: 'ok', t: '14m' },
                        { id: 'castillo-gym', branch: 'feat/bio-v2', state: 'warn', t: '1h' },
                      ].map((row) => (
                        <div key={row.id} className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`size-1.5 rounded-full shrink-0 ${
                                row.state === 'ok' ? 'bg-ok' : 'bg-warn'
                              }`}
                            />
                            <span className="text-text-1 truncate">{row.id}</span>
                            <span className="text-text-mute truncate">{row.branch}</span>
                          </div>
                          <span className="text-text-3 shrink-0 ml-2">{row.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ClientLogos />

      {/* STACK */}
      <Reveal className="border-b border-DEFAULT py-14 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-text-3 text-xs font-mono uppercase tracking-widest mb-10">
            Stack tecnológico
          </p>
          <Stagger className="flex flex-wrap justify-center items-center gap-x-10 gap-y-12 md:gap-x-14">
            {technologies.map((tech) => (
              <m.div key={tech.name} variants={staggerItem}>
                <TechLogo
                  name={tech.name}
                  slug={tech.slug}
                  logoUrl={tech.logoUrl}
                  brandColor={tech.brandColor}
                  wordmark={tech.wordmark}
                />
              </m.div>
            ))}
          </Stagger>
        </div>
      </Reveal>

      {/* WHY */}
      <section className="py-24 bg-ink relative border-b border-DEFAULT">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal className="reveal">
              <Badge variant="mono" className="mb-6">why</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-text-1 mb-6 tracking-tight">
                ¿Por qué nosotros?
              </h2>
              <p className="text-lg text-text-2 leading-relaxed mb-4">
                En un mercado saturado de revendedores, nosotros somos{' '}
                <span className="text-brand font-semibold">ingenieros</span>. Diseñamos, desarrollamos
                y mantenemos.
              </p>
            </Reveal>

            <Stagger delayChildren={0.08} className="reveal reveal-delay-100 space-y-3">
              {[
                {
                  icon: Clock,
                  t: 'Velocidad absoluta',
                  d: 'Infraestructura completa en 5 semanas. Desarrollo complejo en 3 meses. El tiempo offline es dinero perdido.',
                  code: 'OPS-01',
                },
                {
                  icon: CheckCircle,
                  t: 'Garantía funcional',
                  d: 'Presupuesto cerrado. Si no funciona como prometimos, no paga el saldo final.',
                  code: 'OPS-02',
                },
                {
                  icon: Shield,
                  t: 'Respaldo en sitio',
                  d: 'Ingeniero en su oficina el mismo día. Sin tickets eternos ni call centers extranjeros.',
                  code: 'OPS-03',
                },
              ].map(({ icon: Icon, t, d, code }) => (
                <MotionCard
                  key={code}
                  className="group bg-surface-1 border border-DEFAULT hover:border-copper rounded-md p-6 flex items-start gap-5"
                >
                  <div className="shrink-0 size-10 border border-emphasis rounded flex items-center justify-center text-copper">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-2 gap-3">
                      <h3 className="text-lg font-semibold text-text-1">{t}</h3>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                        {code}
                      </span>
                    </div>
                    <p className="text-text-2 text-sm leading-relaxed">{d}</p>
                  </div>
                </MotionCard>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* CAPABILITY MAP */}
      <section className="py-24 bg-ink relative border-b border-DEFAULT">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 spotlight-group"
        >
          <Reveal className="mb-10 reveal">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Badge variant="mono" className="mb-5">/ mapa operativo</Badge>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-1 mb-4">
                  <LayoutGrid className="inline w-7 h-7 text-brand mr-3 -mt-1" />
                  Soluciones tecnológicas 360°
                </h2>
                <p className="text-text-3 max-w-2xl leading-relaxed">
                  Integramos infraestructura, seguridad, software, automatización y VPS con un solo
                  equipo responsable. Usted explica el proceso; nosotros lo convertimos en sistema.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-DEFAULT bg-surface-2 lg:min-w-[420px]">
                {capabilitySignals.map((signal) => (
                  <div key={signal.label} className="bg-ink px-3 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                      {signal.label}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-text-1">{signal.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-5">
            <Stagger className="lg:col-span-7 grid grid-cols-2 gap-3">
              {capabilityGroups.map((item, index) => {
                const Icon = item.icon;
                const active = index === activeCapabilityIndex;
                return (
                  <m.button
                    key={item.code}
                    type="button"
                    variants={staggerItem}
                    onMouseEnter={() => setActiveCapabilityIndex(index)}
                    onFocus={() => setActiveCapabilityIndex(index)}
                    onClick={() => setActiveCapabilityIndex(index)}
                    whileHover={{ y: -5, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    className={`spotlight-card relative min-h-[164px] overflow-hidden rounded-md border p-5 text-left ${
                      active
                        ? 'border-brand/70 bg-brand/10'
                        : 'border-DEFAULT bg-surface-1 hover:border-brand/50'
                    }`}
                  >
                    {active && (
                      <m.span
                        layoutId="capability-active-frame"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-md border border-brand/70 shadow-[0_0_45px_-24px_rgba(37,99,235,0.9)]"
                        transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10 flex items-start justify-between gap-4">
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded border ${
                          active ? 'border-brand/60 text-brand' : 'border-emphasis text-copper'
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                        {item.code}
                      </span>
                    </span>
                    <span className="relative z-10 mt-5 block">
                      <span className="block text-lg font-semibold text-text-1">{item.title}</span>
                      <span className="mt-2 block text-sm leading-relaxed text-text-3">
                        {item.desc}
                      </span>
                    </span>
                  </m.button>
                );
              })}
            </Stagger>

            <div className="lg:col-span-5">
              <div className="sticky top-24 overflow-hidden rounded-md border border-emphasis bg-surface-1">
                <AnimatePresence mode="wait">
                  <m.div
                    key={activeCapability.code}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="border-b border-DEFAULT bg-surface-2/60 px-6 py-4">
                      <ScadaBar
                        label={activeCapability.title}
                        code={`${activeCapability.code} · ONLINE`}
                        align="between"
                        className="mb-4"
                      />
                      <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded border border-brand/40 bg-brand/10 text-brand">
                          <ActiveCapabilityIcon size={22} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight text-text-1">
                            {activeCapability.title}
                          </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-3">
                            {activeCapability.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-5 rounded border border-DEFAULT bg-surface-2/60 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                          Problema que atacamos
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-text-2">
                          {activeCapability.problem}
                        </p>
                      </div>

                      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-text-mute">
                        Capacidades
                      </p>
                      <ul className="space-y-2">
                        {activeCapability.services.map((service) => (
                          <li key={service} className="flex items-start gap-3 text-sm text-text-2">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 border-t border-DEFAULT pt-5">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                          Prueba operativa
                        </p>
                        <p className="mt-2 text-sm font-semibold text-text-1">
                          {activeCapability.proof}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {activeCapability.tech.map((tech) => (
                          <Badge key={tech} variant="mono">{tech}</Badge>
                        ))}
                      </div>

                      <div className="mt-6 grid grid-cols-1 gap-2">
                        <MotionButton
                          onClick={() => openAudit(activeCapability.interest)}
                          className="inline-flex w-full items-center justify-center gap-2 rounded bg-brand px-4 py-3 text-sm font-semibold text-text-1 hover:bg-brand-hi"
                        >
                          Solicitar auditoría gratuita
                          <ArrowRight size={15} />
                        </MotionButton>
                        <a
                          href={activeCapability.link}
                          className="inline-flex w-full items-center justify-center gap-2 rounded border border-emphasis px-4 py-3 text-sm font-semibold text-text-1 hover:border-brand hover:bg-brand/10"
                        >
                          {activeCapability.routeCta}
                        </a>
                      </div>
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <Stagger className="grid grid-cols-1 gap-3 lg:hidden">
            {capabilityGroups.map((item, index) => {
              const Icon = item.icon;
              const open = openCapabilityIndex === index;
              return (
                <m.article
                  key={item.code}
                  variants={staggerItem}
                  layout
                  className={`spotlight-card relative overflow-hidden rounded-md border ${
                    open ? 'border-brand/60 bg-brand/10' : 'border-DEFAULT bg-surface-1'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenCapabilityIndex(open ? -1 : index)}
                    className="relative z-10 flex w-full items-start gap-4 p-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded border border-emphasis text-copper">
                      <Icon size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-base font-semibold text-text-1">{item.title}</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                          {item.code}
                        </span>
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-text-3">
                        {item.desc}
                      </span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <m.div
                        key="capability-mobile-detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="relative z-10 border-t border-DEFAULT px-5 pb-5 pt-4">
                          <ul className="space-y-2">
                            <li className="mb-3 rounded border border-DEFAULT bg-surface-2/60 p-3 text-sm leading-relaxed text-text-2">
                              {item.problem}
                            </li>
                            {item.services.map((service) => (
                              <li key={service} className="flex items-start gap-3 text-sm text-text-2">
                                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                                <span>{service}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-text-mute">
                            {item.proof}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tech.map((tech) => (
                              <Badge key={tech} variant="mono">{tech}</Badge>
                            ))}
                          </div>
                          <div className="mt-5 grid grid-cols-1 gap-2">
                            <MotionButton
                              onClick={() => openAudit(item.interest)}
                              className="inline-flex w-full items-center justify-center gap-2 rounded bg-brand px-4 py-3 text-sm font-semibold text-text-1 hover:bg-brand-hi"
                            >
                              Solicitar auditoría gratuita
                              <ArrowRight size={15} />
                            </MotionButton>
                            <a
                              href={item.link}
                              className="inline-flex w-full items-center justify-center rounded border border-brand/50 px-4 py-3 text-sm font-semibold text-text-1 hover:bg-brand/10"
                            >
                              {item.routeCta}
                            </a>
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.article>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24 bg-ink border-b border-DEFAULT">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 reveal">
            <div>
              <Badge variant="mono" className="mb-4">/ software</Badge>
              <h2 className="text-4xl font-bold text-text-1 tracking-tight">
                Castillo <span className="text-brand">Software Suite</span>
              </h2>
            </div>
            <a
              href="/software"
              className="hidden md:inline-flex items-center font-semibold text-text-1 hover:text-copper transition-colors text-sm"
            >
              Explorar todo <ArrowRight className="ml-2" size={16} />
            </a>
          </div>

          <Stagger className="space-y-12">
            {[
              {
                tag: 'PRODUCTO PRINCIPAL · CCP PDVSA',
                t: 'NomiSys',
                featured: true,
                d: 'Plataforma integral de nómina petrolera de Venezuela. Cubre el Contrato Colectivo Petrolero completo · multi-empresa · RBAC granular · auditoría total. Listo para operadoras, contratistas y proveedores del sector hidrocarburos.',
                bullets: [
                  'Sistemas: 5×2 · 7×7 · 4×4 · STOB · contratistas',
                  'Prestaciones · jubilaciones · indemnizaciones',
                  'Multi-empresa · RBAC · audit log',
                ],
              },
              {
                tag: 'IMPL · 3 MESES',
                t: 'Castillo Refinery',
                d: 'Gestión financiera avanzada para plantas de procesamiento. Control de crudo, laboratorio y simulaciones financieras (Thinking Mode).',
                bullets: [
                  'Visualización tipo SCADA',
                  'Alertas push de contratos y mermas',
                  'Simulación de mercados',
                ],
              },
              {
                tag: 'IMPL · 6 SEMANAS',
                t: 'Castillo Autosys',
                d: 'Control total para talleres y flotas. Órdenes de trabajo detalladas desde ingreso hasta despacho.',
                bullets: [
                  'Productividad de mecánicos',
                  'Inventario · ventas · compras',
                  'Facturación fiscal',
                ],
              },
            ].map((p) => (
              <MotionCard
                key={p.t}
                className={`reveal relative bg-surface-1 border ${
                  p.featured ? 'border-brand/50 shadow-[0_0_60px_-20px_rgba(37,99,235,0.4)]' : 'border-DEFAULT'
                } hover:border-brand rounded-md p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start`}
              >
                <div className="lg:col-span-7">
                  <Badge variant="brand" className="mb-4 font-mono">{p.tag}</Badge>
                  <h3 className="text-3xl font-semibold text-text-1 mb-4 tracking-tight">{p.t}</h3>
                  <p className="text-text-2 mb-6 leading-relaxed">{p.d}</p>
                  <ul className="space-y-2 mb-6">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-center text-sm text-text-2">
                        <span className="size-1 rounded-full bg-brand mr-3" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/software"
                    className="text-brand font-semibold text-sm hover:text-brand-hi inline-flex items-center group"
                  >
                    Ver detalles <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
                <div className="lg:col-span-5">
                  <div className="bg-surface-2 border border-DEFAULT rounded-md overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-DEFAULT bg-surface-3/50">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-err/60" />
                        <span className="size-2 rounded-full bg-warn/60" />
                        <span className="size-2 rounded-full bg-ok/60" />
                      </div>
                      <span className="font-mono text-[10px] text-text-3">
                        {p.t.toLowerCase().replace('castillo ', '')}.app
                      </span>
                      <span className="font-mono text-[10px] text-text-mute">v1.2</span>
                    </div>
                    <div className="p-4 space-y-2">
                      {p.bullets.map((b, i) => (
                        <div key={b} className="flex items-center justify-between text-xs font-mono py-1.5 border-b border-DEFAULT last:border-0">
                          <span className="text-text-2 truncate">{b}</span>
                          <span className="flex items-center gap-1.5 shrink-0 ml-2">
                            <span className="size-1.5 rounded-full bg-ok" />
                            <span className="text-text-3">ready</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </MotionCard>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 glow-brand opacity-50" />
        <div className="max-w-4xl mx-auto px-4 text-center reveal relative">
          <Badge variant="brand" dot pulse className="mb-6">Línea directa · ingeniería</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-text-1 mb-6 tracking-tight">
            ¿Listo para modernizar?
          </h2>
          <p className="text-lg text-text-2 mb-8 leading-relaxed">
            Hable directamente con los ingenieros de la casa matriz en Anzoátegui.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <MotionButton
              onClick={() => openAudit()}
              className="bg-copper hover:bg-copper-hi text-ink px-8 py-3 rounded font-semibold text-sm"
            >
              Solicitar auditoría gratuita
            </MotionButton>
            <a
              href="tel:+584127705451"
              className="inline-flex items-center justify-center px-8 py-3 rounded font-semibold text-sm text-text-1 border border-emphasis hover:border-copper transition-colors"
            >
              Llamar · +58 412-770-5451
            </a>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Auditoría gratuita">
        <p className="text-text-3 mb-4 text-sm">
          Complete sus datos y un ingeniero revisará la mejor ruta para su proyecto.
        </p>
        <LeadForm
          defaultInterest={leadInterest}
          onSuccess={() => setTimeout(() => setIsModalOpen(false), 1800)}
        />
      </Modal>
    </div>
  );
};

export default Home;
