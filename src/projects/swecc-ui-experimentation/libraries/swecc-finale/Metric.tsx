import type { LibraryMetricProps } from '@/shared/types'
import { cn } from '@/lib/utils'
import s from './swecc-finale.module.css'

export function Metric({ label, value, subvalue, tone = 'default', className }: LibraryMetricProps) {
  const valCls =
    tone === 'positive' ? s.metricValuePositive : tone === 'negative' ? s.metricValueNegative : s.metricValue
  return (
    <div className={cn(s.metric, s.root, className)}>
      <div className={s.metricLabel}>{label}</div>
      <div className={valCls}>{value}</div>
      {subvalue ? <div className={s.metricSub}>{subvalue}</div> : null}
    </div>
  )
}
