'use client'

import { format } from 'date-fns'
import { Code, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Project, Technology } from '@/payload-types'
import { Heading, Text } from '@workspace/ui/components/typography'

/**
 * Props for the ProjectsClient component
 */
interface ProjectsClientProps {
  projects: (Project & {
    technologies: Technology[]
  })[]
}

/**
 * Client component that displays project data
 *
 * @param props - Component props
 */
export default function ProjectsClient({ projects = [] }: ProjectsClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <div
          key={project.id}
          className="neu-flat dark:dark-neu-flat rounded-2xl overflow-hidden"
        >
          {/* Project Image */}
          {project.featuredImage &&
            typeof project.featuredImage !== 'number' && (
              <div className="relative h-48 w-full">
                <Image
                  src={project.featuredImage.url || ''}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

          <div className="p-6">
            {/* Project Header */}
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <Heading level="h3">{project.title}</Heading>
                <span className="neu-pressed dark:dark-neu-pressed text-xs px-2 py-1 rounded-full">
                  {project.projectType.replace('-', ' ')}
                </span>
              </div>

              {/* Project Dates */}
              <div className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                {project.startDate &&
                  format(new Date(project.startDate), 'MMM yyyy')}
                {project.completedDate &&
                  ` - ${format(new Date(project.completedDate), 'MMM yyyy')}`}
              </div>

              {/* Project Summary */}
              <Text className="mb-4">{project.summary}</Text>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={typeof tech === 'number' ? tech : tech.id}
                      className="neu-button dark:dark-neu-button rounded-full px-3 py-1 text-xs text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform cursor-default"
                    >
                      {typeof tech === 'number'
                        ? `Tech ID: ${tech}`
                        : tech.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Links */}
            {project.links && project.links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {project.links.map((link, index) => {
                  const icon =
                    link.type === 'github' ? (
                      <Github className="h-4 w-4 mr-1" />
                    ) : (
                      <ExternalLink className="h-4 w-4 mr-1" />
                    )

                  return (
                    <Link
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neu-button dark:dark-neu-button hover:scale-105 transition-transform rounded-full px-3 py-1 flex items-center text-xs"
                    >
                      {icon}
                      {link.label ||
                        (link.type === 'github' ? 'GitHub' : 'Visit')}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
