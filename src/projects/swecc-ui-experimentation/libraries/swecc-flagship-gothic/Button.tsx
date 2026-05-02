import type { LibraryButtonProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './swecc-flagship-gothic.module.css'

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  const variantCls =
    variant === 'primary' ? s.buttonPrimary : variant === 'ghost' ? s.buttonGhost : s.button
  return (
    <button type="button" className={cn(s.root, theme, variantCls, className)} {...rest}>
      {children}
    </button>
  )
}
