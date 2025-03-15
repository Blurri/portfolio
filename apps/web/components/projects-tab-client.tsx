'use client'

import { useSearchParams } from 'next/navigation'
import { Heading, Text } from '@workspace/ui/components/typography'
import { NeuContainer } from '@workspace/ui/components/neu-container'
import { Project, Technology } from '@/payload-types'
import ProjectsClient from './projects-client'

interface ProjectsTabClientProps {
  projects: (Project & {
    technologies: Technology[]
  })[]
}

export default function ProjectsTabClient({
  projects,
}: ProjectsTabClientProps) {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'projects'

  if (tab !== 'projects') return null

  return (
    <div className="space-y-8">
      <ProjectsClient projects={projects} />

      <div data-section-title="Development Approach">
        <Heading
          level="h2"
          dataSectionTitle="Development Approach"
          className="mb-4"
        >
          Development Approach
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'User-Centered Design',
              description:
                'I start with user needs and work backwards, ensuring intuitive interfaces and smooth experiences.',
            },
            {
              title: 'Agile Methodology',
              description:
                'I work in sprints with regular deliverables, adapting to changing requirements and priorities.',
            },
            {
              title: 'Performance Optimization',
              description:
                'I focus on speed and efficiency, using techniques like code splitting and lazy loading.',
            },
          ].map((approach, index) => (
            <NeuContainer key={index} variant="pressed" size="md">
              <Heading
                level="h3"
                dataSectionTitle={approach.title}
                className="mb-2"
              >
                {approach.title}
              </Heading>
              <Text>{approach.description}</Text>
            </NeuContainer>
          ))}
        </div>
      </div>
    </div>
  )
}
