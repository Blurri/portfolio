import { CollectionConfig } from 'payload'
import {
  defineCollection,
  createUploadField,
  createRelationshipField,
} from '../../lib/payload-helpers'

export const Testimonials: CollectionConfig = defineCollection({
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'featured', 'createdAt'],
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
      name: 'title',
      type: 'text',
      admin: {
        description: 'Job title of the person',
      },
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Company or organization of the person',
      },
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The testimonial text',
      },
    },
    createUploadField({
      name: 'photo',
      type: 'upload',
      admin: {
        description: 'Photo of the person (optional)',
      },
    }),
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Rating from 1-5 stars (optional)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this testimonial prominently',
        position: 'sidebar',
      },
    },
    createRelationshipField({
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      admin: {
        description: 'Related project (if applicable)',
        position: 'sidebar',
      },
    }),
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
      name: 'linkedIn',
      type: 'text',
      admin: {
        description: 'LinkedIn profile URL (optional)',
      },
    },
  ],
  timestamps: true,
})
