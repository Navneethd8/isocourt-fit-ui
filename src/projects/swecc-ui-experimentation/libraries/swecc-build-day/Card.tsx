import type { LibraryCardProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './swecc-build-day.module.css'

/** Prize-track row: glyph + title stack + rule (winfohackathon.com rhythm, SWECC greens). */
export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  return (
    <article className={cn(s.card, s.root, theme, className)}>
      <div className={s.trackTop}>
        <span className={s.trackGlyph} aria-hidden>
          ◇
        </span>
        <div className={s.trackHeadings}>
          <h3 className={s.title}>{title}</h3>
          {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
        </div>
      </div>
      <div className={s.titleRule} aria-hidden />
      <div className={s.trackBody}>{children}</div>
    </article>
  )
}
