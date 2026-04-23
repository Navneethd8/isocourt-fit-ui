import type { LibraryButtonProps } from '@/shared/types'
import s from './stencil-yard.module.css'

function Cross() {
  return (
    <svg className={s.cross} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="7" y="2" width="2" height="12" fill="currentColor" />
      <rect x="2" y="7" width="12" height="2" fill="currentColor" />
    </svg>
  )
}

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  const base = variant === 'primary' ? s.buttonPrimary : variant === 'ghost' ? s.buttonGhost : s.button
  return (
    <button type="button" className={[base, s.root, className].filter(Boolean).join(' ')} {...rest}>
      {children}
      {variant === 'primary' || variant === 'secondary' ? <Cross /> : null}
    </button>
  )
}
