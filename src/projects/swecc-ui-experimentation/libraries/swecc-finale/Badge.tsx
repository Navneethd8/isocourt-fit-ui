import type { LibraryBadgeProps } from '@/shared/types'
import { cn } from '@/lib/utils'
import s from './swecc-finale.module.css'

export function Badge({ children, tone = 'neutral', className }: LibraryBadgeProps) {
  const toneClass =
    tone === 'accent' ? s.badgeAccent : tone === 'success' ? s.badgeSuccess : tone === 'warning' ? s.badgeWarning : s.badge
  return (
    <span className={cn(toneClass, s.root, className)}>
      {children}
    </span>
  )
}
