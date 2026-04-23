import type { LibraryStepperProps } from '@/shared/types'
import s from './night-constellation.module.css'

export function Stepper({ steps, className }: LibraryStepperProps) {
  return (
    <div className={[s.stepperWrap, s.root, className].filter(Boolean).join(' ')}>
      <div className={s.rail} aria-hidden />
      <ol className={s.stepper} aria-label="Workflow steps">
        {steps.map((step) => {
          const itemCls =
            step.status === 'current' ? s.stepperItemCurrent : step.status === 'complete' ? s.stepperItemDone : s.stepperItem
          return (
            <li key={step.id} className={itemCls} aria-current={step.status === 'current' ? 'step' : undefined}>
              {step.label}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
