import type { LibraryMetricProps } from '@/shared/types'
import s from './terracotta-mosaic.module.css'

export function Metric({ label, value, subvalue, tone = 'default', className }: LibraryMetricProps) {
  const valCls =
    tone === 'positive' ? s.metricValuePositive : tone === 'negative' ? s.metricValueNegative : s.metricValue
  return (
    <div className={[s.metric, s.root, className].filter(Boolean).join(' ')}>
      <div className={s.metricLabel}>{label}</div>
      <div className={valCls}>{value}</div>
      {subvalue ? <div className={s.metricSub}>{subvalue}</div> : null}
    </div>
  )
}
