import { useEffect, useState } from 'react';

/**
 * Hook que devuelve el pathname actual.
 * Reactivo a navegaciones SPA (popstate) y a Astro View Transitions.
 */
export const usePathname = (): string => {
  const [path, setPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener('popstate', update);
    document.addEventListener('astro:page-load', update);
    return () => {
      window.removeEventListener('popstate', update);
      document.removeEventListener('astro:page-load', update);
    };
  }, []);

  return path;
};

export const isActivePath = (current: string, target: string): boolean => {
  if (target === '/') return current === '/';
  return current === target || current.startsWith(target + '/');
};
