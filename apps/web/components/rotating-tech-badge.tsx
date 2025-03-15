'use client'

import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'

interface RotatingTechBadgeProps {
  textOptions: string[]
}

export default function RotatingTechBadge({
  textOptions,
}: RotatingTechBadgeProps) {
  const [textIndex, setTextIndex] = useQueryState(
    'tech',
    parseAsInteger.withDefault(0),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(
        (prevIndex) =>
          ((typeof prevIndex === 'number' ? prevIndex : 0) + 1) %
          textOptions.length,
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [textOptions.length, setTextIndex])

  const currentIndex = typeof textIndex === 'number' ? textIndex : 0

  return (
    <div className="flex-1 flex justify-center">
      <div className="w-48 h-48 md:w-64 md:h-64 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center overflow-hidden">
        <div className="relative h-24 w-24 md:h-32 md:w-32 flex items-center justify-center">
          {textOptions.map((text, index) => (
            <div
              key={index}
              className={`absolute text-6xl md:text-7xl font-bold transition-all duration-500 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100 blur-0'
                  : 'opacity-0 scale-75 blur-sm'
              }`}
              style={{
                color: 'transparent',
                background:
                  'linear-gradient(to bottom, rgba(139, 92, 246, 0.5), rgba(99, 102, 241, 0.5))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow:
                  '1px 1px 1px rgba(255, 255, 255, 0.3), -1px -1px 1px rgba(0, 0, 0, 0.2)',
                filter: 'contrast(1.2)',
                transform: `translateY(1px) ${
                  index === currentIndex
                    ? 'rotate(0deg)'
                    : `rotate(${(index - currentIndex) * 15}deg)`
                }`,
                transformOrigin: 'center center',
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
