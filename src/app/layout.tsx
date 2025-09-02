import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AOSInitializer } from '@/features/landing/AOSInitializer';
import N8nChatWidget from '@/components/N8nChatWidget';

// Configuración de la fuente
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Castillo IT Systems: Soluciones Tecnológicas Integrales',
  description:
    'Transformamos tus ideas en realidad con infraestructura robusta, seguridad de vanguardia y desarrollo de software a la medida.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <AOSInitializer />
        {children}
        <N8nChatWidget />
      </body>
    </html>
  );
}
