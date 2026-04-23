import type { LibraryCardProps } from '../../../../shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'

export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  const L = useKitLightPrimitives()
  return (
    <article
      className={cn(
        'rounded-lg border p-4 text-left font-sans shadow-sm',
        L ? 'border-neutral-200 bg-white text-neutral-900' : 'border-neutral-800 bg-neutral-900 text-neutral-100',
        className,
      )}
    >
      <h3 className={cn('m-0 mb-0.5 text-base font-semibold tracking-tight', L ? 'text-neutral-900' : 'text-neutral-100')}>
        {title}
      </h3>
      {subtitle ? (
        <p className={cn('m-0 mb-2.5 text-xs', L ? 'text-neutral-500' : 'text-neutral-500')}>{subtitle}</p>
      ) : null}
      {children}
    </article>
  )
}
