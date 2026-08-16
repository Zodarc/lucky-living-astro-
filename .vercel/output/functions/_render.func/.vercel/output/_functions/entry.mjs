import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_Dp9zD_Ej.mjs';
import { manifest } from './manifest_CaLZkgsD.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/keystatic/_---params_.astro.mjs');
const _page2 = () => import('./pages/keystatic/_---params_.astro.mjs');
const _page3 = () => import('./pages/404.astro.mjs');
const _page4 = () => import('./pages/about.astro.mjs');
const _page5 = () => import('./pages/affiliate-disclosure.astro.mjs');
const _page6 = () => import('./pages/articles/_slug_.astro.mjs');
const _page7 = () => import('./pages/articles/_---page_.astro.mjs');
const _page8 = () => import('./pages/category/_slug_.astro.mjs');
const _page9 = () => import('./pages/category/_slug_/_---page_.astro.mjs');
const _page10 = () => import('./pages/compare/_slug_.astro.mjs');
const _page11 = () => import('./pages/compare.astro.mjs');
const _page12 = () => import('./pages/contact.astro.mjs');
const _page13 = () => import('./pages/contact-success.astro.mjs');
const _page14 = () => import('./pages/privacy-policy.astro.mjs');
const _page15 = () => import('./pages/reviews/_slug_.astro.mjs');
const _page16 = () => import('./pages/reviews.astro.mjs');
const _page17 = () => import('./pages/rss.xml.astro.mjs');
const _page18 = () => import('./pages/search.astro.mjs');
const _page19 = () => import('./pages/search.json.astro.mjs');
const _page20 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/@keystatic/astro/internal/keystatic-api.js", _page1],
    ["node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page2],
    ["src/pages/404.astro", _page3],
    ["src/pages/about.astro", _page4],
    ["src/pages/affiliate-disclosure.astro", _page5],
    ["src/pages/articles/[slug].astro", _page6],
    ["src/pages/articles/[...page].astro", _page7],
    ["src/pages/category/[slug].astro", _page8],
    ["src/pages/category/[slug]/[...page].astro", _page9],
    ["src/pages/compare/[slug].astro", _page10],
    ["src/pages/compare/index.astro", _page11],
    ["src/pages/contact.astro", _page12],
    ["src/pages/contact-success.astro", _page13],
    ["src/pages/privacy-policy.astro", _page14],
    ["src/pages/reviews/[slug].astro", _page15],
    ["src/pages/reviews/index.astro", _page16],
    ["src/pages/rss.xml.js", _page17],
    ["src/pages/search.astro", _page18],
    ["src/pages/search.json.ts", _page19],
    ["src/pages/index.astro", _page20]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "1e06751e-b29f-40e4-b1fb-321dd55d8150",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
