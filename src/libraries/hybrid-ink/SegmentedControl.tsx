import type { LibrarySegmentedControlProps } from '../../shared/types'
import { RadioSegmentedControl } from '../shared/RadioSegmentedControl'
import s from './hybrid-ink.module.css'

export function SegmentedControl<T extends string>({ className, ...rest }: LibrarySegmentedControlProps<T>) {
  return (
    <RadioSegmentedControl
      {...rest}
      className={className}
      groupClassName={[s.segmented, s.root].filter(Boolean).join(' ')}
      getButtonClassName={(active) => (active ? s.segmentedBtnActive : s.segmentedBtn)}
    />
  )
}
