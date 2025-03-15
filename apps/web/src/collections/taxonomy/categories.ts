import { CollectionConfig } from 'payload'
import { defineCollection } from '@/lib/payload-helpers'

/**
 * Categories collection for organizing technologies
 * This collection is part of the Taxonomy group because it provides
 * a classification system for technologies
 */
export const Categories: CollectionConfig = defineCollection({
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
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
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Used to determine the display order of categories',
      },
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
      admin: {
        description: 'Technologies that belong to this category',
      },
    },
  ],
})
