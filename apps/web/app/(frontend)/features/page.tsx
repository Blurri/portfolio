import { Suspense } from 'react'
import { NeuContainer } from '@workspace/ui/components/neu-container'
import { Heading, Text } from '@workspace/ui/components/typography'
import TabNavigation from '../../../components/tab-navigation'
import CodeTab from '../../../components/code-tab'
import SkillsTab from '../../../components/skills-tab'
import { getPayload } from 'payload'
import payloadConfig from '../../../payload.config'
import { Project, Technology, Category } from '@/payload-types'
import {
  filterPopulated,
  isProject,
  isTechnology,
  isCategory,
} from '@/utils/type-guards'
import ProjectsTabClient from '@/components/projects-tab-client'

// This is a server component, so we can fetch data here
export default async function FeaturesPage() {
  // Fetch projects data
  let projects: (Project & { technologies: Technology[] })[] = []
  let categories: (Category & { technologies: Technology[] })[] = []

  try {
    // Initialize Payload
    const payload = await getPayload({ config: payloadConfig })

    // Fetch all projects data sorted by order (ascending)
    const projectsResponse = await payload.find({
      collection: 'projects',
      sort: 'order',
      depth: 1, // Fetch related technologies
    })

    // Process projects data to ensure type safety
    projects = projectsResponse.docs
      .filter(isProject)
      .map((project: Project) => {
        // Process technologies to ensure they are properly typed
        const technologies = filterPopulated(project.technologies, isTechnology)

        return {
          ...project,
          technologies,
        }
      })

    // Fetch categories and technologies for skills section
    const categoriesResponse = await payload.find({
      collection: 'categories',
      sort: 'order',
      depth: 1, // Fetch technologies as well
    })

    // Process categories to ensure they have the correct structure
    categories = categoriesResponse.docs
      .filter(isCategory)
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
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  return (
    <div className="container-lg">
      <NeuContainer
        variant="flat"
        size="2xl"
        dataSectionTitle="Features Showcase"
        className="mb-12"
      >
        <Heading dataSectionTitle="Features Showcase" className="mb-6">
          Features Showcase
        </Heading>
        <Text size="lg">
          Explore my projects, technical capabilities through interactive
          examples.
        </Text>
      </NeuContainer>

      <TabNavigation />

      <Suspense fallback={<div>Loading content...</div>}>
        <ProjectsTabClient projects={projects} />
        <CodeTab />
        <SkillsTab categories={categories} />
      </Suspense>
    </div>
  )
}
