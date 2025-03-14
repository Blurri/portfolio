import { cn } from '@workspace/ui/lib/utils'
import { Heading, Text } from '@workspace/ui/components/typography'

interface TimelineItemProps {
  year: string
  title: string
  description: string
  className?: string
}

export function TimelineItem({
  year,
  title,
  description,
  className,
}: TimelineItemProps) {
  return (
    <div className={cn('relative pl-10 pb-8', className)}>
      <div className="absolute left-2 top-1 w-5 h-5 rounded-full neu-circle dark:dark-neu-circle flex items-center justify-center">
        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
      </div>
      <div className="mb-1 text-sm text-purple-600 dark:text-purple-400 font-medium">
        {year}
      </div>
      <Heading level="h3" dataSectionTitle={title} className="mb-1">
        {title}
      </Heading>
      <Text>{description}</Text>
    </div>
  )
}

interface TimelineProps {
  items: Array<{
    year: string
    title: string
    description: string
  }>
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-900"></div>
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          year={item.year}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  )
}
