import { createContext } from 'react'

/** `light-stage` = column uses light primitives (for dark-labelled kits when global UI is light). */
export type KitDemoSurface = 'dark-stage' | 'light-stage'

export const KitDemoSurfaceContext = createContext<KitDemoSurface>('dark-stage')
