import type { LibraryCardProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './avatar-balance.module.css'

/** Scroll-style tile: violet spine + jade footing (purple × green harmony). */
export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  return (
    <article className={cn(s.card, s.root, theme, className)}>
      <p className={s.cardEyebrow}>Harmony</p>
      <h3 className={s.title}>{title}</h3>
      {subtitle ? <p className={s.subtitle}>{subtitle}</p> : null}
      {children}
    </article>
  )
}
