import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Instagram, ExternalLink } from 'lucide-react';
import Badge from './Badge';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-DEFAULT">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-10 pb-6 border-b border-DEFAULT">
          <Badge variant="ok" dot pulse>Sistemas operativos · HQ Anzoátegui</Badge>
          <span className="font-mono text-[11px] text-text-mute tabular-nums">
            10.1334° N · 64.6863° W
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-text-1 text-sm font-semibold tracking-tight mb-3">
              CASTILLO IT SYSTEMS
            </h3>
            <p className="text-sm text-text-3 leading-relaxed mb-5">
              Infraestructura crítica y software industrial para empresas que no pueden permitirse fallar.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-text-3 hover:text-copper transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-text-3 hover:text-copper transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-text-3 font-mono uppercase text-[10px] tracking-widest mb-4">
              Soluciones
            </h4>
            <ul className="space-y-2 text-sm text-text-2">
              <li>
                <a href="/software" className="hover:text-brand transition-colors inline-flex items-center gap-2">
                  NomiSys
                  <span className="text-[9px] font-mono uppercase tracking-widest text-brand border border-brand/40 px-1.5 py-0.5 rounded-sm">
                    nuevo
                  </span>
                </a>
              </li>
              <li><a href="/software#desarrollo" className="hover:text-brand transition-colors">Software a medida</a></li>
              <li><a href="/software#automatizacion" className="hover:text-brand transition-colors">Automatización n8n / IA</a></li>
              <li><a href="/software#vps-n8n" className="hover:text-brand transition-colors">VPS + bases de datos</a></li>
              <li><a href="/software" className="hover:text-brand transition-colors">Apps mobile / desktop</a></li>
              <li><a href="/infraestructura" className="hover:text-brand transition-colors">Infraestructura & redes</a></li>
              <li><a href="/seguridad" className="hover:text-brand transition-colors">Seguridad integral</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-3 font-mono uppercase text-[10px] tracking-widest mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-text-2">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-copper" />
                <span>Av. Raúl Leoni, Urb. Fundación Barcelona, Barcelona 6001, Anzoátegui.</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-copper" />
                <a href="tel:+584127705451" className="font-mono tabular-nums hover:text-copper">
                  +58 412-770-5451
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-copper" />
                <a href="mailto:castilloitsystems@gmail.com" className="hover:text-copper">
                  castilloitsystems@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-3 font-mono uppercase text-[10px] tracking-widest mb-4">
              Soporte local
            </h4>
            <p className="text-sm text-text-2 mb-4">
              ¿Emergencia técnica? Ingenieros en sitio en &lt; 2 h en zona norte.
            </p>
            <a
              href="https://wa.me/584127705451"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full border border-emphasis hover:border-copper hover:bg-surface-1 text-text-1 px-3 py-2 rounded text-sm font-medium transition-colors"
            >
              Chat WhatsApp <ExternalLink size={14} className="ml-2" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-DEFAULT flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-text-mute">
          <p>© {year} Castillo IT Systems</p>
          <p>BUILD · {year}.{String(new Date().getMonth() + 1).padStart(2, '0')} · TIER-1</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
