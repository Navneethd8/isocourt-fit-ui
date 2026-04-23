import type { LibraryCardProps } from '../../shared/types'
import { useKitLightPrimitives } from '../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import { chalkLightTw } from './chalkLightTw'
import s from './isometric-chalk.module.css'

export function Card({ title, subtitle, children, className }: LibraryCardProps) {
  const L = useKitLightPrimitives()
  return (
    <div className={L ? chalkLightTw.cardWrap : s.cardWrap}>
      <article className={cn(L ? chalkLightTw.card : s.card, !L && s.root, L && chalkLightTw.root, className)}>
        <h3 className={L ? chalkLightTw.title : s.title}>{title}</h3>
        {subtitle ? <p className={L ? chalkLightTw.subtitle : s.subtitle}>{subtitle}</p> : null}
        {children}
      </article>
    </div>
  )
}
