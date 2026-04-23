import type { LibraryButtonProps } from '@/shared/types'
import s from './night-constellation.module.css'

function Orbit() {
  return (
    <svg className={s.orb} viewBox="0 0 16 16" aria-hidden>
      <circle className={s.path} cx="8" cy="3" r="1.2" fill="currentColor" />
      <circle className={s.pathDelay} cx="13" cy="10" r="1" fill="currentColor" />
    </svg>
  )
}

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  const base = variant === 'primary' ? s.buttonPrimary : variant === 'ghost' ? s.buttonGhost : s.button
  return (
    <button type="button" className={[base, s.root, className].filter(Boolean).join(' ')} {...rest}>
      {children}
      <Orbit />
    </button>
  )
}
