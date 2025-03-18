import { CollectionConfig } from 'payload'
import { defineCollection } from '@/lib/payload-helpers'

/**
 * Technologies collection for tracking skills and expertise
 * This collection is part of the Taxonomy group because it represents
 * a classification of technical skills with experience levels
 */
export const Technologies: CollectionConfig = defineCollection({
  slug: 'technologies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'years', 'category', 'order'],
    group: 'Taxonomy', // Changed from no group or 'Collections'
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'years',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Years of experience with this technology',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        description: 'The category this technology belongs to',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Used to determine the display order within a category',
      },
    },
  ],
})
