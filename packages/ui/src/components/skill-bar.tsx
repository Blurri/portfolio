import { cn } from '@workspace/ui/lib/utils'
import { Text } from '@workspace/ui/components/typography'

interface SkillBarProps {
  skill: string
  level: number
  className?: string
  showPercentage?: boolean
}

export function SkillBar({
  skill,
  level,
  className,
  showPercentage = true,
}: SkillBarProps) {
  return (
    <div className={cn('mb-4', className)}>
      <div className="flex justify-between mb-1">
        <Text className="text-gray-700 dark:text-gray-300">{skill}</Text>
        {showPercentage && <Text variant="muted">{level}%</Text>}
      </div>
      <div className="neu-inset dark:dark-neu-inset h-2 rounded-full">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  )
}
