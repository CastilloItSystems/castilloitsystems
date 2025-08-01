import React from 'react';
import styles from './Services.module.css';
import {
  FaServer,
  FaCamera,
  FaShieldAlt,
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
  FaUserTie,
} from 'react-icons/fa';

// Array con los datos de cada tarjeta de servicio para mantener el código limpio
const servicesData = [
  {
    title: 'Infraestructura Tecnológica',
    description: 'Diseño y gestión de redes, servidores y centros de datos.',
    delay: '100',
    icon: <FaServer />,
  },
  {
    title: 'Seguridad y Vigilancia',
    description: 'Instalación y configuración de cámaras de seguridad y sistemas de CCTV.',
    delay: '200',
    icon: <FaCamera />,
  },
  {
    title: 'Ciberseguridad',
    description:
      'Implementación de Firewalls, protección contra amenazas y análisis de vulnerabilidades.',
    delay: '300',
    icon: <FaShieldAlt />,
  },
  {
    title: 'Desarrollo de Software a Medida',
    description: 'Creación de aplicaciones web y de escritorio personalizadas.',
    delay: '100', // Se reinicia el delay para la siguiente fila
    icon: <FaCode />,
  },
  {
    title: 'Desarrollo de Apps Móviles',
    description: 'Aplicaciones nativas de alto rendimiento para iOS y Android.',
    delay: '200',
    icon: <FaMobileAlt />,
  },
  {
    title: 'Imagen Corporativa y Diseño Web',
    description: 'Diseño de logos, branding y páginas web estéticas y funcionales.',
    delay: '300',
    icon: <FaPaintBrush />,
  },
  {
    title: 'Asesoramiento Tecnológico',
    description: 'Consultoría estratégica para optimizar tu infraestructura y procesos.',
    delay: '400',
    icon: <FaUserTie />,
  },
];

export const Services = () => {
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
                  {React.cloneElement(service.icon, { size: 40, color: 'var(--accent-color)' })}
                </span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
