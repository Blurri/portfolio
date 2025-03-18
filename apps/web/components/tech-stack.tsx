import { getPayload } from 'payload'
import payloadConfig from '../payload.config'
import { Category } from '@/payload-types'
import TechStackClient from './tech-stack-client'
import { filterPopulated, isTechnology } from '@/utils/type-guards'

/**
 * Server component that fetches and processes technology categories and their technologies
 * from Payload CMS, then passes the processed data to the client component.
 */
export default async function TechStack() {
  try {
    // Initialize Payload
    const payload = await getPayload({ config: payloadConfig })

    // Fetch categories sorted by order
    const categoriesResponse = await payload.find({
      collection: 'categories',
      sort: 'order',
      depth: 1, // Fetch technologies as well
    })

    // Process categories to ensure they have the correct structure
    const categories = categoriesResponse.docs
      .filter(
        (category): category is Category =>
          // Filter out null or undefined values
          !!category,
      )
      .map((category: Category) => {
        // Get technologies for this category using our utility function
        const technologies = filterPopulated(
          category.technologies,
          isTechnology,
        ).sort((a, b) => {
          // Sort by years in descending order
          return (b.years || 0) - (a.years || 0)
        })

        // Return the processed category
        return {
          ...category,
          technologies,
        }
      })

    // Get the default category name (first category or empty string)
    const defaultCategoryName =
      categories.length > 0 && categories[0]?.name ? categories[0].name : ''

    return (
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Tech Stack</h2>
        <TechStackClient
          categories={categories}
          defaultCategoryName={defaultCategoryName}
        />
      </div>
    )
  } catch (error) {
    console.error('Error fetching tech stack data:', error)
    return (
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Tech Stack</h2>
        <div className="text-center py-8 text-gray-500">
          Unable to load tech stack data. Please try again later.
        </div>
      </div>
    )
  }
}
