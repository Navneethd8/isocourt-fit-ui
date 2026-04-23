import type { LibraryStepperProps } from '../../shared/types'
import { useKitLightPrimitives } from '../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import { chalkLightTw } from './chalkLightTw'
import s from './isometric-chalk.module.css'

export function Stepper({ steps, className }: LibraryStepperProps) {
  const L = useKitLightPrimitives()
  return (
    <ol
      className={cn(L ? chalkLightTw.stepper : s.stepper, !L && s.root, L && chalkLightTw.root, className)}
      aria-label="Workflow steps"
    >
      {steps.map((step) => {
        const itemCls = L
          ? step.status === 'current'
            ? chalkLightTw.stepperItemCurrent
            : step.status === 'complete'
              ? chalkLightTw.stepperItemDone
              : chalkLightTw.stepperItem
          : step.status === 'current'
            ? s.stepperItemCurrent
            : step.status === 'complete'
              ? s.stepperItemDone
              : s.stepperItem
        const dotCls = L
          ? step.status === 'current'
            ? chalkLightTw.stepperDotCurrent
            : step.status === 'complete'
              ? chalkLightTw.stepperDotDone
              : chalkLightTw.stepperDot
          : step.status === 'current'
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
