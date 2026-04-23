import { useKitDemoSurface } from '../context/useKitDemoSurface'

/** True when this column should render light kit chrome (dark kits in global light / system-light). */
export function useKitLightPrimitives() {
  return useKitDemoSurface() === 'light-stage'
}
