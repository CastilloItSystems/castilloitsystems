import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Contact.module.css';

export const Contact = () => {
  return (
    <section id="contact" className={styles.contactSection}>
      <h2 className={styles.sectionTitle} data-aos="fade-up">
        Hablemos de tu Proyecto
      </h2>
      <div className={styles.contactContainer}>
        <form className={styles.contactForm} data-aos="fade-right">
          <input type="text" name="name" placeholder="Tu Nombre" required />
          <input type="email" name="email" placeholder="Tu Correo Electrónico" required />
          <textarea
            name="message"
            rows={5}
            placeholder="Cuéntanos sobre tu idea"
            required
          ></textarea>
          <button type="submit" className={styles.ctaButton}>
            Enviar Mensaje
          </button>
        </form>
        <div className={styles.contactInfo} data-aos="fade-left">
          <p>
            <FaPhone /> +1 (234) 567-890
          </p>
          <p>
            <FaEnvelope /> contacto@castilloitsystems.com
          </p>
          <p>
            <FaMapMarkerAlt /> Lechería, Anzoátegui, Venezuela
          </p>
        </div>
      </div>
    </section>
  );
};
