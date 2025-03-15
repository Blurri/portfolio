import { CollectionConfig } from 'payload'
import {
  defineCollection,
  createUploadField,
  createRelationshipField,
} from '@/lib/payload-helpers'

/**
 * Projects collection for showcasing portfolio work
 * This collection is part of the Content group because it represents
 * the main portfolio items that demonstrate skills and experience
 */
export const Projects: CollectionConfig = defineCollection({
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'projectType', 'status', 'featured'],
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
        description: 'URL-friendly identifier (e.g., "my-awesome-project")',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'projectType',
      type: 'select',
      required: true,
      options: [
        { label: 'Web Application', value: 'web-app' },
        { label: 'Mobile Application', value: 'mobile-app' },
        { label: 'Desktop Application', value: 'desktop-app' },
        { label: 'API / Backend', value: 'api' },
        { label: 'Library / Package', value: 'library' },
        { label: 'Game', value: 'game' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief summary of the project (1-2 sentences)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full description of the project',
      },
    },
    createUploadField({
      name: 'featuredImage',
      type: 'upload',
      admin: {
        description: 'Main image for the project',
      },
    }),
    {
      name: 'gallery',
      type: 'array',
      admin: {
        description: 'Additional images for the project',
      },
      fields: [
        createUploadField({
          name: 'image',
          type: 'upload',
          required: true,
        }),
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    createRelationshipField({
      name: 'technologies',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
      admin: {
        description: 'Technologies used in this project',
      },
    }),
    {
      name: 'links',
      type: 'array',
      admin: {
        description: 'Links to the project (live site, repository, etc.)',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Live Site', value: 'live' },
            { label: 'GitHub Repository', value: 'github' },
            { label: 'Documentation', value: 'docs' },
            { label: 'Demo', value: 'demo' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this project on the homepage',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        description: 'When the project was started',
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'completedDate',
      type: 'date',
      admin: {
        description: 'When the project was completed',
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'codeSnippets',
      type: 'array',
      admin: {
        description: 'Code snippets to showcase',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'language',
          type: 'select',
          required: true,
          options: [
            { label: 'JavaScript', value: 'javascript' },
            { label: 'TypeScript', value: 'typescript' },
            { label: 'HTML', value: 'html' },
            { label: 'CSS', value: 'css' },
            { label: 'Python', value: 'python' },
            { label: 'Java', value: 'java' },
            { label: 'C#', value: 'csharp' },
            { label: 'PHP', value: 'php' },
            { label: 'Ruby', value: 'ruby' },
            { label: 'Go', value: 'go' },
            { label: 'Swift', value: 'swift' },
            { label: 'Kotlin', value: 'kotlin' },
            { label: 'Rust', value: 'rust' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'code',
          type: 'code',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
})
