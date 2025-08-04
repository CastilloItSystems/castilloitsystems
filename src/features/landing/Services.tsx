'use client';
import React, { useState } from 'react';
import type { JSX } from 'react';
import styles from './Services.module.css';
import {
  FaServer,
  FaCamera,
  FaShieldAlt,
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaUserTie,
  FaRobot,
} from 'react-icons/fa';

// Tipado explícito para los servicios
type ServiceType = {
  title: string;
  description: string;
  delay: string;
  icon: JSX.Element;
  list: string[];
};

const servicesData: ServiceType[] = [
  {
    title: 'Infraestructura Tecnológica',
    description: 'Diseño y gestión de redes, servidores y centros de datos.',
    delay: '100',
    icon: <FaServer />,
    list: [
      'Configuración de redes LAN/WAN',
      'Virtualización de servidores (VMware, Hyper-V)',
      'Gestión de almacenamiento SAN/NAS',
      'Diseño y cableado estructurado',
    ],
  },
  {
    title: 'Seguridad y Vigilancia',
    description: 'Instalación y configuración de cámaras de seguridad y sistemas de CCTV.',
    delay: '200',
    icon: <FaCamera />,
    list: [
      'Instalación de cámaras IP y analógicas',
      'Sistemas de videovigilancia CCTV',
      'Control de acceso físico',
      'Monitoreo remoto de seguridad',
    ],
  },
  {
    title: 'Ciberseguridad',
    description:
      'Implementación de Firewalls, protección contra amenazas y análisis de vulnerabilidades.',
    delay: '300',
    icon: <FaShieldAlt />,
    list: [
      'Instalación y gestión de Firewalls',
      'Análisis de vulnerabilidades',
      'Pruebas de penetración (Pen-testing)',
      'Protección contra malware y ransomware',
    ],
  },
  {
    title: 'Desarrollo de Software a Medida',
    description: 'Creación de aplicaciones web y de escritorio personalizadas.',
    delay: '100',
    icon: <FaCode />,
    list: [
      'Sistemas de gestión empresarial (ERP/CRM)',
      'Portales web y e-commerce',
      'Integración de APIs y sistemas',
      'Software de gestión de inventario',
    ],
  },
  {
    title: 'Desarrollo de Apps Móviles',
    description: 'Aplicaciones nativas de alto rendimiento para iOS y Android.',
    delay: '200',
    icon: <FaMobileAlt />,
    list: [
      'Apps nativas para iOS (Swift/Objective-C)',
      'Apps nativas para Android (Kotlin/Java)',
      'Apps multiplataforma (React Native, Flutter)',
      'Integración con servicios backend y APIs',
    ],
  },
  {
    title: 'Imagen Corporativa y Diseño Web',
    description: 'Diseño de logos, branding y páginas web estéticas y funcionales.',
    delay: '300',
    icon: <FaPaintBrush />,
    list: [
      'Diseño de identidad visual (logos, paleta de colores)',
      'Diseño y desarrollo de sitios web (HTML, CSS, JavaScript)',
      'Optimización SEO y marketing digital',
      'Gestión de redes sociales',
    ],
  },
  {
    title: 'Asesoramiento Tecnológico',
    description: 'Consultoría estratégica para optimizar tu infraestructura y procesos.',
    delay: '400',
    icon: <FaUserTie />,
    list: [
      'Planificación de proyectos tecnológicos',
      'Análisis y optimización de procesos',
      'Selección de hardware y software',
      'Capacitación técnica para equipos de trabajo',
    ],
  },
  {
    title: 'Automatización Inteligente',
    description: 'Sistemas RPA y flujos de trabajo optimizados con IA.',
    delay: '500',
    icon: <FaRobot />,
    list: [
      'Implementación de RPA (Robotic Process Automation)',
      'Automatización de tareas repetitivas',
      'Sistemas de chatbot y asistentes virtuales',
      'Análisis de datos y Business Intelligence (BI)',
    ],
  },
];

export const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  const handleCardClick = (service: ServiceType) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section id="servicios" className={styles.servicesSection}>
      <h2 className={styles.sectionTitle} data-aos="fade-up">
        Nuestras Soluciones para Impulsar tu Negocio
      </h2>
      <div className={styles.servicesGrid}>
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={styles.serviceCard}
            data-aos="fade-up"
            data-aos-delay={service.delay}
            onClick={() => handleCardClick(service)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.cardContent}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <span className={styles.serviceIcon}>
                  {React.cloneElement(service.icon, { size: 60, color: 'var(--accent-color)' })}
                </span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && selectedService && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <span className={styles.modalIcon}>
              {React.cloneElement(selectedService.icon, { size: 60, color: 'var(--accent-color)' })}
            </span>
            <h2 className={styles.modalTitle}>{selectedService.title}</h2>
            <p className={styles.modalDesc}>{selectedService.description}</p>
            <ul className={styles.modalList}>
              {selectedService.list.map((item, idx) => (
                <li
                  key={idx}
                  className={styles.modalListItem}
                  style={{ animationDelay: `${0.15 * idx}s` }}
                >
                  {item.split('').map((char, cidx) => (
                    <span
                      key={cidx}
                      className={styles.floatingLetter}
                      style={{ animationDelay: `${0.15 * idx + 0.03 * cidx}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
            <button className={styles.modalClose} onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
