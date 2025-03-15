import { getPayload } from 'payload'
import payloadConfig from '../../payload.config'
import { Category, Technology } from '@/payload-types'
import {
  createTypeGuard,
  filterPopulated,
  isCategory,
  isTechnology,
} from '@/utils/type-guards'

/**
 * Example component demonstrating how to use type guard utilities
 *
 * This is for demonstration purposes only and is not meant to be used in production.
 */
export default async function TypeGuardExample(): Promise<JSX.Element> {
  try {
    // Initialize Payload
    const payload = await getPayload({ config: payloadConfig })

    // Fetch categories with technologies
    const categoriesResponse = await payload.find({
      collection: 'categories',
      depth: 1,
    })

    // Example 1: Using pre-defined type guards
    const categories = categoriesResponse.docs.filter(isCategory)

    // Example 2: Using filterPopulated utility
    const processedCategories = categories.map((category) => {
      // Ensure technologies is an array before filtering
      const technologiesArray = Array.isArray(category.technologies)
        ? category.technologies
        : []

      const technologies = filterPopulated(
        technologiesArray,
        isTechnology,
      ).sort((a, b) => (b.years || 0) - (a.years || 0))

      return { ...category, technologies }
    })

    // Example 3: Creating a custom type guard
    // This is just for demonstration - normally you'd define this in a shared file
    const hasTechnologies = createTypeGuard<Category>([
      'id',
      'name',
      'technologies',
    ])
    const categoriesWithTechnologies = categories.filter(hasTechnologies)

    // Example 4: Combining type guards with other array methods
    const advancedTechnologies = processedCategories
      .flatMap((category) => category.technologies)
      .filter((tech) => tech.years >= 5)
      .sort((a, b) => b.years - a.years)

    return (
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8">Type Guard Examples</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Categories</h3>
          <ul className="list-disc pl-5">
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Advanced Technologies (5+ years)
          </h3>
          <ul className="list-disc pl-5">
            {advancedTechnologies.map((tech) => (
              <li key={tech.id}>
                {tech.name} - {tech.years} years
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error in type guard example:', error)
    return (
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8">Type Guard Examples</h2>
        <div className="text-center py-8 text-gray-500">
          Unable to load data. Please try again later.
        </div>
      </div>
    )
  }
}
