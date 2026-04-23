import type { LibraryBadgeProps } from '../../shared/types'
import { useKitLightPrimitives } from '../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import { chalkLightTw } from './chalkLightTw'
import s from './isometric-chalk.module.css'

export function Badge({ children, tone = 'neutral', className }: LibraryBadgeProps) {
  const L = useKitLightPrimitives()
  const toneClass = L
    ? tone === 'accent'
      ? chalkLightTw.badgeAccent
      : tone === 'success'
        ? chalkLightTw.badgeSuccess
        : tone === 'warning'
          ? chalkLightTw.badgeWarning
          : chalkLightTw.badge
    : tone === 'accent'
      ? s.badgeAccent
      : tone === 'success'
        ? s.badgeSuccess
        : tone === 'warning'
          ? s.badgeWarning
          : s.badge

  return <span className={cn(toneClass, !L && s.root, L && chalkLightTw.root, className)}>{children}</span>
}
