import type { LibraryButtonProps } from '@/shared/types'
import s from './coral-reef.module.css'

function Fish() {
  return (
    <svg className={s.fish} viewBox="0 0 32 16" aria-hidden>
      <path
        fill="currentColor"
        d="M2 8c4-3 8-4 12-2 1-1 2-1 3-1l2 2-2 2c-1 0-2 0-3-1-4 2-8 1-12-2H2v-2h0zM24 4l4 4-4 4V4z"
      />
    </svg>
  )
}

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  const base = variant === 'primary' ? s.buttonPrimary : variant === 'ghost' ? s.buttonGhost : s.button
  return (
    <button type="button" className={[base, s.root, className].filter(Boolean).join(' ')} {...rest}>
      {children}
      {variant !== 'ghost' ? <Fish /> : null}
    </button>
  )
}
