'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Portfolio.module.css';

// ...existing code...

const portfolioItems = [
  {
    img: '/assets/images/portfolio-1.jpg',
    title: 'App de Gestión Interna',
    desc: 'Desarrollo de una app móvil para optimizar los procesos de una empresa de logística.',
  },
  {
    img: '/assets/images/portfolio-2.jpg',
    title: 'Infraestructura de Red',
    desc: 'Diseño e implementación de una red segura para una nueva oficina corporativa.',
  },
  {
    img: '/assets/images/portfolio-3.jpg',
    title: 'Sistema de CCTV',
    desc: 'Instalación de un sistema de vigilancia completo para un complejo residencial.',
  },
];

export const Portfolio = () => {
  useEffect(() => {
    const swiper = new Swiper(`.${styles.portfolioSlider}`, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: `.${styles.swiperButtonNext}`,
        prevEl: `.${styles.swiperButtonPrev}`,
      },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 2.5, centeredSlides: true, spaceBetween: 40 },
      },
    });
  }, []);

  return (
    <section id="portfolio" className={styles.portfolioSection}>
      <div className={styles.portfolioContent}>
        <h2 className={styles.sectionTitle} data-aos="fade-up">
          Casos de Éxito
        </h2>
        <div
          className={`${styles.portfolioSlider} swiper-container`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="swiper-wrapper">
            {portfolioItems.map((item, index) => (
              <div key={index} className={`${styles.swiperSlide} swiper-slide`}>
                <Image
                  src={item.img}
                  alt={item.title}
                  width={500}
                  height={300}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.slideInfo}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.swiperButtonNext} swiper-button-next`}></div>
          <div className={`${styles.swiperButtonPrev} swiper-button-prev`}></div>
        </div>
      </div>
    </section>
  );
};
