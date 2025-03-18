import { CollectionConfig } from 'payload'
import { defineCollection, createUploadField } from '@/lib/payload-helpers'

/**
 * Settings collection for global site configuration
 * This collection is part of the Settings group because it manages
 * global site settings like title, logo, and navigation
 */
export const Settings: CollectionConfig = defineCollection({
  slug: 'settings',
  admin: {
    useAsTitle: 'name',
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'Site Settings',
      admin: {
        description: 'Name for this settings document',
      },
    },
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Main site title',
      },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      admin: {
        description: 'Brief description of the site',
      },
    },
    {
      name: 'logo',
      type: 'group',
      admin: {
        description: 'Site logo settings',
      },
      fields: [
        createUploadField({
          name: 'dark',
          type: 'upload',
          admin: {
            description: 'Logo for dark mode',
          },
        }),
        createUploadField({
          name: 'light',
          type: 'upload',
          admin: {
            description: 'Logo for light mode',
          },
        }),
        createUploadField({
          name: 'favicon',
          type: 'upload',
          admin: {
            description: 'Site favicon (should be square)',
          },
        }),
      ],
    },
    {
      name: 'mainNavigation',
      type: 'array',
      admin: {
        description: 'Main navigation links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Navigation label',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'URL or path',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Open in new tab',
          },
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Display order',
          },
        },
      ],
    },
    {
      name: 'footerNavigation',
      type: 'array',
      admin: {
        description: 'Footer navigation links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Navigation label',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'URL or path',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Open in new tab',
          },
        },
      ],
    },
    {
      name: 'colors',
      type: 'group',
      admin: {
        description: 'Site color settings',
      },
      fields: [
        {
          name: 'primary',
          type: 'text',
          admin: {
            description: 'Primary color (hex code)',
          },
        },
        {
          name: 'secondary',
          type: 'text',
          admin: {
            description: 'Secondary color (hex code)',
          },
        },
        {
          name: 'accent',
          type: 'text',
          admin: {
            description: 'Accent color (hex code)',
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      admin: {
        description: 'Global SEO settings',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'Default meta title',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Default meta description',
          },
        },
        createUploadField({
          name: 'ogImage',
          type: 'upload',
          admin: {
            description: 'Default social sharing image',
          },
        }),
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Default meta keywords',
          },
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      admin: {
        description: 'Analytics settings',
      },
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          admin: {
            description: 'Google Analytics ID',
          },
        },
        {
          name: 'googleTagManagerId',
          type: 'text',
          admin: {
            description: 'Google Tag Manager ID',
          },
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      admin: {
        description: 'Contact information',
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Primary contact email',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Contact phone number',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          admin: {
            description: 'Physical address (if applicable)',
          },
        },
      ],
    },
  ],
})
