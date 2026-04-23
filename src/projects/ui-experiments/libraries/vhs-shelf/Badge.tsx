import type { LibraryBadgeProps } from '@/shared/types'
import s from './vhs-shelf.module.css'

export function Badge({ children, tone = 'neutral', className }: LibraryBadgeProps) {
  const toneClass =
    tone === 'accent' ? s.badgeAccent : tone === 'success' ? s.badgeSuccess : tone === 'warning' ? s.badgeWarning : s.badge
  return <span className={[toneClass, s.root, className].filter(Boolean).join(' ')}>{children}</span>
}
