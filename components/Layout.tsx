import React, { lazy, Suspense, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import CookieBanner from './CookieBanner';
import StickyMobileCTA from './StickyMobileCTA';
import Modal from './Modal';
import LeadForm from './LeadForm';
import useAnalytics from '../hooks/useAnalytics';

const AIChat = lazy(() => import('./AIChat'));
const ExitIntent = lazy(() => import('./ExitIntent'));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useAnalytics();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-ink text-text-1">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
        {children}
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AIChat />
        <ExitIntent />
      </Suspense>
      <WhatsAppButton />
      <StickyMobileCTA onOpenDemo={() => setDemoOpen(true)} />
      <CookieBanner />

      <Modal isOpen={demoOpen} onClose={() => setDemoOpen(false)} title="Solicitar demo · auditoría">
        <p className="text-text-3 mb-4 text-sm">
          Déjenos sus datos. Un ingeniero senior lo contactará en menos de 2 horas.
        </p>
        <LeadForm onSuccess={() => setTimeout(() => setDemoOpen(false), 1800)} />
      </Modal>
    </div>
  );
};

export default Layout;
