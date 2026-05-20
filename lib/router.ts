import { useEffect, useState } from 'react';

const normalizePathname = (path?: string | null): string => {
  if (!path) return '/';
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path;
};

/**
 * Hook que devuelve el pathname actual.
 * Reactivo a navegaciones SPA (popstate) y a Astro View Transitions.
 */
export const usePathname = (initialPath?: string): string => {
  const [path, setPath] = useState<string>(() =>
    normalizePathname(
      initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
    )
  );

  useEffect(() => {
    const update = () => setPath(normalizePathname(window.location.pathname));
    update();
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
