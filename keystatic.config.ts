import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
     

      schema: {
        title: fields.slug({
  name: {
    label: 'Title',
    validation: { isRequired: true },
  },
}),

        description: fields.text({
          label: 'Description',
          multiline: true,
        }),

        featuredImage: fields.text({
          label: 'Featured Image',
        }),

        featuredImageAlt: fields.text({
          label: 'Featured Image Alt Text',
        }),

        category: fields.text({
          label: 'Category',
        }),

        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value,
          }
        ),

        author: fields.text({
          label: 'Author',
        }),

        publishDate: fields.date({
          label: 'Publish Date',
        }),

        updatedDate: fields.date({
          label: 'Updated Date',
        }),

        seoTitle: fields.text({
          label: 'SEO Title',
        }),

        seoDescription: fields.text({
          label: 'SEO Description',
          multiline: true,
        }),

        keywords: fields.array(
          fields.text({ label: 'Keyword' }),
          {
            label: 'Keywords',
            itemLabel: (props) => props.value,
          }
        ),

        featured: fields.checkbox({
          label: 'Featured',
        }),

        draft: fields.checkbox({
          label: 'Draft',
        }),

        affiliateLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.url({ label: 'URL' }),
          }),
          {
            label: 'Affiliate Links',
            itemLabel: (props) => props.fields.label.value,
          }
        ),

        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),

    products: collection({
      label: 'Products',
      slugField: 'name',
      path: 'src/content/products/*',
      

      schema: {
        name: fields.slug({
  name: {
    label: 'Name',
    validation: { isRequired: true },
  },
}),

        description: fields.text({
          label: 'Description',
          multiline: true,
        }),

        image: fields.text({
          label: 'Main Image',
        }),

        imageAlt: fields.text({
          label: 'Image Alt Text',
        }),

        gallery: fields.array(
          fields.text({
            label: 'Image',
          }),
          {
            label: 'Gallery',
            itemLabel: (props) => props.value,
          }
        ),

        category: fields.text({
          label: 'Category',
        }),

        affiliateUrl: fields.url({
          label: 'Affiliate URL',
        }),

        affiliateLabel: fields.text({
          label: 'Affiliate Button Label',
        }),

        priceDisplay: fields.text({
          label: 'Price',
        }),

        priceLastVerified: fields.date({
          label: 'Price Last Verified',
        }),

        rating: fields.number({
          label: 'Rating',
          validation: {
            min: 0,
            max: 5,
          },
        }),

        pros: fields.array(
          fields.text({
            label: 'Pro',
          }),
          {
            label: 'Pros',
            itemLabel: (props) => props.value,
          }
        ),

        cons: fields.array(
          fields.text({
            label: 'Con',
          }),
          {
            label: 'Cons',
            itemLabel: (props) => props.value,
          }
        ),

        seoTitle: fields.text({
          label: 'SEO Title',
        }),

        seoDescription: fields.text({
          label: 'SEO Description',
          multiline: true,
        }),

        keywords: fields.array(
          fields.text({
            label: 'Keyword',
          }),
          {
            label: 'Keywords',
            itemLabel: (props) => props.value,
          }
        ),

        author: fields.text({
          label: 'Author',
        }),

        publishDate: fields.date({
          label: 'Publish Date',
        }),

        updatedDate: fields.date({
          label: 'Updated Date',
        }),

        featured: fields.checkbox({
          label: 'Featured',
        }),

        draft: fields.checkbox({
          label: 'Draft',
        }),

        content: fields.markdoc({
          label: 'Review Content',
        }),
      },
    }),

    comparisons: collection({
      label: 'Comparisons',
      slugField: 'title',
      path: 'src/content/comparisons/*',
      

      schema: {
        title: fields.slug({
  name: {
    label: 'Title',
    validation: { isRequired: true },
  },
}),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),

        productA: fields.text({
          label: 'Product A',
        }),

        productB: fields.text({
          label: 'Product B',
        }),

        publishDate: fields.date({
          label: 'Publish Date',
        }),

        updatedDate: fields.date({
          label: 'Updated Date',
        }),

        seoTitle: fields.text({
          label: 'SEO Title',
        }),

        seoDescription: fields.text({
          label: 'SEO Description',
          multiline: true,
        }),

        keywords: fields.array(
          fields.text({
            label: 'Keyword',
          }),
          {
            label: 'Keywords',
            itemLabel: (props) => props.value,
          }
        ),

        featured: fields.checkbox({
          label: 'Featured',
        }),

        draft: fields.checkbox({
          label: 'Draft',
        }),

        content: fields.markdoc({
          label: 'Comparison Content',
        }),
      },
    }),
  },
});