import type { LibraryBadgeProps } from '../../../../shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'

const base = 'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold font-sans'

export function Badge({ children, tone = 'neutral', className }: LibraryBadgeProps) {
  const L = useKitLightPrimitives()
  const toneCls = L
    ? tone === 'accent'
      ? 'border-rose-200 bg-rose-50 text-rose-800'
      : tone === 'success'
        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
        : tone === 'warning'
          ? 'border-amber-200 bg-amber-50 text-amber-900'
          : 'border-neutral-200 bg-neutral-100 text-neutral-700'
    : tone === 'accent'
      ? 'border-rose-500/35 bg-rose-500/10 text-rose-300'
      : tone === 'success'
        ? 'border-emerald-500/35 bg-emerald-950/40 text-emerald-400'
        : tone === 'warning'
          ? 'border-amber-500/35 bg-amber-500/10 text-amber-300'
          : 'border-neutral-700 bg-neutral-800/80 text-neutral-300'

  return <span className={cn(base, toneCls, className)}>{children}</span>
}
