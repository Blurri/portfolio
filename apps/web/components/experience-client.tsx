'use client'

import { format } from 'date-fns'
import { Briefcase } from 'lucide-react'
import Image from 'next/image'
import { Experience, Technology } from '@/payload-types'
import { Heading, Text } from '@workspace/ui/components/typography'

/**
 * Props for the ExperienceClient component
 */
interface ExperienceClientProps {
  experiences: (Experience & {
    technologies: Technology[]
  })[]
}

/**
 * Client component that displays experience data
 *
 * @param props - Component props
 */
export default function ExperienceClient({
  experiences = [],
}: ExperienceClientProps) {
  return (
    <div className="space-y-8">
      {experiences.map((experience) => (
        <div
          key={experience.id}
          className="neu-flat dark:dark-neu-flat rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="neu-pressed dark:dark-neu-pressed rounded-[20px] p-5">
                {experience.companyLogo &&
                  typeof experience.companyLogo !== 'number' && (
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 relative overflow-hidden rounded-full">
                        <Image
                          src={experience.companyLogo.url || ''}
                          alt={experience.company}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                <div className="text-purple-600 dark:text-purple-400 font-medium mb-1">
                  {experience.startDate &&
                    format(new Date(experience.startDate), 'MMM yyyy')}{' '}
                  -{' '}
                  {experience.current
                    ? 'Present'
                    : experience.endDate
                      ? format(new Date(experience.endDate), 'MMM yyyy')
                      : 'Present'}
                </div>
                <Heading level="h3">{experience.title}</Heading>
                <Text variant="muted">{experience.company}</Text>
              </div>
            </div>
            <div className="md:w-2/3">
              {/* Description */}
              <div className="mb-4">
                {experience.description && (
                  <div className="prose dark:prose-invert max-w-none">
                    {/* Simple text rendering for now */}
                    <Text>
                      {experience.description.root.children
                        .map((child) => {
                          if (child.children && Array.isArray(child.children)) {
                            return child.children
                              .map(
                                (textNode: { text?: string }) =>
                                  textNode.text || '',
                              )
                              .join(' ')
                          }
                          return ''
                        })
                        .join(' ')}
                    </Text>
                  </div>
                )}
              </div>

              {/* Highlights */}
              {experience.highlights && experience.highlights.length > 0 && (
                <div className="mb-6">
                  <Heading level="h4" className="mb-2">
                    Key Achievements
                  </Heading>
                  <ul className="space-y-2">
                    {experience.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <Briefcase className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <Text>{highlight.highlight}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {experience.technologies &&
                experience.technologies.length > 0 && (
                  <div>
                    <Heading level="h4" className="mb-2">
                      Technologies
                    </Heading>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={typeof tech === 'number' ? tech : tech.id}
                          className="neu-button dark:dark-neu-button rounded-full px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform cursor-default"
                        >
                          {typeof tech === 'number'
                            ? `Tech ID: ${tech}`
                            : tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
