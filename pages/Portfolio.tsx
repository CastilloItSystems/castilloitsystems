import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, MoveHorizontal, CheckCircle2 } from 'lucide-react';
import { PortfolioItem } from '../types';
import ScadaBar from '../components/ScadaBar';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Badge from '../components/Badge';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import {
  MotionCard,
  Reveal,
  Stagger,
  animate,
  m,
  staggerItem,
  useMotionValue,
  useTransform,
} from '../components/Motion';

interface BeforeAfterProps {
  beforeImg?: string;
  afterImg?: string;
  beforeFile: string;
  afterFile: string;
  title: string;
  description: string;
  tag: string;
  code: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterProps> = ({
  beforeImg,
  afterImg,
  beforeFile,
  afterFile,
  title,
  description,
  tag,
  code,
}) => {
  const hasImages = Boolean(beforeImg && afterImg);

  const containerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(50);
  const [position, setPosition] = useState(50);
  const [trackWidth, setTrackWidth] = useState(0);
  const x = useMotionValue(0);
  const clipPath = useTransform(x, (latest) => {
    const width = trackWidth || containerRef.current?.clientWidth || 1;
    const pct = Math.max(0, Math.min(100, (latest / width) * 100));
    return `inset(0 ${100 - pct}% 0 0)`;
  });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const syncWidth = () => {
      const width = el.clientWidth;
      setTrackWidth(width);
      x.set((positionRef.current / 100) * width);
    };

    syncWidth();
    const observer = new ResizeObserver(syncWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, [x]);

  const move = useCallback(
    (clientX: number, animated = false) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const next = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const pct = rect.width ? (next / rect.width) * 100 : 50;
      positionRef.current = pct;
      setPosition(pct);
      if (animated) animate(x, next, { type: 'spring', stiffness: 420, damping: 34 });
      else x.set(next);
    },
    [x]
  );

  const onClick = (e: React.MouseEvent) => move(e.clientX, true);

  return (
    <MotionCard className="flex flex-col h-full bg-surface-1 border border-DEFAULT hover:border-copper rounded-md overflow-hidden">
      <header className="p-6 border-b border-DEFAULT">
        <ScadaBar label={tag} code={code} className="mb-3" />
        <h3 className="text-xl font-semibold text-text-1 mb-1 tracking-tight">{title}</h3>
        <p className="text-text-3 text-sm">{description}</p>
      </header>

      {hasImages ? (
        <div
          ref={containerRef}
          className="relative h-[380px] w-full cursor-col-resize select-none overflow-hidden"
          onClick={onClick}
          role="slider"
          aria-label="Antes y después"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
        >
          <img
            src={afterImg}
            alt="Después"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            loading="lazy"
          />
          <div className="absolute top-3 right-3 bg-ink/80 text-ok text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm border border-emphasis backdrop-blur z-10">
            ● DESPUÉS
          </div>

          <m.div className="absolute inset-0 w-full h-full overflow-hidden" style={{ clipPath }}>
            <img
              src={beforeImg}
              alt="Antes"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-ink/80 text-err text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-sm border border-emphasis backdrop-blur z-10">
              ● ANTES
            </div>
          </m.div>

          <m.div
            drag="x"
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={{ left: 0, right: trackWidth }}
            onDrag={(_, info) => move(info.point.x)}
            className="absolute left-0 top-0 bottom-0 w-px bg-brand z-20"
            style={{ x }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink border border-brand p-2 rounded text-brand">
              <MoveHorizontal size={16} />
            </div>
          </m.div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-px bg-DEFAULT">
          <ImagePlaceholder
            kind="case"
            alt={`${title} · Antes`}
            fileName={beforeFile}
            path="public/img/cases/"
            width={1600}
            height={1000}
            recommendedDims="1600×1000"
            className="rounded-none"
          />
          <ImagePlaceholder
            kind="case"
            alt={`${title} · Después`}
            fileName={afterFile}
            path="public/img/cases/"
            width={1600}
            height={1000}
            recommendedDims="1600×1000"
            className="rounded-none"
          />
        </div>
      )}
    </MotionCard>
  );
};

const transformations = [
  {
    title: 'Maroil Trading · Torre BVC',
    description: 'Piso 10 completo. Cableado Panduit + servidores Hyper-V.',
    tag: 'Ejecución · 5 semanas',
    code: 'CASE-01',
    beforeFile: 'caso-maroil-bvc-antes.webp',
    afterFile: 'caso-maroil-bvc-despues.webp',
  },
  {
    title: 'Centro de control industrial',
    description: 'Videowall y puestos de operación para monitoreo SCADA.',
    tag: 'Seguridad & control',
    code: 'CASE-02',
    beforeFile: 'caso-control-antes.webp',
    afterFile: 'caso-control-despues.webp',
  },
];

interface PortfolioCardItem extends Omit<PortfolioItem, 'img'> {
  imgFile: string;
}

const portfolioItems: PortfolioCardItem[] = [
  {
    imgFile: 'caso-nomisys-petrolera.webp',
    title: 'NomiSys · Nómina petrolera CCP',
    desc: 'Plataforma de cálculo de nómina bajo Contrato Colectivo Petrolero (PDVSA 2017-2019).',
    moreInfo:
      'Monorepo Node: backend Express + Prisma + PostgreSQL · frontend Next.js 13 (App Router). Cubre Nómina Diaria/Mensual, sistemas 5×2, 7×7, 4×4, STOB, régimen contratistas, prestaciones, jubilaciones y horas extras.',
    tags: ['Next.js', 'Prisma', 'CCP · PDVSA'],
  },
  {
    imgFile: 'caso-refinery-planta.webp',
    title: 'Castillo Refinery · Planta',
    desc: 'Control de gandolas, laboratorio y simulaciones financieras.',
    moreInfo: 'V1 operativa en 3 meses. Desde entrada de crudo hasta despacho.',
    tags: ['Refinería', '3 Meses', 'SCADA'],
  },
  {
    imgFile: 'caso-autosys-taller.webp',
    title: 'Castillo Autosys · Talleres',
    desc: 'Órdenes de trabajo y control de mecánicos.',
    moreInfo: 'Implementado en 6 semanas. Inventario, eficiencia, facturación.',
    tags: ['Automotriz', '6 Sem', 'Inventario'],
  },
  {
    imgFile: 'caso-cimer-clinica.webp',
    title: 'Clínica Cimer · Cableado',
    desc: 'Red certificada y control de acceso.',
    moreInfo: 'Ejecución en 6 semanas. Panduit + gestión hospitalaria.',
    tags: ['Salud', 'Panduit', '6 Sem'],
  },
  {
    imgFile: 'caso-gym-acceso.webp',
    title: 'Castillo Gym · Biometría',
    desc: 'Control de acceso + analítica demográfica.',
    moreInfo: 'Hikvision. Flujo por edad/género. Pago móvil inmediato.',
    tags: ['Biometría', 'Hikvision', 'Analytics'],
  },
  {
    imgFile: 'caso-maroil-rack.webp',
    title: 'Maroil Trading · BVC',
    desc: 'Firewall, VLANs y servidores. Piso 10.',
    moreInfo: 'Llave en mano · 5 semanas. Fortinet + Ubiquiti.',
    tags: ['Maroil', '5 Sem', 'Fortinet'],
  },
  {
    imgFile: 'caso-banca-firewall.webp',
    title: 'Defensa anti-ransomware · Banca',
    desc: 'Auditoría y refuerzo de infraestructura digital.',
    moreInfo: 'Firewall next-gen + pentesting. Data sensible asegurada.',
    tags: ['Banca', 'Cyber', 'Firewall'],
  },
];

const Portfolio: React.FC = () => {
  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Casos de éxito · Maroil Trading, Cimer, refinerías · Castillo IT"
        description="Proyectos reales en Anzoátegui: cableado estructurado Maroil Trading Torre BVC, software Refinery, NomiSys, Autosys, Cimer Clínica, gimnasios biométricos."
        path="/portfolio"
        keywords={[
          'casos éxito it venezuela',
          'maroil trading torre bvc',
          'clínica cimer',
          'proyectos cableado anzoátegui',
        ]}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Casos', url: '/portfolio' },
        ]}
      />
      <header className="relative bg-ink py-20 border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-50" />
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScadaBar label="Evidencia operativa" code="LOG · CASES" className="mb-6 reveal" />
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight text-text-1 reveal reveal-delay-100">
            Hechos, no palabras.
          </h1>
          <p className="text-lg text-text-2 max-w-3xl leading-relaxed reveal reveal-delay-200">
            Pisos corporativos en 5 semanas. Sistemas industriales en 3 meses. Clientes locales,
            resultados comprobables.
          </p>
        </Reveal>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <Reveal as="section" className="reveal">
          <div className="flex items-center gap-3 mb-8">
            <MoveHorizontal size={20} className="text-copper" />
            <div>
              <h2 className="text-2xl font-semibold text-text-1 tracking-tight">
                Transformaciones de infraestructura
              </h2>
              <p className="text-text-3 text-sm">Deslice para comparar antes y después.</p>
            </div>
          </div>
          <Stagger className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {transformations.map((t) => (
              <BeforeAfterSlider key={t.code} {...t} />
            ))}
          </Stagger>
        </Reveal>

        <Reveal as="section" className="reveal">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 size={20} className="text-copper" />
            <div>
              <h2 className="text-2xl font-semibold text-text-1 tracking-tight">
                Casos reales · Anzoátegui
              </h2>
              <p className="text-text-3 text-sm">Clientes locales · resultados verificables.</p>
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioItems.map((item, idx) => (
              <MotionCard
                key={item.title}
                className="group bg-surface-1 border border-DEFAULT hover:border-brand rounded-md overflow-hidden flex flex-col"
              >
                <div className="relative border-b border-DEFAULT">
                  <ImagePlaceholder
                    kind="case"
                    alt={item.title}
                    fileName={item.imgFile}
                    path="public/img/cases/"
                    width={1200}
                    height={800}
                    recommendedDims="1200×800"
                    className="rounded-none border-0 border-b"
                    imgClassName="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {item.tags?.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="mono" className="bg-ink/80 backdrop-blur">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest text-text-mute z-10">
                    CASE-{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-text-1 mb-2 leading-tight group-hover:text-brand transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-text-3 text-sm mb-3 line-clamp-2">{item.desc}</p>
                  <p className="text-text-mute text-xs mb-4 line-clamp-3 leading-relaxed">
                    {item.moreInfo}
                  </p>
                  <a
                    href="/contacto"
                    className="mt-auto text-brand text-sm font-semibold inline-flex items-center hover:text-brand-hi"
                  >
                    Solicitar similar <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              </MotionCard>
            ))}
          </Stagger>
        </Reveal>

        <MotionCard className="reveal bg-surface-1 border border-DEFAULT rounded-md p-12 text-center">
          <ScadaBar
            label="Próximo caso · su empresa"
            leds={[{ state: 'ok', blink: true }]}
            className="justify-center mb-5"
          />
          <h2 className="text-3xl md:text-4xl font-semibold text-text-1 mb-4 tracking-tight">
            ¿Es su empresa el próximo caso?
          </h2>
          <p className="text-text-2 max-w-2xl mx-auto mb-6 leading-relaxed">
            La tecnología no es un gasto · es ventaja competitiva.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center bg-copper hover:bg-copper-hi text-ink px-6 py-3 rounded font-semibold text-sm transition-colors"
          >
            Hablar con un ingeniero <ArrowRight className="ml-2" size={16} />
          </a>
        </MotionCard>
      </div>
    </div>
  );
};

export default Portfolio;
