import type { LibraryProgressBarProps } from '../../../../shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'

export function ProgressBar({ value, max = 100, label, className }: LibraryProgressBarProps) {
  const L = useKitLightPrimitives()
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={cn('w-full font-sans', L ? 'text-neutral-900' : 'text-neutral-100', className)}>
      <div className={cn('mb-1.5 flex justify-between text-[11px] font-semibold', L ? 'text-neutral-500' : 'text-neutral-500')}>
        <span>{label ?? 'Progress'}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div
        className={cn(
          'h-1.5 w-full overflow-hidden rounded-full border',
          L ? 'border-neutral-200 bg-neutral-100' : 'border-neutral-800 bg-neutral-800',
        )}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-emerald-500 transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
      </div>
    </div>
  )
}
