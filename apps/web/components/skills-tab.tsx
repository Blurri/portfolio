'use client'

import { useSearchParams } from 'next/navigation'
import { Heading } from '@workspace/ui/components/typography'
import { NeuContainer } from '@workspace/ui/components/neu-container'
import { SkillBar } from '@workspace/ui/components/skill-bar'
import { Category, Technology } from '@/payload-types'
import { isTechnology } from '@/utils/type-guards'

interface SkillsTabProps {
  categories: (Category & {
    technologies: Technology[]
  })[]
}

export default function SkillsTab({ categories = [] }: SkillsTabProps) {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'projects'

  if (tab !== 'skills') return null

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <NeuContainer
            key={category.id}
            variant="flat"
            size="lg"
            dataSectionTitle={category.name}
          >
            <Heading
              level="h3"
              dataSectionTitle={category.name}
              className="mb-4"
            >
              {category.name}
            </Heading>
            <div className="space-y-4">
              {category.technologies.map((tech) => {
                if (!isTechnology(tech)) return null

                return (
                  <SkillBar
                    key={tech.id}
                    skill={tech.name}
                    level={tech.years ? Math.min(tech.years * 10, 100) : 75}
                  />
                )
              })}
            </div>
          </NeuContainer>
        ))}
      </div>
    </div>
  )
}
