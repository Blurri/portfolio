import { forwardRef } from 'react'
import { cn } from '@workspace/ui/lib/utils'

interface NeuToggleProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  'aria-label'?: string
}

const sizeMap = {
  sm: {
    toggle: 'w-10 h-5',
    thumb: 'w-3.5 h-3.5',
    translate: 'translate-x-5',
  },
  md: {
    toggle: 'w-14 h-7',
    thumb: 'w-5 h-5',
    translate: 'translate-x-7',
  },
  lg: {
    toggle: 'w-16 h-8',
    thumb: 'w-6 h-6',
    translate: 'translate-x-8',
  },
}

const NeuToggle = forwardRef<HTMLButtonElement, NeuToggleProps>(
  (
    {
      checked,
      onCheckedChange,
      className,
      size = 'md',
      disabled = false,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ) => {
    const { toggle, thumb, translate } = sizeMap[size]

    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          toggle,
          'rounded-full p-1 transition-colors relative',
          checked
            ? 'bg-purple-500 dark:bg-purple-600'
            : 'neu-inset dark:dark-neu-inset',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            thumb,
            'block rounded-full transition-transform',
            checked ? translate : 'translate-x-0',
            checked ? 'bg-white' : 'neu-circle-sm dark:dark-neu-circle-sm',
          )}
        />
      </button>
    )
  },
)

NeuToggle.displayName = 'NeuToggle'

export { NeuToggle }
