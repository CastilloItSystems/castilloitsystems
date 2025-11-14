'use client';
import { useEffect } from 'react';

export default function IncamarPage() {
  useEffect(() => {
    // Redirigir directamente al archivo HTML estático
    window.location.replace('/presupuestos/incamar.html');
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666',
      }}
    >
      Cargando...
    </div>
  );
}
