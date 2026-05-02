import { RadioSegmentedControl } from '@/libraries/shared/RadioSegmentedControl'
import type { LibrarySegmentedControlProps } from '@/shared/types'
import { useKitLightPrimitives } from '../../../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import s from './swecc-rainier.module.css'

export function SegmentedControl<T extends string>({ className, ...rest }: LibrarySegmentedControlProps<T>) {
  const L = useKitLightPrimitives()
  const theme = L ? s.themeLight : s.themeDark
  return (
    <RadioSegmentedControl
      {...rest}
      className={className}
      groupClassName={cn(s.segmented, s.root, theme)}
      getButtonClassName={(active) => (active ? s.segmentedBtnActive : s.segmentedBtn)}
    />
  )
}
