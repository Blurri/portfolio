import { CollectionConfig } from 'payload'
import {
  defineCollection,
  createUploadField,
  createRelationshipField,
} from '../../lib/payload-helpers'

export const Blog: CollectionConfig = defineCollection({
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate', 'author'],
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
        description: 'URL-friendly identifier (e.g., "my-first-blog-post")',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    createRelationshipField({
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Who wrote this article',
      },
    }),
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMM d, yyyy',
        },
        description: 'When this article was or will be published',
      },
    },
    createRelationshipField({
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Categories this article belongs to',
      },
    }),
    createUploadField({
      name: 'featuredImage',
      type: 'upload',
      admin: {
        description: 'Main image for the article',
      },
    }),
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief summary of the article (appears in previews)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'The main content of the article',
      },
    },
    createRelationshipField({
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'blog',
      hasMany: true,
      admin: {
        description: 'Related articles to suggest to readers',
      },
    }),
    createRelationshipField({
      name: 'technologies',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
      admin: {
        description: 'Technologies discussed in this article',
      },
    }),
    createRelationshipField({
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        description: 'Projects related to this article',
      },
    }),
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this article on the homepage',
      },
    },
    {
      name: 'metadata',
      type: 'group',
      admin: {
        description: 'SEO metadata for this article',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'Title for SEO (if different from main title)',
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
