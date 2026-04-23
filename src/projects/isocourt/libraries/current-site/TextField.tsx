import { useId } from 'react'
import type { LibraryTextFieldProps } from '../../../../shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'

export function TextField({ label, hint, id, className, ...rest }: LibraryTextFieldProps) {
  const L = useKitLightPrimitives()
  const autoId = useId()
  const fieldId = id ?? `field-${autoId}`
  const hintId = hint ? `${fieldId}-hint` : undefined
  return (
    <div className={cn('flex flex-col gap-1.5 text-left font-sans', className)}>
      <label className={cn('text-xs font-medium', L ? 'text-neutral-600' : 'text-neutral-400')} htmlFor={fieldId}>
        {label}
      </label>
      <input
        className={cn(
          'w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors',
          L
            ? 'border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
            : 'border-neutral-800 bg-neutral-950 text-neutral-100 placeholder:text-neutral-600 hover:border-neutral-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500',
        )}
        id={fieldId}
        aria-describedby={hintId}
        {...rest}
      />
      {hint ? (
        <span id={hintId} className={cn('text-xs', L ? 'text-neutral-500' : 'text-neutral-500')}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}
