import type { LibraryMetricProps } from '../../shared/types'
import { useKitLightPrimitives } from '../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import { chalkLightTw } from './chalkLightTw'
import s from './isometric-chalk.module.css'

export function Metric({ label, value, subvalue, tone = 'default', className }: LibraryMetricProps) {
  const L = useKitLightPrimitives()
  const valCls = L
    ? tone === 'positive'
      ? chalkLightTw.metricValuePositive
      : tone === 'negative'
        ? chalkLightTw.metricValueNegative
        : chalkLightTw.metricValue
    : tone === 'positive'
      ? s.metricValuePositive
      : tone === 'negative'
        ? s.metricValueNegative
        : s.metricValue

  return (
    <div className={cn(L ? chalkLightTw.metric : s.metric, !L && s.root, L && chalkLightTw.root, className)}>
      <div className={L ? chalkLightTw.metricLabel : s.metricLabel}>{label}</div>
      <div className={valCls}>{value}</div>
      {subvalue ? <div className={L ? chalkLightTw.metricSub : s.metricSub}>{subvalue}</div> : null}
    </div>
  )
}
