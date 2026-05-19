import React from 'react';
import { Home, Search, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Badge from '../components/Badge';

const NotFound: React.FC = () => {
  return (
    <div className="pt-20 bg-ink min-h-screen flex items-center">
      <SEO
        title="Página no encontrada · Castillo IT Systems"
        description="La página que buscas no existe. Revisa nuestros productos NomiSys, Autosys, Refinery o contáctanos directamente."
        path="/404"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Badge variant="mono" className="mb-6">/ 404</Badge>
        <h1 className="font-mono text-6xl md:text-8xl font-bold text-brand mb-4 tabular-nums">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-text-1 mb-3 tracking-tight">
          Esta ruta no existe
        </h2>
        <p className="text-text-3 mb-10 max-w-xl mx-auto">
          La página que buscas se movió, se borró o nunca existió. Te ayudamos a llegar al destino correcto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {[
            { to: '/', icon: Home, label: 'Inicio', desc: 'Volver a la portada' },
            { to: '/software/nomisys', icon: Search, label: 'NomiSys', desc: 'Nuestro producto principal' },
            { to: '/contacto', icon: ArrowRight, label: 'Contacto', desc: 'Hablar con un ingeniero' },
          ].map(({ to, icon: Icon, label, desc }) => (
            <a
              key={to}
              href={to}
              className="bg-surface-1 border border-DEFAULT hover:border-brand transition-colors rounded-md p-5 text-left group"
            >
              <Icon className="text-brand mb-3" size={20} />
              <p className="text-sm font-semibold text-text-1 mb-1 group-hover:text-brand transition-colors">
                {label}
              </p>
              <p className="text-xs text-text-3">{desc}</p>
            </a>
          ))}
        </div>

        <p className="font-mono text-[11px] uppercase tracking-widest text-text-mute">
          ¿Buscabas algo específico? Escríbenos a{' '}
          <a href="mailto:castilloitsystems@gmail.com" className="text-brand hover:text-brand-hi">
            castilloitsystems@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
