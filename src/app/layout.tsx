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
  metadataBase: new URL('https://www.castilloitsystems.com'),
  applicationName: 'Castillo IT Systems',
  authors: [{ name: 'Castillo IT Systems' }],
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://www.castilloitsystems.com',
    siteName: 'Castillo IT Systems',
    title: 'Castillo IT Systems: Soluciones Tecnológicas Integrales',
    description:
      'Infraestructura, seguridad, desarrollo de software y automatización para impulsar tu negocio.',
    images: [
      {
        url: '/assets/images/logoBlanco.png',
        width: 800,
        height: 418,
        alt: 'Castillo IT Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Castillo IT Systems: Soluciones Tecnológicas Integrales',
    description:
      'Infraestructura, seguridad, desarrollo de software y automatización para impulsar tu negocio.',
    images: ['/assets/images/logoBlanco.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.castilloitsystems.com';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Castillo IT Systems',
    url: siteUrl,
    image: `${siteUrl}/assets/images/logoBlanco.png`,
    telephone: '+58 412-770-5451',
    email: 'castilloitsystems@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lechería',
      addressRegion: 'Anzoátegui',
      addressCountry: 'VE',
    },
    areaServed: ['VE', 'LatAm'],
    sameAs: [
      'https://www.instagram.com/castillo_itsystems',
      'https://www.tiktok.com/@castillo.it.syst',
    ],
    description:
      'Soluciones tecnológicas integrales: infraestructura, seguridad, desarrollo de software y automatización.',
  } as const;
  return (
    <html lang="es">
      <head>
        {recaptchaSiteKey ? (
          <script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            async
            defer
          />
        ) : null}
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={poppins.className}>
        <AOSInitializer />
        {children}
        <N8nChatWidget />
      </body>
    </html>
  );
}
