import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
}

// No-op: el SEO ahora se maneja en src/layouts/Layout.astro
// Este stub permite que las páginas .tsx (renderizadas como islands) sigan compilando.
const SEO: React.FC<SEOProps> = () => null;

export default SEO;
