import type { LibraryButtonProps } from '@/shared/types'
import { cn } from '@/lib/utils'
import s from './swecc-finale.module.css'

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  const variantCls =
    variant === 'primary'
      ? s.buttonPrimary
      : variant === 'ghost'
        ? s.buttonGhost
        : variant === 'destructive'
          ? s.buttonDestructive
          : s.button
  return (
    <button type="button" className={cn(s.root, variantCls, className)} {...rest}>
      {children}
    </button>
  )
}
