// ── Spoky Curates — Site Configuration ───────────────────────
// Edit this file to update global site settings.
// No code changes needed elsewhere.

export const SITE = {
  name:        'Spoky Curates',
  tagline:     'Smarter Products. Better Life.',
  description: 'Discover smarter products, honest reviews, and lifestyle upgrades. Spoky Curates covers smart home, tech, wellness, style, and the best deals online.',
  // Kept in sync with astro.config.mjs's SITE_URL — override both together
  // via the SITE_URL env var for staging/preview deployments. This site is
  // fully static, so `process.env` is safe to read here at build time.
  url:         (process.env.SITE_URL ?? 'https://spokycurates.com') + '/',
  language:    'en',
  locale:      'en_US',

  // Branding
  logo: {
    src:    '/images/brand/logo.svg',
    alt:    'Spoky Curates',
    width:  180,
    height: 40,
  },
  ogImage: '/images/brand/og-default.png',

  // SEO defaults
  seo: {
    titleSeparator:       ' | ',
    defaultKeywords:      'smart home, product reviews, lifestyle, tech gadgets, home design, wellness, best deals',
    twitterHandle:        '@spokycurates',
    // Paste your Google Search Console verification token here.
    // Found at: Search Console → Settings → Ownership verification → HTML tag → content="..."
    googleSiteVerification: 'Wr1Dqol3j0bOExREbh55RpaI-5YZellpovERmVKFlDo',
  },

  // Navigation
  nav: [
    { label: 'Smart Home',    href: '/category/smart-home/' },
    { label: 'Tech Life',     href: '/category/tech-life/' },
    { label: 'Home & Design', href: '/category/home-design/' },
    { label: 'Wellness',      href: '/category/wellness/' },
    { label: 'Style',         href: '/category/style/' },
    { label: 'Reviews',       href: '/reviews/' },
    { label: 'Deals',         href: '/category/deals/' },
  ],

  // Footer secondary links
  footerLinks: [
    { label: 'About',                href: '/about/' },
    { label: 'Contact',              href: '/contact/' },
    { label: 'Affiliate Disclosure', href: '/affiliate-disclosure/' },
    { label: 'Privacy Policy',       href: '/privacy-policy/' },
  ],

  // Social media — leave empty string to hide
  social: {
    twitter:   '',
    instagram: '',
    facebook:  '',
    pinterest: '',
    youtube:   '',
    tiktok:    '',
  },

  // Affiliate
  affiliate: {
    amazonTag:       'luckyliving07-20',   // Your Amazon Associates tag e.g. 'spokycurates-20'
    disclosureShort: 'We may earn a commission from links on this page.',
    disclosureUrl:   '/affiliate-disclosure/',
  },

  // Newsletter
  newsletter: {
    enabled:     true,
    headline:    'Live Smarter Every Week',
    subheading:  'Join thousands of readers who get our best product picks and tips delivered straight to their inbox.',
    placeholder: 'Enter your email address',
    buttonText:  'Subscribe Free',
    // Mailchimp embedded form action URL.
    // How to get it:
    //   1. In Mailchimp, go to Audience → Signup forms → Embedded forms.
    //   2. Copy the <form action="..."> URL from the generated HTML.
    //   It looks like: https://yoursite.us1.list-manage.com/subscribe/post?u=XXXX&id=YYYY
    formAction:  'https://spokycurates.us19.list-manage.com/subscribe/post?u=a14f07ac530e0319847b5acac&amp;id=d7596b3816&amp;f_id=00e3c2e1f0',
  },

  // Copyright
  copyright: `© ${new Date().getFullYear()} Spoky Curates. All rights reserved.`,
} as const;

export type NavItem = (typeof SITE.nav)[number];