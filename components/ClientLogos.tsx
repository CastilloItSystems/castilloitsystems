import React from 'react';
import Badge from './Badge';
import { Reveal } from './Motion';

interface ClientLogo {
  name: string;
  logoFile?: string;
  brandColor?: string;
  industry: string;
}

const DEFAULT_CLIENTS: ClientLogo[] = [
  { name: 'Maroil Trading', industry: 'Petróleo · Torre BVC', brandColor: '#1a3a6e' },
  { name: 'Clínica Cimer', industry: 'Salud', brandColor: '#0d7a6e' },
  { name: 'Constructora Oriente', industry: 'Construcción', brandColor: '#b8651a' },
  { name: 'Banco Regional', industry: 'Banca · ciberseguridad', brandColor: '#23476b' },
  { name: 'Refinería Oriente', industry: 'Procesamiento · SCADA', brandColor: '#7a1a1a' },
  { name: 'Flota Industrial', industry: 'Logística', brandColor: '#3d3d3d' },
];

interface ClientLogosProps {
  items?: ClientLogo[];
  title?: string;
}

const ClientLogos: React.FC<ClientLogosProps> = ({
  items = DEFAULT_CLIENTS,
  title = 'Empresas que confiaron en nosotros',
}) => {
  return (
    <section className="py-14 border-b border-DEFAULT bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10">
            <Badge variant="mono" className="mb-3">/ clientes</Badge>
            <h2 className="text-xl md:text-2xl font-semibold text-text-1 tracking-tight">
              {title}
            </h2>
            <p className="text-text-3 text-sm mt-2">
              <span className="text-ok">●</span> Casos reales · proyectos entregados en Anzoátegui y zona oriental
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {items.map((c) => (
              <div
                key={c.name}
                style={c.brandColor ? { ['--client-c' as string]: c.brandColor } : undefined}
                className="group bg-surface-1 border border-DEFAULT hover:border-brand transition-colors rounded-md p-4 flex flex-col items-center justify-center text-center min-h-[88px]"
              >
                {c.logoFile ? (
                  <img
                    src={`/img/clients/${c.logoFile}`}
                    alt={c.name}
                    loading="lazy"
                    className="max-h-10 w-auto grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                  />
                ) : (
                  <>
                    <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-text-2 group-hover:text-[var(--client-c)] transition-colors">
                      {c.name}
                    </span>
                    <span className="text-[10px] text-text-mute font-mono tracking-wider mt-1">
                      {c.industry}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>

          <p className="text-center mt-6 text-[10px] font-mono uppercase tracking-widest text-text-mute">
            * Reemplazar con logos reales · ver docs/ASSETS-GUIDE.md
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default ClientLogos;
