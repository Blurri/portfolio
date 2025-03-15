'use client'

import { useQueryState } from 'nuqs'
import { cn } from '@/lib/utils'
import { Category, Technology } from '@/payload-types'

// Define a more specific type for our processed categories
type ProcessedCategory = Omit<Category, 'technologies'> & {
  technologies: Technology[]
}

type TechStackClientProps = {
  categories: ProcessedCategory[]
  defaultCategoryName: string
}

export default function TechStackClient({
  categories = [],
  defaultCategoryName = '',
}: TechStackClientProps) {
  // Use nuqs to sync category selection with URL
  const [activeCategory, setActiveCategory] = useQueryState('category', {
    defaultValue: defaultCategoryName,
  })

  // Find the active category object
  const activeCategoryObj =
    categories.find((category) => category.name === activeCategory) ||
    categories[0] // Fallback to first category if selected one not found

  // Get technologies from the active category (already filtered and sorted by the server)
  const technologies = activeCategoryObj?.technologies || []

  return (
    <div>
      {/* Category selection buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.length === 0 ? (
          <div className="text-gray-500">No categories available</div>
        ) : (
          categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={cn(
                'px-4 py-2 rounded-xl',
                activeCategory === category.name
                  ? 'neu-pressed dark:dark-neu-pressed text-purple-600 dark:text-purple-400'
                  : 'neu-button dark:dark-neu-button text-gray-700 dark:text-gray-300',
              )}
            >
              {category.name}
            </button>
          ))
        )}
      </div>

      {/* Technologies grid */}
      {technologies.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No technologies available in this category
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className="neu-pressed dark:dark-neu-pressed rounded-xl p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {tech.name}
                </span>
                <span className="text-sm text-purple-600 dark:text-purple-400">
                  {tech.years} yrs
                </span>
              </div>
              <div className="h-2 rounded-full neu-inset dark:dark-neu-inset overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  style={{
                    width: `${Math.min(100, (tech.years / 15) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
