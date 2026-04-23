import * as CurrentSite from './libraries/current-site'
import {
  panelClass as currentSitePanelClass,
  panelClassLight as currentSitePanelClassLight,
} from './libraries/current-site/panel'
import { getSharedShelfKits } from '../shared/shelfKits'
import type { UiKit } from '@/kitModel'

const isocourtProductKits: UiKit[] = [
  {
    id: 'current-site',
    name: 'Current (isocourt.fit)',
    tagline:
      'Inter + system UI: one real product skin (IsoCourt) ported here as a first-class kit. Dark mode = analyze-style UI; light mode = white cards on the shelf.',
    Panel: 'dark',
    ...CurrentSite,
    panelClass: currentSitePanelClass,
    panelClassLight: currentSitePanelClassLight,
  } as UiKit,
]

/** Product column (current site) + shared shelf kits, in the order used on the kit shelf. */
export function getKitsForIsocourtProject(): UiKit[] {
  return [...isocourtProductKits, ...getSharedShelfKits()]
}
