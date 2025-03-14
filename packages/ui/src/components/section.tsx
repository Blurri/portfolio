import type { ReactNode } from 'react'
import { cn } from '@workspace/ui/lib/utils'
import { Heading } from '@workspace/ui/components/typography'

interface SectionProps {
  children: ReactNode
  title?: string
  dataSectionTitle?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'mb-8',
  md: 'mb-16',
  lg: 'mb-20',
}

export function Section({
  children,
  title,
  dataSectionTitle,
  className,
  size = 'md',
  ...props
}: SectionProps) {
  return (
    <section
      data-section-title={dataSectionTitle || title}
      className={cn(sizeMap[size], className)}
      {...props}
    >
      {title && (
        <Heading level="h2" dataSectionTitle={dataSectionTitle || title}>
          {title}
        </Heading>
      )}
      {children}
    </section>
  )
}
