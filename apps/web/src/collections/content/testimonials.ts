import { CollectionConfig } from 'payload'
import { defineCollection } from '@/lib/payload-helpers'

/**
 * Testimonials collection for managing client and user testimonials
 * This collection is part of the Content group because it stores
 * social proof content that is displayed throughout the site
 */
export const Testimonials: CollectionConfig = defineCollection({
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'featured', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the person giving the testimonial',
      },
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Company or organization the person represents',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Job title or position of the person',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The testimonial text',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Photo of the person (optional)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this testimonial prominently on the site',
        position: 'sidebar',
      },
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: false,
      admin: {
        description: 'Related project (if applicable)',
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
  ],
  timestamps: true,
})
