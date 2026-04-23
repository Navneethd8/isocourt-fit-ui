import type { LibraryCardProps } from '@/shared/types'
import s from './coral-reef.module.css'

export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  return (
    <article className={[s.card, s.root, className].filter(Boolean).join(' ')}>
      <svg className={s.reefWaves} viewBox="0 0 120 16" preserveAspectRatio="none" aria-hidden>
        <path
          d="M0 10 Q15 2 30 8 T60 6 T90 8 T120 4 L120 20 L0 20 Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
      </svg>
      <h3 className={s.title}>{title}</h3>
      {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
      {children}
    </article>
  )
}
