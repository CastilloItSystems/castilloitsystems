import React from 'react';
import { Quote } from 'lucide-react';
import Badge from './Badge';
import ImagePlaceholder from './ImagePlaceholder';
import { MotionCard, Reveal, Stagger } from './Motion';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  photoFile: string;
  project: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'NomiSys nos eliminó dos semanas de Excel cada cierre. Ahora cerramos nómina petrolera en 4 horas con auditoría completa.',
    name: '[TESTIMONIO PENDIENTE]',
    role: 'Gerente RR.HH.',
    company: 'Empresa contratista petrolera · Anzoátegui',
    photoFile: 'testimonio-1.webp',
    project: 'NomiSys',
  },
  {
    quote:
      'Habilitaron piso 10 completo en 5 semanas. Cableado Panduit certificado, cero downtime durante la mudanza. Trabajan como militares.',
    name: '[TESTIMONIO PENDIENTE]',
    role: 'Director TI',
    company: 'Maroil Trading · Torre BVC',
    photoFile: 'testimonio-2.webp',
    project: 'Infraestructura',
  },
  {
    quote:
      'Castillo Refinery nos dio visibilidad SCADA de procesos que antes vivían en cuadernos. ROI en menos de un trimestre.',
    name: '[TESTIMONIO PENDIENTE]',
    role: 'COO',
    company: 'Planta de procesamiento · Oriente',
    photoFile: 'testimonio-3.webp',
    project: 'Refinery',
  },
];

interface TestimonialsProps {
  items?: Testimonial[];
  title?: string;
  subtitle?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({
  items = DEFAULT_TESTIMONIALS,
  title = 'Lo que dicen nuestros clientes',
  subtitle = 'Resultados verificables con clientes locales del sector petrolero y empresarial.',
}) => {
  return (
    <section className="py-20 bg-ink border-b border-DEFAULT">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 reveal">
          <Badge variant="mono" className="mb-4">/ testimonios</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-text-1 tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-text-3 max-w-2xl">{subtitle}</p>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <MotionCard
              key={i}
              className="reveal bg-surface-1 border border-DEFAULT hover:border-brand rounded-md p-6 flex flex-col"
            >
              <Quote size={20} className="text-brand mb-4" />
              <p className="text-text-2 leading-relaxed mb-6 text-sm flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-DEFAULT">
                <div className="size-10 rounded-full overflow-hidden border border-emphasis shrink-0">
                  <ImagePlaceholder
                    kind="photo"
                    alt={t.name}
                    fileName={t.photoFile}
                    path="public/img/team/"
                    width={80}
                    height={80}
                    recommendedDims="80×80"
                    className="rounded-full border-0 size-10 p-0"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-1 truncate">{t.name}</p>
                  <p className="text-xs text-text-3 truncate">{t.role} · {t.company}</p>
                </div>
                <Badge variant="mono" className="ml-auto shrink-0 hidden sm:inline-flex">
                  {t.project}
                </Badge>
              </div>
            </MotionCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Testimonials;
