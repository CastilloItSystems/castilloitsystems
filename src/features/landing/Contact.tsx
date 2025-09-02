'use client';
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Contact.module.css';

export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      // Fallback simple
      return 'id-' + Math.random().toString(36).substr(2, 9) + Date.now();
    };
    const data = {
      id: generateId(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };
    try {
      const res = await fetch(
        'https://mentorn8n-e0f02b9eb5c1.herokuapp.com/webhook/solicitud-cita',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <h2 className={styles.sectionTitle} data-aos="fade-up">
        Hablemos de tu Proyecto
      </h2>
      <div className={styles.contactContainer}>
        <form className={styles.contactForm} data-aos="fade-right" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Tu Nombre" required />
          <input type="email" name="email" placeholder="Tu Correo Electrónico" required />
          <textarea
            name="message"
            rows={5}
            placeholder="Cuéntanos sobre tu idea"
            required
          ></textarea>
          <button type="submit" className={styles.ctaButton} disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
          {status === 'success' && (
            <p className={styles.successMsg}>¡Mensaje enviado correctamente!</p>
          )}
          {status === 'error' && (
            <p className={styles.errorMsg}>Hubo un error al enviar. Intenta de nuevo.</p>
          )}
        </form>
        <div className={styles.contactInfo} data-aos="fade-left">
          <p>
            <FaPhone /> +58 (412) 770-5451
          </p>
          <p>
            <FaEnvelope /> castilloitsystems@gmail.com
          </p>
          <p>
            <FaMapMarkerAlt /> Lechería, Anzoátegui, Venezuela
          </p>
        </div>
      </div>
    </section>
  );
};
