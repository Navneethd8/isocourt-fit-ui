import { useId } from 'react'
import type { LibraryTextFieldProps } from '../../shared/types'
import { useKitLightPrimitives } from '../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import { chalkLightTw } from './chalkLightTw'
import s from './isometric-chalk.module.css'

export function TextField({ label, hint, id, className, ...rest }: LibraryTextFieldProps) {
  const L = useKitLightPrimitives()
  const autoId = useId()
  const fieldId = id ?? `field-${autoId}`
  const hintId = hint ? `${fieldId}-hint` : undefined
  return (
    <div className={cn(L ? chalkLightTw.field : s.field, !L && s.root, L && chalkLightTw.root, className)}>
      <label className={L ? chalkLightTw.label : s.label} htmlFor={fieldId}>
        {label}
      </label>
      <input
        className={L ? chalkLightTw.input : s.input}
        id={fieldId}
        aria-describedby={hintId}
        {...rest}
      />
      {hint ? (
        <span id={hintId} className={L ? chalkLightTw.hint : s.hint}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}
