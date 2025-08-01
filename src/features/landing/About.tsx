import React from 'react';
import Image from 'next/image';
import { FaHandshake, FaLightbulb, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import styles from './About.module.css';

const valuesData = [
  {
    icon: <FaHandshake />,
    title: 'Compromiso',
    description:
      'Nos dedicamos por completo a cada proyecto, asegurando resultados que superen tus expectativas.',
  },
  {
    icon: <FaLightbulb />,
    title: 'Innovación',
    description:
      'Aplicamos las últimas tecnologías para ofrecer soluciones eficientes y a la vanguardia.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Seguridad',
    description: 'La protección de tus datos y tu infraestructura es nuestra máxima prioridad.',
  },
  {
    icon: <FaHeadset />,
    title: 'Soporte Personalizado',
    description:
      'Te acompañamos en todo momento, ofreciendo un soporte cercano y adaptado a tus necesidades.',
  },
];

export const About = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <h2 className={styles.sectionTitle} data-aos="fade-up">
        ¿Por Qué Castillo IT Systems?
      </h2>
      <div className={styles.aboutContainer} data-aos="fade-up" data-aos-delay="200">
        <div className={styles.aboutImage}>
          <Image
            src="/assets/images/about-us.jpeg"
            alt="Equipo de Castillo IT Systems"
            width={500}
            height={200}
            style={{ objectFit: 'cover', borderRadius: '5px' }}
          />
        </div>
        <div className={styles.aboutText}>
          {valuesData.map((item, index) => (
            <div key={index} className={styles.valueItem}>
              <span className={styles.icon}>{item.icon}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
