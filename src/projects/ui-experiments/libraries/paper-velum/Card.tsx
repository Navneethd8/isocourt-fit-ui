import type { LibraryCardProps } from '@/shared/types'
import s from './paper-velum.module.css'

export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  return (
    <article className={[s.card, s.root, className].filter(Boolean).join(' ')}>
      <svg className={s.wave} viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
        <path
          className={s.wavePath}
          d="M0 6 Q25 2,50 6 T100 6 T150 6 T200 6"
        />
      </svg>
      <h3 className={s.title}>{title}</h3>
      {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
      {children}
    </article>
  )
}
