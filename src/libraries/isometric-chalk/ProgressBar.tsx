import type { LibraryProgressBarProps } from '../../shared/types'
import { useKitLightPrimitives } from '../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import { chalkLightTw } from './chalkLightTw'
import s from './isometric-chalk.module.css'

export function ProgressBar({ value, max = 100, label, className }: LibraryProgressBarProps) {
  const L = useKitLightPrimitives()
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={cn(L ? chalkLightTw.progress : s.progress, !L && s.root, L && chalkLightTw.root, className)}>
      <div className={L ? chalkLightTw.progressLabel : s.progressLabel}>
        <span>{label ?? 'Progress'}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div
        className={L ? chalkLightTw.progressTrack : s.progressTrack}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div className={L ? chalkLightTw.progressFill : s.progressFill} style={{ width: `${pct}%` }} aria-hidden />
      </div>
    </div>
  )
}
