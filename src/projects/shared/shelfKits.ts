/**
 * Cross-project “shelf” design kits (Sketch, Iso Board, Hybrid) used for side-by-side comparison.
 * Product-specific columns (e.g. IsoCourt’s current-site) live under that project’s folder.
 */
import * as SketchSf from '@/libraries/sketch-sf'
import * as IsometricChalk from '@/libraries/isometric-chalk'
import * as HybridInk from '@/libraries/hybrid-ink'
import {
  panelClass as isometricPanelClass,
  panelClassLight as isometricPanelClassLight,
} from '@/libraries/isometric-chalk/panel'
import type { UiKit } from '@/kitModel'

export function getSharedShelfKits(): UiKit[] {
  return [
    {
      id: 'sketch-sf',
      name: 'Sketch × Inter × SF',
      tagline:
        'Hand-drawn Excalidraw-style chrome: Inter for UI type, then Apple SF Pro Text / SF Pro Display on macOS & iOS via the system stack.',
      Panel: 'light',
      ...SketchSf,
    } as UiKit,
    {
      id: 'isometric-chalk',
      name: 'Iso Board',
      tagline:
        'Source Serif 4 + Georgia for an editorial “board” voice. Chalk look in dark UI; light mode uses a paper grid with the same primitives.',
      Panel: 'dark',
      ...IsometricChalk,
      panelClass: isometricPanelClass,
      panelClassLight: isometricPanelClassLight,
    } as UiKit,
    {
      id: 'hybrid-ink',
      name: 'Hybrid Ink',
      tagline:
        'Inter-led stack with Segoe / Roboto fallbacks — crisp product UI with an organic ink pulse on focus.',
      Panel: 'light',
      ...HybridInk,
    } as UiKit,
  ]
}
