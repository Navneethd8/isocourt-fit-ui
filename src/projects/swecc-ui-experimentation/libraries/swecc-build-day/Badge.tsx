import type { LibraryBadgeProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './swecc-build-day.module.css'

export function Badge({ children, tone = 'neutral', className }: LibraryBadgeProps) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  const toneClass =
    tone === 'accent' ? s.badgeAccent : tone === 'success' ? s.badgeSuccess : tone === 'warning' ? s.badgeWarning : s.badge
  return (
    <span className={cn(toneClass, s.root, theme, className)}>
      {children}
    </span>
  )
}
