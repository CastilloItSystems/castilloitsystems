'use client';
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Contact.module.css';

export const Contact = () => {
  // Minimal type for grecaptcha on window to avoid any
  type Grecaptcha = { execute: (siteKey: string, opts: { action: string }) => Promise<string> };
  type WindowWithRecaptcha = Window & { grecaptcha?: Grecaptcha };
  const gRecaptcha: Grecaptcha | undefined =
    typeof window !== 'undefined' && (window as WindowWithRecaptcha).grecaptcha
      ? (window as WindowWithRecaptcha).grecaptcha
      : undefined;
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      // Fallback simple
      return 'id-' + Math.random().toString(36).substr(2, 9) + Date.now();
    };
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    if (name.length < 2) {
      setStatus('idle');
      setError('Por favor ingresa un nombre válido.');
      return;
    }
    if (!/.+@.+\..+/.test(email)) {
      setStatus('idle');
      setError('Ingresa un correo válido.');
      return;
    }
    if (message.length < 10) {
      setStatus('idle');
      setError('El mensaje es muy corto.');
      return;
    }

    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    let recaptchaToken: string | undefined;
    try {
      if (recaptchaSiteKey && gRecaptcha) {
        recaptchaToken = await gRecaptcha.execute(recaptchaSiteKey, { action: 'submit' });
      }
    } catch {
      // ignore recaptcha errors; server will enforce if enabled
    }
    const data = { id: generateId(), name, email, message, recaptchaToken };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const { error: errMsg } = await res.json().catch(() => ({ error: null }));
        setError(errMsg || 'No se pudo enviar el mensaje.');
        setStatus('error');
      }
    } catch {
      setError('Error de red. Intenta nuevamente.');
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
          {status === 'error' && <p className={styles.errorMsg}>{error}</p>}
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
