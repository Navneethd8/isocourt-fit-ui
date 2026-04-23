import type { LibraryButtonProps } from '@/shared/types'
import s from './sonar-ping.module.css'

function Needle() {
  return <span className={s.needle} aria-hidden />
}

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  const base = variant === 'primary' ? s.buttonPrimary : variant === 'ghost' ? s.buttonGhost : s.button
  return (
    <button type="button" className={[base, s.root, className].filter(Boolean).join(' ')} {...rest}>
      {variant === 'primary' || variant === 'secondary' ? <Needle /> : null}
      {children}
    </button>
  )
}
