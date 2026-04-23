import type { UiKit } from '@/kitModel'
import * as CoralReef from './libraries/coral-reef'
import * as NightConstellation from './libraries/night-constellation'
import { panelClass, panelClassLight } from './libraries/night-constellation/panel'
import * as PaperVellum from './libraries/paper-velum'
import * as SignalWayfind from './libraries/signal-wayfind'
import { panelClass as sonarPanelClass, panelClassLight as sonarPanelClassLight } from './libraries/sonar-ping/panel'
import * as SonarPing from './libraries/sonar-ping'
import * as StencilYard from './libraries/stencil-yard'
import * as TerracottaMosaic from './libraries/terracotta-mosaic'
import * as VhsShelf from './libraries/vhs-shelf'

const uiExperimentsKits: UiKit[] = [
  {
    id: 'ux-signal',
    name: 'Signal & wayfinding',
    tagline:
      'Harsh runway chrome: jet monospace, chevron arrows, dashed fields, a scrolling route trace, and a hazard stripe in energy orange.',
    Panel: 'light',
    ...SignalWayfind,
  } as UiKit,
  {
    id: 'ux-paper',
    name: 'Vellum & lift',
    tagline:
      'Torn-geometry serif calm: wavy rule, sage and clay, cards that lift with offset paper shadows, living leaf on actions.',
    Panel: 'light',
    ...PaperVellum,
  } as UiKit,
  {
    id: 'ux-stencil',
    name: 'Yard stencils',
    tagline:
      'Yard stencils, hazard tape, corner brackets, crosshairs, ALL CAPS, ▸ spine between steps — a loading dock you can read from ten paces.',
    Panel: 'light',
    ...StencilYard,
  } as UiKit,
  {
    id: 'ux-constellation',
    name: 'Constellation net',
    tagline:
      'A dark field with star tiling, a lime mesh web on cards, orbit dots on every control, a vertical link rail, IBM Plex numerics.',
    Panel: 'dark',
    ...NightConstellation,
    panelClass,
    panelClassLight,
  } as UiKit,
  {
    id: 'ux-coral',
    name: 'Drift & kelp',
    tagline:
      'Rounded, buoyant, and loud: bubble step dots, a fish that swims beside every CTA, foamy wave clip on cards, and stacked “water” drop shadows.',
    Panel: 'light',
    ...CoralReef,
  } as UiKit,
  {
    id: 'ux-vhs',
    name: 'Cassette shelf',
    tagline:
      'Deck beige + shell black: sprocket strip, tricolor label blocks, a cream window, tiny play triangles, and a timecode TCR readout in mono.',
    Panel: 'light',
    ...VhsShelf,
  } as UiKit,
  {
    id: 'ux-terracotta',
    name: 'Mosaic room',
    tagline:
      'Plaster and grout, brick ink, a corner arch, diamond-inset knot on buttons, mini tile toppers on each path step, italic metrics in stone.',
    Panel: 'light',
    ...TerracottaMosaic,
  } as UiKit,
  {
    id: 'ux-sonar',
    name: 'Depth ping',
    tagline:
      'Second deep-dark column: 4px micro-grid, concentric sweeps, acquisition HUD tag, bar needle, square sonar pips, lime trace fill, IBM mono.',
    Panel: 'dark',
    ...SonarPing,
    panelClass: sonarPanelClass,
    panelClassLight: sonarPanelClassLight,
  } as UiKit,
]

export function getKitsForUiExperimentsProject(): UiKit[] {
  return uiExperimentsKits
}
