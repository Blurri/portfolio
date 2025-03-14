import type React from 'react'
import { forwardRef, type ReactNode } from 'react'
import { cn } from '@workspace/ui/lib/utils'
import Link from 'next/link'

type NeuButtonVariant =
  | 'default'
  | 'secondary'
  | 'pressed'
  | 'circle'
  | 'circle-sm'
type NeuButtonSize = 'sm' | 'md' | 'lg' | 'icon' | 'icon-lg'

interface NeuButtonProps {
  children: ReactNode
  variant?: NeuButtonVariant
  size?: NeuButtonSize
  className?: string
  href?: string
  isActive?: boolean
}

const sizeMap = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
  icon: 'p-2',
  'icon-lg': 'p-4',
}

const NeuButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  NeuButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      className,
      href,
      isActive,
      ...props
    },
    ref,
  ) => {
    const variantClass = {
      default: 'neu-button',
      secondary: 'neu-button-secondary',
      pressed: 'neu-pressed',
      circle: 'neu-circle rounded-full',
      'circle-sm': 'neu-circle-sm rounded-full',
    }

    const baseClasses = cn(
      variantClass[variant],
      sizeMap[size],
      isActive && 'text-purple-600 dark:text-purple-400',
      'rounded-xl text-gray-700 dark:text-gray-300 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]',
      className,
    )

    if (href) {
      return (
        <Link
          href={href}
          className={baseClasses}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        className={baseClasses}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...props}
      >
        {children}
      </button>
    )
  },
)

NeuButton.displayName = 'NeuButton'

export { NeuButton }
