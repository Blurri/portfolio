import { CollectionConfig } from 'payload'

// Collection for technology categories (Frontend, Backend, DevOps)
export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
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
}

// Collection for individual technologies with years of experience
export const Technologies: CollectionConfig = {
  slug: 'technologies',
  admin: {
    useAsTitle: 'name',
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
}
