import type { LibraryStepperProps } from '@/shared/types'
import s from './vhs-shelf.module.css'

export function Stepper({ steps, className }: LibraryStepperProps) {
  return (
    <div className={[s.stepperRow, s.root, className].filter(Boolean).join(' ')}>
      <span className={s.tCode} aria-hidden>
        TCR ·
      </span>
      <ol className={s.stepper} aria-label="Timecode track">
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
