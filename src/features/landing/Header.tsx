import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.mainHeader}>
      <nav className={styles.mainNav}>
        <Link href="#hero">
          <Image
            src="/assets/images/logoBlancoHorizontal.png"
            alt="Logo Castillo IT Systems"
            width={150}
            height={40}
            className={styles.navLogo}
          />
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link href="#servicios">Servicios</Link>
          </li>
          <li>
            <Link href="#portfolio">Casos de Éxito</Link>
          </li>
          <li>
            <Link href="#about">Nosotros</Link>
          </li>
          <li>
            <Link href="#contact">Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
