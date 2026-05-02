import type { LibraryCardProps } from '@/shared/types'
import { cn } from '@/lib/utils'
import s from './swecc-finale.module.css'

/** Surface card — sage rail; identity eyebrow uses husky token (#c5b4e3 frame). */
export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  return (
    <article className={cn(s.card, s.root, className)}>
      <div className={s.cardRail} aria-hidden />
      <div className={s.cardMain}>
        <p className={s.cardEyebrow}>SWECC · FINALE</p>
        <h3 className={s.title}>{title}</h3>
        {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
        {children}
      </div>
    </article>
  )
}
