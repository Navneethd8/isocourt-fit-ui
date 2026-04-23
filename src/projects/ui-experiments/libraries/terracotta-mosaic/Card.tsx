import type { LibraryCardProps } from '@/shared/types'
import s from './terracotta-mosaic.module.css'

export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  return (
    <article className={[s.card, s.root, className].filter(Boolean).join(' ')}>
      <svg className={s.arch} viewBox="0 0 40 40" aria-hidden>
        <path
          d="M4 36V20a16 16 0 0 1 32 0v16H4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <h3 className={s.title}>{title}</h3>
      {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
      {children}
    </article>
  )
}
