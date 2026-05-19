import { useEffect } from 'react';
import { usePathname } from '../lib/router';

const PLAUSIBLE_DOMAIN = process.env.PLAUSIBLE_DOMAIN;
const GA_ID = process.env.GA_MEASUREMENT_ID;
const CONSENT_KEY = 'cit-cookie-consent';

const loadPlausible = () => {
  if (!PLAUSIBLE_DOMAIN || document.getElementById('cit-plausible')) return;
  const s = document.createElement('script');
  s.id = 'cit-plausible';
  s.src = 'https://plausible.io/js/script.js';
  s.defer = true;
  s.setAttribute('data-domain', PLAUSIBLE_DOMAIN);
  document.head.appendChild(s);

  const fallback = document.createElement('script');
  fallback.id = 'cit-plausible-fallback';
  fallback.textContent =
    'window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}';
  document.head.appendChild(fallback);
};

const loadGA = () => {
  if (!GA_ID || document.getElementById('cit-ga')) return;
  const s = document.createElement('script');
  s.id = 'cit-ga';
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);
  const inline = document.createElement('script');
  inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;
  document.head.appendChild(inline);
  (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag =
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag ||
    function (...a: unknown[]) {
      (window.dataLayer ||= []).push(a);
    };
};

const useAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Plausible: privacy-friendly, no consent needed
    const tick = () => loadPlausible();
    if ('requestIdleCallback' in window) (window as any).requestIdleCallback(tick);
    else setTimeout(tick, 1500);

    // GA only if consent given
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === 'accepted') loadGA();
    } catch {
      // ignore
    }
  }, []);

  // Pageview tracking on SPA navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = pathname;
    window.plausible?.('pageview');
    window.gtag?.('event', 'page_view', { page_path: path });
  }, [pathname]);
};

export default useAnalytics;

export const grantAnalyticsConsent = () => {
  try {
    localStorage.setItem(CONSENT_KEY, 'accepted');
  } catch {
    // ignore
  }
  loadGA();
};

export const denyAnalyticsConsent = () => {
  try {
    localStorage.setItem(CONSENT_KEY, 'denied');
  } catch {
    // ignore
  }
};

export const getAnalyticsConsent = (): 'accepted' | 'denied' | null => {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === 'accepted' || v === 'denied') return v;
  } catch {
    // ignore
  }
  return null;
};
