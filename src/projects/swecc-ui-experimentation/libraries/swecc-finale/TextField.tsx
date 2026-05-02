import { useId } from 'react'
import type { LibraryTextFieldProps } from '@/shared/types'
import { cn } from '@/lib/utils'
import s from './swecc-finale.module.css'

export function TextField({ label, hint, id, className, ...rest }: LibraryTextFieldProps) {
  const autoId = useId()
  const fieldId = id ?? `field-${autoId}`
  const hintId = hint ? `${fieldId}-hint` : undefined
  return (
    <div className={cn(s.field, s.root, className)}>
      <label className={s.label} htmlFor={fieldId}>
        {label}
      </label>
      <input className={s.input} id={fieldId} aria-describedby={hintId} {...rest} />
      {hint ? (
        <span className={s.hint} id={hintId}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}
