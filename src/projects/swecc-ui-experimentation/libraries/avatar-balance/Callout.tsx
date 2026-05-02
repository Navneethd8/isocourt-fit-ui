import type { LibraryCalloutProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './avatar-balance.module.css'

export function Callout({ title, children, variant = 'tip', className }: LibraryCalloutProps) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  const box =
    variant === 'warning' ? s.calloutWarning : variant === 'info' ? s.calloutInfo : s.calloutTip
  return (
    <aside className={cn(box, s.root, theme, className)}>
      {title ? <p className={s.calloutTitle}>{title}</p> : null}
      <div>{children}</div>
    </aside>
  )
}
