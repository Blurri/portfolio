'use client'

import { useSearchParams } from 'next/navigation'
import { Heading } from '@workspace/ui/components/typography'
import { NeuContainer } from '@workspace/ui/components/neu-container'
import { SkillBar } from '@workspace/ui/components/skill-bar'

export default function SkillsTab() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'projects'

  if (tab !== 'skills') return null

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NeuContainer
          variant="flat"
          size="lg"
          dataSectionTitle="Frontend Development"
        >
          <Heading
            level="h3"
            dataSectionTitle="Frontend Development"
            className="mb-4"
          >
            Frontend Development
          </Heading>
          <div className="space-y-4">
            {[
              { skill: 'React & Next.js', level: 95 },
              { skill: 'TypeScript', level: 90 },
              { skill: 'GraphQL Client', level: 85 },
              { skill: 'Redux/Context API', level: 90 },
              { skill: 'CSS/SCSS/Tailwind', level: 85 },
              { skill: 'Responsive Design', level: 90 },
            ].map((skill, index) => (
              <SkillBar key={index} skill={skill.skill} level={skill.level} />
            ))}
          </div>
        </NeuContainer>

        <NeuContainer
          variant="flat"
          size="lg"
          dataSectionTitle="Backend Development"
        >
          <Heading
            level="h3"
            dataSectionTitle="Backend Development"
            className="mb-4"
          >
            Backend Development
          </Heading>
          <div className="space-y-4">
            {[
              { skill: 'Node.js', level: 90 },
              { skill: 'GraphQL API', level: 85 },
              { skill: 'REST API Design', level: 95 },
              { skill: 'Authentication/Security', level: 85 },
              { skill: 'Database Design', level: 80 },
              { skill: 'Microservices', level: 75 },
            ].map((skill, index) => (
              <SkillBar key={index} skill={skill.skill} level={skill.level} />
            ))}
          </div>
        </NeuContainer>
      </div>
    </div>
  )
}
