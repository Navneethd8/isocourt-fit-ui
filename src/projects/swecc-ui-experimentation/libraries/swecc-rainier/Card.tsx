import type { LibraryCardProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './swecc-rainier.module.css'

/** Brick rail + Newsreader title — Rainier / Red Square campus kit. */
export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  return (
    <article className={cn(s.card, s.root, theme, className)}>
      <div className={s.cardRail} aria-hidden />
      <div className={s.cardMain}>
        <p className={s.cardEyebrow}>UW · RAINIER DECK</p>
        <h3 className={s.title}>{title}</h3>
        {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
        {children}
      </div>
    </article>
  )
}
