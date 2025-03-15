import { CollectionConfig } from 'payload'
import { defineCollection, createUploadField } from '../../lib/payload-helpers'

export const SocialLinks: CollectionConfig = defineCollection({
  slug: 'social-links',
  admin: {
    useAsTitle: 'platform',
    defaultColumns: ['platform', 'url', 'active'],
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        { label: 'GitHub', value: 'github' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Medium', value: 'medium' },
        { label: 'Dev.to', value: 'devto' },
        { label: 'Stack Overflow', value: 'stackoverflow' },
        { label: 'CodePen', value: 'codepen' },
        { label: 'Personal Website', value: 'website' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Social media platform',
      },
    },
    {
      name: 'customPlatform',
      type: 'text',
      admin: {
        description: 'If "Other" is selected above, specify the platform name',
        condition: (data: { platform?: string }) => data.platform === 'other',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Full URL to your profile (including https://)',
      },
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default Platform Icon', value: 'default' },
        { label: 'Custom Icon', value: 'custom' },
      ],
      admin: {
        description: 'Icon to display for this link',
      },
    },
    createUploadField({
      name: 'customIcon',
      type: 'upload',
      admin: {
        description: 'Upload a custom icon (SVG preferred)',
        condition: (data: { icon?: string }) => data.icon === 'custom',
      },
    }),
    {
      name: 'displayName',
      type: 'text',
      admin: {
        description: 'Display name for this link (optional)',
      },
    },
    {
      name: 'username',
      type: 'text',
      admin: {
        description: 'Your username on this platform (optional)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this link is active and should be displayed',
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
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this link prominently',
        position: 'sidebar',
      },
    },
  ],
})
