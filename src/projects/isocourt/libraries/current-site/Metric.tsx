import type { LibraryMetricProps } from '../../../../shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'

export function Metric({ label, value, subvalue, tone = 'default', className }: LibraryMetricProps) {
  const L = useKitLightPrimitives()
  return (
    <div
      className={cn(
        'rounded-md border p-3 text-left font-sans shadow-sm',
        L ? 'border-neutral-200 bg-white text-neutral-900' : 'border-neutral-800 bg-neutral-950/90 text-neutral-100',
        className,
      )}
    >
      <div className={cn('mb-0.5 text-[10px] font-semibold uppercase tracking-wider', L ? 'text-neutral-500' : 'text-neutral-500')}>
        {label}
      </div>
      <div
        className={cn(
          'text-lg font-bold tracking-tight',
          tone === 'positive' && (L ? 'text-emerald-700' : 'text-emerald-400'),
          tone === 'negative' && (L ? 'text-rose-600' : 'text-rose-400'),
          tone === 'default' && (L ? 'text-neutral-900' : 'text-neutral-100'),
        )}
      >
        {value}
      </div>
      {subvalue ? <div className={cn('mt-0.5 text-xs', L ? 'text-neutral-500' : 'text-neutral-500')}>{subvalue}</div> : null}
    </div>
  )
}
