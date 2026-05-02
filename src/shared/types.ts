import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'

export type LibraryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  children: ReactNode
}

export type LibraryCardProps = {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
}

export type LibraryTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
}

export type LibraryBadgeProps = {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'success' | 'warning'
  className?: string
}

export type SegmentOption<T extends string = string> = {
  value: T
  label: string
}

export type LibrarySegmentedControlProps<T extends string = string> = {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel?: string
  className?: string
}

export type StepperStep = {
  id: string
  label: string
  status: 'complete' | 'current' | 'upcoming'
}

export type LibraryStepperProps = {
  steps: StepperStep[]
  className?: string
}

export type LibraryMetricProps = {
  label: string
  value: string
  subvalue?: string
  tone?: 'default' | 'positive' | 'negative'
  className?: string
}

export type CalloutVariant = 'info' | 'tip' | 'warning'

export type LibraryCalloutProps = {
  title?: string
  children: ReactNode
  variant?: CalloutVariant
  className?: string
}

export type LibraryProgressBarProps = {
  value: number
  max?: number
  label?: string
  className?: string
}
