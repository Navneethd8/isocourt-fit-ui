import type { LibraryButtonProps } from '@/shared/types'
import s from './paper-velum.module.css'

function Leaf() {
  return (
    <svg className={s.leaf} viewBox="0 0 20 20" aria-hidden>
      <path
        className={s.leafPath}
        d="M3 12c2-4 5-6 9-7 0 4-2 8-6 11-2-1-2.5-2.4-3-4z"
      />
    </svg>
  )
}

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  const base = variant === 'primary' ? s.buttonPrimary : variant === 'ghost' ? s.buttonGhost : s.button
  return (
    <button type="button" className={[base, s.root, className].filter(Boolean).join(' ')} {...rest}>
      {children}
      {variant !== 'ghost' ? <Leaf /> : null}
    </button>
  )
}
