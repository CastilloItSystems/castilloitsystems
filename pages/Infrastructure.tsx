import React from 'react';
import { Server, Wifi, Cable } from 'lucide-react';
import ScadaBar from '../components/ScadaBar';
import SEO from '../components/SEO';
import StructuredData, { serviceSchema } from '../components/StructuredData';
import { MotionCard, Reveal, Stagger } from '../components/Motion';

const services = [
  {
    icon: Cable,
    code: 'NET-01',
    title: 'Cableado estructurado',
    desc: 'Certificación Cat6/Cat6A/Fibra óptica. Ordenamiento de racks profesional. ANSI/TIA.',
    partners: 'Panduit · Belden',
  },
  {
    icon: Wifi,
    code: 'NET-02',
    title: 'Redes inalámbricas',
    desc: 'Mapas de calor WiFi. Enlaces punto-a-punto largo alcance (50 km). Roaming corporativo.',
    partners: 'Ubiquiti · MikroTik',
  },
  {
    icon: Server,
    code: 'NET-03',
    title: 'Servidores & virtualización',
    desc: 'Clusters HA. AD, DNS, DHCP. Virtualización Hyper-V y migraciones sin downtime.',
    partners: 'Microsoft · Dell · HP',
  },
];

const Infrastructure: React.FC = () => {
  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Infraestructura IT · Cableado estructurado · Redes en Anzoátegui"
        description="Cableado estructurado Cat6A/Fibra (Panduit), redes WiFi Ubiquiti, servidores y virtualización Hyper-V. Certificación ANSI/TIA en Anzoátegui, Venezuela."
        path="/infraestructura"
        keywords={[
          'cableado estructurado anzoátegui',
          'panduit venezuela',
          'redes corporativas barcelona',
          'servidores hyper-v',
          'mikrotik ubiquiti anzoátegui',
        ]}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Infraestructura', url: '/infraestructura' },
        ]}
        extra={serviceSchema({
          name: 'Infraestructura IT · Cableado y Redes',
          description:
            'Diseño e instalación de infraestructura TI certificada: cableado estructurado, redes inalámbricas, servidores y virtualización en Anzoátegui, Venezuela.',
        })}
      />
      <header className="relative bg-ink py-20 border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-50" />
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScadaBar label="Infraestructura IT · grado militar" code="NET · CORE" className="mb-6 reveal" />
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight text-text-1 reveal reveal-delay-100">
            Infraestructura IT
          </h1>
          <p className="text-lg text-text-2 max-w-3xl leading-relaxed reveal reveal-delay-200">
            Construimos las carreteras digitales por donde viajan sus datos. Instalaciones
            certificadas que duran décadas, no meses.
          </p>
        </Reveal>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <MotionCard
                key={s.code}
                className="reveal bg-surface-1 border border-DEFAULT hover:border-copper rounded-md p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="size-10 border border-emphasis rounded flex items-center justify-center text-copper">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                    {s.code}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text-1 mb-3">{s.title}</h3>
                <p className="text-text-3 text-sm mb-5 leading-relaxed">{s.desc}</p>
                <p className="text-[10px] text-text-mute font-mono uppercase tracking-widest border-t border-DEFAULT pt-3">
                  · Partners: {s.partners}
                </p>
              </MotionCard>
            );
          })}
        </Stagger>

        <MotionCard className="reveal bg-surface-1 border border-DEFAULT rounded-md p-8 md:p-12">
          <ScadaBar
            label="Caso · Maroil Trading · Torre BVC"
            code="P10 · 5 SEMANAS"
            align="between"
            leds={[{ state: 'ok', blink: true }, { state: 'ok' }, { state: 'ok' }]}
            className="mb-6 pb-4 border-b border-DEFAULT"
          />
          <h2 className="text-3xl font-semibold text-text-1 mb-4 tracking-tight">
            Estética y funcionalidad
          </h2>
          <p className="text-text-2 max-w-2xl leading-relaxed mb-4">
            Un rack desordenado es un riesgo de seguridad. En Castillo IT nos obsesiona la estética
            del cableado porque refleja la calidad de la conexión.
          </p>
          <a
            href="/portfolio"
            className="text-copper border-b border-copper font-semibold text-sm pb-0.5 hover:text-copper-hi transition-colors"
          >
            Ver el caso Maroil Trading →
          </a>
        </MotionCard>
      </div>
    </div>
  );
};

export default Infrastructure;
