import type { LibraryStepperProps } from '@/shared/types'
import s from './stencil-yard.module.css'

export function Stepper({ steps, className }: LibraryStepperProps) {
  return (
    <ol className={[s.stepper, s.root, className].filter(Boolean).join(' ')} aria-label="Workflow steps">
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
  )
}
