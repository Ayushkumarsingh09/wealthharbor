export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  noindex?: boolean;
}

export function buildTitle(pageTitle: string, siteName = 'WealthHarbor'): string {
  return pageTitle === siteName ? `${siteName} | Navigate Your Financial Future` : `${pageTitle} | ${siteName}`;
}

export function absoluteUrl(path: string, siteUrl = 'https://wealthharbor.com'): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '…';
}
