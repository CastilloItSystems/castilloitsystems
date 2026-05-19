import React from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  breadcrumbs?: BreadcrumbItem[];
  extra?: unknown | unknown[];
}

// No-op: el schema.org ahora se inyecta en src/layouts/Layout.astro (server-side, SEO-friendly)
// Las páginas .astro pasan el schema específico via prop `schema`.
const StructuredData: React.FC<StructuredDataProps> = () => null;

export default StructuredData;

export const softwareApplicationSchema = (_opts: {
  name: string;
  description: string;
  category?: string;
  os?: string;
}) => null;

export const serviceSchema = (_opts: {
  name: string;
  description: string;
  areaServed?: string;
}) => null;

export const faqPageSchema = (_faqs: { q: string; a: string }[]) => null;
