import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    reviewer: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    popular: z.boolean().default(false),
    readingTime: z.number(),
    image: z.string(),
    imageAlt: z.string(),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
    references: z.array(
      z.object({
        title: z.string(),
        url: z.string(),
      })
    ),
    relatedArticles: z.array(z.string()).optional(),
  }),
});

export const collections = { articles };
