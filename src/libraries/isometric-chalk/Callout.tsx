import type { LibraryCalloutProps } from '../../shared/types'
import { useKitLightPrimitives } from '../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import { chalkLightTw } from './chalkLightTw'
import s from './isometric-chalk.module.css'

export function Callout({ title, children, variant = 'tip', className }: LibraryCalloutProps) {
  const L = useKitLightPrimitives()
  const box = L
    ? variant === 'warning'
      ? chalkLightTw.calloutWarning
      : variant === 'info'
        ? chalkLightTw.calloutInfo
        : chalkLightTw.calloutTip
    : variant === 'warning'
      ? s.calloutWarning
      : variant === 'info'
        ? s.calloutInfo
        : s.calloutTip

  return (
    <aside className={cn(box, !L && s.root, L && chalkLightTw.root, className)}>
      {title ? <p className={L ? chalkLightTw.calloutTitle : s.calloutTitle}>{title}</p> : null}
      <div>{children}</div>
    </aside>
  )
}
