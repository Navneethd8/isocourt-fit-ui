import type { LibraryButtonProps } from '@/shared/types'
import s from './terracotta-mosaic.module.css'

function Knot() {
  return <span className={s.knot} aria-hidden />
}

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  const base = variant === 'primary' ? s.buttonPrimary : variant === 'ghost' ? s.buttonGhost : s.button
  return (
    <button type="button" className={[base, s.root, className].filter(Boolean).join(' ')} {...rest}>
      {variant === 'primary' || variant === 'secondary' ? <Knot /> : null}
      {children}
    </button>
  )
}
