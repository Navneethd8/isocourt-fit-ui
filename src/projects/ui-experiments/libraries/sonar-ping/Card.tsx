import type { LibraryCardProps } from '@/shared/types'
import s from './sonar-ping.module.css'

export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  return (
    <article className={[s.card, s.root, className].filter(Boolean).join(' ')}>
      <span className={s.hud} aria-hidden>
        ACQ
      </span>
      <svg className={s.sweep} viewBox="0 0 64 64" aria-hidden>
        <path
          className={s.sweepPath}
          d="M6 64 A58 58 0 0 1 64 6"
        />
        <path
          className={s.sweepPath2}
          d="M10 64 A54 54 0 0 1 64 10"
        />
        <path
          className={s.sweepPath2}
          d="M32 6 L32 20 M64 32 L50 32"
        />
      </svg>
      <h3 className={s.title}>{title}</h3>
      {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
      {children}
    </article>
  )
}
