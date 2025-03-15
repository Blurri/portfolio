import { CollectionConfig } from 'payload'
import { defineCollection } from '@/lib/payload-helpers'

/**
 * Experience collection for managing work history and professional experience
 * This collection is part of the Content group because it stores
 * career information that showcases professional background
 */
export const Experience: CollectionConfig = defineCollection({
  slug: 'experience',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'title', 'startDate', 'endDate'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the company or organization',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title or position held',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        description: 'When this position started',
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'When this position ended (leave blank if current)',
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
      },
    },
    {
      name: 'current',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check if this is your current position',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Description of responsibilities and achievements',
      },
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
      admin: {
        description: 'Technologies used in this role',
      },
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        description: 'Projects completed during this role',
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
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Logo of the company or organization',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      admin: {
        description: 'Key achievements or responsibilities',
      },
      fields: [
        {
          name: 'highlight',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
})
