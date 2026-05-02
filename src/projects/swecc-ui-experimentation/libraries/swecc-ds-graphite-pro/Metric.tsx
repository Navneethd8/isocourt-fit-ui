import type { LibraryMetricProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './swecc-ds-graphite-pro.module.css'

export function Metric({ label, value, subvalue, tone = 'default', className }: LibraryMetricProps) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  const valCls =
    tone === 'positive' ? s.metricValuePositive : tone === 'negative' ? s.metricValueNegative : s.metricValue
  return (
    <div className={cn(s.metric, s.root, theme, className)}>
      <div className={s.metricLabel}>{label}</div>
      <div className={valCls}>{value}</div>
      {subvalue ? <div className={s.metricSub}>{subvalue}</div> : null}
    </div>
  )
}
