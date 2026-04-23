import type { LibraryButtonProps } from '../../shared/types'
import { useKitLightPrimitives } from '../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import { chalkLightTw } from './chalkLightTw'
import s from './isometric-chalk.module.css'

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  const L = useKitLightPrimitives()
  const cls =
    variant === 'primary'
      ? L
        ? chalkLightTw.buttonPrimary
        : s.buttonPrimary
      : variant === 'ghost'
        ? L
          ? chalkLightTw.buttonGhost
          : s.buttonGhost
        : L
          ? chalkLightTw.button
          : s.button

  return (
    <span className={L ? chalkLightTw.wrap : s.wrap}>
      <button type="button" className={cn(cls, !L && s.root, L && chalkLightTw.root, className)} {...rest}>
        {children}
      </button>
    </span>
  )
}
