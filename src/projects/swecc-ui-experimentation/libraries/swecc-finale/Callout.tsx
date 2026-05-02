import type { LibraryCalloutProps } from '@/shared/types'
import { cn } from '@/lib/utils'
import s from './swecc-finale.module.css'

export function Callout({ title, children, variant = 'tip', className }: LibraryCalloutProps) {
  const box =
    variant === 'warning' ? s.calloutWarning : variant === 'info' ? s.calloutInfo : s.calloutTip
  return (
    <aside className={cn(box, s.root, className)}>
      {title ? <p className={s.calloutTitle}>{title}</p> : null}
      <div>{children}</div>
    </aside>
  )
}
