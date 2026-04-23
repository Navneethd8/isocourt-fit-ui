import type { LibrarySegmentedControlProps } from '../../../../shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import { RadioSegmentedControl } from '../../../../libraries/shared/RadioSegmentedControl'

export function SegmentedControl<T extends string>({ className, ...rest }: LibrarySegmentedControlProps<T>) {
  const L = useKitLightPrimitives()
  const group = cn(
    'inline-flex w-max max-w-full flex-wrap items-center gap-1 rounded-lg p-1 font-sans',
    L ? 'border border-neutral-200 bg-neutral-100/90' : 'border border-neutral-800 bg-neutral-800/60',
  )
  const btn = (active: boolean) =>
    cn(
      'rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2',
      L ? 'focus-visible:ring-offset-white' : 'focus-visible:ring-offset-neutral-900',
      active
        ? L
          ? 'border border-neutral-200 bg-white text-neutral-900 shadow-sm'
          : 'bg-neutral-700 text-neutral-100 shadow-sm'
        : L
          ? 'border border-transparent text-neutral-500 hover:text-neutral-800'
          : 'border border-transparent text-neutral-500 hover:text-neutral-300',
    )

  return (
    <RadioSegmentedControl
      {...rest}
      className={className}
      groupClassName={group}
      getButtonClassName={btn}
    />
  )
}
