import type { LibraryProgressBarProps } from '@/shared/types'
import s from './vhs-shelf.module.css'

export function ProgressBar({ value, max = 100, label, className }: LibraryProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={[s.progress, s.root, className].filter(Boolean).join(' ')}>
      <div className={s.progressLabel}>
        <span>{label ?? 'Progress'}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div
        className={s.progressTrack}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div className={s.progressFill} style={{ width: `${pct}%` }} aria-hidden />
      </div>
    </div>
  )
}
