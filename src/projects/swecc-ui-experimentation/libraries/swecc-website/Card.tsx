import type { LibraryCardProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './swecc-website.module.css'

/** Production-site card — flat bordered panel matching `.homepage` / article sections on swecc.org. */
export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  return (
    <article className={cn(s.card, s.root, theme, className)}>
      <h3 className={s.title}>{title}</h3>
      {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
      {children}
    </article>
  )
}
