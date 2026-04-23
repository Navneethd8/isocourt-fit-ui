import { useContext } from 'react'
import { KitDemoSurfaceContext } from './kit-demo-surface'

export function useKitDemoSurface() {
  return useContext(KitDemoSurfaceContext)
}
