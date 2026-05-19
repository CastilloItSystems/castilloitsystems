import React from 'react';
import {
  MapPin,
  Award,
  Code,
  Shield,
  Users as UsersIcon,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import Badge from '../components/Badge';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { MotionCard, Reveal, Stagger } from '../components/Motion';
import { SITE } from '../lib/seo';

const VALUES = [
  {
    icon: Code,
    title: 'Ingeniería real',
    desc: 'No somos revendedores. Diseñamos, escribimos código, instalamos y mantenemos. Cada línea es nuestra.',
  },
  {
    icon: Shield,
    title: 'Garantía funcional',
    desc: 'Presupuesto cerrado. Si no cumple los criterios firmados, no paga el saldo final. Así de simple.',
  },
  {
    icon: MapPin,
    title: 'Soporte local',
    desc: 'Casa matriz en Anzoátegui. Ingeniero en sitio en menos de 2 horas para emergencias en zona norte.',
  },
  {
    icon: Briefcase,
    title: 'Sin intermediarios',
    desc: 'Hablas directo con quien implementa. Sin call centers, sin tickets eternos, sin huso horario ajeno.',
  },
];

const MILESTONES = [
  { year: '2015', label: 'Castillo IT nace en Barcelona, Anzoátegui' },
  { year: '2018', label: 'Primer caso de éxito sector hidrocarburos' },
  { year: '2021', label: 'Castillo Refinery V1 entregada en 3 meses' },
  { year: '2023', label: 'Maroil Trading · Torre BVC piso 10 en 5 semanas' },
  { year: '2025', label: 'NomiSys lanzada · CCP PDVSA 2017-2019 completo' },
  { year: '2026', label: 'Suite de 4 productos en producción · 20+ clientes' },
];

const CERTS = [
  { name: 'Panduit Partner', desc: 'Garantía 25 años cableado' },
  { name: 'Fortinet NSE', desc: 'Firewalls next-gen certificado' },
  { name: 'Hikvision', desc: 'Integrador autorizado biometría' },
  { name: 'MikroTik MTCNA', desc: 'Networking avanzado' },
];

const About: React.FC = () => {
  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Sobre nosotros · Castillo IT Systems · Ingenieros en Anzoátegui, Venezuela"
        description="Equipo de ingenieros venezolanos especializados en software a medida, infraestructura crítica y ciberseguridad. Casa matriz en Barcelona, Anzoátegui · 20+ proyectos entregados."
        path="/sobre-nosotros"
        keywords={[
          'castillo it equipo',
          'fundador castillo it',
          'ingenieros venezuela anzoátegui',
          'consultora ti barcelona',
          'historia castillo it systems',
        ]}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Sobre nosotros', url: '/sobre-nosotros' },
        ]}
        extra={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Sobre Castillo IT Systems',
            description:
              'Equipo de ingenieros venezolanos en Anzoátegui. Software a medida, infraestructura, ciberseguridad.',
            mainEntity: {
              '@id': `${SITE.url}/#organization`,
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Alfredo Castillo',
            jobTitle: 'Founder & Lead Engineer',
            worksFor: { '@id': `${SITE.url}/#organization` },
            address: {
              '@type': 'PostalAddress',
              addressLocality: SITE.address.locality,
              addressRegion: SITE.address.region,
              addressCountry: SITE.address.country,
            },
            sameAs: [SITE.social.linkedin],
            knowsAbout: [
              'Software de nómina petrolera CCP',
              'Infraestructura IT',
              'Ciberseguridad empresarial',
              'Desarrollo Next.js',
              'PostgreSQL',
              'Docker',
            ],
          },
        ]}
      />

      <header className="relative bg-ink py-20 border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-50" />
        <div className="absolute inset-0 glow-brand opacity-60 pointer-events-none" />
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Badge variant="mono" className="mb-6">/ sobre nosotros</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight text-text-1">
            Ingenieros venezolanos resolviendo{' '}
            <span className="text-brand">problemas críticos</span>
          </h1>
          <p className="text-lg text-text-2 max-w-3xl leading-relaxed">
            Llevamos {new Date().getFullYear() - 2015}+ años construyendo software y operando
            infraestructura para empresas que no pueden permitirse fallar. Casa matriz en
            Barcelona, Anzoátegui.
          </p>
        </Reveal>
      </header>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <ImagePlaceholder
              kind="team"
              alt="Alfredo Castillo · Fundador Castillo IT Systems"
              fileName="fundador.webp"
              path="public/img/team/"
              width={800}
              height={800}
              recommendedDims="800×800 cuadrada"
            />
          </div>
          <div className="lg:col-span-7">
            <Badge variant="brand" dot pulse className="mb-4">Fundador</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold text-text-1 mb-3 tracking-tight">
              Alfredo Castillo
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-text-3 mb-6">
              Founder · Lead Engineer
            </p>
            <p className="text-text-2 leading-relaxed mb-4">
              Ingeniero de software venezolano. Construí Castillo IT en 2015 para resolver
              problemas reales del sector petrolero y empresarial que nadie estaba atendiendo
              bien desde Anzoátegui.
            </p>
            <p className="text-text-2 leading-relaxed mb-4">
              Mi enfoque: implementar en semanas lo que otros cotizan en años. Software que el
              cliente entiende y puede operar, infraestructura que dura décadas, soporte cuando
              hay que estar.
            </p>
            <p className="text-text-2 leading-relaxed mb-6">
              NomiSys, nuestro producto principal, nació de la necesidad de cumplir con el CCP
              PDVSA con auditoría real. Hoy varias contratistas lo usan para cerrar nómina
              petrolera en menos de 4 horas.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'PostgreSQL', 'Docker', 'CCP/FUTPV', 'Fortinet', 'Panduit'].map((s) => (
                <Badge key={s} variant="mono">{s}</Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-DEFAULT py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12">
          <Badge variant="mono" className="mb-4">/ valores</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-1 tracking-tight mb-3">
            Cómo trabajamos
          </h2>
          <p className="text-text-3 max-w-2xl">
            Cuatro principios que definen cómo entregamos cada proyecto.
          </p>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <MotionCard
              key={title}
              className="bg-surface-1 border border-DEFAULT hover:border-brand transition-colors rounded-md p-6"
            >
              <Icon className="text-brand mb-4" size={22} />
              <h3 className="text-base font-semibold text-text-1 mb-2">{title}</h3>
              <p className="text-text-3 text-sm leading-relaxed">{desc}</p>
            </MotionCard>
          ))}
        </Stagger>
      </section>

      <section className="border-t border-DEFAULT py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12">
          <Badge variant="mono" className="mb-4">/ trayectoria</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-1 tracking-tight mb-3">
            Hitos
          </h2>
        </Reveal>
        <div className="relative max-w-3xl">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-DEFAULT" aria-hidden="true" />
          <ol className="space-y-6">
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative pl-10">
                <span className="absolute left-0 top-1 size-6 rounded-full border border-emphasis bg-surface-1 flex items-center justify-center">
                  <span className="size-1.5 rounded-full bg-brand" />
                </span>
                <div className="bg-surface-1 border border-DEFAULT rounded-md p-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand mb-1 block">
                    {m.year}
                  </span>
                  <p className="text-sm text-text-1">{m.label}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-DEFAULT py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10">
          <Badge variant="mono" className="mb-4">/ certificaciones</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-text-1 tracking-tight mb-3">
            Partners y certificaciones
          </h2>
          <p className="text-text-3 max-w-2xl">
            Acuerdos directos con fabricantes para entregar garantía de origen.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CERTS.map((c) => (
            <div key={c.name} className="bg-surface-1 border border-DEFAULT rounded-md p-5">
              <Award className="text-brand mb-3" size={20} />
              <p className="text-sm font-semibold text-text-1 mb-1">{c.name}</p>
              <p className="text-xs text-text-3">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-DEFAULT py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="bg-surface-1 border border-DEFAULT rounded-md p-10 md:p-16 text-center">
          <UsersIcon className="text-brand mx-auto mb-5" size={28} />
          <h2 className="text-3xl md:text-4xl font-semibold text-text-1 mb-4 tracking-tight">
            ¿Quieres trabajar con nosotros?
          </h2>
          <p className="text-text-3 mb-8 max-w-xl mx-auto">
            Hablamos directo. Sin formularios eternos ni presentaciones de hora y media.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="/contacto"
              className="inline-flex items-center justify-center bg-brand hover:bg-brand-hi text-text-1 px-6 py-3 rounded font-semibold text-sm gap-2"
            >
              <CheckCircle2 size={16} /> Solicitar auditoría
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center text-text-1 px-6 py-3 rounded font-semibold text-sm border border-emphasis hover:border-brand transition-colors gap-2"
            >
              Ver casos reales <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default About;
