import type { LibraryStepperProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './swecc-build-day.module.css'

export function Stepper({ steps, className }: LibraryStepperProps) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  return (
    <ol className={cn(s.stepper, s.root, theme, className)} aria-label="Workflow steps">
      {steps.map((step) => {
        const itemCls =
          step.status === 'current' ? s.stepperItemCurrent : step.status === 'complete' ? s.stepperItemDone : s.stepperItem
        const dotCls =
          step.status === 'current'
            ? s.stepperDotCurrent
            : step.status === 'complete'
              ? s.stepperDotDone
              : s.stepperDot
        return (
          <li key={step.id} className={itemCls} aria-current={step.status === 'current' ? 'step' : undefined}>
            <span className={dotCls} aria-hidden />
            <span>{step.label}</span>
          </li>
        )
      })}
    </ol>
  )
}
