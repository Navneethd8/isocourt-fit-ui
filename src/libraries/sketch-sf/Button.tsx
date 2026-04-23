import type { LibraryButtonProps } from '../../shared/types'
import s from './sketch-sf.module.css'

export function Button({
  variant = 'secondary',
  className,
  children,
  ...rest
}: LibraryButtonProps) {
  const cls =
    variant === 'primary'
      ? s.buttonPrimary
      : variant === 'ghost'
        ? s.buttonGhost
        : s.button
  return (
    <button type="button" className={[cls, s.root, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </button>
  )
}
