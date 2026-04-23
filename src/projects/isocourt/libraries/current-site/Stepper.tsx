import type { LibraryStepperProps } from '../../../../shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'

export function Stepper({ steps, className }: LibraryStepperProps) {
  const L = useKitLightPrimitives()
  return (
    <ol
      className={cn('m-0 flex list-none flex-wrap items-center gap-x-4 gap-y-2 p-0 font-sans', className)}
      aria-label="Workflow steps"
    >
      {steps.map((step) => {
        const isCurrent = step.status === 'current'
        const isDone = step.status === 'complete'
        return (
          <li
            key={step.id}
            aria-current={isCurrent ? 'step' : undefined}
            className={cn(
              'flex items-center gap-1.5 text-xs font-semibold',
              isDone && (L ? 'text-emerald-700' : 'text-emerald-500'),
              isCurrent && (L ? 'font-medium text-neutral-900' : 'font-medium text-neutral-200'),
              !isDone && !isCurrent && (L ? 'text-neutral-400' : 'text-neutral-600'),
            )}
          >
            <span
              className={cn(
                'h-1.5 w-1.5 shrink-0 rounded-full',
                isDone && (L ? 'bg-emerald-600' : 'bg-emerald-600'),
                isCurrent && (L ? 'bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.2)]' : 'bg-emerald-400 shadow-[0_0_0_2px_rgba(52,211,153,0.25)]'),
                !isDone && !isCurrent && (L ? 'bg-neutral-300' : 'bg-neutral-600'),
              )}
              aria-hidden
            />
            <span>{step.label}</span>
          </li>
        )
      })}
    </ol>
  )
}
