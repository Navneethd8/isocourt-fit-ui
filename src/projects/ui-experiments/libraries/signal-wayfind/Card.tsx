import type { LibraryCardProps } from '@/shared/types'
import s from './signal-wayfind.module.css'

export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  return (
    <article className={[s.card, s.root, className].filter(Boolean).join(' ')}>
      <svg className={s.deco} viewBox="0 0 80 60" aria-hidden>
        <path d="M8 12h20l12 8 24-4M8 40h32l8-6 28 4" />
      </svg>
      <h3 className={s.title}>{title}</h3>
      {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
      {children}
    </article>
  )
}
