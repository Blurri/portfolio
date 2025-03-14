import { cn } from '@workspace/ui/lib/utils'
import { Text } from '@workspace/ui/components/typography'

interface TechBadgeProps {
  tech: string
  className?: string
}

export function TechBadge({ tech, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'neu-button dark:dark-neu-button rounded-full px-3 py-1 hover:scale-105 transition-transform cursor-default',
        className,
      )}
    >
      <Text size="sm" className="text-gray-700 dark:text-gray-300">
        {tech}
      </Text>
    </span>
  )
}
