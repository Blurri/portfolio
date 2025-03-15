import type { Payload } from 'payload'
import type { Category, Technology } from '../payload-types'
import { devUser } from './helpers/credentials'

/**
 * Seed function that populates the database with initial data
 * @param payload - The Payload instance
 * @param options - Options for seeding
 */
export const seed = async (
  payload: Payload,
  options: { reset?: boolean } = {},
) => {
  const { reset = false } = options

  // If reset is true, delete all existing data first
  if (reset) {
    console.log('🧹 Resetting database...')
    await resetDatabase(payload)
  }

  console.log('🌱 Seeding database...')

  // Seed user if it doesn't exist
  if (process.env.NODE_ENV === 'development') {
    await seedUser(payload)
  }

  // Define categories
  const categories = [
    { name: 'Frontend', order: 1 },
    { name: 'Backend', order: 2 },
    { name: 'DevOps & Cloud', order: 3 },
    { name: 'Mobile', order: 4 },
    { name: 'Databases', order: 5 },
    { name: 'Other', order: 6 },
  ]

  // Create categories and store them
  const createdCategories: Record<string, Category | null> = {}
  for (const category of categories) {
    const createdCategory = await seedCategory(
      payload,
      category.name,
      category.order,
    )
    if (createdCategory) {
      createdCategories[category.name] = createdCategory
    }
  }

  // Define technologies by category with years of experience
  const technologies: Record<
    string,
    Array<{ name: string; years: number; order: number }>
  > = {
    Frontend: [
      { name: 'React', years: 9, order: 1 },
      { name: 'Next.js', years: 5, order: 2 },
      { name: 'TypeScript', years: 7, order: 3 },
      { name: 'JavaScript', years: 10, order: 4 },
      { name: 'Vue.js', years: 1, order: 5 },
      { name: 'AngularJS', years: 1, order: 6 },
      { name: 'Tailwind CSS', years: 2, order: 7 },
      { name: 'Shadcn UI', years: 2, order: 8 },
      { name: 'React-Three-Fiber', years: 1, order: 9 },
    ],
    Backend: [
      { name: 'Node.js', years: 9, order: 1 },
      { name: 'GraphQL', years: 6, order: 2 },
      { name: 'Apollo', years: 5, order: 3 },
      { name: 'Pothos', years: 3, order: 4 },
      { name: 'Prisma ORM', years: 4, order: 5 },
      { name: 'Meteor.js', years: 7, order: 6 },
      { name: 'Elixir/Phoenix', years: 1, order: 7 },
    ],
    'DevOps & Cloud': [
      { name: 'Kubernetes', years: 5, order: 1 },
      { name: 'Google Cloud', years: 5, order: 2 },
      { name: 'Firebase', years: 5, order: 3 },
      { name: 'CI/CD Pipelines', years: 7, order: 4 },
      { name: 'Docker', years: 6, order: 5 },
    ],
    Mobile: [
      { name: 'React Native', years: 6, order: 1 },
      { name: 'iOS/Swift', years: 3, order: 2 },
      { name: 'Unity VR', years: 1, order: 3 },
    ],
    Databases: [
      { name: 'PostgreSQL', years: 9, order: 1 },
      { name: 'MongoDB', years: 7, order: 2 },
      { name: 'SQL', years: 11, order: 3 },
    ],
    Other: [
      { name: 'Agile Methodologies', years: 9, order: 1 },
      { name: 'Project Management', years: 9, order: 2 },
      { name: 'Blender', years: 1, order: 3 },
      { name: 'Java', years: 2, order: 4 },
      { name: 'PHP', years: 2, order: 5 },
    ],
  }

  // Seed technologies for each category
  for (const [categoryName, techs] of Object.entries(technologies)) {
    const category = createdCategories[categoryName]
    if (category && category.id) {
      const techIds = []

      for (const tech of techs) {
        const createdTech = await seedTechnology(
          payload,
          tech.name,
          tech.years,
          category.id,
          tech.order,
        )

        if (createdTech) {
          techIds.push(createdTech.id)
        }
      }

      // Update category with technology IDs
      if (techIds.length > 0) {
        await payload.update({
          collection: 'categories',
          id: category.id,
          data: {
            technologies: techIds,
          },
        })
      }
    }
  }

  console.log('✅ Database seeded successfully!')
}

/**
 * Reset the database by deleting all documents from all collections
 */
async function resetDatabase(payload: Payload): Promise<void> {
  // Define the order of collections to delete
  // Delete dependent collections first before their references
  const collectionOrder = [
    'blog',
    'testimonials',
    'page-content',
    'contact',
    'social-links',
    'projects',
    'experience',
    'technologies',
    'media',
    'categories',
    'settings',
    'users',
  ] as const

  // Type to ensure we only use valid collection names
  type ValidCollection = (typeof collectionOrder)[number]

  // Delete collections in the specified order
  for (const collectionName of collectionOrder) {
    try {
      console.log(`🗑️  Deleting all documents from ${collectionName}...`)

      let hasMoreDocs = true
      let deletedCount = 0

      // Continue fetching and deleting documents until no more remain
      while (hasMoreDocs) {
        try {
          // Find documents in the collection (always fetch first page as we're deleting them)
          const { docs, totalDocs } = await payload.find({
            collection: collectionName as ValidCollection,
            limit: 100, // Use a smaller batch size for better performance
            page: 1, // Always get the first page as we're deleting documents
          })

          // If no documents found, we're done with this collection
          if (docs.length === 0) {
            hasMoreDocs = false
            break
          }

          // Delete each document in the current batch
          for (const doc of docs) {
            await payload.delete({
              collection: collectionName as ValidCollection,
              id: doc.id,
            })
            deletedCount++
          }

          // Log progress for large collections
          console.log(
            `Progress: Deleted ${deletedCount} documents from ${collectionName}...`,
          )

          // Check if we've deleted all documents
          if (deletedCount >= totalDocs) {
            hasMoreDocs = false
          }
        } catch (error) {
          console.error(`Error processing batch for ${collectionName}:`, error)
          hasMoreDocs = false // Stop on error
        }
      }

      console.log(
        `✅ Deleted all documents (${deletedCount} total) from ${collectionName}`,
      )
    } catch (error) {
      console.error(
        `❌ Error deleting documents from ${collectionName}:`,
        error,
      )
    }
  }
}

// Helper function to seed a user if it doesn't exist
async function seedUser(payload: Payload): Promise<void> {
  const { totalDocs } = await payload.find({
    collection: 'users',
    limit: 0,
    where: {
      email: {
        equals: devUser.email,
      },
    },
  })

  if (totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        ...devUser,
        role: devUser.role || 'admin',
      },
    })
  }
}

// Helper function to seed a category if it doesn't exist
async function seedCategory(
  payload: Payload,
  name: string,
  order: number,
): Promise<Category | null> {
  try {
    const { docs: existingCategories } = await payload.find({
      collection: 'categories',
      where: {
        name: {
          equals: name,
        },
      },
    })

    if (existingCategories.length === 0) {
      return await payload.create({
        collection: 'categories',
        data: {
          name,
          order,
        },
      })
    }

    return existingCategories[0] || null
  } catch (error) {
    console.error(`Error seeding category ${name}:`, error)
    return null
  }
}

// Helper function to seed a technology if it doesn't exist
async function seedTechnology(
  payload: Payload,
  name: string,
  years: number,
  categoryId: number,
  order: number,
): Promise<Technology | null> {
  try {
    const { docs: existingTechnologies } = await payload.find({
      collection: 'technologies',
      where: {
        name: {
          equals: name,
        },
      },
    })

    if (existingTechnologies.length === 0) {
      return await payload.create({
        collection: 'technologies',
        data: {
          name,
          years,
          category: categoryId,
          order,
        },
      })
    }

    return existingTechnologies[0] || null
  } catch (error) {
    console.error(`Error seeding technology ${name}:`, error)
    return null
  }
}
