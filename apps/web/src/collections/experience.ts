import { CollectionConfig } from 'payload'
import {
  defineCollection,
  createUploadField,
  createRelationshipField,
} from '../../lib/payload-helpers'

export const Experience: CollectionConfig = defineCollection({
  slug: 'experience',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'title', 'startDate', 'current'],
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
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Your job title or role',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'City, state, country, or remote',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
        description: 'When you started this position',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
        description: 'When you ended this position (leave blank if current)',
        condition: (data: { current?: boolean }) => !data.current,
      },
    },
    {
      name: 'current',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'This is my current position',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Description of your responsibilities and achievements',
      },
    },
    createRelationshipField({
      name: 'technologies',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
      admin: {
        description: 'Technologies used in this role',
      },
    }),
    createRelationshipField({
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        description: 'Projects completed during this role',
      },
    }),
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
    createUploadField({
      name: 'companyLogo',
      type: 'upload',
      admin: {
        description: 'Company logo',
      },
    }),
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
})
