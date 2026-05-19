import React from 'react';
import { ChevronRight, Clock, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import SEO from '../../components/SEO';
import StructuredData from '../../components/StructuredData';
import Badge from '../../components/Badge';
import { Reveal } from '../../components/Motion';
import { findArticle, ARTICLES } from '../../lib/articles';
import { SITE } from '../../lib/seo';

const PRODUCT_CTA: Record<string, { label: string; href: string; desc: string }> = {
  nomisys: {
    label: 'Conoce NomiSys',
    href: '/software/nomisys',
    desc: 'Plataforma integral de nómina petrolera CCP.',
  },
  autosys: {
    label: 'Conoce Autosys',
    href: '/software/autosys',
    desc: 'Gestión integral para talleres mecánicos.',
  },
  refinery: {
    label: 'Conoce Refinery',
    href: '/software/refinery',
    desc: 'SCADA + simulación financiera para plantas.',
  },
  gym: {
    label: 'Conoce Gym',
    href: '/software/gym',
    desc: 'Control de acceso biométrico para gimnasios.',
  },
  infraestructura: {
    label: 'Servicios de infraestructura',
    href: '/infraestructura',
    desc: 'Cableado estructurado certificado Panduit.',
  },
  seguridad: {
    label: 'Servicios de seguridad',
    href: '/seguridad',
    desc: 'CCTV, biometría y ciberseguridad.',
  },
};

interface ArticleProps {
  slug?: string;
}

const Article: React.FC<ArticleProps> = ({ slug: slugProp }) => {
  const slug =
    slugProp ||
    (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : undefined);
  const article = slug ? findArticle(slug) : undefined;

  if (!article) {
    if (typeof window !== 'undefined') window.location.replace('/recursos');
    return null;
  }

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  const cta = article.relatedProduct ? PRODUCT_CTA[article.relatedProduct] : undefined;

  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title={article.metaTitle}
        description={article.description}
        path={`/recursos/${article.slug}`}
        keywords={article.keywords}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Recursos', url: '/recursos' },
          { name: article.title, url: `/recursos/${article.slug}` },
        ]}
        extra={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          author: { '@type': 'Organization', name: SITE.name },
          publisher: {
            '@type': 'Organization',
            name: SITE.name,
            logo: { '@type': 'ImageObject', url: `${SITE.url}/img/logo.svg` },
          },
          mainEntityOfPage: `${SITE.url}/recursos/${article.slug}`,
          keywords: article.keywords.join(', '),
          articleSection: article.category,
        }}
      />

      <nav className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-mono text-[11px] uppercase tracking-widest text-text-3 flex items-center gap-2">
        <a href="/" className="hover:text-brand">Inicio</a>
        <ChevronRight size={12} />
        <a href="/recursos" className="hover:text-brand">Recursos</a>
        <ChevronRight size={12} />
        <span className="text-text-1 truncate">{article.category}</span>
      </nav>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="brand">{article.category}</Badge>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute inline-flex items-center gap-1.5">
              <Clock size={10} /> {article.readingTime}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute inline-flex items-center gap-1.5">
              <Calendar size={10} /> {article.publishedAt}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-text-1 tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg text-text-2 leading-relaxed mb-10 border-l-2 border-brand pl-5">
            {article.intro}
          </p>
        </Reveal>

        <div className="space-y-10">
          {article.sections.map((s, i) => (
            <Reveal key={i}>
              {s.heading && (
                <h2 className="text-2xl font-semibold text-text-1 tracking-tight mb-4">
                  {s.heading}
                </h2>
              )}
              <p className="text-text-2 leading-relaxed mb-4">{s.body}</p>
              {s.list && (
                <ul className="space-y-2 bg-surface-1 border border-DEFAULT rounded-md p-5">
                  {s.list.map((it, j) => (
                    <li key={j} className="flex items-start text-sm text-text-2">
                      <span className="size-1 rounded-full bg-brand mr-3 mt-2 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 pt-8 border-t border-DEFAULT">
          <h2 className="text-xl font-semibold text-text-1 mb-3 tracking-tight">Conclusión</h2>
          <p className="text-text-2 leading-relaxed">{article.conclusion}</p>
        </Reveal>

        {cta && (
          <Reveal className="mt-12 bg-surface-1 border border-emphasis rounded-md p-8">
            <Badge variant="brand" dot pulse className="mb-4">/ relacionado</Badge>
            <h3 className="text-xl font-semibold text-text-1 mb-2">{cta.label}</h3>
            <p className="text-text-3 mb-5">{cta.desc}</p>
            <a
              href={cta.href}
              className="inline-flex items-center bg-brand hover:bg-brand-hi text-text-1 px-5 py-2.5 rounded font-semibold text-sm gap-2"
            >
              Ver producto <ArrowRight size={14} />
            </a>
          </Reveal>
        )}

        <div className="mt-12 pt-8 border-t border-DEFAULT flex items-center justify-between">
          <a
            href="/recursos"
            className="inline-flex items-center text-text-3 hover:text-brand text-sm gap-2"
          >
            <ArrowLeft size={14} /> Todos los recursos
          </a>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
            Actualizado · {article.updatedAt}
          </span>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-DEFAULT py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-text-1 mb-8 tracking-tight">
              Sigue leyendo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/recursos/${r.slug}`}
                  className="bg-surface-1 border border-DEFAULT hover:border-brand transition-colors rounded-md p-5 group"
                >
                  <Badge variant="mono" className="mb-3">{r.category}</Badge>
                  <h3 className="text-sm font-semibold text-text-1 mb-2 leading-snug group-hover:text-brand transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-text-3 line-clamp-2">{r.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Article;
