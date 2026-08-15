/**
 * imageResolver.ts
 *
 * Resolves a plain frontmatter image path string (e.g. "/images/articles/foo.png")
 * to an Astro-imported image object that <Image> can optimise at build time.
 *
 * HOW IT WORKS
 * ─────────────
 * import.meta.glob with { eager: true } runs at build time and produces a flat
 * map of every image under src/assets/images/**. We key that map by the public-
 * style path that authors write in frontmatter ("/images/articles/foo.png") so
 * the resolver just does a plain object lookup — no dynamic imports, no runtime
 * cost.
 *
 * HOW TO USE
 * ──────────
 * import { resolveImage } from '@utils/imageResolver';
 * import { Image } from 'astro:assets';
 *
 * const img = resolveImage(entry.data.featuredImage);
 * // img is an ImageMetadata object (or undefined if path isn't in src/assets)
 * if (img) {
 *   <Image src={img} alt="…" widths={[400, 800, 1200]} sizes="…" />
 * } else {
 *   <img src={entry.data.featuredImage} alt="…" /> // fallback for public/ paths
 * }
 *
 * FRONTMATTER CONVENTION
 * ──────────────────────
 * Authors keep writing normal root-relative paths:
 *   featuredImage: "/images/articles/my-photo.jpg"
 *   image:         "/images/products/echo.jpg"
 *
 * The resolver strips the leading "/" and maps:
 *   "images/articles/my-photo.jpg"  →  src/assets/images/articles/my-photo.jpg
 *   "images/products/echo.jpg"      →  src/assets/images/products/echo.jpg
 *
 * ADDING NEW IMAGES
 * ─────────────────
 * Drop the file into src/assets/images/{articles|products|hero|categories}/
 * and reference it in frontmatter with the matching /images/… path.
 */

import type { ImageMetadata } from 'astro';

// Eagerly import every image under src/assets/images/**
// Vite resolves these at build time; the result is a flat record keyed by the
// absolute module path (e.g. "/src/assets/images/articles/foo.png").
const allImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,gif,webp,avif,svg}',
  { eager: true },
);

/**
 * Resolve a frontmatter image path string to an Astro ImageMetadata object.
 *
 * @param path - Root-relative path as written in frontmatter, e.g. "/images/articles/foo.png"
 *               Also accepts the bare src/ module key, e.g. "/src/assets/images/articles/foo.png"
 * @returns ImageMetadata if found in src/assets/, undefined otherwise (use a plain <img> fallback)
 */
export function resolveImage(path: string | undefined | null): ImageMetadata | undefined {
  if (!path) return undefined;

  // Already a /src/assets/… key — direct lookup
  if (path.startsWith('/src/assets/')) {
    return allImages[path]?.default;
  }

  // Public-style path: "/images/articles/foo.png"
  // → module key:       "/src/assets/images/articles/foo.png"
  const moduleKey = `/src/assets${path.startsWith('/') ? path : '/' + path}`;
  return allImages[moduleKey]?.default;
}
