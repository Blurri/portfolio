'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const technologies = {
  Frontend: [
    { name: 'JavaScript', years: 15 },
    { name: 'React', years: 8 },
    { name: 'Next.js', years: 5 },
    { name: 'TypeScript', years: 6 },
    { name: 'HTML/CSS', years: 15 },
    { name: 'jQuery', years: 10 },
  ],
  Backend: [
    { name: 'Node.js', years: 10 },
    { name: 'GraphQL', years: 5 },
    { name: 'REST APIs', years: 12 },
    { name: 'Express', years: 8 },
    { name: 'MongoDB', years: 7 },
    { name: 'PostgreSQL', years: 6 },
  ],
  DevOps: [
    { name: 'Google Cloud', years: 4 },
    { name: 'Kubernetes', years: 3 },
    { name: 'Docker', years: 5 },
    { name: 'CI/CD', years: 6 },
    { name: 'Git', years: 12 },
    { name: 'Linux', years: 10 },
  ],
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('Frontend')

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.keys(technologies).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              'px-4 py-2 rounded-xl',
              activeCategory === category
                ? 'neu-pressed dark:dark-neu-pressed text-purple-600 dark:text-purple-400'
                : 'neu-button dark:dark-neu-button text-gray-700 dark:text-gray-300',
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {technologies[activeCategory as keyof typeof technologies].map(
          (tech, index) => (
            <div
              key={index}
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
          ),
        )}
      </div>
    </div>
  )
}
