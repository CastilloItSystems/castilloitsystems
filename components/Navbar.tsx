import React, { useRef, useState } from "react";
import { usePathname } from "../lib/router";
import {
  BarChart3,
  Bot,
  ChevronDown,
  Code,
  Menu,
  Receipt,
  Smartphone,
  Wrench,
  X,
} from "lucide-react";
import Modal from "./Modal";
import LeadForm from "./LeadForm";
import Badge from "./Badge";
import { AnimatePresence, MotionButton, m } from "./Motion";
import { DEFAULT_LEAD_INTEREST } from "../lib/interests";

interface SoftwareEntry {
  label: string;
  path: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  flagship?: boolean;
}

interface NavLeaf {
  label: string;
  path: string;
}
interface NavGroup {
  label: string;
  path: string;
  children: SoftwareEntry[];
}
type NavEntry = NavLeaf | NavGroup;

const SOFTWARE: SoftwareEntry[] = [
  {
    label: "Software a medida",
    path: "/software/desarrollo",
    desc: "Web, mobile, desktop y APIs",
    icon: Code,
  },
  {
    label: "Automatización / n8n",
    path: "/software/automatizacion",
    desc: "RPA, IA, VPS y flujos",
    icon: Bot,
  },
  {
    label: "NomiSys",
    path: "/software/nomisys",
    desc: "Nómina petrolera CCP",
    icon: Receipt,
    flagship: true,
  },
  {
    label: "Autosys",
    path: "/software/autosys",
    desc: "Talleres y flotas",
    icon: Wrench,
  },
  {
    label: "Refinery",
    path: "/software/refinery",
    desc: "SCADA + finanzas plantas",
    icon: BarChart3,
  },
  {
    label: "Gym",
    path: "/software/gym",
    desc: "Biometría + analítica",
    icon: Smartphone,
  },
];

const navItems: NavEntry[] = [
  { label: "Inicio", path: "/" },
  { label: "Software", path: "/software", children: SOFTWARE },
  { label: "Infraestructura", path: "/infraestructura" },
  { label: "Seguridad", path: "/seguridad" },
  { label: "Casos", path: "/portfolio" },
  { label: "Recursos", path: "/recursos" },
  { label: "Nosotros", path: "/sobre-nosotros" },
  { label: "Contacto", path: "/contacto" },
];

const isGroup = (n: NavEntry): n is NavGroup => "children" in n;

const Logo: React.FC = () => (
  <a
    href="/"
    className="flex items-center gap-3 group"
    aria-label="Castillo IT Systems · inicio"
  >
    <img
      src="/img/logoBlancoHorizontal.png"
      alt="Castillo IT Systems"
      className="h-8 w-auto transition-opacity group-hover:opacity-80"
    />
  </a>
);

interface SoftwareDropdownProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

const SoftwareDropdown: React.FC<SoftwareDropdownProps> = ({
  open,
  onClose,
  pathname,
}) => (
  <AnimatePresence>
    {open && (
      <m.div
        key="software-dd"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[420px] bg-surface-1 border border-emphasis rounded-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] overflow-hidden z-50"
      >
        <div className="p-2 grid grid-cols-1 gap-1">
          {SOFTWARE.map((s) => {
            const Icon = s.icon;
            const isCurrentPage = pathname === s.path;
            return (
              <a
                key={s.path}
                href={s.path}
                onClick={onClose}
                aria-current={isCurrentPage ? "page" : undefined}
                className={`flex items-start gap-3 px-3 py-3 rounded transition-colors ${
                  isCurrentPage
                    ? "bg-brand/10 ring-1 ring-brand/30"
                    : s.flagship
                      ? "hover:bg-brand/10"
                      : "hover:bg-surface-2"
                }`}
              >
                <span
                  className={`size-9 rounded border flex items-center justify-center shrink-0 ${
                    isCurrentPage
                      ? "border-brand text-brand bg-brand/10"
                      : s.flagship
                        ? "border-brand/40 text-brand bg-brand/5"
                        : "border-emphasis text-text-2"
                  }`}
                >
                  <Icon size={16} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`font-semibold text-sm ${isCurrentPage ? "text-brand" : "text-text-1"}`}
                    >
                      {s.label}
                    </span>
                    {isCurrentPage && <Badge variant="mono">Aquí</Badge>}
                    {!isCurrentPage && s.flagship && (
                      <Badge variant="brand">Principal</Badge>
                    )}
                  </div>
                  <p className="text-xs text-text-3 truncate">{s.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
        <a
          href="/software"
          onClick={onClose}
          className="block px-4 py-2.5 border-t border-DEFAULT bg-surface-2/50 font-mono text-[10px] uppercase tracking-widest text-text-3 hover:text-brand text-center transition-colors"
        >
          Ver software y servicios →
        </a>
      </m.div>
    )}
  </AnimatePresence>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(path + "/");

  const openDd = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setDdOpen(true);
  };
  const scheduleCloseDd = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDdOpen(false), 180);
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-ink/90 backdrop-blur border-b border-DEFAULT">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            <div className="hidden md:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  if (isGroup(item)) {
                    return (
                      <li
                        key={item.path}
                        className="relative"
                        onMouseEnter={openDd}
                        onMouseLeave={scheduleCloseDd}
                      >
                        <a
                          href={item.path}
                          aria-haspopup="true"
                          aria-expanded={ddOpen}
                          className={`relative px-3 py-2 text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                            active
                              ? "text-text-1"
                              : "text-text-3 hover:text-text-1"
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            size={12}
                            className={`transition-transform ${ddOpen ? "rotate-180" : ""}`}
                          />
                          {active && (
                            <m.span
                              layoutId="navbar-active-underline"
                              aria-hidden="true"
                              className="absolute left-3 right-6 -bottom-px h-px bg-brand"
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 32,
                              }}
                            />
                          )}
                        </a>
                        <SoftwareDropdown
                          open={ddOpen}
                          onClose={() => setDdOpen(false)}
                          pathname={pathname}
                        />
                      </li>
                    );
                  }
                  return (
                    <li key={item.path}>
                      <a
                        href={item.path}
                        aria-current={active ? "page" : undefined}
                        className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                          active
                            ? "text-text-1"
                            : "text-text-3 hover:text-text-1"
                        }`}
                      >
                        {item.label}
                        {active && (
                          <m.span
                            layoutId="navbar-active-underline"
                            aria-hidden="true"
                            className="absolute left-3 right-3 -bottom-px h-px bg-brand"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                            }}
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Badge
                variant="default"
                dot
                pulse
                className="hidden lg:inline-flex"
              >
                Operando · Anzoátegui
              </Badge>
              <MotionButton
                onClick={() => setIsModalOpen(true)}
                className="bg-brand text-text-1 hover:bg-brand-hi px-4 py-2 rounded text-sm font-semibold"
              >
                Auditoría
              </MotionButton>
            </div>

            <div className="-mr-2 flex md:hidden">
              <MotionButton
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isOpen}
                className="p-2 rounded text-text-2 hover:text-brand"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </MotionButton>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <m.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden bg-ink border-t border-DEFAULT overflow-hidden"
            >
              <ul className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  if (isGroup(item)) {
                    return (
                      <li key={item.path}>
                        <button
                          type="button"
                          onClick={() => setMobileSubOpen((v) => !v)}
                          aria-expanded={mobileSubOpen}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded text-sm font-medium ${
                            active
                              ? "text-brand bg-surface-1"
                              : "text-text-2 hover:bg-surface-1 hover:text-text-1"
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${mobileSubOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileSubOpen && (
                            <m.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-3"
                            >
                              <li>
                                <a
                                  href="/software"
                                  onClick={() => setIsOpen(false)}
                                  className="block px-3 py-2 rounded text-xs font-mono uppercase tracking-widest text-text-mute hover:text-brand"
                                >
                                  · todos los productos
                                </a>
                              </li>
                              {SOFTWARE.map((s) => {
                                const Icon = s.icon;
                                return (
                                  <li key={s.path}>
                                    <a
                                      href={s.path}
                                      onClick={() => setIsOpen(false)}
                                      className={`flex items-center gap-2 px-3 py-2 rounded text-sm ${
                                        pathname === s.path
                                          ? "text-brand bg-surface-1"
                                          : "text-text-2 hover:bg-surface-1 hover:text-text-1"
                                      }`}
                                    >
                                      <Icon
                                        size={14}
                                        className={
                                          s.flagship ? "text-brand" : ""
                                        }
                                      />
                                      <span className="flex-1">{s.label}</span>
                                      {s.flagship && (
                                        <Badge variant="brand">Principal</Badge>
                                      )}
                                    </a>
                                  </li>
                                );
                              })}
                            </m.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }
                  return (
                    <li key={item.path}>
                      <a
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`block px-3 py-2 rounded text-sm font-medium ${
                          active
                            ? "text-brand border-l-2 border-brand bg-surface-1"
                            : "text-text-2 hover:bg-surface-1 hover:text-text-1"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <MotionButton
                    onClick={() => {
                      setIsOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="mt-2 w-full text-center bg-brand text-text-1 px-4 py-2.5 rounded font-semibold text-sm"
                  >
                    Solicitar auditoría
                  </MotionButton>
                </li>
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Auditoría gratuita"
      >
        <p className="text-text-3 mb-4 text-sm">
          Deje sus datos y un ingeniero senior (no un vendedor) lo contactará
          para evaluar su infraestructura.
        </p>
        <LeadForm
          defaultInterest={DEFAULT_LEAD_INTEREST}
          onSuccess={() => setTimeout(() => setIsModalOpen(false), 1800)}
        />
      </Modal>
    </>
  );
};

export default Navbar;
