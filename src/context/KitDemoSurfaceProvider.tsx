import type { ReactNode } from 'react'
import { KitDemoSurfaceContext, type KitDemoSurface } from './kit-demo-surface'

export function KitDemoSurfaceProvider({
  value,
  children,
}: {
  value: KitDemoSurface
  children: ReactNode
}) {
  return <KitDemoSurfaceContext.Provider value={value}>{children}</KitDemoSurfaceContext.Provider>
}
