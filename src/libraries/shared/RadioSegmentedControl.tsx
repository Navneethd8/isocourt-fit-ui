import type { KeyboardEvent } from 'react'
import type { LibrarySegmentedControlProps } from '../../shared/types'

type Props<T extends string> = LibrarySegmentedControlProps<T> & {
  groupClassName: string
  getButtonClassName: (active: boolean) => string
}

/**
 * Segmented control as a radiogroup (not tabs without tabpanels).
 * Arrow keys / Home / End move focus value for keyboard QA.
 */
export function RadioSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel = 'Choose option',
  className,
  groupClassName,
  getButtonClassName,
}: Props<T>) {
  const indexOf = (v: T) => options.findIndex((o) => o.value === v)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const i = indexOf(value)
    if (e.key === 'Home') {
      onChange(options[0]!.value)
      return
    }
    if (e.key === 'End') {
      onChange(options[options.length - 1]!.value)
      return
    }
    const next = e.key === 'ArrowRight' ? Math.min(options.length - 1, i + 1) : Math.max(0, i - 1)
    onChange(options[next]!.value)
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={[groupClassName, className].filter(Boolean).join(' ')}
      onKeyDown={onKeyDown}
    >
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            className={getButtonClassName(active)}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
