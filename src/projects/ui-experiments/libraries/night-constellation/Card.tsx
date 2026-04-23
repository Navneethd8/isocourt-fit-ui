import type { LibraryCardProps } from '@/shared/types'
import s from './night-constellation.module.css'

export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  return (
    <article className={[s.card, s.root, className].filter(Boolean).join(' ')}>
      <svg className={s.mesh} viewBox="0 0 64 64" aria-hidden>
        <path
          className={s.netLine}
          d="M12 14 L40 8 L56 32 L32 48 L10 40 Z"
        />
        <line className={s.netLine} x1="12" y1="14" x2="56" y2="32" />
        <line className={s.netLine} x1="40" y1="8" x2="10" y2="40" />
        <circle className={s.netNode} cx="12" cy="14" r="1.5" />
        <circle className={s.netNode2} cx="40" cy="8" r="1.2" />
        <circle className={s.netNode} cx="56" cy="32" r="1" />
        <circle className={s.netNode} cx="32" cy="48" r="1" />
        <circle className={s.netNode2} cx="10" cy="40" r="1" />
      </svg>
      <h3 className={s.title}>{title}</h3>
      {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
      {children}
    </article>
  )
}
