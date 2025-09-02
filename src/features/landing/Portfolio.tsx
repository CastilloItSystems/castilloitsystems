'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import styles from './Portfolio.module.css';

type PortfolioItem = {
  img: string;
  title: string;
  desc: string;
  moreInfo: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    img: '/assets/images/portfolio/portfolio-infra-1.jpeg',
    title: 'Optimización de Red para Empresa de Logística',
    desc: 'Diseño e implementación de una red de alta disponibilidad y segura.',
    moreInfo:
      'Se optimizó la red para una empresa de logística mediante un nuevo diseño de cableado estructurado, la virtualización de servidores y la configuración de una VPN segura. Esto resultó en una reducción del 30% en costos de mantenimiento y una mejora del 50% en la velocidad de la red.',
  },
  {
    img: '/assets/images/portfolio/portfolio-seguridad-1.jpeg',
    title: 'Sistema Integral de Vigilancia para Complejo Residencial',
    desc: 'Instalación de un sistema de vigilancia completo para un complejo residencial.',
    moreInfo:
      'El proyecto incluyó la instalación de cámaras IP de alta resolución, un sistema de videovigilancia CCTV 24/7 y control de acceso biométrico en las entradas principales. Esto llevó a una notable reducción de incidentes de seguridad y aumentó la tranquilidad de los residentes.',
  },
  {
    img: '/assets/images/portfolio/portfolio-ciber-1.jpeg',
    title: 'Protección contra Ransomware para Institución Financiera',
    desc: 'Auditoría de seguridad y refuerzo de la infraestructura digital.',
    moreInfo:
      'Tras una auditoría exhaustiva, se implementó un Firewall de última generación, se realizaron pruebas de penetración y se capacitó al personal. Esta acción evitó un posible ataque de ransomware y fortaleció la protección de los datos de los clientes.',
  },
  {
    img: '/assets/images/portfolio/portfolio-software-1.jpeg',
    title: 'Software de Gestión de Inventario para Fábrica',
    desc: 'Desarrollo de un software ERP a medida para optimizar procesos de producción y gestión.',
    moreInfo:
      'Este sistema automatizó la gestión de inventario, optimizó la producción y generó informes en tiempo real. La empresa aumentó su eficiencia en un 25% y redujo los errores humanos en un 50%, permitiendo tomar decisiones más rápidas.',
  },
  {
    img: '/assets/images/portfolio/portfolio-apps-1.jpeg',
    title: 'App de Pedidos y Reservas para Cadena de Restaurantes',
    desc: 'Creación de una app móvil para mejorar la interacción con los clientes.',
    moreInfo:
      'Se desarrolló una aplicación móvil nativa que permite a los clientes hacer pedidos y reservas. Integrada directamente con el sistema de punto de venta, la app aumentó las ventas online en un 35% y mejoró la experiencia de usuario.',
  },
  {
    img: '/assets/images/portfolio/portfolio-web-1.jpeg',
    title: 'Renovación de Marca y Web para Consultora',
    desc: 'Rebranding y desarrollo de una página web moderna y funcional.',
    moreInfo:
      'El proyecto incluyó el diseño de un nuevo logo, una página web adaptable (responsive) y una estrategia de SEO. En seis meses, el tráfico web orgánico se duplicó y se generó un aumento del 20% en nuevos leads.',
  },
  {
    img: '/assets/images/portfolio/portfolio-asesoramiento-1.jpeg',
    title: 'Migración a la Nube para PyME',
    desc: 'Consultoría y ejecución de la migración de sistemas a la nube.',
    moreInfo:
      'Asesoramos a una pequeña empresa en la migración de sus servidores y sistemas de correo a la nube. Esto redujo los costos operativos y les otorgó la flexibilidad necesaria para crecer sin grandes inversiones en hardware.',
  },
  {
    img: '/assets/images/portfolio/portfolio-rpa-1.jpeg',
    title: 'Automatización de Tareas Contables con RPA',
    desc: 'Implementación de un sistema de automatización robótica de procesos (RPA).',
    moreInfo:
      'Se implementó un sistema de RPA para automatizar el procesamiento de facturas, liberando al equipo contable en un 70% de esa tarea repetitiva y reduciendo drásticamente los errores en la entrada de datos.',
  },
];

export const Portfolio = () => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log('modalOpen:', modalOpen);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const handleCardClick = (portfolio: PortfolioItem) => {
    setSelectedPortfolio(portfolio);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPortfolio(null);
  };
  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <div className={styles.portfolioContent}>
        <h2 className={styles.sectionTitle} data-aos="fade-up">
          Casos de Éxito
        </h2>
        <Swiper
          className={styles.portfolioSlider}
          modules={[Navigation, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          centeredSlides={true}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 30, centeredSlides: true },
            1024: { slidesPerView: 2.5, spaceBetween: 40, centeredSlides: true },
          }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {portfolioItems.map((item, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <div onClick={() => handleCardClick(item)} style={{ cursor: 'pointer' }}>
                <Image
                  src={item.img}
                  alt={item.title}
                  width={0}
                  height={300}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  sizes="100vw"
                />
                <div className={styles.slideInfo}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {modalOpen && selectedPortfolio && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <span className={styles.modalIcon}></span>
              <h2 className={styles.modalTitle}>{selectedPortfolio.title}</h2>
              <p className={styles.modalDesc}>{selectedPortfolio.desc}</p>
              <ul className={styles.modalList}>
                {selectedPortfolio.moreInfo.split('. ').map((item, idx) => (
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
        {/* <div
          className={
            modalInfo ? `${styles.modalOverlay} ${styles.modalOverlayActive}` : styles.modalOverlay
          }
          style={{ transition: 'opacity 0.3s' }}
          onClick={() => setModalInfo(null)}
        >
          {modaalInfo && (
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={() => setModalInfo(null)}>
                &times;
              </button>
              <h3>{modalInfo.title}</h3>
              <p>{modalInfo.moreInfo}</p>
            </div>
          )}
        </div> */}
      </div>
    </section>
  );
};
