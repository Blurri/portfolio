'use client'

import { useSearchParams } from 'next/navigation'
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
    </div>
  )
}
