import { RadioSegmentedControl } from '@/libraries/shared/RadioSegmentedControl'
import type { LibrarySegmentedControlProps } from '@/shared/types'
import s from './vhs-shelf.module.css'

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
