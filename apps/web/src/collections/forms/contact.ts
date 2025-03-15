import { CollectionConfig, Access } from 'payload'
import { defineCollection } from '@/lib/payload-helpers'

/**
 * Contact collection for handling contact form submissions
 * This collection is part of the Forms group because it stores
 * user-submitted form data rather than content managed by admins
 */
export const Contact: CollectionConfig = defineCollection({
  slug: 'contact',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    group: 'Forms',
  },
  access: {
    read: ({ req }) => {
      // Only authenticated users with admin role can read contact submissions
      return Boolean(req.user && req.user.role === 'admin')
    },
    // Anyone can create a contact submission (public form)
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        description: 'Status of this contact request',
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this contact request',
        position: 'sidebar',
      },
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description:
          'Where this contact request came from (e.g., "contact form", "email")',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
})
