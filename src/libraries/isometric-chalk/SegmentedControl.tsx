import type { LibrarySegmentedControlProps } from '../../shared/types'
import { useKitLightPrimitives } from '../../hooks/useKitLightPrimitives'
import { cn } from '@/lib/utils'
import { chalkLightTw } from './chalkLightTw'
import { RadioSegmentedControl } from '../shared/RadioSegmentedControl'
import s from './isometric-chalk.module.css'

export function SegmentedControl<T extends string>({ className, ...rest }: LibrarySegmentedControlProps<T>) {
  const L = useKitLightPrimitives()
  return (
    <RadioSegmentedControl
      {...rest}
      className={className}
      groupClassName={cn(L ? chalkLightTw.segmented : s.segmented, !L && s.root, L && chalkLightTw.root)}
      getButtonClassName={(active) =>
        active ? (L ? chalkLightTw.segmentedBtnActive : s.segmentedBtnActive) : L ? chalkLightTw.segmentedBtn : s.segmentedBtn
      }
    />
  )
}
