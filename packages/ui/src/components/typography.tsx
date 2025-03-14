import type React from 'react'
import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@workspace/ui/lib/utils'

const headingVariants = cva('text-gray-800 dark:text-gray-100', {
  variants: {
    level: {
      h1: 'text-3xl md:text-4xl lg:text-5xl font-bold',
      h2: 'text-2xl md:text-3xl font-bold mb-6',
      h3: 'text-xl font-semibold mb-3',
      h4: 'text-lg font-medium mb-2',
    },
  },
  defaultVariants: {
    level: 'h1',
  },
})

const textVariants = cva('', {
  variants: {
    variant: {
      default: 'text-gray-600 dark:text-gray-300',
      muted: 'text-gray-500 dark:text-gray-400',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

type BaseProps = {
  children: ReactNode
  className?: string
  dataSectionTitle?: string
}

type HeadingProps = BaseProps &
  VariantProps<typeof headingVariants> &
  Omit<React.HTMLAttributes<HTMLHeadingElement>, keyof BaseProps> & {
    level?: 'h1' | 'h2' | 'h3' | 'h4'
  }

type TextProps = BaseProps &
  VariantProps<typeof textVariants> &
  Omit<React.HTMLAttributes<HTMLParagraphElement>, keyof BaseProps>

export function Heading({
  children,
  className,
  dataSectionTitle,
  level = 'h1',
  ...props
}: HeadingProps) {
  const Comp = level
  return (
    <Comp
      className={cn(headingVariants({ level }), className)}
      data-section-title={dataSectionTitle}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function Text({
  children,
  className,
  variant,
  size,
  ...props
}: TextProps) {
  return (
    <p className={cn(textVariants({ variant, size }), className)} {...props}>
      {children}
    </p>
  )
}
