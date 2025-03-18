import { CollectionConfig } from 'payload'
import { defineCollection } from '@/lib/payload-helpers'

/**
 * PageContent collection for managing static content on pages
 * This collection is part of the Content group because it stores
 * content blocks that are displayed on various pages of the site
 */
export const PageContent: CollectionConfig = defineCollection({
  slug: 'page-content',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'section', 'updatedAt'],
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
      admin: {
        description: 'Name of this content block (for admin reference)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'Unique identifier for this content block (e.g., "home-hero")',
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
        description: 'Which section of the site this content belongs to',
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional image for this content block',
      },
    },
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
          admin: {
            description: 'Button text',
          },
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'URL or path the button links to',
          },
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
          ],
          defaultValue: 'primary',
          admin: {
            description: 'Visual style of the button',
          },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description:
          'Display order within the section (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      admin: {
        description: 'SEO metadata for this content',
        position: 'sidebar',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'Custom page title for SEO',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Custom page description for SEO',
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
  timestamps: true,
})
