import type { LibraryButtonProps } from '@/shared/types'
import s from './signal-wayfind.module.css'

function Arrow() {
  return (
    <svg className={s.svgArrow} width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

export function Button({ variant = 'secondary', className, children, ...rest }: LibraryButtonProps) {
  if (variant === 'primary') {
    return (
      <button type="button" className={[s.buttonPrimary, s.root, className].filter(Boolean).join(' ')} {...rest}>
        {children}
        <Arrow />
      </button>
    )
  }
  if (variant === 'ghost') {
    return (
      <button type="button" className={[s.buttonGhost, s.root, className].filter(Boolean).join(' ')} {...rest}>
        {children}
      </button>
    )
  }
  return (
    <button type="button" className={[s.button, s.root, className].filter(Boolean).join(' ')} {...rest}>
      {children}
      <Arrow />
    </button>
  )
}
