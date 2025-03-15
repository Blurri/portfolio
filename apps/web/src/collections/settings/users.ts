import { CollectionConfig } from 'payload'
import { defineCollection } from '@/lib/payload-helpers'

/**
 * Users collection for authentication and user management
 * This collection is part of the Settings group because it manages
 * user accounts and permissions rather than public-facing content
 */
export const Users: CollectionConfig = defineCollection({
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'createdAt'],
    group: 'Settings',
  },
  access: {
    // Only authenticated users can read users
    read: ({ req: { user } }) => {
      // If user has admin role, they can read all users
      if (user && user.role === 'admin') return true

      // Users can read their own document
      if (user)
        return {
          id: {
            equals: user.id,
          },
        }

      // Otherwise, no access
      return false
    },
    // Only admins can create new users (except for the first user during setup)
    create: ({ req: { user } }) => {
      if (user && user.role === 'admin') return true
      return false
    },
    // Only admins can update users, or users can update themselves
    update: ({ req: { user }, id }) => {
      if (user && user.role === 'admin') return true
      if (user && user.id === Number(id)) return true
      return false
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => {
      if (user && user.role === 'admin') return true
      return false
    },
  },
  fields: [
    // Email added by default
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Viewer',
          value: 'viewer',
        },
      ],
      access: {
        // Only admins can update roles
        update: ({ req: { user } }) => {
          if (user && user.role === 'admin') return true
          return false
        },
      },
    },
  ],
})
