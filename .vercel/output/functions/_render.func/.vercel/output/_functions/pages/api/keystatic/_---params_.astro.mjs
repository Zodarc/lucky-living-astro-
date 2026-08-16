import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config as config$1, collection, fields } from '@keystatic/core';
export { renderers } from '../../../renderers.mjs';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const config = config$1({
  storage: {
    kind: "local"
  },
  collections: {
    articles: collection({
      label: "Articles",
      slugField: "title",
      path: "src/content/articles/*",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true }
          }
        }),
        description: fields.text({
          label: "Description",
          multiline: true
        }),
        featuredImage: fields.text({
          label: "Featured Image"
        }),
        featuredImageAlt: fields.text({
          label: "Featured Image Alt Text"
        }),
        category: fields.text({
          label: "Category"
        }),
        tags: fields.array(
          fields.text({ label: "Tag" }),
          {
            label: "Tags",
            itemLabel: (props) => props.value
          }
        ),
        author: fields.text({
          label: "Author"
        }),
        publishDate: fields.date({
          label: "Publish Date"
        }),
        updatedDate: fields.date({
          label: "Updated Date"
        }),
        seoTitle: fields.text({
          label: "SEO Title"
        }),
        seoDescription: fields.text({
          label: "SEO Description",
          multiline: true
        }),
        keywords: fields.array(
          fields.text({ label: "Keyword" }),
          {
            label: "Keywords",
            itemLabel: (props) => props.value
          }
        ),
        featured: fields.checkbox({
          label: "Featured"
        }),
        draft: fields.checkbox({
          label: "Draft"
        }),
        affiliateLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            url: fields.url({ label: "URL" })
          }),
          {
            label: "Affiliate Links",
            itemLabel: (props) => props.fields.label.value
          }
        ),
        content: fields.markdoc({
          label: "Content"
        })
      }
    }),
    products: collection({
      label: "Products",
      slugField: "name",
      path: "src/content/products/*",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            validation: { isRequired: true }
          }
        }),
        description: fields.text({
          label: "Description",
          multiline: true
        }),
        image: fields.text({
          label: "Main Image"
        }),
        imageAlt: fields.text({
          label: "Image Alt Text"
        }),
        gallery: fields.array(
          fields.text({
            label: "Image"
          }),
          {
            label: "Gallery",
            itemLabel: (props) => props.value
          }
        ),
        category: fields.text({
          label: "Category"
        }),
        affiliateUrl: fields.url({
          label: "Affiliate URL"
        }),
        affiliateLabel: fields.text({
          label: "Affiliate Button Label"
        }),
        priceDisplay: fields.text({
          label: "Price"
        }),
        priceLastVerified: fields.date({
          label: "Price Last Verified"
        }),
        rating: fields.number({
          label: "Rating",
          validation: {
            min: 0,
            max: 5
          }
        }),
        pros: fields.array(
          fields.text({
            label: "Pro"
          }),
          {
            label: "Pros",
            itemLabel: (props) => props.value
          }
        ),
        cons: fields.array(
          fields.text({
            label: "Con"
          }),
          {
            label: "Cons",
            itemLabel: (props) => props.value
          }
        ),
        seoTitle: fields.text({
          label: "SEO Title"
        }),
        seoDescription: fields.text({
          label: "SEO Description",
          multiline: true
        }),
        keywords: fields.array(
          fields.text({
            label: "Keyword"
          }),
          {
            label: "Keywords",
            itemLabel: (props) => props.value
          }
        ),
        author: fields.text({
          label: "Author"
        }),
        publishDate: fields.date({
          label: "Publish Date"
        }),
        updatedDate: fields.date({
          label: "Updated Date"
        }),
        featured: fields.checkbox({
          label: "Featured"
        }),
        draft: fields.checkbox({
          label: "Draft"
        }),
        content: fields.markdoc({
          label: "Review Content"
        })
      }
    }),
    comparisons: collection({
      label: "Comparisons",
      slugField: "title",
      path: "src/content/comparisons/*",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true }
          }
        }),
        description: fields.text({
          label: "Description",
          multiline: true
        }),
        productA: fields.text({
          label: "Product A"
        }),
        productB: fields.text({
          label: "Product B"
        }),
        publishDate: fields.date({
          label: "Publish Date"
        }),
        updatedDate: fields.date({
          label: "Updated Date"
        }),
        seoTitle: fields.text({
          label: "SEO Title"
        }),
        seoDescription: fields.text({
          label: "SEO Description",
          multiline: true
        }),
        keywords: fields.array(
          fields.text({
            label: "Keyword"
          }),
          {
            label: "Keywords",
            itemLabel: (props) => props.value
          }
        ),
        featured: fields.checkbox({
          label: "Featured"
        }),
        draft: fields.checkbox({
          label: "Draft"
        }),
        content: fields.markdoc({
          label: "Comparison Content"
        })
      }
    })
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
