import { CollectionConfig } from 'payload'
import { defineCollection, createUploadField } from '../../lib/payload-helpers'

export const PageContent: CollectionConfig = defineCollection({
  slug: 'page-content',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'order'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'Unique identifier for this content block (e.g., "home-hero", "about-intro")',
      },
    },
    {
      name: 'section',
      type: 'select',
      required: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Features', value: 'features' },
        { label: 'Contact', value: 'contact' },
        { label: 'Global', value: 'global' },
      ],
      admin: {
        description: 'Which page or section this content belongs to',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main content for this section',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Optional subtitle or tagline',
      },
    },
    createUploadField({
      name: 'image',
      type: 'upload',
      admin: {
        description: 'Optional image for this section',
      },
    }),
    {
      name: 'callToAction',
      type: 'group',
      admin: {
        description: 'Optional call-to-action button',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          admin: {
            description: 'Button text',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'URL or path the button links to',
          },
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
          ],
          admin: {
            description: 'Button style',
          },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      admin: {
        description: "SEO metadata for this section (if it's a full page)",
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'Page title for SEO (if different from main title)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Description for SEO',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Comma-separated keywords for SEO',
          },
        },
      ],
    },
  ],
})
