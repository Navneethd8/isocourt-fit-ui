import type { ComponentType } from 'react'
import type {
  LibraryBadgeProps,
  LibraryButtonProps,
  LibraryCalloutProps,
  LibraryCardProps,
  LibraryMetricProps,
  LibraryProgressBarProps,
  LibrarySegmentedControlProps,
  LibraryStepperProps,
  LibraryTextFieldProps,
} from './shared/types'

export type UiKit = {
  id: string
  name: string
  tagline: string
  Panel: 'light' | 'dark'
  /** When Panel is dark, applied as an extra class on the column (stage background). */
  panelClass?: string
  /** When Panel is dark but the app is in light mode, this replaces `panelClass` for the column shell. */
  panelClassLight?: string
  Button: ComponentType<LibraryButtonProps>
  Card: ComponentType<LibraryCardProps>
  TextField: ComponentType<LibraryTextFieldProps>
  Badge: ComponentType<LibraryBadgeProps>
  SegmentedControl: ComponentType<LibrarySegmentedControlProps<string>>
  Stepper: ComponentType<LibraryStepperProps>
  Metric: ComponentType<LibraryMetricProps>
  Callout: ComponentType<LibraryCalloutProps>
  ProgressBar: ComponentType<LibraryProgressBarProps>
}
