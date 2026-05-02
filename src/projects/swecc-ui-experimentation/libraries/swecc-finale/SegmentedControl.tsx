import { RadioSegmentedControl } from '@/libraries/shared/RadioSegmentedControl'
import type { LibrarySegmentedControlProps } from '@/shared/types'
import { cn } from '@/lib/utils'
import s from './swecc-finale.module.css'

export function SegmentedControl<T extends string>({ className, ...rest }: LibrarySegmentedControlProps<T>) {
  return (
    <RadioSegmentedControl
      {...rest}
      className={className}
      groupClassName={cn(s.segmented, s.root)}
      getButtonClassName={(active) => (active ? s.segmentedBtnActive : s.segmentedBtn)}
    />
  )
}
