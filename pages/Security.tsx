import React from 'react';
import { Eye, Fingerprint, Cpu, ShieldAlert, Lock, Globe, Server } from 'lucide-react';
import ScadaBar from '../components/ScadaBar';
import SEO from '../components/SEO';
import StructuredData, { serviceSchema } from '../components/StructuredData';
import { MotionButton, MotionCard, Reveal, Stagger } from '../components/Motion';

const physical = [
  {
    icon: Eye,
    code: 'CCTV-01',
    title: 'CCTV inteligente',
    desc: 'Cámaras con reconocimiento de placas (LPR), detección facial y alertas de intrusión.',
    bullets: ['Monitoreo remoto vía app', 'Cámaras térmicas industriales', 'NVR con redundancia RAID'],
  },
  {
    icon: Fingerprint,
    code: 'ACC-02',
    title: 'Control de acceso',
    desc: 'Elimine llaves prestadas. Controle entradas/salidas con registro horario exacto para nómina.',
    bullets: ['Huella + rostro 3D', 'Torniquetes y barreras vehiculares', 'Reportes de asistencia'],
  },
];

const cyber = [
  {
    icon: Server,
    code: 'FW-01',
    title: 'Firewalls Next-Gen',
    desc: 'Fortinet y Palo Alto. Inspección profunda de paquetes. VPN encriptada para trabajo remoto.',
  },
  {
    icon: Globe,
    code: 'PEN-02',
    title: 'Ethical Hacking',
    desc: 'Simulamos ataques reales (pentesting) para encontrar agujeros antes que los criminales.',
  },
  {
    icon: Cpu,
    code: 'EDR-03',
    title: 'Anti-Ransomware',
    desc: 'EDR (Endpoint Detection & Response) + backup inmutable en nube para recuperación inmediata.',
  },
];

const Security: React.FC = () => {
  return (
    <div className="pt-20 bg-ink min-h-screen">
      <SEO
        title="Ciberseguridad · CCTV · Biometría · Firewall Fortinet en Anzoátegui"
        description="Protección física (CCTV Hikvision, control de acceso biométrico) y ciberseguridad (Firewalls Fortinet, anti-ransomware, pentesting) para empresas en Venezuela."
        path="/seguridad"
        keywords={[
          'ciberseguridad venezuela',
          'firewall fortinet anzoátegui',
          'cctv hikvision',
          'biometría hikvision',
          'pentesting ethical hacking venezuela',
          'anti-ransomware empresas',
        ]}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Inicio', url: '/' },
          { name: 'Seguridad', url: '/seguridad' },
        ]}
        extra={serviceSchema({
          name: 'Ciberseguridad y Seguridad Física',
          description:
            'CCTV inteligente, control de acceso biométrico, firewalls next-gen Fortinet, pentesting y anti-ransomware para empresas en Anzoátegui, Venezuela.',
        })}
      />
      <header className="relative bg-ink py-20 border-b border-DEFAULT overflow-hidden">
        <div className="absolute inset-0 bg-grid-refinery opacity-50" />
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScadaBar
            label="Protección activa · 24/7"
            code="SEC · CORE"
            leds={[{ state: 'err', blink: true }, { state: 'ok' }, { state: 'ok' }]}
            className="mb-6 reveal"
          />
          <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight text-text-1 reveal reveal-delay-100">
            Seguridad integral
          </h1>
          <p className="text-lg text-text-2 max-w-3xl leading-relaxed reveal reveal-delay-200">
            Protección total en dos frentes: el perímetro físico de sus instalaciones y la
            integridad digital de sus datos.
          </p>
        </Reveal>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <section>
          <ScadaBar label="Seguridad física" code="PHY · 01" className="mb-6 reveal" />
          <Stagger className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {physical.map((p) => {
              const Icon = p.icon;
              return (
                <MotionCard
                  key={p.code}
                  className="reveal bg-surface-1 border border-DEFAULT hover:border-copper rounded-md p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="size-10 border border-emphasis rounded flex items-center justify-center text-copper">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                      {p.code}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-text-1 mb-3">{p.title}</h3>
                  <p className="text-text-2 mb-5 leading-relaxed">{p.desc}</p>
                  <ul className="space-y-2 border-t border-DEFAULT pt-4">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-center text-sm text-text-2">
                        <span className="size-1.5 rounded-full bg-copper mr-3" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </MotionCard>
              );
            })}
          </Stagger>
        </section>

        <MotionCard className="bg-surface-1 border border-DEFAULT rounded-md p-8 md:p-12 reveal">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 pb-6 border-b border-DEFAULT">
            <div>
              <ScadaBar
                label="Ciberseguridad ofensiva"
                code="CYB · 02"
                leds={[{ state: 'err', blink: true }, { state: 'warn' }, { state: 'ok' }]}
                className="mb-3"
              />
              <h2 className="text-3xl md:text-4xl font-semibold text-text-1 tracking-tight inline-flex items-center gap-3">
                <ShieldAlert className="text-copper" size={28} />
                Defensa digital
              </h2>
              <p className="text-text-3 max-w-xl mt-3">
                Protegemos sus activos digitales con la misma rigurosidad que sus activos físicos.
              </p>
            </div>
            <MotionButton className="bg-copper hover:bg-copper-hi text-ink px-5 py-2.5 rounded text-sm font-semibold inline-flex items-center gap-2 self-start">
              <Lock size={14} /> Solicitar pentest
            </MotionButton>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {cyber.map((c) => {
              const Icon = c.icon;
              return (
                <MotionCard
                  key={c.code}
                  className="bg-surface-2 border border-DEFAULT hover:border-copper rounded p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="text-copper" size={20} />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-mute">
                      {c.code}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-text-1 mb-2">{c.title}</h3>
                  <p className="text-text-3 text-sm leading-relaxed">{c.desc}</p>
                </MotionCard>
              );
            })}
          </Stagger>
        </MotionCard>

        <MotionCard className="reveal bg-surface-1 border border-DEFAULT rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <ScadaBar label="Integración IoT · domótica" code="IOT · 03" className="mb-4" />
            <h3 className="text-3xl font-semibold text-text-1 mb-4 tracking-tight inline-flex items-center gap-3">
              <Cpu className="text-copper" size={24} />
              IoT & domótica
            </h3>
            <p className="text-text-2 leading-relaxed mb-3">
              Conectamos el mundo físico con el digital. Sensores de temperatura para cuartos
              fríos, iluminación automatizada, consumo eléctrico en tiempo real.
            </p>
            <p className="text-text-1 font-semibold">Todo centralizado en un dashboard a medida.</p>
          </div>
          <div className="bg-surface-2 border border-DEFAULT rounded p-5 font-mono text-xs">
            <ScadaBar
              label="Telemetría · live"
              code="HQ · ROOM-04"
              align="between"
              leds={[{ state: 'ok', blink: true }, { state: 'warn' }, { state: 'ok' }]}
              className="mb-4 pb-3 border-b border-DEFAULT"
            />
            {[
              { k: 'TEMP-AC', v: '22.0 °C', s: 'ok' },
              { k: 'LUX-LVL', v: '80 %', s: 'ok' },
              { k: 'SRV-DOOR', v: 'CERRADO', s: 'err' },
              { k: 'CONS-KW', v: '4.81 kW', s: 'warn' },
            ].map((r) => (
              <div key={r.k} className="flex justify-between items-center py-2 border-b border-DEFAULT last:border-0">
                <span className="text-text-3 uppercase tracking-widest">{r.k}</span>
                <span className="flex items-center gap-2">
                  <span
                    className={`size-1.5 rounded-full ${
                      r.s === 'ok' ? 'bg-scada-ok' : r.s === 'warn' ? 'bg-scada-warn' : 'bg-scada-err'
                    }`}
                  />
                  <span className="tabular-nums text-text-1">{r.v}</span>
                </span>
              </div>
            ))}
          </div>
        </MotionCard>
      </div>
    </div>
  );
};

export default Security;
