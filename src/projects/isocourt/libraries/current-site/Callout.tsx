import type { LibraryCalloutProps } from '../../../../shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'

export function Callout({ title, children, variant = 'tip', className }: LibraryCalloutProps) {
  const L = useKitLightPrimitives()
  const box = L
    ? variant === 'warning'
      ? 'border-amber-200 bg-amber-50 text-amber-950'
      : variant === 'info'
        ? 'border-sky-200 bg-sky-50 text-sky-950'
        : 'border-emerald-200 bg-emerald-50 text-emerald-950'
    : variant === 'warning'
      ? 'border-amber-800/50 bg-amber-950/30 text-amber-100'
      : variant === 'info'
        ? 'border-sky-700/50 bg-sky-950/40 text-sky-100'
        : 'border-emerald-900/40 bg-emerald-950/20 text-neutral-300'

  const titleCls = L
    ? variant === 'warning'
      ? 'text-amber-900'
      : variant === 'info'
        ? 'text-sky-900'
        : 'text-emerald-900'
    : variant === 'warning'
      ? 'text-amber-200'
      : variant === 'info'
        ? 'text-sky-200'
        : 'text-emerald-500/90'

  return (
    <aside className={cn('rounded-md border p-3 text-sm leading-snug font-sans', box, className)}>
      {title ? <p className={cn('m-0 mb-1.5 text-xs font-semibold', titleCls)}>{title}</p> : null}
      <div>{children}</div>
    </aside>
  )
}
