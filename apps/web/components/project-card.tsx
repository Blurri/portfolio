import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
}

export default function ProjectCard({
  title,
  description,
  technologies,
  image,
  demoUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <div className="neu-flat dark:dark-neu-flat rounded-2xl overflow-hidden">
      <div className="h-48 relative">
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="neu-button dark:dark-neu-button rounded-full px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {demoUrl && (
            <Link
              href={demoUrl}
              className="neu-button dark:dark-neu-button px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} />
              Demo
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              className="neu-button dark:dark-neu-button px-4 py-2 rounded-xl text-gray-700 dark:text-gray-300 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} />
              Code
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
