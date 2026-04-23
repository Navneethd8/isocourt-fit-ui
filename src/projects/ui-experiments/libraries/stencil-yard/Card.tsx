import type { LibraryCardProps } from '@/shared/types'
import s from './stencil-yard.module.css'

export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  return (
    <article className={[s.card, s.root, className].filter(Boolean).join(' ')}>
      <div className={s.cardHazard} aria-hidden />
      <svg className={s.deco} viewBox="0 0 32 32" aria-hidden>
        <path
          d="M2 2h8v2H4v6H2V2zM30 2v8h-2V4h-6V2h8zM2 30V22h2v6h6v2H2zM30 30H22v-2h6v-6h2v8z"
          fill="currentColor"
        />
      </svg>
      <h3 className={s.title}>{title}</h3>
      {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
      {children}
    </article>
  )
}
