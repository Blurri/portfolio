import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { Categories, Technologies } from './src/collections/skills'
import { Users } from './src/collections/users'
import { Media } from './src/collections/media'
import { Projects } from './src/collections/projects'
import { Experience } from './src/collections/experience'
import { PageContent } from './src/collections/page-content'
import { Blog } from './src/collections/blog'
import { Contact } from './src/collections/contact'
import { Testimonials } from './src/collections/testimonials'
import { SocialLinks } from './src/collections/social-links'
import { Settings } from './src/collections/settings'
import { seed } from './src/seed'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    // Content collections
    Projects,
    Experience,
    Blog,
    PageContent,
    Testimonials,

    // Taxonomy collections
    Categories,
    Technologies,

    // Media and assets
    Media,

    // User management
    Users,

    // Settings and configuration
    SocialLinks,
    Settings,

    // Forms
    Contact,
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,

  // Add the onInit function to seed the database
  onInit: async (payload) => {
    // Check if seeding is requested via environment variable
    const shouldSeed = process.env.PAYLOAD_SEED === 'true'

    if (shouldSeed) {
      await seed(payload, { reset: true })
    }
  },
})
