import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from '@/utils/seo';

export const ARTICLES_PER_PAGE = 12;

export async function getAllArticlesSorted(): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getCollection('articles');
  return articles.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export function getArticlesByCategory(
  articles: CollectionEntry<'articles'>[],
  categorySlug: string
): CollectionEntry<'articles'>[] {
  return articles.filter((a) => a.data.category === categorySlug);
}

export function getArticlesByTag(
  articles: CollectionEntry<'articles'>[],
  tagSlug: string
): CollectionEntry<'articles'>[] {
  return articles.filter((a) => a.data.tags.some((t) => slugify(t) === tagSlug));
}

export function getAllTagSlugs(articles: CollectionEntry<'articles'>[]): string[] {
  const tags = new Set<string>();
  for (const article of articles) {
    for (const tag of article.data.tags) {
      tags.add(slugify(tag));
    }
  }
  return [...tags].sort();
}

export function getTagLabel(articles: CollectionEntry<'articles'>[], tagSlug: string): string {
  for (const article of articles) {
    for (const tag of article.data.tags) {
      if (slugify(tag) === tagSlug) return tag;
    }
  }
  return tagSlug.replace(/-/g, ' ');
}

export function paginate<T>(items: T[], page: number, perPage = ARTICLES_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    currentPage,
    totalPages,
    totalItems: items.length,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}

export interface ArticleSearchEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
}

export function toSearchEntries(articles: CollectionEntry<'articles'>[]): ArticleSearchEntry[] {
  return articles.map((a) => ({
    slug: a.slug,
    title: a.data.title,
    description: a.data.description,
    category: a.data.category,
    tags: a.data.tags,
    publishedAt: a.data.publishedAt.toISOString(),
    readingTime: a.data.readingTime,
  }));
}
