import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { seed } from '@/src/seed'

// Import all collections from the centralized collections index
import { collections } from '@/src/collections'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Use the collections array exported from our collections index
  collections,

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // Use push mode in development to avoid migration conflicts
    push: process.env.NODE_ENV === 'development',
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
