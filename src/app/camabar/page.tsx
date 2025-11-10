'use client';
import { useEffect } from 'react';

export default function AlmivycaPage() {
  useEffect(() => {
    // Redirigir directamente al archivo HTML estático
    window.location.replace('/presupuestos/presentacion.html');
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
