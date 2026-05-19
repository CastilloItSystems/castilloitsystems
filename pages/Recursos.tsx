import React from 'react';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import Badge from '../components/Badge';
import { MotionCard, Reveal, Stagger } from '../components/Motion';
import { ARTICLES } from '../lib/articles';

const Recursos: React.FC = () => {
  const sorted = [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Recursos · Guías técnicas, nómina petrolera y software en Venezuela"
        description="Artículos técnicos sobre cálculo nómina petrolera CCP, régimen FUTPV contratistas, software para talleres, ciberseguridad y cableado estructurado en Venezuela."
        path="/recursos"
        keywords={[
          'recursos castillo it',
          'guía cálculo nómina petrolera',
          'blog tecnología venezuela',
          'guías ccp pdvsa',
          'tutoriales software empresarial',
        ]}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Recursos', url: '/recursos' },
        ]}
        extra={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Recursos · Castillo IT Systems',
          description:
            'Guías técnicas sobre nómina petrolera CCP, software empresarial e infraestructura IT en Venezuela.',
          blogPost: ARTICLES.map((a) => ({
            '@type': 'BlogPosting',
            headline: a.title,
            description: a.description,
            datePublished: a.publishedAt,
            dateModified: a.updatedAt,
            url: `https://castilloitsystems.com/recursos/${a.slug}`,
          })),
        }}
      />

      <header className="relative bg-ink py-20 border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-50" />
        <div className="absolute inset-0 glow-brand opacity-60 pointer-events-none" />
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Badge variant="mono" className="mb-6">/ recursos</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight text-text-1">
            Guías técnicas <span className="text-brand">útiles</span>
          </h1>
          <p className="text-lg text-text-2 max-w-3xl leading-relaxed">
            Lo que aprendimos en 20+ implementaciones para clientes del sector petrolero,
            automotriz y empresarial venezolano. Si tienes el problema, aquí está el enfoque.
          </p>
        </Reveal>
      </header>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((a) => (
            <MotionCard
              key={a.slug}
              className="group relative bg-surface-1 border border-DEFAULT hover:border-brand transition-colors rounded-md overflow-hidden flex flex-col"
            >
              <a href={`/recursos/${a.slug}`} className="absolute inset-0 z-10" aria-label={a.title} />
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="mono">{a.category}</Badge>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute inline-flex items-center gap-1">
                    <Clock size={10} /> {a.readingTime}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-text-1 mb-3 leading-snug group-hover:text-brand transition-colors">
                  {a.title}
                </h2>
                <p className="text-text-3 text-sm leading-relaxed mb-5 line-clamp-3">
                  {a.description}
                </p>
                <div className="mt-auto pt-4 border-t border-DEFAULT flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                    {a.publishedAt}
                  </span>
                  <span className="text-brand font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Leer <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </MotionCard>
          ))}
        </Stagger>

        <Reveal className="mt-16 bg-surface-1 border border-DEFAULT rounded-md p-8 md:p-12 text-center">
          <BookOpen className="text-brand mx-auto mb-4" size={28} />
          <h2 className="text-2xl md:text-3xl font-semibold text-text-1 mb-3 tracking-tight">
            ¿Buscas algo específico que aún no escribimos?
          </h2>
          <p className="text-text-3 mb-6 max-w-xl mx-auto">
            Escríbenos. Si la pregunta se repite, probablemente la convertimos en guía pública.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center bg-brand hover:bg-brand-hi text-text-1 px-6 py-3 rounded font-semibold text-sm gap-2"
          >
            Hacer una consulta <ArrowRight size={16} />
          </a>
        </Reveal>
      </section>
    </div>
  );
};

export default Recursos;
