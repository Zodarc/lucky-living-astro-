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

/**
 * Get the correct MIME type for an image based on its file extension.
 */
const getImageMimeType = (imagePath) => {
  const extension = imagePath.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    case 'avif':
      return 'image/avif';
    default:
      return 'image/jpeg';
  }
};

export async function GET(context) {
  const [articles, products, comparisons] = await Promise.all([
    getCollection('articles', isPublished),
    getCollection('products', isPublished),
    getCollection('comparisons', isPublished),
  ]);

  const siteUrl = context.site ?? SITE.url;

  const items = [
    // Articles
    ...articles.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: `/articles/${entry.slug}/`,
      enclosure: {
        url: new URL(
          entry.data.featuredImage,
          siteUrl
        ).toString(),
        type: getImageMimeType(entry.data.featuredImage),
      },
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
      enclosure: {
        url: new URL(
          entry.data.image,
          siteUrl
        ).toString(),
        type: getImageMimeType(entry.data.image),
      },
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
    site: siteUrl,
    items: sorted,
    customData: `<language>${SITE.language}</language>`,
    stylesheet: false,
  });
}