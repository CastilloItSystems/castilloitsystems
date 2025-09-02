import Image from 'next/image';
import styles from './Footer.module.css';
import { FaFacebookF, FaLinkedinIn, FaTiktok, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <Image
            src="/assets/images/logoBlancoHorizontal.png"
            alt="Logo Castillo IT Systems"
            width={180}
            height={40}
          />
          {/* <span className={styles.companyName}>Castillo IT Systems</span> */}
        </div>
        <div className={styles.linksSection}>
          <a href="#servicios">Servicios</a>
          <a href="#portfolio">Portafolio</a>
          <a href="#contacto">Contacto</a>
        </div>
        {/* <div className={styles.contactSection}>
          <span>Email: contacto@castilloitsystems.com</span>
          <span>Tel: +52 55 1234 5678</span>
        </div> */}
        <div className={styles.socialSection}>
          <a
            href="https://wa.me/584127705451?text=Hola%20quiero%20información%20sobre%20soluciones%20tecnológicas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Ventas"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="https://www.instagram.com/castillo_itsystems?igsh=MXI1YXFwN2Myc2o5ag=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@castillo.it.syst?_t=ZM-8yb7brzJL1R&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <FaTiktok size={24} />
          </a>
        </div>
      </div>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Castillo IT Systems. Todos los derechos reservados.
      </div>
    </footer>
  );
};
