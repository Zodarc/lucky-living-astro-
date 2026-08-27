import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isPublished } from '@utils/publishing';
import { SITE } from '../data/site.ts';

export async function GET(context) {
  const [articles, reviews, comparisons] = await Promise.all([
    getCollection('articles', isPublished),
    getCollection('products', isPublished),
    getCollection('comparisons', isPublished),
  ]);

  const items = [
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

    ...reviews.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: `/reviews/${entry.slug}/`,
      categories: [
        'product-review',
        entry.data.category,
        ...(entry.data.tags ?? []),
      ],
      author: entry.data.author ?? SITE.name,
    })),

    ...comparisons.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: `/compare/${entry.slug}/`,
      categories: [
        'comparison',
        entry.data.category,
        ...(entry.data.tags ?? []),
      ],
      author: entry.data.author ?? SITE.name,
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