import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/data/site';
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async (context) => {
  const articles = await getCollection('articles');
  const sorted = articles.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: `<language>en-us</language><copyright>Copyright ${new Date().getFullYear()} ${siteConfig.name}</copyright>`,
    items: sorted.map((article) => ({
      title: article.data.title,
      pubDate: article.data.publishedAt,
      description: article.data.description,
      link: `/articles/${article.slug}/`,
      author: article.data.author.replace(/-/g, ' '),
    })),
  });
};
