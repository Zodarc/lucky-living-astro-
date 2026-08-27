/**
 * RSS feed for all published Spoky Curates content.
 *
 * Includes:
 * - Articles
 * - Product reviews
 * - Product comparisons
 */

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isPublished } from '@utils/publishing';
import { SITE } from '../data/site.ts';

export async function GET(context) {
  const [articles, products, comparisons] = await Promise.all([
    getCollection('articles', isPublished),
    getCollection('products', isPublished),
    getCollection('comparisons', isPublished),
  ]);

  const items = [
    // Articles
    ...articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: `/articles/${entry.slug}/`,
      categories: [
        'article',
        entry.data.category,
        ...(entry.data.tags ?? []),
      ],
      author: entry.data.author ?? SITE.name,
    })),

    // Product reviews
    ...products.map((entry) => ({
      title: entry.data.name,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: `/reviews/${entry.slug}/`,
      categories: [
        'product-review',
        entry.data.category,
      ],
      author: entry.data.author ?? SITE.name,
    })),

    // Product comparisons
    ...comparisons.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: `/compare/${entry.slug}/`,
      categories: [
        'comparison',
      ],
    })),
  ];

  const sorted = items.sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: sorted,
    customData: `<language>${SITE.language}</language>`,
    stylesheet: false,
  });
}