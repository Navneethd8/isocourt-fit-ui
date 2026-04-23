import type { LibraryCalloutProps } from '@/shared/types'
import s from './vhs-shelf.module.css'

export function Callout({ title, children, variant = 'tip', className }: LibraryCalloutProps) {
  const box =
    variant === 'warning' ? s.calloutWarning : variant === 'info' ? s.calloutInfo : s.calloutTip
  return (
    <aside className={[box, s.root, className].filter(Boolean).join(' ')}>
      {title ? <p className={s.calloutTitle}>{title}</p> : null}
      <div>{children}</div>
    </aside>
  )
}
