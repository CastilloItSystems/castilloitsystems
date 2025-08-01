import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      <video autoPlay muted loop className={styles.heroVideo}>
        <source src="/assets/video/background-video.mp4" type="video/mp4" />
      </video>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent} data-aos="fade-in">
        <Image
          src="/assets/images/logoBlanco.png"
          alt="Logo Castillo IT Systems"
          width={400}
          height={55}
          className={styles.heroLogo}
        />
        <h1 className={styles.heroTitle}>Tu Socio en Soluciones Tecnológicas Integrales</h1>
        <p className={styles.heroSubtitle}>
          Transformamos tus ideas en realidad con infraestructura robusta, seguridad de vanguardia y
          desarrollo de software a la medida.
        </p>
        <Link href="#servicios" className={styles.ctaButton}>
          Descubre Nuestros Servicios
        </Link>
      </div>
    </section>
  );
};
