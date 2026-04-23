import type { LibraryButtonProps } from '../../../../shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  const L = useKitLightPrimitives()
  const base = cn(
    'inline-flex items-center justify-center rounded-md text-sm font-medium font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/80 focus-visible:ring-offset-2',
    L ? 'focus-visible:ring-offset-white' : 'focus-visible:ring-offset-neutral-950',
  )

  const variantCls = L
    ? variant === 'primary'
      ? 'border border-emerald-500 bg-emerald-600 px-4 py-2 text-white shadow-sm hover:bg-emerald-700'
      : variant === 'ghost'
        ? 'border border-transparent bg-transparent px-4 py-2 text-emerald-700 hover:bg-emerald-50'
        : 'border border-neutral-200 bg-white px-4 py-2 text-neutral-900 shadow-sm hover:bg-neutral-50'
    : variant === 'primary'
      ? 'border border-emerald-500/50 bg-emerald-600 px-4 py-2 text-white shadow-[0_0_0_1px_rgba(0,0,0,0.35)] hover:bg-emerald-700'
      : variant === 'ghost'
        ? 'border border-transparent bg-transparent px-4 py-2 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300'
        : 'border border-neutral-700 bg-neutral-800 px-4 py-2 text-neutral-100 hover:border-neutral-600 hover:bg-neutral-700'

  return (
    <button type="button" className={cn(base, variantCls, className)} {...rest}>
      {children}
    </button>
  )
}
