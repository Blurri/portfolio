import type React from 'react'
import type { ReactNode } from 'react'
import { cn } from '@workspace/ui/lib/utils'

type NeuContainerVariant = 'flat' | 'pressed' | 'inset'
type NeuContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

interface NeuContainerProps {
  children: ReactNode
  variant?: NeuContainerVariant
  size?: NeuContainerSize
  className?: string
  dataSectionTitle?: string
}

const sizeMap = {
  sm: 'rounded-lg p-3',
  md: 'rounded-xl p-4',
  lg: 'rounded-2xl p-6',
  xl: 'rounded-3xl p-8',
  '2xl': 'rounded-3xl p-8 md:p-12',
  '3xl': 'rounded-[30px] p-8 md:p-12',
  full: 'rounded-none p-6',
}

export function NeuContainer({
  children,
  variant = 'flat',
  size = 'lg',
  className,
  dataSectionTitle,
  ...props
}: NeuContainerProps & React.HTMLAttributes<HTMLDivElement>) {
  const variantClass = {
    flat: 'neu-flat dark:dark-neu-flat',
    pressed: 'neu-pressed dark:dark-neu-pressed',
    inset: 'neu-inset dark:dark-neu-inset',
  }

  return (
    <div
      className={cn(variantClass[variant], sizeMap[size], className)}
      data-section-title={dataSectionTitle}
      {...props}
    >
      {children}
    </div>
  )
}
