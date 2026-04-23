import type { LibraryCardProps } from '@/shared/types'
import s from './vhs-shelf.module.css'

const HOLES = 9

export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  return (
    <article className={[s.card, s.root, className].filter(Boolean).join(' ')}>
      <div className={s.sprocket} aria-hidden>
        {Array.from({ length: HOLES }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className={s.labelStrip} aria-hidden>
        <div className={s.labelLeft} />
        <div className={s.labelCenter} />
        <div className={s.labelRight} />
      </div>
      <div className={s.labelWindow} aria-hidden />
      <h3 className={s.title}>{title}</h3>
      {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
      <div className={s.tapeContent}>{children}</div>
    </article>
  )
}
